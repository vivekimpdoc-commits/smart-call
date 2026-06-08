import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Shield, Radio, AlertOctagon, HelpCircle, User, Check } from 'lucide-react';
import { Contact, LogEntry, AppConfig, ScreenDecision } from '../types';
import { translations } from '../translations';

interface CallSimulatorProps {
  contacts: Contact[];
  config: AppConfig;
  onAddLog: (entry: LogEntry) => void;
  language: 'en' | 'hi';
}

type SimState = 'idle' | 'analyzing' | 'ringing' | 'connected' | 'silenced' | 'spam_blocked';

const PRESET_PERSONAS = [
  { id: 'mom', name: 'Mom ❤️', phone: '+1 (555) 123-4567', note: 'Always allowed bypass contact rule' },
  { id: 'unknown_rob', name: 'Unknown Caller (Robo)', phone: '+1 (800) 555-0199', note: 'Standard commercial robocaller signature' },
  { id: 'neighbor', name: 'Neighbor (John)', phone: '+1 (555) 304-9423', note: 'Needs active line verification' },
  { id: 'scammer', name: 'Suspected Spammer', phone: '+1 (650) 412-8800', note: 'Strict block listed telemarketing pattern' },
];

export default function CallSimulator({ contacts, config, onAddLog, language }: CallSimulatorProps) {
  const t = translations[language];

  // Core Simulation States
  const [simState, setSimState] = useState<SimState>('idle');
  const [callerName, setCallerName] = useState('Mom ❤️');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  
  // Custom Controls Override
  const [overrideTime, setOverrideTime] = useState('14:30');
  const [overrideWeekend, setOverrideWeekend] = useState(false);
  const [isEmergencyBypass, setIsEmergencyBypass] = useState(false);

  // Active Simulation variables
  const [currentTranscript, setCurrentTranscript] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [evaluationReason, setEvaluationReason] = useState('');
  const [autoSmsSentText, setAutoSmsSentText] = useState<string | null>(null);
  
  // Waveform animation helpers
  const [audioBars, setAudioBars] = useState<number[]>([12, 24, 32, 16, 8, 20, 28, 14]);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track call ring counters (Emergency bypass checks)
  const callAttemptsRef = useRef<Record<string, number>>({});

  // Cycle voice transcript dialogue steps
  const fullDialogue = [
    "Hello? Is Rachel there? I'm calling from Apex Insurance to confirm the updated billing statements for this quarter...",
    "We sent letters to this main mailbox registry and got no response. Standard coverage limits will terminate in approximately 48 hours...",
    "Please press 1 or call our customer service hotline as soon as possible to prevent auto-debit cancellations..."
  ];

  // Random speech animation
  useEffect(() => {
    if (simState === 'connected') {
      audioIntervalRef.current = setInterval(() => {
        setAudioBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 32) + 6));
      }, 120);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [simState]);

  const selectPreset = (p: typeof PRESET_PERSONAS[0]) => {
    setCallerName(p.name);
    setPhoneNumber(p.phone);
    setIsEmergencyBypass(false);
  };

  // Process the security action evaluation
  const handleStartSimulation = () => {
    if (!phoneNumber) return;
    setSimState('analyzing');
    setCurrentTranscript([]);
    setAutoSmsSentText(null);
    setIsTranslating(false);

    // Increment call dials count
    const cleanedNo = phoneNumber.replace(/\s+/g, '');
    const currentAttemptCount = (callAttemptsRef.current[cleanedNo] || 0) + 1;
    callAttemptsRef.current[cleanedNo] = currentAttemptCount;

    // Evaluate against the core engine database
    setTimeout(() => {
      evaluateCallHandler(currentAttemptCount);
    }, 1500);
  };

  const evaluateCallHandler = (attemptNo: number) => {
    const cleanedNo = phoneNumber.replace(/\s+/g, '');
    const matchingContact = contacts.find(c => c.phoneNumber.replace(/\s+/g, '') === cleanedNo);
    
    // Evaluate if time is locked within authorized sleep hours
    const isWithinHours = checkTimeAuthorization();
    const isWeekend = overrideWeekend;
    
    // Check if weekend bypass is toggled
    const isQuiteHoursEnforced = !isWithinHours && (!isWeekend || !config.allowWeekendCalls);

    let localReason = '';

    // Step 1: Shield global switch check
    if (!config.callScreeningEnabled) {
      localReason = language === 'hi' ? 'सुरक्षा कवच अक्षम है। कॉल सीधे स्वीकार की गई।' : 'Protection Shield is Disabled. Call bypassed directly.';
      setEvaluationReason(localReason);
      setSimState('ringing');
      return;
    }

    // Step 2: Allow list contact lookup
    if (matchingContact) {
      if (matchingContact.status === 'allow') {
        localReason = language === 'hi' ? `सक्रिय संपर्क नियम: "${matchingContact.name}" के लिए घंटी की अनुमति है।` : `Active Contact Rule: Always Allow approved for "${matchingContact.name}".`;
        executeCallResult('allow', localReason);
        return;
      } else if (matchingContact.status === 'block') {
        localReason = language === 'hi' ? `सक्रिय संपर्क नियम: "${matchingContact.name}" को ब्लॉक सूची में डाला गया है।` : `Active Contact Rule: Explicit Block listed for "${matchingContact.name}".`;
        executeCallResult('block', localReason);
        return;
      } else if (matchingContact.status === 'screen') {
        localReason = language === 'hi' ? `सक्रिय संपर्क नियम: "${matchingContact.name}" के लिए स्क्रीनिंग आवश्यक है।` : `Active Contact Rule: Screen Call triggered for "${matchingContact.name}".`;
        executeCallResult('screen', localReason);
        return;
      }
    }

    // Step 3: Check Unknown caller policies
    if (config.blockUnknownCallers) {
      // If quiet hours enforced
      if (isQuiteHoursEnforced) {
        // Support Emergency policy bypass
        if (isEmergencyBypass || (config.emergencyOverridePolicy === 'repeated' && attemptNo >= 2)) {
          localReason = language === 'hi' ? 'आपातकालीन ओवरराइड नीति: दोहराई गई कॉल (3 मिनट के भीतर) बायपास नियम सक्रिय।' : 'Emergency Override Policy: Repeated Call (within 3 min) bypass rules matched.';
          executeCallResult('allow', localReason);
          return;
        }

        // Standard block during quiet mode
        localReason = language === 'hi' ? 'म्यूट समय नीति: अपरिचित कॉलर से आने वाली कॉल्स म्यूट हैं।' : 'Quiet Hours Enforced: Unknown Caller silenced out-of-schedule.';
        executeCallResult('block', localReason);
        return;
      }

      // Default unrecognized screening outside sleep hours
      localReason = language === 'hi' ? 'स्क्रीनिंग नीति: अपरिचित कॉलर की लाइव वॉयस जांच शुरू की गई।' : 'Screening Policy: Dynamic voice verification launched for Unknown line.';
      executeCallResult('screen', localReason);
    } else {
      // If unknown allowed but quiet hours are enforced
      if (isQuiteHoursEnforced) {
        if (isEmergencyBypass || (config.emergencyOverridePolicy === 'repeated' && attemptNo >= 2)) {
          localReason = language === 'hi' ? 'आपातकालीन ओवरराइड नीति: म्यूट समय के दौरान दोहराई गई कॉल को अनुमति दी गई।' : 'Emergency Override Policy: Repeated calling pattern allowed.';
          executeCallResult('allow', localReason);
          return;
        }

        localReason = language === 'hi' ? 'म्यूट समय नीति: शांत अवधि के दौरान अपरिचित नंबर को म्यूट किया गया।' : 'Quiet Hours Policy: Silent mode enforced during quiet timezone.';
        executeCallResult('block', localReason);
        return;
      }

      // Allow if screening disabled and outside sleeping schedule
      localReason = language === 'hi' ? 'सामान्य अवधि: फ़िल्टर सक्षम नहीं होने के कारण घंटी बजने दी गई।' : 'Standard hours lookup: No block criteria matched.';
      executeCallResult('allow', localReason);
    }
  };

  const checkTimeAuthorization = () => {
    try {
      const nowTimeStr = overrideTime;
      const [nowH, nowM] = nowTimeStr.split(':').map(Number);
      const [startH, startM] = config.allowedTimeStart.split(':').map(Number);
      const [endH, endM] = config.allowedTimeEnd.split(':').map(Number);

      const nowVal = nowH * 60 + nowM;
      const startVal = startH * 60 + startM;
      const endVal = endH * 60 + endM;

      if (startVal <= endVal) {
        return nowVal >= startVal && nowVal <= endVal;
      } else {
        return nowVal >= startVal || nowVal <= endVal;
      }
    } catch {
      return true;
    }
  };

  const executeCallResult = (type: 'allow' | 'block' | 'screen', reason: string) => {
    setEvaluationReason(reason);
    if (type === 'allow') {
      setSimState('ringing');
    } else if (type === 'block') {
      setSimState('silenced');
      triggerSmsAutoReply();
      logOnDeviceEvent('BLOCKED', reason);
    } else {
      setSimState('connected');
      launchDynamicScreeningAudio();
    }
  };

  const triggerSmsAutoReply = () => {
    if (config.smsPermissionGranted && config.customAutoSms) {
      setAutoSmsSentText(config.customAutoSms);
    } else {
      setAutoSmsSentText(null);
    }
  };

  const launchDynamicScreeningAudio = () => {
    setIsTranslating(true);
    let step = 0;

    const streamLine = () => {
      if (step < fullDialogue.length) {
        setCurrentTranscript((prev) => [...prev, fullDialogue[step]]);
        step++;
        transcriptTimeoutRef.current = setTimeout(streamLine, 3500);
      } else {
        setIsTranslating(false);
      }
    };

    streamLine();
  };

  const logOnDeviceEvent = (decision: ScreenDecision, evaluation: string, finalTranscript?: string) => {
    const isSmsAction = config.smsPermissionGranted && decision === 'BLOCKED' && Boolean(config.customAutoSms);
    
    const log: LogEntry = {
      id: 'log_' + Date.now(),
      name: callerName || 'Anonymous',
      phoneNumber: phoneNumber || 'Restricted Number',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      decision,
      reason: evaluation,
      transcript: finalTranscript,
      smsSent: isSmsAction,
      smsText: isSmsAction ? config.customAutoSms : undefined
    };
    onAddLog(log);
  };

  // User decides manually to bypass block / ring screen
  const handleForceBypassAndRing = () => {
    if (transcriptTimeoutRef.current) clearTimeout(transcriptTimeoutRef.current);
    setSimState('ringing');
    logOnDeviceEvent('ALLOWED', language === 'hi' ? 'यूज़र द्वारा लाइव स्क्रीनिंग बायपास की गई।' : 'Simulated core bypass approved manually by sandbox administrator.');
  };

  // User decides manually to block line during call screen
  const handleHoldAndReportSpam = () => {
    if (transcriptTimeoutRef.current) clearTimeout(transcriptTimeoutRef.current);
    setSimState('spam_blocked');
    triggerSmsAutoReply();
    const finalText = currentTranscript.join(' ');
    logOnDeviceEvent('BLOCKED', language === 'hi' ? 'वॉयस स्क्रीनिंग विश्लेषण के बाद स्पैम ब्लॉक किया गया।' : 'Flagged as Spam via on-device Screening Sandbox.', finalText);
  };

  const handleDisconnectSimulator = () => {
    if (transcriptTimeoutRef.current) clearTimeout(transcriptTimeoutRef.current);
    
    if (simState === 'ringing') {
      logOnDeviceEvent('ALLOWED', language === 'hi' ? 'कॉल घंटी बजी लेकिन यूज़र द्वारा रिजेक्ट या मिस की गई।' : 'Call ringing approved, disconnected/missed.');
    }
    setSimState('idle');
  };

  return (
    <div id="call-simulator-container" className="bg-slate-900/95 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-2xl shadow-indigo-950/20 text-white transition-all duration-300">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 mt-1">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-405 text-indigo-450 text-indigo-400 rounded-lg shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-left leading-none">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">{t.screeningSandbox}</h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-none">{t.onDeviceCpu}</p>
          </div>
        </div>
        
        {simState !== 'idle' && (
          <span className="flex items-center gap-1 text-[9px] font-black uppercase bg-indigo-500/10 border border-indigo-500/35 text-indigo-300 px-2.5 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>{simState.toUpperCase()}</span>
          </span>
        )}
      </div>

      {/* IDLE VIEW CONFIGURATION AREA */}
      {simState === 'idle' && (
        <div className="space-y-4 animate-fade-in text-xs">
          
          {/* Quick presets selectors */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">{t.pickPersona}</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPreset(p)}
                  className={`p-2.5 rounded-xl text-[10.5px] cursor-pointer text-left border transition ${
                    phoneNumber === p.phone
                      ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-inner'
                      : 'bg-slate-950/40 border-slate-805 border-slate-800 hover:bg-slate-950 text-slate-350 hover:text-white'
                  }`}
                >
                  <span className="font-bold block text-slate-200">{p.name}</span>
                  <span className="text-[9px] font-mono text-slate-500 block leading-none mt-1">{p.phone}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">{t.callerNameLabel}</label>
              <input 
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none font-semibold transition text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">{t.phoneNumberPrefix}</label>
              <input 
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-mono placeholder-slate-600 focus:border-indigo-500 focus:outline-none font-semibold transition text-xs"
              />
            </div>
          </div>

          {/* Custom controls under correct types */}
          <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl space-y-4 text-left">
            <h4 className="text-[10.5px] font-black text-slate-300 uppercase tracking-wider block font-sans">{t.customBypassText}</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-sans">{t.simulateClock}</label>
                <input 
                  type="time"
                  value={overrideTime}
                  onChange={(e) => setOverrideTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono focus:outline-none text-xs"
                />
              </div>

              {/* Saturday-Sunday toggle */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-sans">{t.simulateWeekend}</label>
                <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 border border-slate-800 rounded-lg h-9">
                  <span className="text-[10.5px] font-semibold text-slate-300">{t.simulateWeekend}</span>
                  <input 
                    type="checkbox"
                    checked={overrideWeekend}
                    onChange={(e) => setOverrideWeekend(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Urgent caller emergency bypass trigger */}
            <div className="flex items-start gap-3 bg-red-950/10 border border-red-900/30 p-3.5 rounded-xl hover:bg-red-950/20 transition duration-150">
              <input 
                type="checkbox"
                id="emergency-override-chk"
                checked={isEmergencyBypass}
                onChange={(e) => setIsEmergencyBypass(e.target.checked)}
                className="w-4.5 h-4.5 accent-indigo-600 rounded mt-0.5 cursor-pointer"
              />
              <label htmlFor="emergency-override-chk" className="select-none cursor-pointer">
                <span className="text-[10.5px] font-black text-red-400 block tracking-wide">{t.simulateEmergency}</span>
                <span className="text-[9.5px] text-slate-400 block mt-0.5 leading-snug">{t.simulateEmergencyDesc}</span>
              </label>
            </div>
          </div>

          {/* Trigger simulator call */}
          <button
            type="button"
            onClick={handleStartSimulation}
            className="w-full py-4 text-xs font-black tracking-widest uppercase bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 text-white rounded-2xl transition cursor-pointer select-none border border-indigo-700 flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-4.5 h-4.5 fill-current animate-wiggle" />
            <span>{t.launchSimBtn}</span>
          </button>
        </div>
      )}

      {/* 2. ANALYZING STATE ANIMATION */}
      {simState === 'analyzing' && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Shield className="w-8 h-8 animate-spin" />
          </div>
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-slate-200">{t.evaluatingPolicy}...</h4>
            <p className="text-[10.5px] text-slate-400 font-mono tracking-wider">{t.rulesActive}</p>
          </div>
        </div>
      )}

      {/* 3. RINGING STATE */}
      {simState === 'ringing' && (
        <div className="bg-emerald-950/10 border border-emerald-500/20 p-6 rounded-2xl space-y-5 text-center animate-bounce-slow font-sans">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg animate-pulse shadow-emerald-500/20">
            <Phone className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mt-1 block">{t.incomingApproved}</span>
            <h4 className="text-lg font-black text-white">{callerName}</h4>
            <p className="text-xs font-mono text-slate-400 leading-none">{phoneNumber}</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 leading-relaxed max-w-sm mx-auto text-left">
            🛡️ <span className="font-bold text-slate-100">Decision Resolution:</span> {evaluationReason}
          </div>

          <button
            type="button"
            onClick={handleDisconnectSimulator}
            className="w-full sm:w-auto px-8 py-3.5 font-bold tracking-wider bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition duration-150 cursor-pointer shadow border border-rose-700/80 uppercase text-xs"
          >
            {t.disconnectCall}
          </button>
        </div>
      )}

      {/* 4. ACTIVE SCREENING SCREEN */}
      {simState === 'connected' && (
        <div className="space-y-4 animate-fade-in text-left">
          
          <div className="bg-slate-955 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            
            {/* Caller avatar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <User className="w-5 h-5 animate-none" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-100 leading-none">{callerName}</h4>
                  <p className="text-[10.5px] font-mono text-slate-400 tracking-tight leading-none mt-1">{phoneNumber}</p>
                </div>
              </div>

              <span className="text-[9px] font-bold font-mono uppercase bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-md">
                {t.voiceChannelAnalyzer}
              </span>
            </div>

            {/* Audio Wave animators stream */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans select-none">{t.lineSecured}</p>
              
              <div className="flex items-end gap-1 px-1 h-8 shrink-0">
                {audioBars.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 via-indigo-600 to-violet-500 transition-all duration-100 shadow-sm shadow-indigo-500/10" 
                    style={{ height: `${b}px` }} 
                  />
                ))}
              </div>
            </div>

            {/* Live voice translation updates */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9px] font-black uppercase text-slate-500 font-mono tracking-widest leading-none">
                <span>{t.callerLabel}</span>
                {isTranslating && <span className="text-indigo-400 animate-pulse">{t.translatingVoice}</span>}
              </div>

              <div className="bg-slate-905 bg-slate-900 border border-slate-800 p-4 rounded-xl min-h-[90px] text-xs font-mono font-medium leading-relaxed text-slate-200 flex flex-col justify-end space-y-2">
                {currentTranscript.length === 0 ? (
                  <p className="text-slate-500 italic text-center select-none font-sans py-4">...</p>
                ) : (
                  currentTranscript.map((tText, idx) => (
                    <p key={idx} className="text-slate-300 italic group/tx text-left">
                      <span className="text-indigo-400 select-none mr-1.5 font-bold">»</span> 
                      "{tText}"
                    </p>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Screening interactive toggles */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <button
              type="button"
              onClick={handleHoldAndReportSpam}
              className="py-3 font-bold bg-rose-500/10 text-rose-405 text-rose-400 hover:bg-rose-500/20 border border-rose-500/35 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 uppercase"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>{t.blockSpamBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleForceBypassAndRing}
              className="py-3 font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/35 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 uppercase"
            >
              <Check className="w-4 h-4" />
              <span>{t.ringLineBtn}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDisconnectSimulator}
            className="w-full py-3 text-xs font-extrabold bg-slate-850 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition cursor-pointer uppercase tracking-wider"
          >
            {t.cancelBtn}
          </button>
        </div>
      )}

      {/* 5. SUSPENDED / SILENCED RESULT VIEW */}
      {simState === 'silenced' && (
        <div className="bg-rose-950/10 border border-rose-500/20 p-5 rounded-2xl text-center space-y-4 animate-fade-in text-xs">
          <div className="mx-auto w-12 h-12 bg-rose-500/10 border border-rose-500/35 text-rose-400 rounded-full flex items-center justify-center">
            <PhoneOff className="w-6 h-6 text-rose-400" />
          </div>

          <div className="space-y-1 animate-none">
            <span className="text-[10px] font-black uppercase text-rose-404 text-rose-400 tracking-wider inline-block leading-none">{t.callSilenceTag}</span>
            <h4 className="text-sm font-bold text-white">{callerName}</h4>
            <p className="text-[10.5px] font-mono text-slate-400 leading-none">{phoneNumber}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10.5px] text-slate-350 leading-relaxed max-w-sm mx-auto space-y-2 font-sans text-left">
            <div className="border-b border-slate-900 pb-1.5">
              💡 <span className="font-bold text-slate-200">Decision Detail:</span> {evaluationReason}
            </div>
            <p className="text-slate-400 leading-relaxed font-sans font-medium text-[10px]">
              {t.silencedLoggedMsg}
            </p>
          </div>

          {autoSmsSentText && (
            <div className="bg-indigo-950/35 border border-indigo-500/10 p-3 rounded-xl max-w-sm mx-auto text-left space-y-1.5 font-sans">
              <span className="text-[9.5px] text-indigo-400 font-extrabold tracking-widest font-mono uppercase">{t.autoSmsResponse}</span>
              <p className="text-[10.5px] text-slate-300 italic">"{autoSmsSentText}"</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSimState('idle')}
            className="w-full py-3 rounded-xl text-xs font-extrabold uppercase bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 border border-indigo-700 text-white cursor-pointer select-none transition"
          >
            {t.returnToSandbox}
          </button>
        </div>
      )}

      {/* 6. SPAM REJECTED RESULT VIEW */}
      {simState === 'spam_blocked' && (
        <div className="bg-rose-955 bg-rose-950/15 border border-rose-500/25 p-5 rounded-2xl text-center space-y-4 animate-fade-in text-xs font-sans">
          <div className="mx-auto w-12 h-12 bg-rose-500/10 border border-rose-500/35 text-rose-400 rounded-full flex items-center justify-center">
            <AlertOctagon className="w-6 h-6 text-rose-400" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider inline-block leading-none">SPAM SHIELD REJECTED</span>
            <h4 className="text-sm font-bold text-white">{callerName}</h4>
            <p className="text-[10.5px] font-mono text-slate-400 leading-none">{phoneNumber}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10.5px] text-slate-300 leading-relaxed max-w-sm mx-auto space-y-1 text-left">
            <div>
              🛑 <span className="font-bold text-slate-100">Screen Decision:</span> Transcripts analysis matches commercial robo parameters. Line blocked aggressively.
            </div>
          </div>

          {config.smsPermissionGranted && config.customAutoSms && (
            <div className="bg-indigo-950/35 border border-indigo-500/10 p-3 rounded-xl max-w-sm mx-auto text-left space-y-1.5 font-sans">
              <span className="text-[9.5px] text-indigo-400 font-extrabold tracking-widest font-mono uppercase">{t.autoSmsResponse}</span>
              <p className="text-[10.5px] text-slate-300 italic">"{config.customAutoSms}"</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSimState('idle')}
            className="w-full py-3 rounded-xl text-xs font-extrabold uppercase bg-slate-800 hover:bg-slate-705 border border-slate-700 text-white cursor-pointer select-none transition"
          >
            {t.returnToSandbox}
          </button>
        </div>
      )}

      {/* SANDBOX INSTRUCTIONS FOOTER */}
      {simState === 'idle' && (
        <div className="bg-slate-955 bg-slate-950/40 border border-slate-850 border-slate-800 p-3.5 rounded-2xl text-[10.5px] text-slate-400 flex gap-2 font-medium leading-relaxed font-sans text-left">
          <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-slate-300">
            {t.simulatorTip}
          </p>
        </div>
      )}

    </div>
  );
}
