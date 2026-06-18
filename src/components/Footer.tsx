import { Logo } from './Logo';

export function Footer() {
  const cols = [
    {
      title: 'Product',
      links: ['Features', 'Skills', 'Pricing', 'Changelog', 'Roadmap'],
    },
    {
      title: 'Developers',
      links: ['Documentation', 'API Reference', 'GitHub', 'Discord', 'Status'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact', 'Press kit'],
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy', 'Security', 'Compliance', 'DPA'],
    },
  ];

  return (
    <footer className="relative border-t border-border bg-surface/30 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1fr,3fr] gap-12 mb-16">
          <div>
            <Logo size={32} />
            <p className="text-sm text-text-muted mt-4 max-w-xs leading-relaxed">
              <strong className="text-text">Epic Tech AI</strong> — JARVIS is an AI agent platform built for shipping work. Powered by SOTA models.
            </p>

            <div className="mt-6 space-y-2">
              <a href="mailto:epictechai@gmail.com" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                epictechai@gmail.com
              </a>
              <a href="https://x.com/EpicTechAI" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                @EpicTechAI
              </a>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-mono mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-text-muted">All systems operational</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-mono text-text-faint uppercase tracking-wider mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-text-muted hover:text-text transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-text-faint font-mono">
            © 2026 Epic Tech AI · JARVIS · MIT License · <a href="mailto:epictechai@gmail.com" className="hover:text-text-muted transition-colors">epictechai@gmail.com</a>
          </div>
          <div className="flex items-center gap-5 text-xs text-text-faint">
            <a href="https://github.com/Sm0k367/epic-jarvis-platform" target="_blank" rel="noreferrer" className="hover:text-text-muted transition-colors">GitHub</a>
            <a href="https://x.com/EpicTechAI" target="_blank" rel="noreferrer" className="hover:text-text-muted transition-colors">X / Twitter</a>
            <a href="mailto:epictechai@gmail.com" className="hover:text-text-muted transition-colors">Email</a>
            <a href="#" className="hover:text-text-muted transition-colors">Discord</a>
          </div>
        </div>
      </div>

      {/* Big background type */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="font-display text-[clamp(6rem,15vw,14rem)] leading-none tracking-tighter text-center bg-gradient-to-t from-surface-offset/30 to-transparent bg-clip-text text-transparent select-none">
          JARVIS
        </div>
      </div>
    </footer>
  );
}
