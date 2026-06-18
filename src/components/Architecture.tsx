import { architectureLayers } from '../data/architecture';

export function Architecture() {
  return (
    <section id="architecture" className="relative py-32 overflow-hidden bg-surface/30">
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// System design</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            Five layers.{' '}
            <span className="text-gradient">Infinite possibilities.</span>
          </h2>
          <p className="text-lg text-text-muted">
            A clean, composable stack. Each layer is replaceable, extensible, and observable.
            Designed to survive the next 10 years of model evolution.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden lg:block" />

          <div className="space-y-4">
            {architectureLayers.map((layer, idx) => (
              <div
                key={layer.name}
                className="relative grid lg:grid-cols-[100px,1fr] gap-6 items-start"
              >
                {/* Layer number */}
                <div className="hidden lg:flex flex-col items-center pt-6">
                  <div className="w-6 h-6 rounded-full bg-bg border-2 border-primary flex items-center justify-center text-xs font-mono text-primary font-bold z-10">
                    {idx + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="group p-6 lg:p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl">{layer.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl lg:text-3xl mb-1">
                        {layer.name}
                      </h3>
                      <p className="text-text-muted">{layer.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-md bg-bg border border-border text-xs font-mono text-text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
