import { useState } from 'react';
import { ShieldCheck, Search, Trash, Activity } from 'lucide-react';
import { LogEntry } from '../types';
import { translations } from '../translations';

interface LogsTableProps {
  logs: LogEntry[];
  onClear: () => void;
  onLoadMock: () => void;
  language: 'en' | 'hi';
}

export default function LogsTable({ logs, onClear, onLoadMock, language }: LogsTableProps) {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter((l) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    const name = l.name || '';
    const phoneNumber = l.phoneNumber || '';
    const decision = l.decision || '';
    const transcript = l.transcript || '';
    const smsText = l.smsText || '';

    return (
      name.toLowerCase().includes(query) ||
      phoneNumber.includes(query) ||
      decision.toLowerCase().includes(query) ||
      transcript.toLowerCase().includes(query) ||
      smsText.toLowerCase().includes(query)
    );
  });

  const getActionStyles = (decisionCode: string) => {
    const code = (decisionCode || '').toUpperCase();
    switch (code) {
      case 'ALLOWED':
      case 'BYPASS (EMERGENCY)':
      case 'WEEKEND BYPASS':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'SCREENED':
      case 'SCREEN':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'bg-rose-500/10 text-rose-405 text-rose-405 text-rose-400 border border-rose-500/20';
    }
  };

  const handleClearWithConfirm = () => {
    if (confirm(t.clearLogsConfirm)) {
      onClear();
    }
  };

  return (
    <div id="logs-table-container" className="bg-slate-900/95 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-2xl shadow-indigo-950/20 text-white transition-all duration-300 font-sans">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">{t.onDeviceLogs}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{t.onDeviceLogsDesc}</p>
          </div>
        </div>

        {/* Dynamic Log Tools Controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            type="button"
            onClick={onLoadMock}
            className="px-3.5 py-2 rounded-xl text-[10px] tracking-wider font-extrabold uppercase bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-350 border border-slate-700 transition cursor-pointer select-none"
          >
            {t.mockLogsBtn}
          </button>
          
          <button
            type="button"
            onClick={handleClearWithConfirm}
            disabled={logs.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] tracking-wider font-extrabold uppercase bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
          >
            <Trash className="w-3.5 h-3.5" />
            <span>{t.clearLogsBtn}</span>
          </button>
        </div>
      </div>

      {/* SEARCH LOGS BAR */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchLogsPlaceholder}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-505 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 font-semibold transition font-sans"
        />
      </div>

      {/* LOG ENTRIES */}
      <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/40 border border-slate-800 border-dashed rounded-2xl">
            <span className="text-2xl select-none">📭</span>
            <p className="text-xs text-slate-400 mt-2 font-bold font-sans uppercase tracking-widest leading-none">{t.noLogsMsg}</p>
            <p className="text-[10px] text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed px-4">
              {t.noLogsTip}
            </p>
          </div>
        ) : (
          filteredLogs.map((l) => (
            <div 
              key={l.id} 
              className="bg-slate-950/40 rounded-2xl border border-slate-800 p-4 space-y-3 hover:border-indigo-500/20 hover:shadow-md transition duration-200"
            >
              {/* Row 1: Header - Caller + Timestamp + Code */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-white truncate max-w-[150px] sm:max-w-none">{l.name}</h4>
                    <span className="text-[9px] text-slate-405 text-slate-400 font-medium font-mono">
                      {l.timestamp}
                    </span>
                  </div>
                  <p className="text-[10.5px] font-mono text-slate-400 mt-0.5 leading-none">{l.phoneNumber}</p>
                </div>
                
                {/* Decision Badge */}
                <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black font-mono uppercase tracking-widest ${getActionStyles(l.decision)}`}>
                  {l.decision}
                </div>
              </div>

              {/* Row 2: Diagnostic text */}
              <div className="bg-slate-955 bg-slate-950 border border-slate-850 p-3 rounded-xl space-y-1.5 hover:bg-slate-800/10 transition font-sans text-[10.5px] text-left">
                <div className="flex gap-1 flex-wrap">
                  <span className="text-slate-400 font-bold uppercase shrink-0 font-mono tracking-wider">{t.inferenceAction}</span>
                  <span className="text-slate-300">{l.reason}</span>
                </div>

                {l.transcript && (
                  <div className="flex gap-2.5 pt-1.5 border-t border-slate-800/80 leading-relaxed font-semibold flex-wrap">
                    <span className="text-indigo-400 select-none font-mono shrink-0 font-extrabold uppercase tracking-wider">AUDIO TEXT:</span>
                    <p className="text-slate-300 italic">"{l.transcript}"</p>
                  </div>
                )}

                {l.smsText && (
                  <div className="flex gap-1.5 pt-1.5 border-t border-slate-800/80 leading-relaxed text-amber-400 flex-wrap">
                    <span className="font-bold select-none text-[9.5px] font-mono shrink-0 uppercase tracking-widest">{t.autoSmsResponse}</span>
                    <p className="italic text-amber-300/90">"{l.smsText}"</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* DISCLOSURE FOOTER BANNER */}
      <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-2xl flex gap-3 text-[10.5px] text-slate-400 leading-normal text-left">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-slate-300 font-sans">
          {t.sandboxedDisclaimer}
        </p>
      </div>

    </div>
  );
}
