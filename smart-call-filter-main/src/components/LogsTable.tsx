import { useState, useRef, useEffect } from 'react';
import { Activity, Search, MoreVertical, Trash2, Plus, ChevronDown } from 'lucide-react';
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
  const [filterDecision, setFilterDecision] = useState<'all' | 'allowed' | 'screened' | 'blocked'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = logs.filter((l) => {
    const q = searchQuery.toLowerCase().trim();
    const d = (l.decision || '').toUpperCase().trim();

    // Search filter
    const matchesSearch = !q ||
      (l.name || '').toLowerCase().includes(q) ||
      (l.phoneNumber || '').includes(q) ||
      d.toLowerCase().includes(q);

    // Decision filter
    let matchesFilter = true;
    if (filterDecision === 'allowed') {
      matchesFilter = d === 'ALLOWED' || d.includes('ALLOW') || d.includes('BYPASS');
    } else if (filterDecision === 'screened') {
      matchesFilter = d === 'SCREENED' || d.includes('SCREEN');
    } else if (filterDecision === 'blocked') {
      matchesFilter = d === 'BLOCKED' || d.includes('BLOCK') || d.includes('SPAM') || d.includes('SILENCE');
    }

    return matchesSearch && matchesFilter;
  });

  const dotColor = (d: string) => {
    const c = (d || '').toUpperCase();
    if (c === 'ALLOWED' || c.includes('ALLOW') || c.includes('BYPASS')) return 'bg-emerald-400';
    if (c === 'SCREENED' || c.includes('SCREEN')) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  const badgeStyle = (d: string) => {
    const c = (d || '').toUpperCase();
    if (c === 'ALLOWED' || c.includes('ALLOW') || c.includes('BYPASS'))
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    if (c === 'SCREENED' || c.includes('SCREEN'))
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
  };

  return (
    <div id="logs-table-container" className="bg-slate-900/95 border border-slate-800/80 rounded-3xl p-4 space-y-3 shadow-2xl text-white font-sans">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-black text-white uppercase tracking-wide">
            {language === 'hi' ? 'कॉल लॉग्स' : 'Call Logs'}
          </span>
          <span className="text-[9px] text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded-md">
            {filterDecision !== 'all' ? `${filtered.length}/${logs.length}` : logs.length}
          </span>
        </div>

        {/* ⋮ Actions Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-50 w-44 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
              <button type="button" onClick={() => { setMenuOpen(false); onLoadMock(); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 transition text-left cursor-pointer">
                <Plus className="w-3 h-3 text-indigo-400" />
                {t.mockLogsBtn}
              </button>
              <div className="h-px bg-slate-800 mx-3" />
              <button type="button" disabled={logs.length === 0}
                onClick={() => { setMenuOpen(false); if (confirm(t.clearLogsConfirm)) onClear(); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-left cursor-pointer">
                <Trash2 className="w-3 h-3" />
                {t.clearLogsBtn}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH + FILTER ROW */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'खोजें...' : 'Search...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-7 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition font-semibold"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs">
              ✕
            </button>
          )}
        </div>
        <select
          value={filterDecision}
          onChange={(e) => setFilterDecision(e.target.value as typeof filterDecision)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white font-bold uppercase focus:outline-none focus:border-indigo-500 cursor-pointer transition appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center', backgroundSize: '12px', paddingRight: '24px' }}
        >
          <option value="all">{language === 'hi' ? 'सभी' : 'All'}</option>
          <option value="allowed">{language === 'hi' ? 'अनुमत' : 'Allowed'}</option>
          <option value="screened">{language === 'hi' ? 'स्क्रीन' : 'Screened'}</option>
          <option value="blocked">{language === 'hi' ? 'ब्लॉक' : 'Blocked'}</option>
        </select>
      </div>

      {/* LOG LIST */}
      <div className="space-y-1">
        {filtered.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-2xl mb-2">📭</p>
            <p className="text-xs text-slate-500 font-bold">{t.noLogsMsg}</p>
          </div>
        ) : (
          filtered.map((l) => {
            const isOpen = expandedId === l.id;
            const hasDetails = !!(l.reason || l.transcript || l.smsText);
            return (
              <div key={l.id} className="rounded-xl border border-slate-800 overflow-hidden">
                {/* MAIN ROW */}
                <button
                  type="button"
                  onClick={() => hasDetails && setExpandedId(isOpen ? null : l.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/50 hover:bg-slate-900/60 transition text-left"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor(l.decision)}`} />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-white truncate block max-w-[130px]">{l.name}</span>
                      <span className="text-[9px] font-mono text-slate-500">{l.phoneNumber}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black font-mono uppercase tracking-widest border ${badgeStyle(l.decision)}`}>
                      {l.decision}
                    </span>
                    {hasDetails && (
                      <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </button>

                {/* EXPANDED DETAILS */}
                {isOpen && hasDetails && (
                  <div className="px-3 pb-3 pt-2 bg-slate-950/80 border-t border-slate-800/50 space-y-1.5 text-[10px]">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-mono text-[8px]">{l.timestamp}</span>
                    </div>
                    {l.reason && (
                      <p className="text-slate-400">
                        <span className="font-bold text-slate-500 uppercase text-[8px] font-mono tracking-wide mr-1">Reason:</span>
                        {l.reason}
                      </p>
                    )}
                    {l.transcript && (
                      <p className="text-slate-300 italic border-t border-slate-800/50 pt-1.5">
                        <span className="text-indigo-400 not-italic font-bold text-[8px] font-mono uppercase mr-1">Audio:</span>
                        "{l.transcript}"
                      </p>
                    )}
                    {l.smsText && (
                      <p className="text-amber-300/90 italic border-t border-slate-800/50 pt-1.5">
                        <span className="text-amber-400 not-italic font-bold text-[8px] font-mono uppercase mr-1">SMS:</span>
                        "{l.smsText}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
