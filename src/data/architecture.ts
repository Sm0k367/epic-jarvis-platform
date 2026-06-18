export interface ArchitectureLayer {
  name: string;
  description: string;
  items: string[];
  icon: string;
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: 'Tools',
    description: 'Real primitives — shell, files, browser, network, memory, executor.',
    items: ['bash + pty', 'file ops', 'web search/fetch/scrape', 'browser', 'memory', 'executor (MCP)'],
    icon: '🛠️',
  },
  {
    name: 'Skills',
    description: '60+ specialized workflows, loaded on demand. Each one a battle-tested pattern.',
    items: ['deep-research', 'webapp', 'contract-review', 'logo-creator', 'pdf/docx/xlsx/pptx', '+55 more'],
    icon: '📚',
  },
  {
    name: 'Agents',
    description: 'Composable personas with their own tool surface, permission scope, and model.',
    items: ['jarvis (universal)', 'kortix (general)', 'custom per-task'],
    icon: '🤖',
  },
  {
    name: 'Memory',
    description: 'Persistent project brain — survives context resets, indexed, structured.',
    items: ['overview.md', 'conventions.md', 'integrations.md', 'decisions.md'],
    icon: '🧠',
  },
  {
    name: 'Orchestration',
    description: 'Subagents in parallel. Triggers on schedule, webhook, or event. Long-running sessions.',
    items: ['parallel tasks', 'triggers', 'webhooks', 'cron + events'],
    icon: '⚙️',
  },
];
