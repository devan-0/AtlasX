import React from 'react';
import { Map, Camera, Heart, ShieldCheck, ExternalLink, ArrowRight, Activity, Compass } from 'lucide-react';

export default function FourStreams() {
  const streams = [
    {
      id: 'topographical',
      title: 'Topographical Stream',
      category: 'GIS / WMTS Cartography',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      icon: Map,
      description: 'Ingests global digital terrain models and surface imagery via USGS Astrogeology and NASA Mars Trek pipelines, including MOLA elevation (463 m/px) and Viking true-color mosaics (232 m/px).',
      specifications: [
        'MOLA 128 PPD Digital Elevation Models',
        'Viking MDIM 2.1 controlled surface mosaic',
        'THEMIS Day & Night thermal infrared layers',
        'Areoid IAU 2000 reference datum coordinates',
      ],
      linkText: 'USGS Astrogeology Mars Maps',
      linkUrl: 'https://astrogeology-usgs.hub.arcgis.com/pages/interactive-maps-mars',
    },
    {
      id: 'geological',
      title: 'Geological Stream',
      category: 'Mars 2020 & Curiosity Outcrops',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      icon: Camera,
      description: 'Synchronizes multi-spectral outcrop feeds and rover sample-caching operations derived from the Mars 2020 Perseverance and Curiosity missions across Jezero and Gale craters.',
      specifications: [
        'Mastcam-Z multispectral stereo panoramic feeds',
        'SuperCam Remote Micro-Imager (RMI) & LIBS spectra',
        'SHERLOC & PIXL fine-scale elemental maps',
        'Hermetically sealed sample tube depot caching workflow',
      ],
      linkText: 'Mars 2020 Raw Image Feeds',
      linkUrl: 'https://mars.nasa.gov/mars2020/multimedia/raw-images/',
    },
    {
      id: 'physiological',
      title: 'Physiological Stream',
      category: '0.38g Astronaut Biometrics',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      icon: Heart,
      description: 'Computes real-time metabolic power expenditure and oxygen depletion rates using the Pandolf-Margaria model adapted for Martian surface gravity (0.38g) with suited extravehicular load.',
      specifications: [
        'Pandolf-Margaria 0.38g metabolic cost modeling',
        'VO2 oxygen consumption rate per traverse segment',
        'Mandatory 30-minute reserve life-support buffer',
        'Autonomous Point of No Return (PNR) turnaround margin',
      ],
      linkText: 'Pandolf 0.38g Biometric Specifications',
      linkUrl: '#console',
    },
    {
      id: 'meteorological',
      title: 'Meteorological Stream',
      category: 'MEDA & InSight Environmental Telemetry',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      icon: ShieldCheck,
      description: 'Correlates dust optical depth (tau), wind shear abrasion, and cryogenic extremes using telemetry derived from Mars Environmental Dynamics Analyzer (MEDA) and InSight APSS.',
      specifications: [
        'Koschmieder dust visibility attenuation modeling',
        'Diurnal cryogenic temperature swings (-115°C to -10°C)',
        'Thermal suit heating compensation power draw (Watts)',
        'Dynamic EVA Go / Caution / No-Go safety matrix',
      ],
      linkText: 'NASA Worldview Planetary Framework',
      linkUrl: 'https://worldview.earthdata.nasa.gov/',
    },
  ];

  return (
    <section id="streams" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Activity size={13} className="text-orange-400" />
          <span>Core Mission Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mb-4">
          Four Open Planetary Data Streams
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          AtlasX synergizes topographical, geological, physiological, and meteorological data into a unified, high-integrity planetary intelligence engine.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams.map((stream) => {
          const Icon = stream.icon;
          return (
            <div
              key={stream.id}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-950/70 backdrop-blur-xl border ${stream.borderColor} shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stream.bgColor} border ${stream.borderColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stream.color}`} />
                  </div>
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full ${stream.bgColor} ${stream.color} border ${stream.borderColor}`}>
                    {stream.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-mono text-white mb-2">{stream.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">{stream.description}</p>

                {/* Bullet Points */}
                <ul className="space-y-2 mb-6">
                  {stream.specifications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${stream.color}`} style={{ backgroundColor: 'currentColor' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={stream.linkUrl}
                  target={stream.linkUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className={`text-xs font-mono font-semibold ${stream.color} hover:underline flex items-center gap-1.5`}
                >
                  <span>{stream.linkText}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
