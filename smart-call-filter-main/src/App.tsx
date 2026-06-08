import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Users, 
  BookOpen, 
  RotateCcw,
  Globe,
  Smartphone
} from 'lucide-react';
import { AppConfig, Contact, LogEntry } from './types';
import OnboardingFlow from './components/OnboardingFlow';
import ShieldStatus from './components/ShieldStatus';
import SettingsPanel from './components/SettingsPanel';
import ContactsManager from './components/ContactsManager';
import LogsTable from './components/LogsTable';
import CallSimulator from './components/CallSimulator';
import { translations } from './translations';

// Fallback to absolute or placeholder paths
const APP_ICON_PATH = "/src/assets/images/smart_call_filter_icon_1780643784862.png";

const DEFAULT_CONFIG: AppConfig = {
  callScreeningEnabled: true,
  contactsPermissionGranted: true,
  smsPermissionGranted: true,
  blockUnknownCallers: true,
  allowedTimeStart: "08:00",
  allowedTimeEnd: "22:00",
  allowWeekendCalls: true,
  emergencyOverridePolicy: "repeated",
  customAutoSms: "Call Filter Alert: I am busy right now. If this is an urgent emergency, call me back immediately to bypass my filter."
};

const DEFAULT_CONTACTS: Contact[] = [
  { id: 'c1',  name: 'Mom ❤️',                  phoneNumber: '+1 (555) 123-4567', status: 'allow',  category: 'Family'    },
  { id: 'c2',  name: 'Dad 👨',                   phoneNumber: '+1 (555) 234-5678', status: 'allow',  category: 'Family'    },
  { id: 'c3',  name: 'Sister Priya',             phoneNumber: '+1 (555) 345-6789', status: 'allow',  category: 'Family'    },
  { id: 'c4',  name: 'Sarah (Office Boss)',       phoneNumber: '+1 (555) 987-6543', status: 'allow',  category: 'Work'      },
  { id: 'c5',  name: 'Rahul (Colleague)',         phoneNumber: '+1 (555) 456-7890', status: 'allow',  category: 'Work'      },
  { id: 'c6',  name: 'Anita (HR Manager)',        phoneNumber: '+1 (555) 567-8901', status: 'screen', category: 'Work'      },
  { id: 'c7',  name: 'Dr. Marcus (Dentist)',      phoneNumber: '+1 (555) 441-2090', status: 'allow',  category: 'Doctors'   },
  { id: 'c8',  name: 'Dr. Sharma (GP)',           phoneNumber: '+1 (555) 678-9012', status: 'allow',  category: 'Doctors'   },
  { id: 'c9',  name: 'Amit (Best Friend)',        phoneNumber: '+1 (555) 789-0123', status: 'allow',  category: 'Friends'   },
  { id: 'c10', name: 'Neha (College Friend)',     phoneNumber: '+1 (555) 890-1234', status: 'allow',  category: 'Friends'   },
  { id: 'c11', name: 'Vijay (Neighbor)',          phoneNumber: '+1 (555) 901-2345', status: 'screen', category: 'Friends'   },
  { id: 'c12', name: 'Fire & Rescue 🚒',          phoneNumber: '+1 (911) 000-0001', status: 'allow',  category: 'Emergency' },
  { id: 'c13', name: 'Ambulance 🚑',              phoneNumber: '+1 (911) 000-0002', status: 'allow',  category: 'Emergency' },
  { id: 'c14', name: 'Amazon Delivery',           phoneNumber: '+1 (888) 280-4331', status: 'screen', category: 'Delivery'  },
  { id: 'c15', name: 'Swiggy Rider',              phoneNumber: '+1 (555) 321-9988', status: 'screen', category: 'Delivery'  },
  { id: 'c16', name: 'Potential Robocaller',      phoneNumber: '+1 (800) 555-0199', status: 'block',  category: 'Spam'      },
  { id: 'c17', name: 'Insurance Spam Call',       phoneNumber: '+1 (800) 444-5555', status: 'block',  category: 'Spam'      },
  { id: 'c18', name: 'Credit Card Scam',          phoneNumber: '+1 (900) 123-4567', status: 'block',  category: 'Spam'      },
  { id: 'c19', name: 'Unknown Telemarketer',      phoneNumber: '+1 (877) 999-0000', status: 'block',  category: 'Spam'      },
  { id: 'c20', name: 'Ravi (School Friend)',      phoneNumber: '+1 (555) 654-3210', status: 'screen', category: 'Friends'   },
];

const PREPOPULATED_LOGS: LogEntry[] = [];

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const saved = localStorage.getItem('scf_language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const t = translations[language];

  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(() => {
    const saved = localStorage.getItem('scf_onboarding_done');
    // Default to true on first load to bypass the onboarding screen entirely
    return saved !== 'false';
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('scf_config');
    if (!saved) return DEFAULT_CONFIG;
    try {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('scf_contacts');
    if (!saved) return DEFAULT_CONTACTS;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : DEFAULT_CONTACTS;
    } catch {
      return DEFAULT_CONTACTS;
    }
  });

  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('scf_logs');
    if (!saved) return PREPOPULATED_LOGS;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => {
          const name = item.name || item.callerName || 'Unknown Caller';
          let decision = item.decision || '';
          if (!decision && item.actionCode) {
            const action = String(item.actionCode).toUpperCase();
            if (action.includes('SPAM') || action.includes('BLOCK')) {
              decision = 'BLOCKED';
            } else if (action.includes('ALLOW')) {
              decision = 'ALLOWED';
            } else if (action.includes('SCREEN')) {
              decision = 'SCREENED';
            } else {
              decision = 'BLOCKED';
            }
          }
          if (!decision) decision = 'SCREENED';
          
          const reason = item.reason || item.evaluationReason || 'Screened via local filter';
          const smsText = item.smsText || item.smsResponse || undefined;
          const smsSent = item.smsSent !== undefined ? item.smsSent : (smsText !== undefined);

          return {
            id: item.id || 'log_' + Math.random().toString(36).substring(2, 11),
            timestamp: item.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            name,
            phoneNumber: item.phoneNumber || 'Unknown',
            decision: decision as any,
            reason,
            smsSent,
            smsText,
            isEmergencyCall: item.isEmergencyCall,
            transcript: item.transcript
          };
        });
      }
    } catch (e) {
      console.error("Error parsing logs:", e);
    }
    return PREPOPULATED_LOGS;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'simulator'>('home');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Sync state with localstorage
  useEffect(() => {
    localStorage.setItem('scf_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('scf_onboarding_done', String(onboardingComplete));
  }, [onboardingComplete]);

  useEffect(() => {
    localStorage.setItem('scf_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('scf_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('scf_logs', JSON.stringify(logs));
  }, [logs]);

  // Keep a digital clock ticking to represent local on-device screening reference
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOnboardingComplete = (completedConfig: AppConfig, completedContacts: Contact[]) => {
    setConfig(completedConfig);
    if (completedContacts.length > 0) {
      setContacts(completedContacts);
    }
    setOnboardingComplete(true);
  };

  const handleResetOnboarding = () => {
    const confirmMsg = language === 'hi' 
      ? t.onboardingReConfirm 
      : "Are you sure you want to test the onboarding wizard flow again? Your configuration details will be reset.";
    
    if (confirm(confirmMsg)) {
      setOnboardingComplete(false);
      setConfig(DEFAULT_CONFIG);
      setContacts(DEFAULT_CONTACTS);
      setLogs(PREPOPULATED_LOGS);
    }
  };

  const handleAddLog = (newLog: LogEntry) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleAddSampleLogs = () => {
    const decisions: Array<'ALLOWED' | 'SCREENED' | 'BLOCKED'> = ['ALLOWED', 'SCREENED', 'BLOCKED'];
    const names = ['Mom ❤️', 'Potential Robocaller', 'Unknown Stranger', 'Dr. Sharma', 'Rahul Kumar', 'Priya Verma', 'Insurance Spam', 'Amazon Delivery'];
    const phones = ['+1 (555) 123-4567', '+1 (800) 555-0199', '+1 (555) 304-9423', '+1 (555) 678-9012', '+1 (555) 456-7890', '+1 (555) 567-8901', '+1 (800) 444-5555', '+1 (888) 280-4331'];
    const reasons = [
      'Caller on local Allowlist matches',
      'Number found in spam database',
      'Unknown caller outside authorized hours',
      'Blocked by user rule',
      'Repeated call — emergency bypass granted',
    ];
    const mockLogs: LogEntry[] = Array.from({ length: 12 }).map((_, i) => {
      const decision = decisions[i % 3];
      const now = new Date(Date.now() - i * 5 * 60000);
      return {
        id: 'sample_' + Date.now() + '_' + i,
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        name: names[i % names.length],
        phoneNumber: phones[i % phones.length],
        decision,
        reason: reasons[i % reasons.length],
        smsSent: decision === 'SCREENED',
        smsText: decision === 'SCREENED' ? 'I am busy right now. Will call back soon.' : undefined,
      };
    });
    setLogs((prev) => [...mockLogs, ...prev]);
  };

  // State Counts for ShieldStatus display
  const allowedLogCount = logs.filter((l) => {
    const dec = (l.decision || '').toUpperCase();
    return dec === 'ALLOWED' || dec.includes('BYPASS') || dec.includes('ALLOW');
  }).length;
  
  const blockedLogCount = logs.filter((l) => {
    const dec = (l.decision || '').toUpperCase();
    return dec === 'BLOCKED' || dec.includes('SPAM') || dec.includes('SILENCE') || dec.includes('BLOCK');
  }).length;
  
  const screenedLogCount = logs.filter((l) => {
    const dec = (l.decision || '').toUpperCase();
    return dec === 'SCREENED' || dec.includes('SCREEN');
  }).length;

  if (!onboardingComplete) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete} 
        generatedIconPath={APP_ICON_PATH} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div id="app-root-container" className="min-h-full text-slate-100 flex flex-col justify-between relative selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Background soft glowing lights fitting the black theme */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* MINIMAL MOBILE TOP BAR */}
      <header id="nav-header" className="relative z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 pt-10 pb-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center p-0.5 relative overflow-hidden shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5 text-white absolute shrink-0 drop-shadow-md z-10" />
            <img 
               src={APP_ICON_PATH} 
               alt="Logo" 
               className="w-full h-full object-cover rounded-md opacity-40"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black uppercase tracking-tight text-white leading-none">{t.appName}</h1>
            <span className="text-[8px] text-slate-400 font-bold mt-0.5">{currentTime || '08:00:00 AM'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center justify-center w-8 h-8 bg-slate-900 border border-slate-800 rounded-full text-slate-300 hover:text-white transition"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetOnboarding}
            className="flex items-center justify-center w-8 h-8 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white transition"
            title="Reset Settings"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MOBILE CONTENT AREA */}
      <main className="relative flex-1 w-full mx-auto p-4 pb-24 overflow-y-auto custom-scrollbar flex flex-col gap-6 z-10">
        
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            <ShieldStatus 
              isEnabled={config.callScreeningEnabled}
              onToggle={() => setConfig({ ...config, callScreeningEnabled: !config.callScreeningEnabled })}
              allowedCount={allowedLogCount}
              blockedCount={blockedLogCount}
              screenedCount={screenedLogCount}
              language={language}
            />
            <SettingsPanel config={config} onChange={setConfig} language={language} />
            
            <div className="text-center text-[9px] text-slate-500 font-sans font-bold leading-normal pt-4">
              {language === 'hi' 
                ? "स्मार्ट कॉल फ़िल्टर © 2026. सुरक्षा नियम केवल लोकल मेमोरी में एनक्रिप्टेड रन करते हैं।"
                : "Smart Call Filter © 2026. Security rules evaluated locally."
              }
            </div>
          </div>
        )}
        
        {activeTab === 'contacts' && (
          <div className="animate-fade-in">
            <ContactsManager contacts={contacts} onUpdate={setContacts} language={language} />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fade-in pb-10">
            <CallSimulator 
              config={config} 
              contacts={contacts} 
              onAddLog={handleAddLog} 
              language={language}
            />
            <LogsTable 
              logs={logs} 
              onClear={handleClearLogs} 
              onLoadMock={handleAddSampleLogs} 
              language={language}
            />
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="absolute bottom-0 inset-x-0 h-16 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 z-50 rounded-b-[3rem] px-6">
        <div className="flex justify-between items-center h-full max-w-sm mx-auto">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${activeTab === 'home' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <ShieldCheck className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'home' ? 'scale-110' : ''}`} />
            <span className="text-[8px] font-bold tracking-wider uppercase">
              {language === 'hi' ? 'कवच' : 'Shield'}
            </span>
          </button>

          <button onClick={() => setActiveTab('contacts')} className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${activeTab === 'contacts' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <Users className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'contacts' ? 'scale-110' : ''}`} />
            <span className="text-[8px] font-bold tracking-wider uppercase">
              {language === 'hi' ? 'सुरक्षित सूची' : 'Allow List'}
            </span>
          </button>
          
          <button onClick={() => setActiveTab('simulator')} className={`flex flex-col items-center justify-center w-20 gap-1 transition-colors ${activeTab === 'simulator' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <div className={`p-1.5 rounded-full transition-all duration-300 ${activeTab === 'simulator' ? 'bg-indigo-600 text-white scale-105' : 'bg-slate-800 text-slate-400'}`}>
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold tracking-wider uppercase">
              {language === 'hi' ? 'सिम और लॉग्स' : 'Sim & Logs'}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
