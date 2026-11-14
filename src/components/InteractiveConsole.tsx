import React, { useState, useEffect, useRef } from 'react';
import {
  Map as MapIcon,
  Activity,
  Wind,
  Layers,
  Heart,
  Compass,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { MARS_LANDMARKS, MarsLandmark, OUTCROP_FEEDS } from '../data/marsData';
import { computeBiometrics, BiometricsInput } from '../utils/biometrics';
import { assessWeather, WeatherInput } from '../utils/weather';
import { calculateMarsClock, MarsClockState } from '../utils/marsTime';
import { sound } from '../utils/audio';

export default function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState<'map' | 'biometrics' | 'weather' | 'outcrops'>('map');
  const [clock, setClock] = useState<MarsClockState>(calculateMarsClock());

  // Real-time clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setClock(calculateMarsClock());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Map state
  const [selectedBasemap, setSelectedBasemap] = useState<'mola' | 'viking' | 'themis'>('mola');
  const [activeLandmark, setActiveLandmark] = useState<MarsLandmark>(MARS_LANDMARKS[0]);

  // Biometrics simulation state
  const [bioInput, setBioInput] = useState<BiometricsInput>({
    massKg: 195,
    speedMps: 1.1,
    slopePercent: 3,
    terrainFactor: 1.2,
    oxygenSupplyL: 1200,
  });
  const bioResult = computeBiometrics(bioInput);

  // Weather simulation state
  const [weatherInput, setWeatherInput] = useState<WeatherInput>({
    tau: 0.6,
    windSpeedMps: 9.5,
    temperatureC: -62,
    uvIndex: 4,
  });
  const weatherResult = assessWeather(weatherInput);

  const basemapImages: Record<string, string> = {
    mola: '/basemaps/mars_mola_color_global.jpg',
    viking: '/basemaps/mars_viking_global.jpg',
    themis: '/basemaps/mars_mola_themis_global.jpg',
  };

  return (
    <section id="console" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Activity size={13} className="text-cyan-400 animate-pulse" />
          <span>Interactive Surface Explorer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mb-4">
          Live Planetary Mission Console
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Test real-time Martian clock calculations, 0.38g metabolic expenditure, Koschmieder dust visibility, and planetary cartography directly in your browser.
        </p>
      </div>

      {/* Main Console Box */}
      <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* Console Top Toolbar */}
        <div className="border-b border-white/10 bg-slate-900/60 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          {/* Sub-tab Switchers */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { setActiveTab('map'); sound.playClick(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'map'
                  ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(255,87,34,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapIcon size={14} /> 2D Atlas
            </button>

            <button
              onClick={() => { setActiveTab('biometrics'); sound.playClick(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'biometrics'
                  ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart size={14} /> 0.38g Biometrics
            </button>

            <button
              onClick={() => { setActiveTab('weather'); sound.playClick(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'weather'
                  ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck size={14} /> Weather Hazards
            </button>

            <button
              onClick={() => { setActiveTab('outcrops'); sound.playClick(); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'outcrops'
                  ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers size={14} /> Mars 2020 Outcrops
            </button>
          </div>

          {/* Real-time Clock Strip */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span className="hidden md:inline text-slate-400">Airy-0 Meridian:</span>
            <span className="text-orange-400 font-bold">{clock.msdFormatted}</span>
            <span className="text-slate-500">·</span>
            <span className="text-amber-300 font-bold">{clock.mtcFormatted} MTC</span>
          </div>
        </div>

        {/* Tab 1: 2D Interactive Map */}
        {activeTab === 'map' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Canvas with Basemap Switcher */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group">
                <img
                  src={basemapImages[selectedBasemap]}
                  alt="Mars Basemap"
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Coordinate Graticule Overlay */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20% 20%',
                  }}
                />

                {/* Interactive Site Pins */}
                {MARS_LANDMARKS.map((site) => {
                  // Approximate pixel positioning on equirectangular map projection
                  const leftPct = ((site.lon % 360) / 360) * 100;
                  const topPct = ((90 - site.lat) / 180) * 100;
                  const isSelected = activeLandmark.id === site.id;

                  return (
                    <button
                      key={site.id}
                      onClick={() => { setActiveLandmark(site); sound.playClick(); }}
                      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin transition-transform ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: site.highlightColor }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-lg"
                          style={{ backgroundColor: site.highlightColor }}
                        />
                      </span>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/pin:block whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white border border-white/20">
                        {site.name}
                      </span>
                    </button>
                  );
                })}

                {/* Floating Map Controls */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs font-mono">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold px-2">Basemap:</span>
                  <button
                    onClick={() => setSelectedBasemap('mola')}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      selectedBasemap === 'mola' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    MOLA Elevation
                  </button>
                  <button
                    onClick={() => setSelectedBasemap('viking')}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      selectedBasemap === 'viking' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Viking Mosaic
                  </button>
                  <button
                    onClick={() => setSelectedBasemap('themis')}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      selectedBasemap === 'themis' ? 'bg-purple-500 text-white' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    THEMIS IR
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Landmark Sidebar Info */}
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-orange-400 text-xs font-mono font-semibold uppercase mb-1">
                  <Compass size={14} /> Landmark Inspector
                </div>
                <h3 className="text-xl font-bold font-mono text-white mb-1">{activeLandmark.name}</h3>
                <div className="text-xs font-mono text-cyan-300 mb-3">
                  {Math.abs(activeLandmark.lat)}°{activeLandmark.lat >= 0 ? 'N' : 'S'}, {Math.abs(activeLandmark.lon)}°{activeLandmark.lon >= 0 ? 'E' : 'W'} · {activeLandmark.elevationM} m
                </div>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px] uppercase">Terrain Classification</span>
                    <span className="font-medium text-slate-200">{activeLandmark.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px] uppercase">Geological Context</span>
                    <p className="mt-0.5">{activeLandmark.description}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono block text-[10px] uppercase">Exploration Priority</span>
                    <span className="font-semibold text-emerald-300">{activeLandmark.scientificValue}</span>
                  </div>
                </div>
              </div>

              <a
                href="https://trek.nasa.gov/mars/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cyan-400 text-xs font-mono font-semibold transition-all"
              >
                Inspect in NASA Mars Trek <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: 0.38g Biometrics & PNR Calculator */}
        {activeTab === 'biometrics' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-2 space-y-5 bg-slate-900/40 p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Sliders size={16} className="text-amber-400" /> Astronaut &amp; Suit Parameters
                </span>
                <span className="text-[11px] font-mono text-slate-400">Pandolf-Margaria (0.38g modified)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Mass slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Astronaut + Suit Mass:</span>
                    <span className="text-amber-300 font-bold">{bioInput.massKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="240"
                    step="5"
                    value={bioInput.massKg}
                    onChange={(e) => setBioInput({ ...bioInput, massKg: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>120 kg (Light EMU)</span>
                    <span>240 kg (Heavy Surface)</span>
                  </div>
                </div>

                {/* Speed slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Traverse Speed:</span>
                    <span className="text-amber-300 font-bold">{bioInput.speedMps} m/s ({(bioInput.speedMps * 3.6).toFixed(1)} km/h)</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={bioInput.speedMps}
                    onChange={(e) => setBioInput({ ...bioInput, speedMps: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.5 m/s (Cautious)</span>
                    <span>2.0 m/s (Brisk Trot)</span>
                  </div>
                </div>

                {/* Slope slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Terrain Slope:</span>
                    <span className="text-amber-300 font-bold">{bioInput.slopePercent}% grade</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="25"
                    step="1"
                    value={bioInput.slopePercent}
                    onChange={(e) => setBioInput({ ...bioInput, slopePercent: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>-15% (Descent)</span>
                    <span>+25% (Steep Ridge)</span>
                  </div>
                </div>

                {/* O2 tank slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Tank O2 Capacity:</span>
                    <span className="text-amber-300 font-bold">{bioInput.oxygenSupplyL} Liters</span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="1800"
                    step="50"
                    value={bioInput.oxygenSupplyL}
                    onChange={(e) => setBioInput({ ...bioInput, oxygenSupplyL: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>600 L (Compact)</span>
                    <span>1800 L (Extended EVA)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Output Telemetry */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-3">
                  Physiological EVA Telemetry
                </span>

                <div className="space-y-4">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">METABOLIC EXPENDITURE</div>
                    <div className="text-2xl font-black font-mono text-amber-300">{bioResult.metabolicPowerWatts} W</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">VO2 Rate: {bioResult.vo2LPerMin} L/min ({bioResult.o2DepletionRateLph} L/h)</div>
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">POINT OF NO RETURN (PNR)</div>
                    <div className="text-2xl font-black font-mono text-cyan-300">{bioResult.turnaroundTimeHours} Hours</div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Includes 30-min mandatory safety buffer</div>
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">SAFE OPERATIONAL RADIUS</div>
                    <div className="text-2xl font-black font-mono text-white">{bioResult.safeRadiusKm} km</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">Max Out-and-Back: {bioResult.maxDistanceKm} km</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Fatigue Index:</span>
                <span className={`uppercase font-bold ${
                  bioResult.fatigueIndex === 'low' ? 'text-emerald-400' :
                  bioResult.fatigueIndex === 'moderate' ? 'text-amber-400' : 'text-red-400'
                }`}>{bioResult.fatigueIndex}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Weather Hazards & Koschmieder Law */}
        {activeTab === 'weather' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5 bg-slate-900/40 p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Wind size={16} className="text-emerald-400" /> Atmospheric &amp; Dust Ingestion
                </span>
                <span className="text-[11px] font-mono text-slate-400">InSight APSS &amp; MEDA Models</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Tau slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Dust Optical Depth (tau):</span>
                    <span className="text-emerald-300 font-bold">{weatherInput.tau.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.5"
                    step="0.1"
                    value={weatherInput.tau}
                    onChange={(e) => setWeatherInput({ ...weatherInput, tau: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.2 (Clear)</span>
                    <span>3.5 (Global Storm)</span>
                  </div>
                </div>

                {/* Wind slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Surface Wind Speed:</span>
                    <span className="text-emerald-300 font-bold">{weatherInput.windSpeedMps} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={weatherInput.windSpeedMps}
                    onChange={(e) => setWeatherInput({ ...weatherInput, windSpeedMps: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>1 m/s (Gentle)</span>
                    <span>30 m/s (Gale-force)</span>
                  </div>
                </div>

                {/* Temperature slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Ambient Surface Temp:</span>
                    <span className="text-emerald-300 font-bold">{weatherInput.temperatureC} °C</span>
                  </div>
                  <input
                    type="range"
                    min="-110"
                    max="-10"
                    step="2"
                    value={weatherInput.temperatureC}
                    onChange={(e) => setWeatherInput({ ...weatherInput, temperatureC: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>-110 °C (Cryogenic)</span>
                    <span>-10 °C (Summer Noon)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Output Telemetry */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-3">
                  Environmental Assessment
                </span>

                <div className="space-y-4">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">KOSCHMIEDER OPTICAL VISIBILITY</div>
                    <div className="text-2xl font-black font-mono text-cyan-300">{weatherResult.visibilityKm} km</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">Atmospheric dust scattering attenuation</div>
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">THERMAL SUIT HEATING LOAD</div>
                    <div className="text-2xl font-black font-mono text-amber-300">+{weatherResult.thermalHeatingPenaltyWatts} W</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">Cryogenic resistance power compensation</div>
                  </div>

                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400">EVA OPERATIONAL STATUS</div>
                    <div className={`text-2xl font-black font-mono ${
                      weatherResult.evaStatus === 'GO' ? 'text-emerald-400' :
                      weatherResult.evaStatus === 'CAUTION' ? 'text-amber-400' : 'text-red-500'
                    }`}>
                      {weatherResult.evaStatus}
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1 leading-snug">{weatherResult.statusReason}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Mars 2020 Raw Outcrop Streams */}
        {activeTab === 'outcrops' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OUTCROP_FEEDS.map((outcrop) => (
                <div key={outcrop.id} className="bg-slate-900/60 rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="h-44 overflow-hidden relative group">
                      <img
                        src={outcrop.imageUrl}
                        alt={outcrop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback placeholder image if external raw feed is rate-limited
                          (e.target as HTMLImageElement).src = '/basemaps/mars_mola_color_global.jpg';
                        }}
                      />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/10">
                        Sol {outcrop.sol}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-white/10">
                        {outcrop.instrument}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-sm text-white font-mono">{outcrop.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{outcrop.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-[11px] font-mono border-t border-white/5">
                    <span className="text-slate-400">Sample Tube:</span>
                    <span className="text-purple-300 font-semibold uppercase">{outcrop.sampleStatus.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-2">
              <span>Open Planetary Feeds: Mastcam-Z, SuperCam LIBS, SHERLOC WATSON</span>
              <a
                href="https://mars.nasa.gov/mars2020/multimedia/raw-images/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Access NASA Mars 2020 Raw Image Archive <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
