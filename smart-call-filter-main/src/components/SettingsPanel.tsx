import { useState } from 'react';
import { Clock, Mail, AlertTriangle, Moon, ChevronDown, ChevronUp, SlidersHorizontal, BanIcon } from 'lucide-react';
import { AppConfig } from '../types';
import { translations } from '../translations';

interface SettingsPanelProps {
  config: AppConfig;
  onChange: (updated: AppConfig) => void;
  language: 'en' | 'hi';
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 focus:outline-none ${
        active ? 'bg-indigo-500 border-indigo-400/30' : 'bg-slate-700 border-slate-600'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ml-0.5 ${
        active ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </button>
  );
}

export default function SettingsPanel({ config, onChange, language }: SettingsPanelProps) {
  const t = translations[language];
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = <K extends keyof AppConfig>(field: K, value: AppConfig[K]) =>
    onChange({ ...config, [field]: value });

  return (
    <div id="settings-panel-container" className="space-y-3 text-white">

      {/* MAIN SETTINGS CARD */}
      <div className="bg-slate-900/95 border border-slate-800/80 rounded-3xl overflow-hidden shadow-lg divide-y divide-slate-800/60">

        {/* Block unknown callers */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <BanIcon className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">{t.blockUnknown}</p>
              <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{t.blockUnknownDesc}</p>
            </div>
          </div>
          <Toggle active={config.blockUnknownCallers} onChange={() => set('blockUnknownCallers', !config.blockUnknownCallers)} />
        </div>

        {/* Quiet Hours */}
        <div className="px-4 py-3.5">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <p className="text-xs font-bold text-slate-200">{t.authorizedWindow}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2">
              <span className="text-[8px] text-slate-500 uppercase font-bold block mb-0.5">{t.hoursStart}</span>
              <input
                type="time"
                value={config.allowedTimeStart}
                onChange={(e) => set('allowedTimeStart', e.target.value)}
                className="bg-transparent text-sm text-white font-mono focus:outline-none w-full cursor-pointer"
              />
            </div>
            <div className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2">
              <span className="text-[8px] text-slate-500 uppercase font-bold block mb-0.5">{t.hoursEnd}</span>
              <input
                type="time"
                value={config.allowedTimeEnd}
                onChange={(e) => set('allowedTimeEnd', e.target.value)}
                className="bg-transparent text-sm text-white font-mono focus:outline-none w-full cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>

      {/* ADVANCED TOGGLE BTN */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/70 border border-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
          <span>{showAdvanced
            ? (language === 'hi' ? 'उन्नत सेटिंग्स छिपाएं' : 'Hide Advanced Settings')
            : (language === 'hi' ? 'उन्नत सेटिंग्स दिखाएं' : 'Advanced Settings')
          }</span>
        </div>
        {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* ADVANCED SETTINGS */}
      {showAdvanced && (
        <div className="bg-slate-900/95 border border-slate-800/80 rounded-3xl overflow-hidden shadow-lg divide-y divide-slate-800/60 animate-fade-in">

          {/* Weekend calls */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-200">{t.weekendCalls}</p>
                <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{t.weekendCallsDesc}</p>
              </div>
            </div>
            <Toggle active={config.allowWeekendCalls} onChange={() => set('allowWeekendCalls', !config.allowWeekendCalls)} />
          </div>

          {/* Emergency policy */}
          <div className="px-4 py-3.5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs font-bold text-slate-200">{t.emergencyPolicy}</p>
            </div>
            <div className="relative">
              <select
                value={config.emergencyOverridePolicy}
                onChange={(e) => set('emergencyOverridePolicy', e.target.value as 'none' | 'repeated' | 'immediate')}
                className="w-full appearance-none bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer pr-8"
              >
                <option value="repeated">{t.policyRepeated}</option>
                <option value="immediate">{t.policyImmediate}</option>
                <option value="none">{t.policyNone}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-[9px] text-slate-500 mt-1.5 px-0.5">
              {config.emergencyOverridePolicy === 'repeated' && t.policyRepeatedDesc}
              {config.emergencyOverridePolicy === 'immediate' && t.policyImmediateDesc}
              {config.emergencyOverridePolicy === 'none' && t.policyNoneDesc}
            </p>
          </div>

          {/* Auto SMS */}
          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <p className="text-xs font-bold text-slate-200">{t.customAutoReply}</p>
              </div>
              <Toggle active={config.smsPermissionGranted} onChange={() => set('smsPermissionGranted', !config.smsPermissionGranted)} />
            </div>
            {config.smsPermissionGranted ? (
              <textarea
                rows={2}
                value={config.customAutoSms}
                onChange={(e) => set('customAutoSms', e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition resize-none leading-relaxed"
                placeholder={t.smsMissingDesc}
              />
            ) : (
              <p className="text-[9px] text-slate-500">{t.smsMissingDesc}</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
