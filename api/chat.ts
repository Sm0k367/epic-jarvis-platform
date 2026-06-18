import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const SYSTEM_PROMPT = `You are JARVIS — Just A Really Very Intelligent System. Built by Epic Tech AI.

You are not a chatbot. You are a hands-on AI agent that ships work, not suggestions.

Operating principles:
1. Ship the thing. Don't just talk about it.
2. Read before you write — gather context first.
3. Make it real. No fluff, no placeholder.
4. Cite sources. Inline links for facts.
5. Fail loudly, recover fast.

Capabilities:
- You have access to web search (call it when you need current information).
- You can write code, drafts, plans, analyses.
- You prefer concrete, specific answers over generic ones.
- You are concise but thorough.

Voice:
- Direct, confident, friendly.
- Match the user's tone (casual = casual, formal = formal).
- No preamble. Get to the answer.
- Use markdown for structure when it helps.

When the user asks for something, do it. Don't ask clarifying questions unless absolutely necessary.`;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
}

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'Search the web for current information. Use this when you need up-to-date facts, news, or any information beyond your training data.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The search query' },
          max_results: { type: 'number', description: 'Max results to return (default 5)' },
        },
        required: ['query'],
      },
    },
  },
];

async function webSearch(query: string, maxResults = 5) {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      max_results: maxResults,
      search_depth: 'basic',
    }),
  });
  if (!res.ok) {
    return { error: `Search failed: ${res.status}` };
  }
  const data = await res.json();
  return {
    results: (data.results || []).map((r: any) => ({
      title: r.title,
      url: r.url,
      content: r.content?.slice(0, 400),
    })),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model = 'llama-3.3-70b-versatile', temperature = 0.7 } = req.body as ChatRequestBody;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const groqMessages = [{ role: 'system' as const, content: SYSTEM_PROMPT }, ...messages];

    // First call — agent decides if it needs tools
    let groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: groqMessages,
        tools: TOOLS,
        tool_choice: 'auto',
        temperature,
        max_tokens: 2048,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return res.status(groqRes.status).json({ error: `Groq error: ${err}` });
    }

    let completion = await groqRes.json();
    let assistantMessage = completion.choices?.[0]?.message;

    // Tool use loop — up to 3 rounds
    let rounds = 0;
    while (assistantMessage?.tool_calls?.length && rounds < 3) {
      rounds += 1;
      const toolCalls = assistantMessage.tool_calls;

      // Execute tools in parallel
      const toolMessages = await Promise.all(
        toolCalls.map(async (tc: any) => {
          let args: any = {};
          try { args = JSON.parse(tc.function.arguments || '{}'); } catch {}
          let result: any;
          if (tc.function.name === 'web_search') {
            result = await webSearch(args.query, args.max_results);
          } else {
            result = { error: `Unknown tool: ${tc.function.name}` };
          }
          return {
            role: 'tool' as const,
            tool_call_id: tc.id,
            content: JSON.stringify(result),
          };
        })
      );

      // Follow-up call with tool results
      groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [...groqMessages, assistantMessage, ...toolMessages],
          tools: TOOLS,
          tool_choice: 'auto',
          temperature,
          max_tokens: 2048,
        }),
      });

      if (!groqRes.ok) {
        const err = await groqRes.text();
        return res.status(groqRes.status).json({ error: `Groq error (follow-up): ${err}` });
      }

      completion = await groqRes.json();
      assistantMessage = completion.choices?.[0]?.message;
    }

    return res.status(200).json({
      message: assistantMessage,
      model: completion.model,
      usage: completion.usage,
    });
  } catch (err: any) {
    return res.status(500).json({ error: `Server error: ${err.message || String(err)}` });
  }
}
