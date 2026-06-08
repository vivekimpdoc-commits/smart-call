import { Shield, ShieldAlert, CheckCircle2, AlertOctagon, Clock } from 'lucide-react';
import { translations } from '../translations';

interface ShieldStatusProps {
  isEnabled: boolean;
  onToggle: () => void;
  allowedCount: number;
  blockedCount: number;
  screenedCount: number;
  language: 'en' | 'hi';
}

export default function ShieldStatus({
  isEnabled, onToggle, allowedCount, blockedCount, screenedCount, language
}: ShieldStatusProps) {
  const t = translations[language];

  return (
    <div id="shield-status-card" className="bg-slate-900/95 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">

      {/* TOP: Shield toggle hero row */}
      <div className={`relative px-5 py-5 flex items-center justify-between gap-4 transition-all duration-500 ${
        isEnabled
          ? 'bg-gradient-to-r from-indigo-600/20 via-indigo-500/10 to-transparent'
          : 'bg-gradient-to-r from-rose-600/10 via-transparent to-transparent'
      }`}>

        {/* Left: Icon + Status text */}
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
            isEnabled
              ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30'
              : 'bg-slate-800 border border-slate-700'
          }`}>
            {isEnabled
              ? <Shield className="w-6 h-6 text-white" />
              : <ShieldAlert className="w-6 h-6 text-slate-400" />
            }
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <h2 className="text-sm font-black text-white leading-none">
                {isEnabled ? t.shieldActive : t.shieldSuspended}
              </h2>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug max-w-[180px]">
              {isEnabled ? t.shieldActiveDesc : t.shieldSuspendedDesc}
            </p>
          </div>
        </div>

        {/* Right: Toggle switch */}
        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 focus:outline-none ${
            isEnabled ? 'bg-indigo-500 border-indigo-400/30' : 'bg-slate-700 border-slate-600'
          }`}
          style={{ width: '52px' }}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 mt-0.5 ml-0.5 ${
            isEnabled ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* BOTTOM: Stats row */}
      <div className="grid grid-cols-3 divide-x divide-slate-800/80 border-t border-slate-800/80">
        <div className="flex flex-col items-center py-3 gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-lg font-black text-white font-mono leading-none">{allowedCount}</span>
          <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">{t.statBypassed}</span>
        </div>
        <div className="flex flex-col items-center py-3 gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-lg font-black text-white font-mono leading-none">{screenedCount}</span>
          <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">{t.statScreened}</span>
        </div>
        <div className="flex flex-col items-center py-3 gap-1">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-lg font-black text-white font-mono leading-none">{blockedCount}</span>
          <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider">{t.statBlocked}</span>
        </div>
      </div>

    </div>
  );
}
