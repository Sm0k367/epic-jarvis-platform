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
              Just A Really Very Intelligent System. An AI agent platform built for shipping work.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-text-muted">All systems operational</span>
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
            © 2026 JARVIS Platform · MIT License · Built by humans, refined by agents
          </div>
          <div className="flex items-center gap-5 text-xs text-text-faint">
            <a href="#" className="hover:text-text-muted transition-colors">GitHub</a>
            <a href="#" className="hover:text-text-muted transition-colors">X / Twitter</a>
            <a href="#" className="hover:text-text-muted transition-colors">Discord</a>
            <a href="#" className="hover:text-text-muted transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      {/* Big background type */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="font-display text-[clamp(8rem,20vw,18rem)] leading-none tracking-tighter text-center bg-gradient-to-t from-surface-offset/30 to-transparent bg-clip-text text-transparent select-none">
          JARVIS
        </div>
      </div>
    </footer>
  );
}
