import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
          <Shield size={14} className="text-orange-400" />
          <span>Compliance &amp; Research Affiliation Notice</span>
        </div>

        <p className="text-sm font-semibold text-white max-w-3xl mx-auto">
          AtlasX is an independent educational and research project. It is not affiliated with, endorsed by, or officially associated with NASA or any other space agency.
        </p>

        <p className="text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto">
          AtlasX is developed as an educational demonstration and scientific exploration platform. Scientific models and datasets marked as SIMULATED are synthetic. No routes, metabolic rates, or landing scores are certified for operational human spaceflight.
        </p>
      </div>
    </section>
  );
}
