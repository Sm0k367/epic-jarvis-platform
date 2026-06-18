import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-radial-glow-accent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      {/* Animated grid overlay that pulses */}
      <motion.div
        className="absolute inset-0 bg-grid-fine opacity-20"
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(188 96% 55% / 0.2), transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(265 92% 67% / 0.18), transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-text-muted">v1.0 · production-ready</span>
          <span className="text-text-faint">/</span>
          <span className="text-text">64 skills loaded</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight mb-6"
        >
          Just A Really{' '}
          <span className="text-gradient">Very Intelligent</span>{' '}
          System.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg lg:text-xl text-text-muted mb-10 leading-relaxed"
        >
          An AI agent that ships work, not suggestions. Powered by SOTA models. 64 skills, real tools, live now.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#chat"
            className="group inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-gradient-to-br from-primary to-accent text-bg font-semibold text-sm hover:shadow-glow transition-all duration-300"
          >
            Talk to JARVIS now
            <svg className="group-hover:translate-x-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#skills"
            className="inline-flex items-center gap-2 px-6 h-12 rounded-lg glass text-text font-medium text-sm hover:bg-surface-offset transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Explore capabilities
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden max-w-3xl mx-auto"
        >
          {[
            { v: 'SOTA', l: 'GPT-OSS-120B · Llama 4 · 70B' },
            { v: '64', l: 'skills loaded on demand' },
            { v: '10', l: 'core tools wired in' },
            { v: '<60s', l: 'Vercel deploy time' },
          ].map((s) => (
            <div key={s.l} className="bg-bg p-5 text-center">
              <div className="font-mono text-2xl lg:text-3xl text-gradient font-semibold">{s.v}</div>
              <div className="text-xs text-text-muted mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-text-faint"
        >
          <span>built with</span>
          {['TypeScript', 'React', 'Vite', 'Tailwind', 'Framer Motion', 'Edge Functions'].map((t) => (
            <span key={t} className="px-2 py-1 rounded border border-border bg-surface/40">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
