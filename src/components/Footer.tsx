import React from 'react';
import { Rocket, FileCode, Heart, Globe, ExternalLink } from 'lucide-react';
import { APP_DOWNLOADS } from '../data/marsData';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs font-mono">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600/30 border border-orange-500/40 flex items-center justify-center">
              <Rocket size={16} className="text-orange-400" />
            </div>
            <span className="text-sm font-black tracking-widest text-white">ATLAS<span className="text-orange-500">X</span></span>
          </div>

          <p className="text-slate-400 text-xs max-w-md leading-relaxed">
            AtlasX – An Advanced Planetary Exploration, Surface Intelligence and Mission Planning Platform.
          </p>

          <div className="text-[11px] text-slate-500">
            Open-source planetary surface software for educational, cartographic, and mission architecture research.
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <div className="text-white font-bold uppercase text-[11px] tracking-wider mb-2">Platform</div>
          <div><a href="#overview" className="hover:text-white transition-colors">Mission Overview</a></div>
          <div><a href="#streams" className="hover:text-white transition-colors">4 Planetary Streams</a></div>
          <div><a href="#console" className="hover:text-white transition-colors">Live Web Console</a></div>
          <div><a href="#downloads" className="hover:text-white transition-colors">Windows Desktop Downloads</a></div>
          <div><a href="#science" className="hover:text-white transition-colors">Data Attribution</a></div>
        </div>

        {/* Downloads & Source */}
        <div className="space-y-2">
          <div className="text-white font-bold uppercase text-[11px] tracking-wider mb-2">Resources</div>
          <div>
            <a href={APP_DOWNLOADS.installer.downloadUrl} download className="hover:text-white transition-colors">
              Windows Installer ({APP_DOWNLOADS.installer.fileSizeMb})
            </a>
          </div>
          <div>
            <a href={APP_DOWNLOADS.portable.downloadUrl} download className="hover:text-white transition-colors">
              Portable Executable ({APP_DOWNLOADS.portable.fileSizeMb})
            </a>
          </div>
          <div>
            <a href={APP_DOWNLOADS.sourceCode.downloadUrl} download className="hover:text-white transition-colors">
              Source Code ZIP ({APP_DOWNLOADS.sourceCode.fileSizeMb})
            </a>
          </div>
          <div>
            <a href="https://trek.nasa.gov/mars/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              NASA Mars Trek <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
        <div>© 2026 AtlasX Platform · MIT License · Open Educational &amp; Research Platform</div>
        <div className="flex items-center gap-1">
          <span>Areoid IAU 2000 Datum · Sol 4</span>
        </div>
      </div>
    </footer>
  );
}
