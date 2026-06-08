import { Shield, ShieldAlert, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
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
  isEnabled, 
  onToggle, 
  allowedCount, 
  blockedCount, 
  screenedCount,
  language
}: ShieldStatusProps) {
  const t = translations[language];

  return (
    <div 
      id="shield-status-card" 
      className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-indigo-950/30 group"
    >
      {/* Background ambient light */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full filter blur-3xl transition-opacity duration-700 pointer-events-none ${
        isEnabled ? 'bg-indigo-500/20 opacity-100' : 'bg-rose-500/15 opacity-70'
      }`} />
      
      {/* Absolute faint grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Main card body */}
      <div className="relative flex flex-col items-center gap-4 z-10 text-center w-full">
        
        {/* Animated Shield Frame */}
        <div className="relative shrink-0 select-none mx-auto mb-1">
          {/* Outer ring glow */}
          <div className={`absolute -inset-2 rounded-2xl opacity-40 transition-all duration-700 ${
            isEnabled 
              ? 'bg-indigo-500/30 scale-100 animate-pulse blur-xs' 
              : 'bg-rose-950/40 scale-95'
          }`} />
          
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 relative border z-10 ${
            isEnabled 
              ? 'bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white border-indigo-400/30 shadow-lg shadow-indigo-500/25' 
              : 'bg-slate-800 text-slate-400 border-slate-700 shadow-sm'
          }`}>
            {isEnabled ? (
              <Shield className="w-8 h-8 text-white drop-shadow-md animate-scale-up" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-slate-400" />
            )}
          </div>

          {/* Glowing bottom-right indicator dot */}
          <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 z-20">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isEnabled ? 'bg-emerald-400' : 'bg-rose-500'
             }`} />
            <span className={`relative inline-flex rounded-full h-4.5 w-4.5 border-2 border-slate-900 shadow-sm ${
              isEnabled ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />
          </span>
        </div>
 
        {/* Title & Info texts with dark mode classes */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-none text-center">
            {isEnabled ? t.shieldActive : t.shieldSuspended}
          </h3>
          
          <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed text-center px-1">
            {isEnabled ? t.shieldActiveDesc : t.shieldSuspendedDesc}
          </p>
        </div>

        {/* Toggle Button */}
        <div className="w-full mt-2 flex justify-center">
          <button
            type="button"
            onClick={onToggle}
            className={`w-full max-w-[220px] px-6 py-3.5 rounded-2xl font-bold tracking-wide transition-all duration-300 cursor-pointer text-xs flex items-center justify-center gap-2 shadow-md ${
              isEnabled 
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/35 hover:bg-rose-500/20' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-rose-400' : 'bg-white animate-pulse'}`} />
            <span>{isEnabled ? t.disableFilter : t.enableFilter}</span>
          </button>
        </div>
      </div>

      {/* Bottom Segment: Stats */}
      <div className="flex justify-between gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
        
        {/* Stat Item 1: Bypassed */}
        <div className="flex-1 bg-slate-950/40 hover:bg-indigo-950/30 border border-slate-800/80 py-3 px-1 rounded-2xl text-center group/stat transition duration-300 flex flex-col items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <div className="text-xl font-bold text-white group-hover/stat:text-indigo-400 transition font-mono leading-none">
            {allowedCount}
          </div>
          <div className="text-[8.5px] text-slate-400 uppercase font-bold font-sans w-full leading-tight break-words">
            {t.statBypassed}
          </div>
        </div>

        {/* Stat Item 2: Screened */}
        <div className="flex-1 bg-slate-950/40 hover:bg-amber-955/20 border border-slate-800/80 py-3 px-1 rounded-2xl text-center group/stat transition duration-300 flex flex-col items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <div className="text-xl font-bold text-white group-hover/stat:text-amber-400 transition font-mono leading-none">
            {screenedCount}
          </div>
          <div className="text-[8.5px] text-slate-400 uppercase font-bold font-sans w-full leading-tight break-words">
            {t.statScreened}
          </div>
        </div>

        {/* Stat Item 3: Blocked */}
        <div className="flex-1 bg-slate-950/40 hover:bg-rose-955/20 border border-slate-800/80 py-3 px-1 rounded-2xl text-center group/stat transition duration-300 flex flex-col items-center justify-center gap-1.5">
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <div className="text-xl font-bold text-white group-hover/stat:text-rose-400 transition font-mono leading-none">
            {blockedCount}
          </div>
          <div className="text-[8.5px] text-slate-400 uppercase font-bold font-sans w-full leading-tight break-words">
            {t.statBlocked}
          </div>
        </div>

      </div>
    </div>
  );
}
