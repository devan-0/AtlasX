import React, { useEffect, useState } from 'react';
import { Rocket, Download, Play, Sparkles, ChevronRight, Compass, Shield, Clock, Globe } from 'lucide-react';
import MarsGlobe3D from './MarsGlobe3D';
import { calculateMarsClock, MarsClockState } from '../utils/marsTime';
import { MARS_LANDMARKS, MarsLandmark, APP_DOWNLOADS } from '../data/marsData';
import { sound } from '../utils/audio';

export default function Hero() {
  const [clock, setClock] = useState<MarsClockState>(calculateMarsClock());
  const [selectedLandmark, setSelectedLandmark] = useState<MarsLandmark>(MARS_LANDMARKS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(calculateMarsClock());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* ── Real-Time Orbital Telemetry HUD ── */}
      <div className="mb-8 w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Earth UTC</span>
            <span className="font-bold text-blue-400 text-sm truncate">{clock.utcTime}</span>
            <span className="text-[10px] text-slate-500 truncate">{clock.utcDate}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Mars Sol Date</span>
            <span className="font-bold text-orange-400 text-sm truncate">{clock.msdFormatted}</span>
            <span className="text-[10px] text-slate-500 truncate">{clock.marsYearFormatted}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Airy-0 Meridian (MTC)</span>
            <span className="font-bold text-amber-300 text-sm truncate">{clock.mtcFormatted}</span>
            <span className="text-[10px] text-slate-500 truncate">Areocentric Solar</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Solar Longitude (Ls)</span>
            <span className="font-bold text-cyan-300 text-sm truncate">{clock.lsFormatted}</span>
            <span className="text-[10px] text-slate-500 truncate">{clock.season.split('/')[0]}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Heliocentric Distance</span>
            <span className="font-bold text-slate-200 text-sm truncate">{clock.distanceAu.toFixed(3)} AU</span>
            <span className="text-[10px] text-slate-500 truncate">DE441 Ephemeris</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Solar Irradiance</span>
            <span className="font-bold text-amber-400 text-sm truncate">{clock.irradianceWm2.toFixed(1)} W/m²</span>
            <span className="text-[10px] text-slate-500 truncate">Surface Flux</span>
          </div>
        </div>
      </div>

      {/* ── Hero Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Description & Action Buttons */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-200 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Autonomous Surface Cartography &amp; Mission Planning</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            ATLAS<span className="text-orange-500">X</span>
            <span className="block text-xl sm:text-2xl font-bold font-sans text-slate-200 tracking-normal mt-3 leading-snug">
              An Advanced Planetary Exploration, Surface Intelligence and Mission Planning Platform.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Integrates four critical planetary data streams—<strong>Topographical</strong>, <strong>Geological</strong>, <strong>Physiological (0.38g)</strong>, and <strong>Meteorological</strong>—empowering scientists and astronauts with autonomous traverse pathfinding, real-time dust storm hazard assessment, and geological outcrop analysis.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#console"
              onClick={() => sound.playChime()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-mars-600 to-amber-600 hover:from-orange-500 hover:via-mars-500 hover:to-amber-500 shadow-lg shadow-orange-950/50 hover:shadow-orange-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Play size={16} className="fill-white" />
              <span>Launch Web Console</span>
            </a>

            <a
              href="#downloads"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 transition-all"
            >
              <Download size={16} />
              <span>Download Desktop App</span>
            </a>

            <a
              href={APP_DOWNLOADS.sourceCode.downloadUrl}
              download
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-mono text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/40 transition-all"
            >
              <span>Source ZIP ({APP_DOWNLOADS.sourceCode.fileSizeMb})</span>
            </a>
          </div>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 text-[11px] font-mono text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>MOLA 463m/px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>0.38g Biometrics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>InSight/MEDA Feeds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Mars 2020 Caching</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Mars Globe */}
        <div className="lg:col-span-5">
          <MarsGlobe3D
            selectedLandmark={selectedLandmark}
            onSelectLandmark={(site) => setSelectedLandmark(site)}
          />
        </div>
      </div>
    </section>
  );
}
