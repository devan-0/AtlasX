import React from 'react';
import { Download, ShieldCheck, HardDrive, FileCode, CheckCircle2, Monitor, Cpu, Sparkles } from 'lucide-react';
import { APP_DOWNLOADS } from '../data/marsData';
import { sound } from '../utils/audio';

export default function Downloads() {
  return (
    <section id="downloads" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Download size={13} className="text-emerald-400" />
          <span>Standalone Desktop Distribution</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mb-4">
          Download AtlasX for Windows
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Experience full offline planetary mapping, hardware-accelerated 3D terrain rendering, and local high-precision astronomical telemetry.
        </p>
      </div>

      {/* Download Packages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Windows Installer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-orange-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-orange-500/60 transition-all">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Recommended
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-orange-400" />
            </div>

            <h3 className="text-xl font-bold font-mono text-white mb-1">Windows Installer</h3>
            <div className="text-xs font-mono text-orange-400 mb-4">{APP_DOWNLOADS.installer.fileSizeMb} · NSIS Setup</div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Full desktop installer with automatic desktop shortcuts, start menu integration, and smooth uninstaller.
            </p>

            <ul className="space-y-2 mb-6 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                <span>Full offline MOLA &amp; Viking tiles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                <span>Hardware-accelerated 3D Terrain</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                <span>Digitally signed (Authenticode SHA-256)</span>
              </li>
            </ul>
          </div>

          <a
            href={APP_DOWNLOADS.installer.downloadUrl}
            download={APP_DOWNLOADS.installer.fileName}
            onClick={() => sound.playChime()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-950/50 hover:shadow-orange-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Download Installer ({APP_DOWNLOADS.installer.fileSizeMb})</span>
          </a>
        </div>

        {/* Card 2: Portable Executable */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between hover:border-white/25 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-4">
              <HardDrive className="w-6 h-6 text-cyan-400" />
            </div>

            <h3 className="text-xl font-bold font-mono text-white mb-1">Portable Executable</h3>
            <div className="text-xs font-mono text-cyan-400 mb-4">{APP_DOWNLOADS.portable.fileSizeMb} · Standalone Single-file</div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Zero installation required. Run directly from a USB drive or local disk without administrative privileges.
            </p>

            <ul className="space-y-2 mb-6 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                <span>Runs without setup / installation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                <span>Self-contained Electron runtime</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                <span>Digitally signed Authenticode package</span>
              </li>
            </ul>
          </div>

          <a
            href={APP_DOWNLOADS.portable.downloadUrl}
            download={APP_DOWNLOADS.portable.fileName}
            onClick={() => sound.playClick()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Download Portable ({APP_DOWNLOADS.portable.fileSizeMb})</span>
          </a>
        </div>

        {/* Card 3: Source Code Archive */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between hover:border-white/25 transition-all">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-4">
              <FileCode className="w-6 h-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-bold font-mono text-white mb-1">Source Code Archive</h3>
            <div className="text-xs font-mono text-purple-400 mb-4">{APP_DOWNLOADS.sourceCode.fileSizeMb} · ZIP Archive</div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Complete clean source code repository containing Vite React frontend, Electron main process, and Python telemetry service.
            </p>

            <ul className="space-y-2 mb-6 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0" />
                <span>Clean TypeScript &amp; Python sources</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0" />
                <span>Automated build scripts (Build-Desktop.ps1)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0" />
                <span>Vitest test suites with 55 unit tests</span>
              </li>
            </ul>
          </div>

          <a
            href={APP_DOWNLOADS.sourceCode.downloadUrl}
            download={APP_DOWNLOADS.sourceCode.fileName}
            onClick={() => sound.playClick()}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 active:scale-95 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Download ZIP ({APP_DOWNLOADS.sourceCode.fileSizeMb})</span>
          </a>
        </div>
      </div>

      {/* Security & Authenticode Verification Badge */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={20} className="text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">Authenticode Code Signing Verified</div>
            <div className="text-slate-400 text-[11px]">
              Certificate: <strong className="text-emerald-400">CN=AtlasX Code Signing</strong> (SHA-256) · Tamper-proof packaging
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span>Windows 10 / 11 (64-bit)</span>
          <span>·</span>
          <span>WebGL 2.0 Ready</span>
        </div>
      </div>
    </section>
  );
}
