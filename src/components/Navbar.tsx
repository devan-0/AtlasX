import React from 'react';
import { Rocket, Sun, Moon, Volume2, VolumeX, Download, Play, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  theme: 'dark' | 'bright';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navbar({ theme, onToggleTheme, soundEnabled, onToggleSound }: NavbarProps) {
  const isBright = theme === 'bright';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors select-none ${
      isBright
        ? 'bg-white/90 border-slate-200 text-slate-800 shadow-sm'
        : 'bg-[#060a12]/85 border-white/10 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-orange-600/25 border border-orange-500/40 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Rocket size={18} className="text-orange-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <div className={`text-base font-black tracking-[0.2em] font-mono leading-none ${isBright ? 'text-slate-900' : 'text-white'}`}>
              ATLAS<span className="text-orange-500">X</span>
            </div>
            <div className="text-[9px] font-mono font-semibold tracking-wider text-slate-400 leading-none mt-1">
              SURFACE INTELLIGENCE
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-semibold">
          <a href="#overview" className="text-slate-300 hover:text-orange-400 transition-colors">Overview</a>
          <a href="#streams" className="text-slate-300 hover:text-orange-400 transition-colors">4 Planetary Streams</a>
          <a href="#console" className="text-slate-300 hover:text-orange-400 transition-colors">Live Web Console</a>
          <a href="#downloads" className="text-slate-300 hover:text-orange-400 transition-colors">Downloads</a>
          <a href="#science" className="text-slate-300 hover:text-orange-400 transition-colors">Data Attribution</a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            type="button"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable audio feedback'}
            aria-label="Toggle audio"
          >
            {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} className="text-slate-400" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => {
              onToggleTheme();
              sound.playClick();
            }}
            type="button"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isBright ? 'Switch to Dark Mode' : 'Switch to Bright Mode'}
            aria-label="Toggle theme"
          >
            {isBright ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-400" />}
          </button>

          {/* Download App Button CTA */}
          <a
            href="#downloads"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-950/40 hover:shadow-orange-500/20 active:scale-95 transition-all"
          >
            <Download size={13} />
            <span>Download App</span>
          </a>
        </div>
      </div>
    </header>
  );
}
