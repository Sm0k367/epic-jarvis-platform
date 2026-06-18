import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { demoScenarios, type DemoScenario } from '../data/scenarios';

export function LiveDemo() {
  const [activeId, setActiveId] = useState(demoScenarios[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const active = demoScenarios.find((s) => s.id === activeId)!;

  useEffect(() => {
    if (!isRunning) return;
    if (stepIndex >= active.steps.length) {
      const t = setTimeout(() => setStepIndex(0), 3500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIndex((i) => i + 1), active.steps[stepIndex].duration);
    return () => clearTimeout(t);
  }, [stepIndex, isRunning, active]);

  const switchScenario = (id: string) => {
    setActiveId(id);
    setStepIndex(0);
    setIsRunning(true);
  };

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// Live demonstration</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            Watch JARVIS <span className="text-gradient">think, plan, ship.</span>
          </h2>
          <p className="text-lg text-text-muted">
            Real prompts, real tools, real outputs. Every step visible. Pick a scenario and let it run.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Scenario sidebar */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-text-faint uppercase tracking-wider px-3 mb-3">Scenarios</div>
            {demoScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => switchScenario(s.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  activeId === s.id
                    ? 'border-primary/50 bg-surface-offset glow'
                    : 'border-border bg-surface hover:bg-surface-offset'
                }`}
              >
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-xs text-text-muted mt-1 line-clamp-2">{s.prompt}</div>
              </button>
            ))}
          </div>

          {/* Demo panel */}
          <DemoPanel scenario={active} stepIndex={stepIndex} />
        </div>
      </div>
    </section>
  );
}

function DemoPanel({ scenario, stepIndex }: { scenario: DemoScenario; stepIndex: number }) {
  const visibleSteps = scenario.steps.slice(0, stepIndex);
  const currentStep = scenario.steps[stepIndex];
  const progress = (stepIndex / scenario.steps.length) * 100;
  const done = stepIndex >= scenario.steps.length;

  return (
    <div className="border-gradient rounded-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-5 py-3 bg-surface-2 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error/70" />
          <span className="w-3 h-3 rounded-full bg-warning/70" />
          <span className="w-3 h-3 rounded-full bg-success/70" />
        </div>
        <div className="font-mono text-xs text-text-faint flex items-center gap-2">
          <span className={done ? 'text-success' : 'text-primary'}>●</span>
          jarvis@platform ~ {scenario.id}
        </div>
        <div className="text-xs font-mono text-text-faint">
          {done ? 'complete' : `${stepIndex}/${scenario.steps.length}`}
        </div>
      </div>

      {/* Prompt */}
      <div className="px-6 py-5 bg-surface border-b border-divider">
        <div className="flex items-start gap-3">
          <div className="text-primary font-mono text-sm mt-0.5">→</div>
          <div>
            <div className="text-xs font-mono text-text-faint mb-1.5">user prompt</div>
            <div className="text-text text-base">{scenario.prompt}</div>
          </div>
        </div>
      </div>

      {/* Stream */}
      <div className="bg-bg/60 px-6 py-6 min-h-[440px] font-mono text-sm space-y-3 scanline relative">
        <AnimatePresence>
          {visibleSteps.map((step, idx) => (
            <motion.div
              key={`${scenario.id}-${idx}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3"
            >
              <div className="text-text-faint shrink-0 select-none">{(idx + 1).toString().padStart(2, '0')}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <StepBadge type={step.type} />
                  <span className="text-text-muted text-xs">[{step.label}]</span>
                </div>
                <div className="text-text-muted leading-relaxed">{step.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!done && currentStep && (
          <motion.div
            key={`${scenario.id}-${stepIndex}-live`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="text-text-faint shrink-0 select-none">{(stepIndex + 1).toString().padStart(2, '0')}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <StepBadge type={currentStep.type} />
                <span className="text-text-muted text-xs">[{currentStep.label}]</span>
              </div>
              <div className="text-text leading-relaxed">
                {currentStep.content}
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
              </div>
            </div>
          </motion.div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 px-4 py-3 rounded-lg border border-success/30 bg-success/5 flex items-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(152 76% 50%)" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <div>
              <div className="text-success font-medium text-sm">Task complete</div>
              <div className="text-text-muted text-xs mt-0.5">All {scenario.steps.length} steps executed. Artifact ready.</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function StepBadge({ type }: { type: 'thought' | 'tool' | 'output' | 'log' }) {
  const styles = {
    thought: 'bg-accent/15 text-accent border-accent/30',
    tool: 'bg-primary/15 text-primary border-primary/30',
    output: 'bg-success/15 text-success border-success/30',
    log: 'bg-warning/15 text-warning border-warning/30',
  } as const;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${styles[type]}`}>
      {type}
    </span>
  );
}
