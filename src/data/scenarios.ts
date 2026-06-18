export interface DemoStep {
  type: 'thought' | 'tool' | 'output' | 'log';
  label: string;
  content: string;
  duration: number;
}

export interface DemoScenario {
  id: string;
  title: string;
  prompt: string;
  steps: DemoStep[];
}

export const demoScenarios: DemoScenario[] = [
  {
    id: 'research',
    title: 'Deep Research',
    prompt: 'Research the 2026 AI agent landscape and produce a cited report',
    steps: [
      { type: 'thought', label: 'Planning', content: 'Break into 4 sub-questions: market size, leading platforms, technical approaches, future direction.', duration: 1200 },
      { type: 'tool', label: 'web_search', content: 'Querying: "AI agent platforms 2026 market share"', duration: 900 },
      { type: 'tool', label: 'openalex', content: 'Fetching 12 highly-cited papers on agent architectures', duration: 1400 },
      { type: 'tool', label: 'scrape_webpage', content: 'Extracting data from 8 industry reports in parallel', duration: 1100 },
      { type: 'thought', label: 'Synthesizing', content: 'Cross-referencing 47 sources, identifying 3 distinct agent architectures.', duration: 1500 },
      { type: 'output', label: 'Report ready', content: '4,200-word report with 23 inline citations, 2 charts, executive summary.', duration: 2000 },
    ],
  },
  {
    id: 'build',
    title: 'Ship a Feature',
    prompt: 'Add a Stripe-powered billing page to my SaaS app',
    steps: [
      { type: 'thought', label: 'Analyzing', content: 'Reading current codebase: Next.js 14, App Router, Tailwind, no Stripe yet.', duration: 1100 },
      { type: 'tool', label: 'fastapi-sdk', content: 'Loading best-practice patterns for Stripe + Next.js', duration: 800 },
      { type: 'tool', label: 'kortix-executor', content: 'Stripe MCP: created 3 products, 2 prices, configured webhooks', duration: 1500 },
      { type: 'tool', label: 'write', content: 'Created /app/billing/page.tsx, /api/checkout/route.ts, webhook handler', duration: 1300 },
      { type: 'tool', label: 'bash', content: 'Running typecheck, lint, build — all green', duration: 1000 },
      { type: 'output', label: 'PR opened', content: 'PR #142 ready for review with screenshot, test results, deployment notes.', duration: 1800 },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Campaign',
    prompt: 'Launch a product on Product Hunt with full marketing collateral',
    steps: [
      { type: 'thought', label: 'Strategizing', content: 'Audience: indie devs + AI-curious founders. Hook: "ship anything, not suggestions."', duration: 1300 },
      { type: 'tool', label: 'content-creation', content: 'Loading content frameworks for launch announcements', duration: 700 },
      { type: 'tool', label: 'logo-creator', content: 'Generating 3 logo concepts, picking the strongest', duration: 1100 },
      { type: 'tool', label: 'create-an-asset', content: 'Landing page + launch deck + 5 social cards generated', duration: 1700 },
      { type: 'tool', label: 'draft-outreach', content: '12 personalized hunter emails drafted, ready to send', duration: 1400 },
      { type: 'output', label: 'Launch ready', content: 'Full launch kit assembled: assets, copy, outreach list, schedule.', duration: 1600 },
    ],
  },
];
