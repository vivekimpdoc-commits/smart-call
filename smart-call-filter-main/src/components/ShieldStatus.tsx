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
    <div id="shield-status-card" className="flex flex-col items-center justify-center py-6 px-4 space-y-6 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl shadow-xl transition-all duration-300">
      
      {/* Central Interactive Shield Circle Button */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow rings */}
        <div className={`absolute rounded-full transition-all duration-700 ${
          isEnabled 
            ? 'w-36 h-36 bg-indigo-500/10 animate-ping opacity-60' 
            : 'w-0 h-0 opacity-0'
        }`} />
        <div className={`absolute rounded-full transition-all duration-700 ${
          isEnabled 
            ? 'w-32 h-32 bg-indigo-500/25 blur-xl opacity-80' 
            : 'w-0 h-0 opacity-0'
        }`} />

        {/* Main circular button */}
        <button
          type="button"
          onClick={onToggle}
          className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 border-2 ${
            isEnabled
              ? 'bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 border-indigo-400/50 shadow-[0_0_35px_rgba(99,102,241,0.4)] scale-105 hover:scale-110 active:scale-95'
              : 'bg-slate-800/60 border-slate-700 hover:border-slate-650 hover:bg-slate-750/80 hover:scale-105 active:scale-95'
          }`}
        >
          {isEnabled ? (
            <Shield className="w-11 h-11 text-white filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] animate-pulse" />
          ) : (
            <ShieldAlert className="w-11 h-11 text-slate-500" />
          )}
        </button>
      </div>

      {/* Status Label Section */}
      <div className="text-center space-y-1.5 max-w-[280px]">
        <div className="flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${isEnabled ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-rose-500'}`} />
          <h2 className="text-sm font-black text-slate-100 uppercase tracking-wider">
            {isEnabled ? t.shieldActive : t.shieldSuspended}
          </h2>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
          {isEnabled ? t.shieldActiveDesc : t.shieldSuspendedDesc}
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="w-full grid grid-cols-3 gap-2 border-t border-slate-800/60 pt-5">
        {/* Bypassed Stats */}
        <div className="bg-slate-950/45 border border-slate-800/50 rounded-2xl flex flex-col items-center py-2.5 px-1 hover:border-indigo-500/25 hover:bg-indigo-950/5 transition duration-205">
          <div className="p-1 bg-emerald-500/10 rounded-lg mb-1 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-base font-black text-white font-mono leading-none">{allowedCount}</span>
          <span className="text-[7.5px] text-slate-500 uppercase font-bold tracking-wider mt-1">{t.statBypassed}</span>
        </div>

        {/* Screened Stats */}
        <div className="bg-slate-950/45 border border-slate-800/50 rounded-2xl flex flex-col items-center py-2.5 px-1 hover:border-indigo-500/25 hover:bg-indigo-950/5 transition duration-205">
          <div className="p-1 bg-amber-500/10 rounded-lg mb-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-base font-black text-white font-mono leading-none">{screenedCount}</span>
          <span className="text-[7.5px] text-slate-500 uppercase font-bold tracking-wider mt-1">{t.statScreened}</span>
        </div>

        {/* Blocked Stats */}
        <div className="bg-slate-950/45 border border-slate-800/50 rounded-2xl flex flex-col items-center py-2.5 px-1 hover:border-indigo-500/25 hover:bg-indigo-950/5 transition duration-205">
          <div className="p-1 bg-rose-500/10 rounded-lg mb-1 shrink-0">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <span className="text-base font-black text-white font-mono leading-none">{blockedCount}</span>
          <span className="text-[7.5px] text-slate-500 uppercase font-bold tracking-wider mt-1">{t.statBlocked}</span>
        </div>
      </div>

    </div>
  );
}
