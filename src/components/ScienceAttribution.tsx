import React from 'react';
import { ExternalLink, Database, Globe, Compass, BookOpen } from 'lucide-react';

export default function ScienceAttribution() {
  const sources = [
    {
      name: 'NASA Mars Trek',
      provider: 'NASA Solar System Treks Project',
      role: 'Global Mars WMTS cartographic tile layers, HiRISE DTMs, and nomenclature queries.',
      url: 'https://trek.nasa.gov/mars/',
    },
    {
      name: 'USGS Astrogeology Mars Maps',
      provider: 'U.S. Geological Survey Astrogeology Science Center',
      role: 'Standardized GIS map layers, MOLA 128 PPD elevation basemaps, and MDIM 2.1 Viking true-color mosaics.',
      url: 'https://astrogeology-usgs.hub.arcgis.com/pages/interactive-maps-mars',
    },
    {
      name: 'NASA Mars 2020 Raw Image Feeds',
      provider: 'NASA / JPL-Caltech / MSSS / LANL',
      role: 'Mastcam-Z multispectral imaging, SuperCam LIBS remote micro-imaging, and sample tube depot caching status.',
      url: 'https://mars.nasa.gov/mars2020/multimedia/raw-images/',
    },
    {
      name: 'NASA Worldview Earth & Planetary',
      provider: 'NASA Earth Science Data and Information System (ESDIS)',
      role: 'Framework methodologies for responsive temporal time-series mapping and planetary layers.',
      url: 'https://worldview.earthdata.nasa.gov/',
    },
    {
      name: 'JPL Horizons Ephemeris DE441',
      provider: 'NASA Jet Propulsion Laboratory Solar System Dynamics',
      role: 'Real-time high-precision orbital ephemeris, areocentric solar longitude (Ls), and solar flux modeling.',
      url: 'https://ssd.jpl.nasa.gov/horizons/',
    },
    {
      name: 'NASA InSight APSS & MEDA',
      provider: 'NASA PDS Geosciences Node / CAB (Centro de Astrobiología)',
      role: 'In-situ Martian surface meteorology: optical depth (tau), diurnal cryogenic swings, and wind shear.',
      url: 'https://pds-geosciences.wustl.edu/',
    },
  ];

  return (
    <section id="science" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Database size={13} className="text-cyan-400" />
          <span>Open Planetary Data Frameworks</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mb-4">
          Data Source Attributions &amp; Scientific Pipelines
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          AtlasX is built upon open planetary science pipelines and publicly accessible data archives. We gratefully acknowledge the planetary science community for making these data streams publicly available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-white font-mono">{item.name}</h4>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  title="Visit data source"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="text-[11px] font-mono text-cyan-300 font-semibold mb-2">{item.provider}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.role}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Public Domain / Open Data</span>
              <span className="text-emerald-400 font-semibold">Active Pipeline</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
