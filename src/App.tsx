import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveDemo } from './components/LiveDemo';
import { Skills } from './components/Skills';
import { Architecture } from './components/Architecture';
import { UseCases } from './components/UseCases';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text antialiased">
      <Header />
      <main>
        <Hero />
        <LiveDemo />
        <Skills />
        <Architecture />
        <UseCases />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
