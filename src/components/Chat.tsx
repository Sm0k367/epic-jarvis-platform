import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
  timestamp: number;
}

const MODELS = [
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', description: 'Fast, capable, versatile', color: 'primary' },
  { id: 'openai/gpt-oss-120b', label: 'GPT-OSS 120B', description: 'SOTA open weights', color: 'accent' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', label: 'Llama 4 Scout', description: 'Latest, long context', color: 'success' },
  { id: 'qwen/qwen3-32b', label: 'Qwen 3 32B', description: 'Strong reasoning', color: 'warning' },
];

const SUGGESTIONS = [
  'Research the current state of AI agent platforms and summarize key trends',
  'Write me a launch tweet thread for Epic Tech AI',
  'Explain how JARVIS uses SOTA models to ship work',
  'Generate 3 logo concepts for an AI agent brand',
  'Plan a Product Hunt launch for an AI agent platform',
  'Compare Vercel, Railway, and Fly.io for deploying AI apps',
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(MODELS[0].id);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: content.trim(),
      id: `user-${Date.now()}`,
      timestamp: Date.now(),
    };

    const assistantMsg: Message = {
      role: 'assistant',
      content: '',
      id: `assistant-${Date.now()}`,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          model,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: `*Error:* ${err.error || 'Something went wrong.'}` }
              : m
          )
        );
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      const reply = data.message?.content || '*No response.*';

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsg.id ? { ...m, content: reply } : m))
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: `*Network error:* ${err.message}` } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const currentModel = MODELS.find((m) => m.id === model) || MODELS[0];

  return (
    <section id="chat" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-glow" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// Live agent</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            Talk to JARVIS.{' '}
            <span className="text-gradient">Right now.</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Powered by SOTA models via Groq. Real tool use, real web search, real responses. No demos — just the agent.
          </p>
        </div>

        <div className="border-gradient rounded-2xl overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 bg-surface-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-error/70" />
              <span className="w-3 h-3 rounded-full bg-warning/70" />
              <span className="w-3 h-3 rounded-full bg-success/70" />
            </div>
            <div className="font-mono text-xs text-text-faint flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-primary animate-pulse' : 'bg-success'}`} />
              epic-tech-ai · jarvis · {isLoading ? 'thinking...' : 'ready'}
            </div>
            {/* Model selector */}
            <div className="relative">
              <button
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                className="text-xs font-mono text-text-muted hover:text-text transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface"
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-${currentModel.color}`} />
                {currentModel.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <AnimatePresence>
                {modelMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-full mt-1 w-64 bg-surface border border-border rounded-lg shadow-xl z-10 overflow-hidden"
                  >
                    {MODELS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => { setModel(m.id); setModelMenuOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 hover:bg-surface-offset transition-colors ${
                          model === m.id ? 'bg-surface-offset' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${m.color}`} />
                          <span className="text-sm font-medium">{m.label}</span>
                        </div>
                        <div className="text-xs text-text-muted mt-0.5 ml-3.5">{m.description}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="bg-bg/60 min-h-[480px] max-h-[600px] overflow-y-auto p-6 space-y-6 scanline relative"
          >
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-display text-2xl mb-2">What can I help you ship?</h3>
                <p className="text-sm text-text-muted mb-8 max-w-md mx-auto">
                  Try one of these, or type your own. JARVIS has web search + every skill in the catalog.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="text-left text-sm px-4 py-3 rounded-lg bg-surface border border-border hover:border-primary/40 hover:bg-surface-offset transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 shrink-0 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-bg font-bold text-xs">
                    J
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    m.role === 'user'
                      ? 'bg-primary/15 border border-primary/30 text-text'
                      : 'bg-surface border border-border text-text'
                  }`}
                >
                  {m.role === 'user' ? (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                  ) : (
                    <MarkdownContent content={m.content} />
                  )}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 shrink-0 rounded-md bg-surface-offset border border-border flex items-center justify-center text-text-muted text-xs font-mono">
                    U
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === '' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 shrink-0 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-bg font-bold text-xs">
                  J
                </div>
                <div className="bg-surface border border-border rounded-lg px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-surface-2 p-4">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask JARVIS anything... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="flex-1 bg-bg border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-faint resize-none focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                style={{ maxHeight: '160px', minHeight: '44px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 160) + 'px';
                }}
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-11 px-4 rounded-lg bg-gradient-to-br from-primary to-accent text-bg font-semibold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center gap-1.5"
              >
                Send
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-text-faint">
              <span>
                Powered by <span className="text-text-muted">{currentModel.label}</span> via Groq
              </span>
              <span>
                <a href="mailto:epictechai@gmail.com" className="hover:text-text-muted transition-colors">epictechai@gmail.com</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarkdownContent({ content }: { content: string }) {
  // Lightweight markdown rendering — bold, italic, code, links, lists, headings
  const parts: Array<{ type: string; text: string }> = [];
  const lines = content.split('\n');
  let key = 0;

  return (
    <div className="text-sm leading-relaxed space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Headings
        if (trimmed.startsWith('### ')) {
          return <h4 key={i} className="font-semibold text-text mt-3 mb-1">{trimmed.slice(4)}</h4>;
        }
        if (trimmed.startsWith('## ')) {
          return <h3 key={i} className="font-semibold text-text mt-3 mb-1">{trimmed.slice(3)}</h3>;
        }

        // Bullets
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-primary shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
            </div>
          );
        }

        // Numbered
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-primary shrink-0 font-mono text-xs">{trimmed.match(/^\d+/)?.[0]}.</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^\d+\.\s/, '')) }} />
            </div>
          );
        }

        // Empty line
        if (!trimmed) return <div key={i} className="h-2" />;

        // Code block
        if (trimmed.startsWith('```')) {
          return null; // Skip code block markers — could enhance later
        }

        return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
      })}
    </div>
  );
}

function formatInline(text: string): string {
  // Escape HTML first
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic *text*
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-bg rounded text-primary font-mono text-xs">$1</code>');

  // Links [label](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-primary hover:underline">$1</a>');

  return html;
}
