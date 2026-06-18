import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Open Source',
    price: '$0',
    period: 'forever',
    description: 'Self-host JARVIS. MIT licensed. Yours forever.',
    features: [
      'All 64 skills',
      'All core tools',
      'Unlimited sessions',
      'Community support',
      'Deploy anywhere',
    ],
    cta: 'View on GitHub',
  },
  {
    name: 'Cloud',
    price: '$29',
    period: '/ month',
    description: 'Hosted JARVIS. Zero infrastructure. Scale to zero.',
    features: [
      'Everything in Open Source',
      'Managed cloud runtime',
      '100 hours / month compute',
      'Email support',
      'Edge-deployed',
      '99.9% SLA',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'VPC deployment, SSO, audit logs, dedicated support.',
    features: [
      'Everything in Cloud',
      'VPC or on-prem',
      'SSO + SCIM',
      'SOC2 + audit logs',
      'Dedicated success engineer',
      'Custom skills',
    ],
    cta: 'Contact sales',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase mb-4">// Pricing</p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-tight mb-6">
            Start free.{' '}
            <span className="text-gradient">Scale when ready.</span>
          </h2>
          <p className="text-lg text-text-muted">
            Open source at the core. Managed cloud when you want it. Enterprise when you need it.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-surface-offset to-surface border-2 border-primary/40 glow'
                  : 'bg-surface border border-border'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-bg text-xs font-semibold">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl mb-2">{tier.name}</h3>
                <p className="text-sm text-text-muted min-h-[3em]">{tier.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl">{tier.price}</span>
                  <span className="text-text-muted text-sm">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className="text-primary shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block text-center py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                  tier.highlight
                    ? 'bg-gradient-to-br from-primary to-accent text-bg hover:opacity-90'
                    : 'bg-bg border border-border text-text hover:bg-surface-offset'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
