import { useState } from 'react';
import { Clock, ShieldCheck, Mail, AlertTriangle, Moon, Info, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { AppConfig } from '../types';
import { translations } from '../translations';

interface SettingsPanelProps {
  config: AppConfig;
  onChange: (updated: AppConfig) => void;
  language: 'en' | 'hi';
}

function ToggleRow({ label, description, active, onChange }: { label: string, description?: string, active: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-3.5 px-3 border-b border-slate-800/50 last:border-0">
      <div className="pr-4 flex-1">
        <span className="text-[13px] font-semibold text-slate-200 block leading-tight">{label}</span>
        {description && <p className="text-[10px] text-slate-500 leading-tight mt-1 pr-2">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
          active ? 'bg-indigo-500' : 'bg-slate-700'
        }`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
          active ? 'translate-x-5' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
}

export default function SettingsPanel({ config, onChange, language }: SettingsPanelProps) {
  const t = translations[language];
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateConfigField = <K extends keyof AppConfig>(field: K, value: AppConfig[K]) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <div id="settings-panel-container" className="space-y-4 text-white">
      
      {/* BASIC RULES SECTION (Block Unknown Callers) */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
        <ToggleRow 
          label={t.blockUnknown} 
          description={t.blockUnknownDesc} 
          active={config.blockUnknownCallers} 
          onChange={() => updateConfigField('blockUnknownCallers', !config.blockUnknownCallers)} 
        />
      </div>

      {/* QUIET HOURS SECTION */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{t.authorizedWindow}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800 flex flex-col gap-1">
            <span className="text-[9px] text-slate-400 uppercase font-bold">{t.hoursStart}</span>
            <input 
              type="time" 
              value={config.allowedTimeStart}
              onChange={(e) => updateConfigField('allowedTimeStart', e.target.value)}
              className="bg-transparent text-sm text-white font-mono focus:outline-none w-full cursor-pointer"
            />
          </div>
          <div className="flex-1 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800 flex flex-col gap-1">
            <span className="text-[9px] text-slate-400 uppercase font-bold">{t.hoursEnd}</span>
            <input 
              type="time" 
              value={config.allowedTimeEnd}
              onChange={(e) => updateConfigField('allowedTimeEnd', e.target.value)}
              className="bg-transparent text-sm text-white font-mono focus:outline-none w-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* TOGGLE FOR ADVANCED RULES */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-slate-850 border border-slate-800 text-indigo-400 hover:text-indigo-300 transition cursor-pointer select-none"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>
            {showAdvanced 
              ? (language === 'hi' ? 'उन्नत सेटिंग्स छिपाएं' : 'Hide Advanced Settings') 
              : (language === 'hi' ? 'उन्नत सेटिंग्स दिखाएं' : 'Show Advanced Settings')}
          </span>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ADVANCED RULES SECTION */}
      {showAdvanced && (
        <div className="space-y-4 animate-fade-in">
          {/* Weekend calls */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            <ToggleRow 
              label={t.weekendCalls} 
              description={t.weekendCallsDesc} 
              active={config.allowWeekendCalls} 
              onChange={() => updateConfigField('allowWeekendCalls', !config.allowWeekendCalls)} 
            />
          </div>

          {/* Emergency policy selection */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{t.emergencyPolicy}</h3>
            </div>
            
            <div className="relative">
              <select 
                value={config.emergencyOverridePolicy}
                onChange={(e) => updateConfigField('emergencyOverridePolicy', e.target.value as 'none'|'repeated'|'immediate')}
                className="w-full appearance-none bg-slate-950/80 border border-slate-700 hover:border-slate-600 rounded-xl px-3 py-3 text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition pr-10 cursor-pointer"
              >
                <option value="repeated">{t.policyRepeated}</option>
                <option value="immediate">{t.policyImmediate}</option>
                <option value="none">{t.policyNone}</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 px-1">
              {config.emergencyOverridePolicy === 'repeated' && t.policyRepeatedDesc}
              {config.emergencyOverridePolicy === 'immediate' && t.policyImmediateDesc}
              {config.emergencyOverridePolicy === 'none' && t.policyNoneDesc}
            </p>
          </div>

          {/* Custom auto SMS */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{t.customAutoReply}</h3>
              </div>
              <div className="scale-90 origin-right">
                 <ToggleRow 
                   label="" 
                   active={config.smsPermissionGranted} 
                   onChange={() => updateConfigField('smsPermissionGranted', !config.smsPermissionGranted)} 
                 />
              </div>
            </div>

            {config.smsPermissionGranted ? (
              <textarea 
                rows={2}
                value={config.customAutoSms}
                onChange={(e) => updateConfigField('customAutoSms', e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-indigo-500 transition resize-none custom-scrollbar"
                placeholder={t.smsMissingDesc}
              />
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex gap-2.5 items-start cursor-pointer hover:bg-amber-500/15 transition" onClick={() => updateConfigField('smsPermissionGranted', true)}>
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[10px] text-slate-300 leading-tight">
                  {t.smsMissingDesc}
                  <div className="text-indigo-400 font-bold mt-1">{t.smsEnableBtn}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
