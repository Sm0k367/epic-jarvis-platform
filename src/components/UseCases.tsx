export function UseCases() {
  const cases = [
    {
      title: 'Indie hackers',
      description: 'Ship a SaaS in a weekend. JARVIS handles auth, billing, deployment, and the marketing site — you ship the idea.',
      color: 'from-primary/20 to-primary/5',
      icon: '🚀',
    },
    {
      title: 'Enterprise teams',
      description: 'Sandboxed execution, audit trails, model-agnostic. SOC2-friendly permissions model. Self-host on your VPC.',
      color: 'from-accent/20 to-accent/5',
      icon: '🏢',
    },
    {
      title: 'Research & labs',
      description: 'Run long-running experiments in isolated VMs. Subagents in parallel. Real shell, real data, real results.',
      color: 'from-success/20 to-success/5',
      icon: '🔬',
    },
    {
      title: 'Agencies & studios',
      description: 'White-label deployments. Per-client agents. The platform runs your playbook at scale.',
      color: 'from-warning/20 to-warning/5',
      icon: '🎨',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// Built for everyone</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            One platform.{' '}
            <span className="text-gradient">Endless use cases.</span>
          </h2>
          <p className="text-lg text-text-muted">
            The same agent that ships your landing page can do your taxes, debug production, or plan a wedding. JARVIS adapts to the task, not the other way around.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group relative p-8 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-display text-2xl mb-3">{c.title}</h3>
                <p className="text-text-muted leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
