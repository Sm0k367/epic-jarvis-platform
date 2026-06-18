export interface Skill {
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Knowledge & Research',
    skills: [
      { name: 'deep-research', description: 'Multi-source investigation with citations', category: 'Knowledge & Research', icon: '🔍' },
      { name: 'research-report', description: 'Polished markdown reports with inline citations', category: 'Knowledge & Research', icon: '📄' },
      { name: 'openalex-paper-search', description: '240M+ academic papers', category: 'Knowledge & Research', icon: '🎓' },
      { name: 'customer-research', description: 'Multi-source account intelligence', category: 'Knowledge & Research', icon: '👥' },
      { name: 'paper-creator', description: 'Scientific papers in LaTeX, end-to-end', category: 'Knowledge & Research', icon: '📜' },
    ],
  },
  {
    name: 'Product & Engineering',
    skills: [
      { name: 'webapp', description: 'Fullstack apps: Express + Vite + React + Drizzle', category: 'Product & Engineering', icon: '⚡' },
      { name: 'website-building', description: 'Production-grade websites, distinctive design', category: 'Product & Engineering', icon: '🎨' },
      { name: 'feature-spec', description: 'PRDs and feature specifications', category: 'Product & Engineering', icon: '📋' },
      { name: 'coding-and-data', description: 'Code, SQL, data analysis delegation', category: 'Product & Engineering', icon: '💻' },
      { name: 'fastapi-sdk', description: 'FastAPI best practices, current versions', category: 'Product & Engineering', icon: '🚀' },
      { name: 'sql-queries', description: 'Correct, performant SQL across dialects', category: 'Product & Engineering', icon: '🗄️' },
    ],
  },
  {
    name: 'Sales & Marketing',
    skills: [
      { name: 'draft-outreach', description: 'Personalized cold outreach, researched', category: 'Sales & Marketing', icon: '✉️' },
      { name: 'competitive-intelligence', description: 'Interactive HTML battlecards', category: 'Sales & Marketing', icon: '⚔️' },
      { name: 'content-creation', description: 'Marketing content across channels', category: 'Sales & Marketing', icon: '📝' },
      { name: 'campaign-planning', description: 'Plan, structure, execute campaigns', category: 'Sales & Marketing', icon: '📅' },
      { name: 'create-an-asset', description: 'Landing pages, decks, one-pagers', category: 'Sales & Marketing', icon: '🎯' },
    ],
  },
  {
    name: 'Finance & Legal',
    skills: [
      { name: 'financial-statements', description: 'GAAP-compliant formats, flux analysis', category: 'Finance & Legal', icon: '📊' },
      { name: 'close-management', description: 'Month-end close checklist and workflow', category: 'Finance & Legal', icon: '📅' },
      { name: 'reconciliation', description: 'GL-to-subledger, bank recs', category: 'Finance & Legal', icon: '⚖️' },
      { name: 'contract-review', description: 'Contracts against playbook, severity-tagged', category: 'Finance & Legal', icon: '📑' },
      { name: 'legal-writer', description: 'Contracts, memos, briefs, ToS, privacy', category: 'Finance & Legal', icon: '⚖️' },
    ],
  },
  {
    name: 'Design & Media',
    skills: [
      { name: 'logo-creator', description: 'Researched, iterated logo systems', category: 'Design & Media', icon: '✨' },
      { name: 'presentations', description: '1920×1080 HTML slide decks', category: 'Design & Media', icon: '📽️' },
      { name: 'docx', description: 'Create, edit, review Word docs', category: 'Design & Media', icon: '📄' },
      { name: 'pdf', description: 'Create, edit, OCR, fill, convert PDFs', category: 'Design & Media', icon: '📕' },
      { name: 'xlsx', description: 'Spreadsheets, models, polished workbooks', category: 'Design & Media', icon: '📗' },
      { name: 'elevenlabs', description: 'TTS, voice cloning, sound effects', category: 'Design & Media', icon: '🔊' },
      { name: 'remotion', description: 'React video creation', category: 'Design & Media', icon: '🎬' },
    ],
  },
  {
    name: 'Browser & Automation',
    skills: [
      { name: 'agent-browser', description: 'Browser automation CLI for agents', category: 'Browser & Automation', icon: '🌐' },
      { name: 'domain-research', description: 'Domain availability, WHOIS, expiry', category: 'Browser & Automation', icon: '🔎' },
      { name: 'whisper', description: 'Transcribe any audio/video', category: 'Browser & Automation', icon: '🎙️' },
    ],
  },
];
