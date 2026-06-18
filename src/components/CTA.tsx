export function CTA() {
  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-8">
          <span className="text-primary">●</span>
          <span className="text-text-muted">ready in 60 seconds</span>
        </div>

        <h2 className="font-display text-6xl lg:text-7xl tracking-tight mb-6">
          Deploy JARVIS.{' '}
          <span className="text-gradient">Today.</span>
        </h2>

        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10">
          One command. Your Vercel account. Production-grade agent platform running in under a minute.
        </p>

        {/* Terminal block */}
        <div className="max-w-2xl mx-auto mb-10 rounded-xl border border-border bg-bg/80 overflow-hidden text-left shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-2 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
            <span className="ml-3 font-mono text-xs text-text-faint">~/jarvis-platform</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-3">
            <div>
              <span className="text-text-faint">$</span> <span className="text-text">npm install -g jarvis</span>
            </div>
            <div className="text-text-muted">added 1 package in 3s</div>
            <div>
              <span className="text-text-faint">$</span> <span className="text-text">jarvis deploy --vercel</span>
            </div>
            <div className="text-text-muted">
              <span className="text-primary">▸</span> Authenticating with Vercel... <span className="text-success">✓</span>
            </div>
            <div className="text-text-muted">
              <span className="text-primary">▸</span> Building production bundle... <span className="text-success">✓</span>
            </div>
            <div className="text-text-muted">
              <span className="text-primary">▸</span> Deploying to edge... <span className="text-success">✓</span>
            </div>
            <div className="text-text-muted">
              <span className="text-primary">▸</span> Loading 64 skills... <span className="text-success">✓</span>
            </div>
            <div className="text-success">✓ Live at https://jarvis-platform.vercel.app</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/jarvis/platform"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-bg font-semibold hover:shadow-glow transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L24 22H0L12 1z" />
            </svg>
            Deploy to Vercel
          </a>
          <a
            href="https://github.com/jarvis/platform"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-lg border border-border bg-surface text-text hover:bg-surface-offset transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
