import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].name);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// Capability surface</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            64 skills.{' '}
            <span className="text-gradient">One platform.</span>
          </h2>
          <p className="text-lg text-text-muted">
            Every skill is a battle-tested workflow — the kind of thing you'd write a 50-page SOP for. JARVIS loads them on demand, follows them faithfully, and ships the output.
          </p>
        </div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-8">
          {/* Category nav */}
          <div className="space-y-1.5">
            {skillCategories.map((cat) => {
              const isActive = active === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(cat.name)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-surface-offset text-text border border-primary/30'
                      : 'text-text-muted hover:bg-surface-2 hover:text-text border border-transparent'
                  }`}
                >
                  <span className="text-sm font-medium">{cat.name}</span>
                  <span className={`text-xs font-mono ${isActive ? 'text-primary' : 'text-text-faint'}`}>
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skills grid */}
          {skillCategories
            .filter((c) => c.name === active)
            .map((cat) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="group p-5 rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-surface-offset transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <code className="text-[10px] font-mono text-text-faint bg-bg px-1.5 py-0.5 rounded">
                        {skill.name}
                      </code>
                    </div>
                    <p className="text-sm text-text leading-relaxed">{skill.description}</p>
                  </motion.div>
                ))}
                {/* Plus more card */}
                <div className="p-5 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-center min-h-[140px]">
                  <div className="text-2xl mb-2 text-text-faint">+</div>
                  <div className="text-xs text-text-muted">More added weekly</div>
                  <a href="#" className="mt-3 text-xs text-primary hover:underline">
                    Request a skill →
                  </a>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
