import { useState, useRef, useEffect } from 'react';
import { Activity, Search, ChevronDown, ChevronRight, MoreVertical, Trash2, Plus, ShieldCheck } from 'lucide-react';
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredLogs = logs.filter((l) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (l.name || '').toLowerCase().includes(query) ||
      (l.phoneNumber || '').includes(query) ||
      (l.decision || '').toLowerCase().includes(query) ||
      (l.transcript || '').toLowerCase().includes(query) ||
      (l.smsText || '').toLowerCase().includes(query)
    );
  });

  const getDecisionStyle = (code: string) => {
    const c = (code || '').toUpperCase();
    if (c === 'ALLOWED' || c.includes('BYPASS') || c.includes('ALLOW'))
      return { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400' };
    if (c === 'SCREENED' || c.includes('SCREEN'))
      return { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25', dot: 'bg-amber-400 animate-pulse' };
    return { badge: 'bg-rose-500/15 text-rose-400 border-rose-500/25', dot: 'bg-rose-400' };
  };

  const handleClearWithConfirm = () => {
    setMenuOpen(false);
    if (confirm(t.clearLogsConfirm)) onClear();
  };

  const handleMock = () => {
    setMenuOpen(false);
    onLoadMock();
  };

  return (
    <div id="logs-table-container" className="bg-slate-900/95 backdrop-blur-md border border-slate-800/80 rounded-3xl p-4 space-y-3 shadow-2xl shadow-indigo-950/20 text-white font-sans">

      {/* HEADER ROW */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider leading-none">{t.onDeviceLogs}</h3>
            <p className="text-[9px] text-slate-500 mt-0.5">{logs.length} {language === 'hi' ? 'रिकॉर्ड' : 'records'}</p>
          </div>
        </div>

        {/* ⋮ ACTIONS DROPDOWN MENU */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
              <button
                type="button"
                onClick={handleMock}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition text-left cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                {t.mockLogsBtn}
              </button>
              <div className="h-px bg-slate-800 mx-3" />
              <button
                type="button"
                onClick={handleClearWithConfirm}
                disabled={logs.length === 0}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-left cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                {t.clearLogsBtn}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'hi' ? 'नाम, नंबर या स्टेटस खोजें...' : 'Search name, number or status...'}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 font-semibold transition"
        />
        {searchQuery && (
          <button type="button" onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-white text-xs transition">
            ✕
          </button>
        )}
      </div>

      {/* LOG ENTRIES — collapsible rows */}
      <div className="space-y-1">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/40 border border-slate-800 border-dashed rounded-2xl">
            <span className="text-2xl select-none">📭</span>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">{t.noLogsMsg}</p>
            <p className="text-[10px] text-slate-500 mt-1 px-4">{t.noLogsTip}</p>
          </div>
        ) : (
          filteredLogs.map((l) => {
            const style = getDecisionStyle(l.decision);
            const isOpen = expandedId === l.id;
            const hasDetails = l.transcript || l.smsText;

            return (
              <div key={l.id} className="rounded-xl border border-slate-800 overflow-hidden transition-all duration-200 hover:border-slate-700">
                {/* COMPACT ROW — always visible */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : l.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/40 hover:bg-slate-950/70 transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Status dot */}
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-white truncate max-w-[120px]">{l.name}</span>
                        <span className="text-[8px] font-mono text-slate-500 hidden sm:block">{l.timestamp}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 leading-none block">{l.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Decision badge */}
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black font-mono uppercase tracking-widest border ${style.badge}`}>
                      {l.decision}
                    </span>
                    {/* Expand chevron — only if details exist */}
                    {hasDetails ? (
                      isOpen
                        ? <ChevronDown className="w-3 h-3 text-slate-500" />
                        : <ChevronRight className="w-3 h-3 text-slate-500" />
                    ) : (
                      <span className="w-3" />
                    )}
                  </div>
                </button>

                {/* EXPANDED DETAILS — collapsible dropdown */}
                {isOpen && hasDetails && (
                  <div className="px-3 pb-3 pt-2 bg-slate-950/60 border-t border-slate-800/60 space-y-2 text-[10px]">
                    <p className="text-slate-400 leading-relaxed">
                      <span className="font-bold uppercase text-slate-500 font-mono tracking-wide mr-1">{t.inferenceAction}</span>
                      {l.reason}
                    </p>
                    {l.transcript && (
                      <div className="border-t border-slate-800/60 pt-1.5">
                        <span className="text-indigo-400 font-bold font-mono uppercase tracking-wide text-[9px]">AUDIO: </span>
                        <span className="text-slate-300 italic">"{l.transcript}"</span>
                      </div>
                    )}
                    {l.smsText && (
                      <div className="border-t border-slate-800/60 pt-1.5">
                        <span className="text-amber-400 font-bold font-mono uppercase tracking-wide text-[9px]">SMS: </span>
                        <span className="text-amber-300/90 italic">"{l.smsText}"</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <p className="text-[9px] text-slate-500">{t.sandboxedDisclaimer}</p>
      </div>

    </div>
  );
}
