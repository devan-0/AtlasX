import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FourStreams from './components/FourStreams';
import InteractiveConsole from './components/InteractiveConsole';
import Downloads from './components/Downloads';
import ScienceAttribution from './components/ScienceAttribution';
import DisclaimerBanner from './components/DisclaimerBanner';
import Footer from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'bright'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (theme === 'bright') {
      document.documentElement.classList.add('bright');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('bright');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'bright' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sound.enabled = next;
      return next;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'bright'
        ? 'bg-slate-50 text-slate-900'
        : 'bg-[#060a12] text-slate-100'
    }`}>
      {/* Background Subtle Planetary Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[120px]" />
        <div className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        <main className="flex-1">
          <Hero />
          <FourStreams />
          <InteractiveConsole />
          <Downloads />
          <ScienceAttribution />
          <DisclaimerBanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}
