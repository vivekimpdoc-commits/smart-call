import { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  Smartphone, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  Info,
  Globe
} from 'lucide-react';
import { OnboardingStep, AppConfig, Contact } from '../types';
import { translations } from '../translations';

interface OnboardingFlowProps {
  onComplete: (config: AppConfig, initialContacts: Contact[]) => void;
  generatedIconPath: string;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export default function OnboardingFlow({ 
  onComplete, 
  generatedIconPath,
  language,
  setLanguage
}: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const t = translations[language];
  
  // Local state for setup during onboarding
  const [screeningRule, setScreeningRule] = useState<boolean>(true);
  const [contactsPermission, setContactsPermission] = useState<boolean>(false);
  const [smsPermission, setSmsPermission] = useState<boolean>(false);
  const [blockUnknown, setBlockUnknown] = useState<boolean>(true);
  
  // OS simulated prompts state
  const [showOSDialog, setShowOSDialog] = useState<'none' | 'role' | 'contacts' | 'sms'>('none');

  const stepsList: OnboardingStep[] = [
    'welcome',
    'privacy',
    'role-setup',
    'contacts-setup',
    'sms-setup',
    'summary'
  ];

  const currentStepIndex = stepsList.indexOf(step);

  const handleNext = () => {
    if (currentStepIndex < stepsList.length - 1) {
      setStep(stepsList[currentStepIndex + 1]);
    } else {
      // Completed, initialize the application state with Hindi or English texts
      const initialContacts: Contact[] = [
        { id: 'c1', name: language === 'hi' ? 'माताजी ❤️' : 'Mom ❤️', phoneNumber: '+1 (555) 123-4567', status: 'allow', category: 'Family' },
        { id: 'c2', name: language === 'hi' ? 'सारा (ऑफिस बॉस)' : 'Sarah (Office boss)', phoneNumber: '+1 (555) 987-6543', status: 'allow', category: 'Work' },
        { id: 'c3', name: language === 'hi' ? 'डॉ. मार्कस (दंत चिकित्सक)' : 'Dr. Marcus (Dentist)', phoneNumber: '+1 (555) 441-2090', status: 'allow', category: 'Work' },
        { id: 'c4', name: language === 'hi' ? 'डेविड (डिलीवरी)' : 'David (Delivery)', phoneNumber: '+1 (555) 777-8899', status: 'screen', category: 'Friends' },
        { id: 'c5', name: language === 'hi' ? 'संभावित स्पैम नंबर' : 'Potential Robocaller', phoneNumber: '+1 (800) 555-0199', status: 'block', category: 'Spam' },
      ];

      const defaultCustomSms = language === 'hi' 
        ? 'कॉल फ़िल्टर चेतावनी: मैं अभी व्यस्त हूँ। यदि यह कोई गंभीर आपातकाल है, तो सुरक्षा घेरा बायपास करने के लिए कृपया मुझे तुरंत दोबारा कॉल करें।'
        : 'Call Filter Alert: I am busy right now. If this is an urgent emergency, call me back immediately to bypass my filter.';

      onComplete({
        callScreeningEnabled: screeningRule,
        contactsPermissionGranted: contactsPermission,
        smsPermissionGranted: smsPermission,
        blockUnknownCallers: blockUnknown,
        allowedTimeStart: '08:00',
        allowedTimeEnd: '21:05',
        allowWeekendCalls: true,
        emergencyOverridePolicy: 'repeated',
        customAutoSms: defaultCustomSms
      }, contactsPermission ? initialContacts : []);
    }
  };

  const handleSkip = () => {
    const initialContacts: Contact[] = [
      { id: 'c1', name: language === 'hi' ? 'माताजी ❤️' : 'Mom ❤️', phoneNumber: '+1 (555) 123-4567', status: 'allow', category: 'Family' },
      { id: 'c2', name: language === 'hi' ? 'सारा (ऑफिस बॉस)' : 'Sarah (Office boss)', phoneNumber: '+1 (555) 987-6543', status: 'allow', category: 'Work' },
      { id: 'c3', name: language === 'hi' ? 'डॉ. मार्कस (दंत चिकित्सक)' : 'Dr. Marcus (Dentist)', phoneNumber: '+1 (555) 441-2090', status: 'allow', category: 'Work' },
      { id: 'c4', name: language === 'hi' ? 'डेविड (डिलीवरी)' : 'David (Delivery)', phoneNumber: '+1 (555) 777-8899', status: 'screen', category: 'Friends' },
      { id: 'c5', name: language === 'hi' ? 'संभावित स्पैम नंबर' : 'Potential Robocaller', phoneNumber: '+1 (800) 555-0199', status: 'block', category: 'Spam' },
    ];

    const defaultCustomSms = language === 'hi' 
      ? 'कॉल फ़िल्टर चेतावनी: मैं अभी व्यस्त हूँ। यदि यह कोई गंभीर आपातकाल है, तो सुरक्षा घेरा बायपास करने के लिए कृपया मुझे तुरंत दोबारा कॉल करें।'
      : 'Call Filter Alert: I am busy right now. If this is an urgent emergency, call me back immediately to bypass my filter.';

    onComplete({
      callScreeningEnabled: true,
      contactsPermissionGranted: true,
      smsPermissionGranted: true,
      blockUnknownCallers: true,
      allowedTimeStart: '08:00',
      allowedTimeEnd: '21:05',
      allowWeekendCalls: true,
      emergencyOverridePolicy: 'repeated',
      customAutoSms: defaultCustomSms
    }, initialContacts);
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setStep(stepsList[currentStepIndex - 1]);
    }
  };

  const triggerRolePermission = () => {
    setShowOSDialog('role');
  };

  const triggerContactsPermission = () => {
    setShowOSDialog('contacts');
  };

  const triggerSmsPermission = () => {
    setShowOSDialog('sms');
  };

  const acceptOSPermission = (type: 'role' | 'contacts' | 'sms') => {
    if (type === 'role') {
      setScreeningRule(true);
    } else if (type === 'contacts') {
      setContactsPermission(true);
    } else if (type === 'sms') {
      setSmsPermission(true);
    }
    setShowOSDialog('none');
  };

  return (
    <div id="onboarding-container" className="min-h-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 pt-10 relative">
      {/* Absolute Backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950/10 to-slate-950/80 opacity-90 pointer-events-none" />

      {/* Main card panel styled beautifully as black element */}
      <div id="onboarding-card" className="relative w-full max-w-xl bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 text-white">
        
        {/* Header Indicator Dots + Language Switcher pill */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-1.5 justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span className="text-xs uppercase tracking-widest font-black text-slate-350">{t.onboardingTitle}</span>
            </div>

            {/* Micro Dual Pill language toggle inside onboarding card */}
            <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold leading-none cursor-pointer transition-all ${
                  language === 'en' 
                    ? 'bg-indigo-650 bg-indigo-600 text-white shadow font-sans' 
                    : 'text-slate-400 hover:text-white font-sans'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold leading-none cursor-pointer transition-all ${
                  language === 'hi' 
                    ? 'bg-indigo-650 bg-indigo-600 text-white shadow font-sans' 
                    : 'text-slate-400 hover:text-white font-sans'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="flex space-x-1.5 justify-center sm:justify-start">
            {stepsList.map((st, i) => (
              <div 
                key={st} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStepIndex 
                    ? 'w-8 bg-indigo-500' 
                    : i < currentStepIndex 
                      ? 'w-2 bg-indigo-500/40' 
                      : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP CONTENT SWITCH */}
        {step === 'welcome' && (
          <div id="step-welcome" className="space-y-6 text-center py-4 flex flex-col items-center animate-fade-in">
            <div className="relative group w-28 h-28 rounded-3xl p-0.5 border border-slate-800 bg-slate-950 shadow-md overflow-hidden mb-2">
              <img 
                src={generatedIconPath} 
                alt="Smart Call Filter Icon" 
                className="w-full h-full object-cover rounded-3xl hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/30 rounded-3xl pointer-events-none border border-indigo-500/10">
                <ShieldCheck className="w-14 h-14 text-indigo-400 drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">{t.welcomeHeading}</h1>
              <p className="text-indigo-305 text-indigo-300 font-extrabold tracking-wider text-[11px] uppercase bg-indigo-500/10 py-1.5 px-4 rounded-full inline-block border border-indigo-500/10">
                {language === 'hi' ? "शोर को शांत करें। अपने कनेक्शन को सुरक्षित करें।" : "Silence the noise. Secure your connection."}
              </p>
            </div>

            <p className="text-slate-350 text-sm md:text-base leading-relaxed max-w-md mx-auto font-medium font-sans">
              {t.welcomeDesc}
            </p>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 w-full flex items-center gap-4 text-left shadow-md">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 font-sans">{t.welcomeLockHeading}</h4>
                <p className="text-xs text-slate-400 font-medium font-sans">{t.welcomeLockDesc}</p>
              </div>
            </div>

            {/* Quick start shortcut button */}
            <div className="pt-2 w-full">
              <button
                type="button"
                onClick={handleSkip}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-550 hover:to-violet-550 text-white shadow-xl shadow-indigo-500/15 border border-indigo-500 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 font-sans"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>{language === 'hi' ? 'क्विक स्टार्ट - सीधे डैशबोर्ड पर जाएं' : 'Quick Start - Skip Setup'}</span>
              </button>
            </div>
          </div>
        )}

        {step === 'privacy' && (
          <div id="step-privacy" className="space-y-5 animate-fade-in text-xs">
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block">Privacy Guarantee</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{t.privacyHeading}</h2>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-semibold">
              {t.privacyDesc}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <Users className="w-6 h-6 text-indigo-405 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white font-sans">{t.privacyContactsTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{t.privacyContactsDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <Smartphone className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white font-sans">{t.privacyDecisionsTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{t.privacyDecisionsDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <Lock className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white font-sans">{t.privacyLogsTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{t.privacyLogsDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'role-setup' && (
          <div id="step-role" className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block font-sans">OS Integration</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{t.roleHeading}</h2>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-semibold">
              {t.roleSubtitle}
            </p>

            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-md">
              <div className="mx-auto w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-200 font-sans">Call Screening Default Status</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">Required to prevent incoming disturbance during restricted times.</p>
              </div>

              <button 
                type="button"
                onClick={triggerRolePermission}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  screeningRule 
                    ? 'bg-indigo-550/10 bg-indigo-505/10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow shadow-indigo-500/10'
                }`}
              >
                {screeningRule ? t.roleBtnActive : t.roleBtnPrompt}
              </button>
            </div>

            <div className="flex gap-3 items-start bg-indigo-950/35 border border-indigo-500/10 p-4 rounded-xl">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <p id="role-info-card" className="text-[11px] text-slate-350 leading-relaxed font-medium">
                {t.roleBannerText}
              </p>
            </div>
          </div>
        )}

        {step === 'contacts-setup' && (
          <div id="step-contacts" className="space-y-5 animate-fade-in text-xs">
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block font-sans">Core Allow Rules</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{t.contactsHeading}</h2>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-semibold">
              {t.contactsSubtitle}
            </p>

            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xs">
              <div className="mx-auto w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-wide text-white font-sans">Address Book Read Permission</h3>
                <p className="text-xs text-slate-400 font-semibold font-sans">{t.contactsFooterText}</p>
              </div>

              <button
                type="button"
                onClick={triggerContactsPermission}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  contactsPermission 
                    ? 'bg-indigo-505/10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/35' 
                    : 'bg-indigo-600 hover:bg-indigo-505 text-white hover:bg-indigo-500 hover:shadow shadow-indigo-500/20'
                }`}
              >
                {contactsPermission ? t.contactsBtnActive : t.contactsBtnPrompt}
              </button>
            </div>

            <div className="flex gap-4 justify-center text-[10.5px] text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider"><Lock className="w-4 h-4 text-indigo-400" /> Local Evaluation</div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Selective Allow Rules</div>
            </div>
          </div>
        )}

        {step === 'sms-setup' && (
          <div id="step-sms" className="space-y-5 animate-fade-in text-xs">
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block font-sans">Optional Emergency Override</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{t.smsHeading}</h2>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-semibold">
              {t.smsSubtitle}
            </p>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-250 text-slate-300">Simulate SMS Alert Permission</span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-md uppercase tracking-wider font-extrabold font-mono">OPTIONAL</span>
              </div>
              
              <button
                type="button"
                onClick={triggerSmsPermission}
                className={`w-full py-3 px-4 rounded-xl text-xs font-black font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  smsPermission 
                    ? 'bg-indigo-505/10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/35' 
                    : 'bg-indigo-650 hover:bg-indigo-600 text-white scroll-py-8 border border-slate-800'
                }`}
              >
                {smsPermission ? t.smsBtnActive : t.smsBtnPrompt}
              </button>
            </div>

            <div className="border border-amber-500/20 bg-amber-505/5 bg-amber-500/5 rounded-xl p-4 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-black uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.smsBannerTitle}</span>
              </div>
              <p className="text-[11px] text-amber-500/80 leading-relaxed font-medium">
                {t.smsBannerDesc}
              </p>
            </div>
          </div>
        )}

        {step === 'summary' && (
          <div id="step-summary" className="space-y-5 animate-fade-in text-xs">
            <div className="space-y-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block font-sans">Setup Review</span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{t.reviewHeading}</h2>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed font-semibold">
              {t.reviewSubtitle}
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 divide-y divide-slate-850 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t.reviewIntegration}</span>
                <span className="font-mono text-indigo-400 font-black">{screeningRule ? t.reviewIntegrationActive : t.reviewIntegrationInactive}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t.reviewContacts}</span>
                <span className="font-mono text-indigo-400 font-black">{contactsPermission ? t.reviewContactsActive : t.reviewContactsInactive}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t.reviewSms}</span>
                <span className="font-mono text-indigo-400 font-black">{smsPermission ? t.reviewSmsActive : t.reviewSmsInactive}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-slate-850">
                <span className="text-slate-400 font-bold uppercase tracking-wider">{t.reviewBlockUnknown}</span>
                <span className="font-mono text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={blockUnknown}
                    onChange={(e) => setBlockUnknown(e.target.checked)} 
                    className="accent-indigo-600 w-4 h-4 rounded cursor-pointer"
                  />
                </span>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-lg text-center shadow-xs">
              <p id="local-status-note" className="text-[10px] text-slate-400 leading-normal font-sans">
                {t.reviewSandboxNote}
              </p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between font-sans">
          {currentStepIndex === 0 ? (
            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 border border-indigo-500/15 cursor-pointer transition-all font-semibold font-sans"
            >
              {language === 'hi' ? 'क्विक स्टार्ट (सेटअप छोड़ें)' : 'Quick Start (Skip Setup)'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                currentStepIndex === 0 
                  ? 'text-slate-600 cursor-not-allowed opacity-40' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> {t.backBtn}
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-indigo-650 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-full shadow-lg shadow-indigo-500/10 transition-all cursor-pointer border border-indigo-700"
          >
            {currentStepIndex === stepsList.length - 1 ? t.startDashboardBtn : t.continueBtn} 
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SIMULATED OS SYSTEM DLG WINDOW POPUPS (styled dark) */}
      {showOSDialog !== 'none' && (
        <div id="os-prompt-backdrop" className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in font-sans">
          <div id="os-prompt" className="w-full max-w-sm bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl p-5 space-y-4">
            
            {showOSDialog === 'role' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 rounded-full text-indigo-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm leading-tight">{t.osPromptRoleTitle}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">System request</p>
                  </div>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                  {t.osPromptRoleDesc}
                </p>
                <div className="flex justify-end gap-2.5 pt-2 text-xs font-sans">
                  <button 
                    type="button"
                    onClick={() => setShowOSDialog('none')}
                    className="px-4 py-2 text-slate-400 hover:text-white transition font-semibold cursor-pointer"
                  >
                    {t.osPromptClose}
                  </button>
                  <button 
                    type="button"
                    onClick={() => acceptOSPermission('role')}
                    className="px-4 py-2 bg-indigo-605 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-bold shadow-md cursor-pointer"
                  >
                    {t.osPromptRoleBtn}
                  </button>
                </div>
              </>
            )}

            {showOSDialog === 'contacts' && (
              <>
                <div className="flex items-center gap-3 font-sans">
                  <div className="p-2.5 bg-indigo-500/10 rounded-full text-indigo-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm leading-tight leading-normal">{t.osPromptContactsTitle}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In-app sandbox request</p>
                  </div>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                  {t.osPromptContactsDesc}
                </p>
                <div className="flex justify-end gap-2.5 pt-2 text-xs font-sans">
                  <button 
                    type="button"
                    onClick={() => {
                      setContactsPermission(false);
                      setShowOSDialog('none');
                    }}
                    className="px-4 py-2 text-slate-400 hover:text-white transition font-semibold cursor-pointer"
                  >
                    {t.osPromptDeny}
                  </button>
                  <button 
                    type="button"
                    onClick={() => acceptOSPermission('contacts')}
                    className="px-4 py-2 bg-indigo-605 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-bold shadow-md cursor-pointer"
                  >
                    {t.osPromptContactsBtn}
                  </button>
                </div>
              </>
            )}

            {showOSDialog === 'sms' && (
              <>
                <div className="flex items-center gap-3 font-sans">
                  <div className="p-2.5 bg-indigo-500/10 rounded-full text-indigo-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm leading-tight">{t.osPromptSmsTitle}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Automatic request</p>
                  </div>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                  {t.osPromptSmsDesc}
                </p>
                <div className="flex justify-end gap-2.5 pt-2 text-xs font-sans">
                  <button 
                    type="button"
                    onClick={() => {
                      setSmsPermission(false);
                      setShowOSDialog('none');
                    }}
                    className="px-4 py-2 text-slate-405 hover:text-white transition font-semibold cursor-pointer"
                  >
                    {t.osPromptDeny}
                  </button>
                  <button 
                    type="button"
                    onClick={() => acceptOSPermission('sms')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg transition font-bold shadow-md cursor-pointer"
                  >
                    {t.osPromptSmsBtn}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
