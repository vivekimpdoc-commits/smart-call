export interface TranslationType {
  appName: string;
  appSubtitle: string;
  reRunOnboarding: string;
  deviceCpuClock: string;
  localSandboxCpu: string;
  onboardingReConfirm: string;
  
  // Tabs
  tabRulesConfig: string;
  tabAllowList: string;
  tabDeviceLogs: string;

  // Shield Status
  shieldActive: string;
  shieldSuspended: string;
  shieldActiveDesc: string;
  shieldSuspendedDesc: string;
  disableFilter: string;
  enableFilter: string;
  statBypassed: string;
  statScreened: string;
  statBlocked: string;

  // Settings Panel
  authorizedWindow: string;
  authorizedWindowDesc: string;
  hoursStart: string;
  hoursEnd: string;
  weekendCalls: string;
  weekendCallsDesc: string;
  quietHoursAlert: string;
  screeningPolicies: string;
  screeningPoliciesDesc: string;
  blockUnknown: string;
  blockUnknownDesc: string;
  allowlistTip: string;
  emergencyPolicy: string;
  emergencyPolicyDesc: string;
  policyRepeated: string;
  policyRepeatedDesc: string;
  policyImmediate: string;
  policyImmediateDesc: string;
  policyNone: string;
  policyNoneDesc: string;
  customAutoReply: string;
  smsEnabled: string;
  smsPending: string;
  smsMissingTitle: string;
  smsMissingDesc: string;
  smsEnableBtn: string;

  // Contacts Manager
  addressBook: string;
  addressBookDesc: string;
  addContactBtn: string;
  cancelBtn: string;
  addRuleTitle: string;
  fullName: string;
  phoneNo: string;
  initialBehavior: string;
  groupCategory: string;
  alwaysAllow: string;
  screenCall: string;
  alwaysBlock: string;
  family: string;
  work: string;
  friends: string;
  spam: string;
  others: string;
  saveRule: string;
  filterRows: string;
  allRows: string;
  allowedTag: string;
  screenTag: string;
  blockedTag: string;
  noContacts: string;
  contactsTip: string;
  duplicateAlert: string;
  deleteRuleTitle: string;

  // Logs Table
  onDeviceLogs: string;
  onDeviceLogsDesc: string;
  mockLogsBtn: string;
  clearLogsBtn: string;
  searchLogsPlaceholder: string;
  noLogsMsg: string;
  noLogsTip: string;
  inferenceAction: string;
  deliveredSmsWarning: string;
  sandboxedDisclaimer: string;
  clearLogsConfirm: string;

  // Call Simulator
  screeningSandbox: string;
  onDeviceCpu: string;
  pickPersona: string;
  callerNameLabel: string;
  phoneNumberPrefix: string;
  simulateClock: string;
  simulateWeekend: string;
  simulateEmergency: string;
  simulateEmergencyDesc: string;
  launchSimBtn: string;
  evaluatingPolicy: string;
  rulesActive: string;
  incomingApproved: string;
  lineSecured: string;
  audioSecureStream: string;
  disconnectCall: string;
  reportSpam: string;
  voiceChannelAnalyzer: string;
  callerLabel: string;
  translatingVoice: string;
  blockSpamBtn: string;
  ringLineBtn: string;
  callSilenceTag: string;
  autoSmsResponse: string;
  silencedLoggedMsg: string;
  returnToSandbox: string;
  disconnectingCall: string;
  simulatorTip: string;
  customBypassText: string;

  // Onboarding
  getStarted: string;
  continueBtn: string;
  backBtn: string;
  startDashboardBtn: string;
  onboardingTitle: string;
  welcomeHeading: string;
  welcomeDesc: string;
  welcomeLockHeading: string;
  welcomeLockDesc: string;
  privacyHeading: string;
  privacyDesc: string;
  privacyContactsTitle: string;
  privacyContactsDesc: string;
  privacyDecisionsTitle: string;
  privacyDecisionsDesc: string;
  privacyLogsTitle: string;
  privacyLogsDesc: string;
  roleHeading: string;
  roleSubtitle: string;
  roleBtnActive: string;
  roleBtnPrompt: string;
  roleBannerText: string;
  contactsHeading: string;
  contactsSubtitle: string;
  contactsBtnActive: string;
  contactsBtnPrompt: string;
  contactsFooterText: string;
  smsHeading: string;
  smsSubtitle: string;
  smsBtnActive: string;
  smsBtnPrompt: string;
  smsBannerTitle: string;
  smsBannerDesc: string;
  reviewHeading: string;
  reviewSubtitle: string;
  reviewIntegration: string;
  reviewIntegrationActive: string;
  reviewIntegrationInactive: string;
  reviewContacts: string;
  reviewContactsActive: string;
  reviewContactsInactive: string;
  reviewSms: string;
  reviewSmsActive: string;
  reviewSmsInactive: string;
  reviewBlockUnknown: string;
  reviewSandboxNote: string;
  osPromptRoleTitle: string;
  osPromptRoleDesc: string;
  osPromptRoleBtn: string;
  osPromptContactsTitle: string;
  osPromptContactsDesc: string;
  osPromptContactsBtn: string;
  osPromptSmsTitle: string;
  osPromptSmsDesc: string;
  osPromptSmsBtn: string;
  osPromptClose: string;
  osPromptDeny: string;
}

export const translations: Record<'en' | 'hi', TranslationType> = {
  en: {
    appName: "Smart Call Filter",
    appSubtitle: "Silence the noise. Secure your connection.",
    reRunOnboarding: "RE-RUN ONBOARDING",
    deviceCpuClock: "Device CPU Clock",
    localSandboxCpu: "Local Sandbox CPU Time",
    onboardingReConfirm: "Are you sure you want to test the onboarding wizard flow again? Your configuration details will be reset.",
    
    tabRulesConfig: "RULES CONFIG",
    tabAllowList: "ALLOW LIST",
    tabDeviceLogs: "DEVICE LOGS",

    shieldActive: "Protection Shield Active",
    shieldSuspended: "Screener Safeguard Suspended",
    shieldActiveDesc: "Your device is actively filtering unrecognized lines, auto-evaluating bypassed contacts, and resolving robotic call payloads in offline memory.",
    shieldSuspendedDesc: "Standard filtering policies are idle. Caller verification, custom timers, and spam protection limits are inactive.",
    disableFilter: "DISABLE FILTER",
    enableFilter: "ACTIVATE PROTECTION",
    statBypassed: "Bypassed",
    statScreened: "Screened",
    statBlocked: "Blocked",

    authorizedWindow: "Authorized Allowed Window",
    authorizedWindowDesc: "Determine when callers can ring normally",
    hoursStart: "Active Hours Start",
    hoursEnd: "Active Hours End",
    weekendCalls: "Always Allow Weekend Calls",
    weekendCallsDesc: "Ignore quiet sleeping hours entirely on Saturday and Sunday.",
    quietHoursAlert: "Calls incoming outside authorized hours will have standard quiet-mode enforced. Callers will be silenced unless they satisfy emergency override patterns callback.",
    screeningPolicies: "Line Screening Policies",
    screeningPoliciesDesc: "Limit who is permitted to trigger handset ringtones",
    blockUnknown: "Block / Filter Unknown Callers",
    blockUnknownDesc: "Intercept and screen numbers that are missing in local contacts database.",
    allowlistTip: "Any Local Contact configured inside the \"Allow List\" bypasses quiet blocks. Toggle status tags to individual contacts in the allow list panel to verify credentials dynamically.",
    emergencyPolicy: "Emergency Override Policy",
    emergencyPolicyDesc: "Establish exceptions for bypass rules",
    policyRepeated: "Repeated Caller Bypass (Recommended)",
    policyRepeatedDesc: "Let calls slip past quiet-mode if a number redials within a 3-minute window (emergency pattern).",
    policyImmediate: "Allow List Contacts Only",
    policyImmediateDesc: "Only ring when called by specific Allowlisted contacts. Do not trigger repeated-bypasses.",
    policyNone: "No Override (Strict Silence)",
    policyNoneDesc: "Never allow quiet hours to be bypassed by unknown lines, even when multiple call attempts occur.",
    customAutoReply: "Custom Auto-Reply SMS",
    smsEnabled: "SMS ENABLED",
    smsPending: "PENDING",
    smsMissingTitle: "SMS Permission Missing",
    smsMissingDesc: "Enable simulated SMS sending so the standard call blocks can deliver auto-reply templates automatically.",
    smsEnableBtn: "Enable Simulated SMS Auto-Replies",

    addressBook: "Device Address Book",
    addressBookDesc: "Register and audit standard telephone bypass privileges",
    addContactBtn: "ADD CONTACT",
    cancelBtn: "CANCEL",
    addRuleTitle: "Create Local Access Rule",
    fullName: "Full Name",
    phoneNo: "Phone Number",
    initialBehavior: "Initial Rule Behavior",
    groupCategory: "Group Category Tag",
    alwaysAllow: "ALWAYS ALLOW (Bypass directly)",
    screenCall: "SCREEN CALL (Simulate dynamic screening)",
    alwaysBlock: "ALWAYS BLOCK (Send to logs immediately)",
    family: "Family ❤️",
    work: "Work 💼",
    friends: "Friends 👋",
    spam: "Spam/Robo 🛡️",
    others: "Others 🏷️",
    saveRule: "Save New Role",
    filterRows: "Filter list:",
    allRows: "All Rows",
    allowedTag: "ALLOWED",
    screenTag: "SCREEN",
    blockedTag: "BLOCKED",
    noContacts: "No contacts registered in this status filter.",
    contactsTip: "Touch the status keys (e.g. ALLOWED / SCREEN / BLOCKED) to dynamically alternate how that specific caller profile is evaluated by our standard quiet mode screener framework.",
    duplicateAlert: "This phone number is already registered in local database.",
    deleteRuleTitle: "Delete custom bypass privilege rule",

    onDeviceLogs: "On-Device Screen Logs",
    onDeviceLogsDesc: "Inspect real-time protection resolution outputs",
    mockLogsBtn: "MOCK INCOMING LOGS",
    clearLogsBtn: "CLEAR LOGS",
    searchLogsPlaceholder: "Search log history registry...",
    noLogsMsg: "No secure events logged yet.",
    noLogsTip: "Go click 'Simulate Weekend' / 'Simulate Emergency' or type any number inside the Call Simulator to trigger call block algorithms.",
    inferenceAction: "Inference Action:",
    deliveredSmsWarning: "Delivered Auto-SMS Warning:",
    sandboxedDisclaimer: "Locally Sandboxed: Your complete communications database, telephone records, and audio transcripts are resolved. They never exit secure device sandbox contexts, minimizing remote vulnerabilities.",
    clearLogsConfirm: "Are you sure you want to delete all historical logs on this device? This action is irreversible.",

    screeningSandbox: "Screening Sandbox",
    onDeviceCpu: "ON-DEVICE CPU",
    pickPersona: "Pick Caller Persona:",
    callerNameLabel: "Caller Name (Display)",
    phoneNumberPrefix: "Phone Number Prefix",
    simulateClock: "Simulate Clock Time",
    simulateWeekend: "Simulate Weekend",
    simulateEmergency: "Simulate Urgent Emergency (Bypass Policy)",
    simulateEmergencyDesc: "Bypasses standard quiet sleep hours if checked.",
    launchSimBtn: "Launch Call Screen Simulator",
    evaluatingPolicy: "Evaluating policy",
    rulesActive: "Smart screening rules active",
    incomingApproved: "INCOMING CALL APPROVED",
    lineSecured: "ACTIVE LINE SECURED",
    audioSecureStream: "LOCAL AUDIO SECURE STREAM",
    disconnectCall: "DISCONNECT CALL",
    reportSpam: "REPORT SPAM & BLOCK",
    voiceChannelAnalyzer: "VOICE CHANNEL ANALYZER",
    callerLabel: "Caller:",
    translatingVoice: "● TRANSLATING VOICE-TO-TEXT...",
    blockSpamBtn: "BLOCK SPAM",
    ringLineBtn: "RING LINE",
    callSilenceTag: "CALL SILENCED",
    autoSmsResponse: "Auto-SMS Response:",
    silencedLoggedMsg: "Silenced quietly. Caller payload logged to secure history log.",
    returnToSandbox: "Return to Sandbox",
    disconnectingCall: "Disconnecting Call...",
    simulatorTip: "Configure options in the Rules Config and Allow List panels, then hit Launch Call Screen Simulator to trace how our core on-device memory evaluates access bypasses in real-time.",
    customBypassText: "Quiet zone bypass",

    // Onboarding
    getStarted: "Get Started",
    continueBtn: "Continue",
    backBtn: "Back",
    startDashboardBtn: "Start Dashboard",
    onboardingTitle: "SMART CALL FILTER",
    welcomeHeading: "Smart Call Filter",
    welcomeDesc: "Empower your smartphone to block spam calls before they can ever ring. Designed exclusively around absolute on-device local privacy rules.",
    welcomeLockHeading: "100% Client-Side Engine",
    welcomeLockDesc: "Zero cloud database uploads. Absolute data ownership.",
    privacyHeading: "Privacy-First Architecture",
    privacyDesc: "Before configuring the app, we want you to know exactly how your sensitive data is handled under the hood. There are no background server hooks or analytic tracking databases:",
    privacyContactsTitle: "Allowed Contacts Rule Only",
    privacyContactsDesc: "Your address book contacts are only read locally strictly to compare incoming numbers against allowed status lists. We never transfer details off your device.",
    privacyDecisionsTitle: "Decisions Made Locally",
    privacyDecisionsDesc: "All phone number evaluation logic, status rules, and silent bypass calculations execute instantly in your device's secure sandbox memory.",
    privacyLogsTitle: "Permanent On-Device Logs",
    privacyLogsDesc: "Every blocked call notation and decision metadata log block stays safely encrypted strictly in on-device storage.",
    roleHeading: "Default Screening Role",
    roleSubtitle: "To intercept and verify calls before your smartphone alerts you, Smart Call Filter requires setting up the core OS Call Screening Role. This tells Android to pass calls to us first.",
    roleBtnActive: "✓ Default Role Assigned",
    roleBtnPrompt: "Simulate Role Request",
    roleBannerText: "By setting us as your Default Call Screener, standard phone alerts are bypassed when spam or restricted calls are recognized by the rules. You can toggle this role status anytime.",
    contactsHeading: "Synchronize Local Contacts",
    contactsSubtitle: "Your contact book items will be used strictly to construct local \"Always Allow\" rules. This ensures loved ones, family, or critical scheduled service numbers bypass quiet times instantly.",
    contactsBtnActive: "✓ Contacts Loaded Locally",
    contactsBtnPrompt: "Simulate Contacts Permission",
    contactsFooterText: "Address Book Read Permission used strictly on-device. No data collection or external synchronization.",
    smsHeading: "Automated SMS Actions",
    smsSubtitle: "Configure optional SMS rules. If a restricted call gets screened silently or blocked, our background service can automatically reply with guidance on how the caller can bypass your filters in real-time.",
    smsBtnActive: "✓ SMS Permissions Approved",
    smsBtnPrompt: "Simulate SMS Permission",
    smsBannerTitle: "Android Policy & Permission Compliance",
    smsBannerDesc: "SMS auto-reply features require explicit SMS Sending & Reception permission in the OS environment. Actions depend on Google Play Policy rules.",
    reviewHeading: "Ready to Secure Calls",
    reviewSubtitle: "Fantastic! Your local Smart Call Filter configuration is ready to execute. Here is your initial status overview:",
    reviewIntegration: "Call Screening Integration",
    reviewIntegrationActive: "ENABLED (ACTIVE ROLE)",
    reviewIntegrationInactive: "INACTIVE",
    reviewContacts: "Local Contacts Allowlist",
    reviewContactsActive: "GRANTED (AUTOLOAD ACTIVE)",
    reviewContactsInactive: "NOT GRANTED (MANUAL INPUT)",
    reviewSms: "Emergency SMS Bypass Option",
    reviewSmsActive: "ACTIVE",
    reviewSmsInactive: "INACTIVE (DISABLED)",
    reviewBlockUnknown: "Block Unknown Calls",
    reviewSandboxNote: "* All decisions are evaluated in sandbox memory. You can initiate full simulated incoming call sequences to inspect filters instantly.",
    osPromptRoleTitle: "Set default call screening agent?",
    osPromptRoleDesc: "Android will let Smart Call Filter identify spam, filter callers, and block unknown numbers before they trigger the default phone ring.",
    osPromptRoleBtn: "Set as Default",
    osPromptContactsTitle: "Allow Smart Call Filter to access your contacts?",
    osPromptContactsDesc: "Required to automatically categorize safe phone numbers and build allowlist tables. Your contact files remain entirely offline.",
    osPromptContactsBtn: "Allow",
    osPromptSmsTitle: "Allow Smart Call Filter to send and view SMS?",
    osPromptSmsDesc: "Used strictly to transmit configured auto-replies to blocked callers, advising them on emergency override guidelines. Standard carrier rates apply.",
    osPromptSmsBtn: "Allow",
    osPromptClose: "Cancel",
    osPromptDeny: "Don't Allow"
  },
  hi: {
    appName: "स्मार्ट कॉल फ़िल्टर",
    appSubtitle: "शोर को शांत करें। अपनी कॉल सुरक्षा को मजबूत करें।",
    reRunOnboarding: "शुरुआती सेटअप दोबारा चलाएं",
    deviceCpuClock: "डिवाइस सीपीयू क्लॉक",
    localSandboxCpu: "लोकल सैंडबॉक्स सक्रिय समय",
    onboardingReConfirm: "क्या आप वाकई शुरुआती सेटअप विज़ार्ड को फिर से देखना चाहते हैं? आपके वर्तमान नियम रीसेट हो जाएंगे।",
    
    tabRulesConfig: "नियम सेटिंग्स",
    tabAllowList: "सुरक्षित सूची",
    tabDeviceLogs: "कॉल लॉग्स",

    shieldActive: "सुरक्षा कवच सक्रिय है",
    shieldSuspended: "फ़िल्टर सुरक्षा निलंबित है",
    shieldActiveDesc: "आपका डिवाइस अपरिचित नंबरों को फ़िल्टर कर रहा है, सुरक्षित संपर्कों को सीधे पास दे रहा है, और स्पैम व रोबोटिक कॉल्स को लोकल मेमोरी में ब्लॉक कर रहा है।",
    shieldSuspendedDesc: "फ़िल्टर नीतियां निष्क्रिय हैं। अपरिचित कॉलर की जांच, म्यूट मोड और स्पैम सुरक्षा अभी काम नहीं कर रही है।",
    disableFilter: "सुरक्षा बंद करें",
    enableFilter: "सुरक्षा कवच चालू करें",
    statBypassed: "बायपास कॉल्स",
    statScreened: "जांचे गए कॉल्स",
    statBlocked: "ब्लॉक कॉल्स",

    authorizedWindow: "कॉल चालू रहने का समय",
    authorizedWindowDesc: "तय करें कि कॉलर किस समय सामान्य रूप से कॉल कर सकते हैं",
    hoursStart: "कॉल शुरू होने का समय",
    hoursEnd: "कॉल बंद होने का समय (म्यूट शुरू)",
    weekendCalls: "सप्ताहांत (शनि-रवि) कॉल की अनुमति",
    weekendCallsDesc: "शनिवार और रविवार को म्यूट आवर्स को पूरी तरह से अनदेखा करें।",
    quietHoursAlert: "म्यूट समय के दौरान आने वाली अपरिचित कॉल्स को म्यूट कर दिया जाएगा। कॉलर तब तक म्यूट रहेंगे जब तक वे आपातकालीन दोबारा कॉल (इमरजेंसी ओवरराइड) नियम को पूरा नहीं करते।",
    screeningPolicies: "कॉल सुरक्षा नीतियां",
    screeningPoliciesDesc: "तय करें कि किन कॉल्स को फ़ोन की घंटी बजाने की अनुमति है",
    blockUnknown: "अपरिचित कॉलर्स को ब्लॉक/फ़िल्टर करें",
    blockUnknownDesc: "उन नंबरों की जांच करें जो लोकल कॉन्टैक्ट बुक में मौजूद नहीं हैं।",
    allowlistTip: "सुरक्षित सूची (\"Allow List\") में सेव किया गया कोई भी कॉन्टैक्ट म्यूट मोड को बायपास कर सकता है। सूची में स्थिति को तुरंत बदलकर आप इस व्यवहार को टेस्ट कर सकते हैं।",
    emergencyPolicy: "आपातकालीन ओवरराइड नीति",
    emergencyPolicyDesc: "म्यूट मोड के दौरान आपातकालीन कॉल्स के मार्ग तय करें",
    policyRepeated: "दोबारा कॉल आपातकालीन बायपास (अनुशंसित)",
    policyRepeatedDesc: "अगर कोई नंबर 3 मिनट के भीतर लगातार दो बार कॉल करता है, तो सुरक्षा घेरा बायपास हो जाएगा और फ़ोन बज उठेगा।",
    policyImmediate: "केवल सुरक्षित सूची के संपर्क",
    policyImmediateDesc: "केवल सुरक्षित सूची में शामिल नंबरों की घंटी बजेगी। दोबारा कॉल करने वालों को बायपास नहीं मिलेगा।",
    policyNone: "कोई राहत नहीं (पूर्ण सन्नाटा)",
    policyNoneDesc: "म्यूट समय के दौरान किसी भी अपरिचित नंबर को घंटी बजाने की अनुमति नहीं मिलेगी, चाहे वे कितनी भी बार कॉल करें।",
    customAutoReply: "ऑटो-रिप्लाई एसएमएस संदेश",
    smsEnabled: "एसएमएस सक्रिय",
    smsPending: "पेंडिंग",
    smsMissingTitle: "एसएमएस भेजने की अनुमति नहीं है",
    smsMissingDesc: "ऑटो-एसएमएस भेजने की अनुमति दें ताकि ब्लॉक किए गए नंबरों को निर्देश संदेश अपने आप भेजा जा सके।",
    smsEnableBtn: "सिम्युलेटेड एसएमएस ऑटो-रिप्लाई सक्षम करें",

    addressBook: "डिवाइस संपर्क सूची (एड्रेस बुक)",
    addressBookDesc: "सुरक्षित संपर्क रजिस्टर करें जिन्हें म्यूट मोड में भी फ़ोन बजाने की छूट है",
    addContactBtn: "नया संपर्क जोड़ें",
    cancelBtn: "रद्द करें",
    addRuleTitle: "नया संपर्क बायपास नियम बनाएं",
    fullName: "पूरा नाम",
    phoneNo: 'फ़ोन नंबर',
    initialBehavior: "शुरुआती कॉल अनुमति नीति",
    groupCategory: "ग्रुप / केटेगरी टैग",
    alwaysAllow: "हमेशा अनुमति दें (सीधे घंटी बजेगी)",
    screenCall: "कॉल की जांच करें (कॉल स्क्रीनिंग)",
    alwaysBlock: "हमेशा ब्लॉक करें (सीधे ब्लॉक करके लॉग में भेजें)",
    family: "परिवार ❤️",
    work: "काम / ऑफिस 💼",
    friends: "मित्र 👋",
    spam: "स्पैम / रोबो 🛡️",
    others: "अन्य 🏷️",
    saveRule: "नियम सुरक्षित करें",
    filterRows: "सूची फ़िल्टर करें:",
    allRows: "सभी संपर्क",
    allowedTag: "स्वीकृत",
    screenTag: "स्क्रीनिंग",
    blockedTag: "ब्लॉक",
    noContacts: "इस फ़िल्टर के तहत कोई संपर्क नहीं मिला।",
    contactsTip: "किसी भी संपर्क की अनुमति स्थिति (जैसे स्वीकृत / स्क्रीनिंग / ब्लॉक) पर टैप करके आप तुरंत उनका कॉलिंग व्यवहार बदल सकते हैं।",
    duplicateAlert: "यह फ़ोन नंबर लोकल डेटाबेस में पहले से रजिस्टर्ड है।",
    deleteRuleTitle: "संपर्क नियम को हटाएं",

    onDeviceLogs: "ऑन-डिवाइस कॉल सुरक्षा लॉग्स",
    onDeviceLogsDesc: "रीयल-टाइम सुरक्षा एक्शन और विश्लेषण इतिहास देखें",
    mockLogsBtn: "डमी लॉग्स लोड करें",
    clearLogsBtn: "इतिहास मिटाएं",
    searchLogsPlaceholder: "लॉग इतिहास खोजें...",
    noLogsMsg: "अभी तक कोई कॉल लॉग उपलब्ध नहीं है।",
    noLogsTip: "दाईं ओर कॉल सिम्युलेटर में जाकर 'Simulate Weekend' / 'Simulate Emergency' बटन दबाएं या कॉल करके एल्गोरिथम को टेस्ट करें।",
    inferenceAction: "फ़िल्टर निर्णय तर्क:",
    deliveredSmsWarning: "भेजा गया ऑटो-एसएमएस चेतावनी संदेश:",
    sandboxedDisclaimer: "लोकल सुरक्षा: आपकी कॉल सूची, फोन रिकॉर्ड और बातचीत के ट्रांसक्रिप्ट पूरी तरह से ऑन-डिवाइस स्टोर रहते हैं। ये कभी भी क्लाउड सर्वर पर नहीं जाते हैं।",
    clearLogsConfirm: "क्या आप वाकई डिवाइस से कॉल और छानबीन इतिहास मिटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।",

    screeningSandbox: "कॉल फ़िल्टर सिम्युलेटर",
    onDeviceCpu: "ऑन-डिवाइस सीपीयू",
    pickPersona: "कॉलर प्रोफाइल चुनें:",
    callerNameLabel: "कॉलर का नाम (प्रदर्शन)",
    phoneNumberPrefix: "फ़ोन नंबर/प्रिफिक्स",
    simulateClock: "सिम्युलेटेड समय सेट करें",
    simulateWeekend: "शनिवार-रविवार टाइम सिम्युलेट करें",
    simulateEmergency: "गंभीर आपातकाल (इमरजेंसी ओवरराइड सक्रिय करें)",
    simulateEmergencyDesc: "टिक रहने पर म्यूट नियम को बायपास करके कॉल सीधे घंटी बजाएगा।",
    launchSimBtn: "कॉल स्क्रीन सिम्युलेटर शुरू करें",
    evaluatingPolicy: "पॉलिसी मूल्यांकन जारी है",
    rulesActive: "स्मार्ट कॉल फिल्टर चेकिंग एक्टिव है",
    incomingApproved: "कॉल स्वीकृत - फ़ोन की घंटी बज रही है",
    lineSecured: "कॉल कनेक्टेड - सुरक्षित बातचीत चालू है",
    audioSecureStream: "लोकल ऑडियो स्ट्रीम एनक्रिप्टेड है",
    disconnectCall: "कॉल डिस्कनेक्ट करें",
    reportSpam: "स्पैम रिपोर्ट करके ब्लॉक करें",
    voiceChannelAnalyzer: "वॉयस चैनल एनालाइज़र (संवाद ट्रैकिंग)",
    callerLabel: "कॉलर बोल रहा है:",
    translatingVoice: "● आवाज को हिंदी/इंग्लिश टेक्स्ट में अनुवादित किया जा रहा है...",
    blockSpamBtn: "स्पैम ब्लॉक करें",
    ringLineBtn: "घंटी बजाएं (पास दें)",
    callSilenceTag: "कॉल शांत कर दी गई (साइलेंस्ड)",
    autoSmsResponse: "भेजा गया ऑटो-एसएमएस जवाब:",
    silencedLoggedMsg: "कॉल को बिना डिस्टर्ब किए साइलेंट किया गया। कॉलर लॉग सुरक्षित किया गया है।",
    returnToSandbox: "सिम्युलेटर पर वापस जाएं",
    disconnectingCall: "कॉल काटा जा रहा है...",
    simulatorTip: "दाईं ओर या ऊपर उपलब्ध म्यूट टाइम या सुरक्षित सूची को सेट करें, फिर कॉल स्क्रीन सिम्युलेटर दबाकर रीयल-टाइम रेंडरिंग देखें।",
    customBypassText: "शांत अवधि बाईपास नीति",

    // Onboarding
    getStarted: "शुरू करें",
    continueBtn: "आगे बढ़ें",
    backBtn: "पीछे जाएं",
    startDashboardBtn: "डैशबोर्ड शुरू करें",
    onboardingTitle: "स्मार्ट कॉल फ़िल्टर",
    welcomeHeading: "स्मार्ट कॉल फ़िल्टर",
    welcomeDesc: "स्पैम और रोबोटिक कॉल्स को फोन की घंटी बजाने से पहले ही म्यूट करें। पूरी तरह से लोकल गोपनीयता तकनीकों पर आधारित अत्यंत सुरक्षित कॉलिंग अनुभव।",
    welcomeLockHeading: "100% ऑन-डिवाइस प्रोसेसिंग",
    welcomeLockDesc: "कोई क्लाउड अपलोड नहीं। आपका डेटा विशेष रूप से केवल आपका अधिकार है।",
    privacyHeading: "गोपनीयता सर्वोच्च प्राथमिकता",
    privacyDesc: "ऐप सेट करने से पहले, हम आपको स्पष्ट रूप से बताना चाहते हैं कि आपका संवेदनशील डेटा कैसे प्रोसेस किया जाता है। हमारे पास कोई क्लाउड सर्वर या ट्रैकिंग डेटाबेस नहीं है:",
    privacyContactsTitle: "संपर्क पहचान केवल लोकल",
    privacyContactsDesc: "आपके फोन के संपर्क फ़ाइलों को केवल सुरक्षित संपर्कों की तुलना करने के लिए बिना इंटरनेट स्थानीय रूप से पढ़ा जाता है। कोई निजी जानकारी आपके फोन से बाहर नहीं जाती।",
    privacyDecisionsTitle: "निर्णय तुरंत ऑन-डिवाइस",
    privacyDecisionsDesc: "घंटी म्यूट करने, ब्लॉक करने अथवा स्क्रीनिंग करने की सभी गणनाएं तुरंत फोन की रैम (RAM) के अंदर एनक्रिप्टेड की जाती हैं।",
    privacyLogsTitle: "सुरक्षित लोकल लॉग्स",
    privacyLogsDesc: "ब्लॉक की गई कॉल का इतिहास और निर्णय के कारण संपूर्ण रूप से केवल आपके डिवाइस पर ही स्टोर रहते हैं।",
    roleHeading: "डिफ़ॉल्ट कॉल स्क्रीनिंग रोल (योगदान)",
    roleSubtitle: "स्मार्टफोन अलर्ट देने से पहले नंबरों को जांचने के लिए, ऐप को डिफ़ॉल्ट 'कॉल स्क्रीनिंग' सर्विस नियुक्त करना आवश्यक है। इससे कॉल सबसे पहले हमारे फ़िल्टर मॉड्यूल में प्रवेश करती है।",
    roleBtnActive: "✓ डिफ़ॉल्ट रोल सेट हो गया",
    roleBtnPrompt: "डिफ़ॉल्ट रोल सेट करने की अनुमति दें",
    roleBannerText: "हमें डिफ़ॉल्ट स्क्रीनिंग एजेंट के रूप में सेट करने से, फ़ोन की घंटी बजने से पहले ही स्पैम कॉल ब्लॉक हो जाती है। आप इसे बाद में सेटिंग्स से बदल सकते हैं।",
    contactsHeading: "लोकल कॉन्टैक्ट्स लोड करें",
    contactsSubtitle: "आपके महत्वपूर्ण नंबरों को सीधे सुरक्षित सूची (Allow List) में ट्रांसफर किया जाता है। इससे म्यूट मोड एक्टिव होने पर भी आपके परिजनों के महत्वपूर्ण कॉल तुरंत बज उठते हैं।",
    contactsBtnActive: "✓ कॉन्टैक्ट बुक्स लोड हो गई",
    contactsBtnPrompt: "संपर्क देखने की अनुमति दें",
    contactsFooterText: "संपर्क नियम केवल लोकल डेटाबेस में सुरक्षित रहते हैं। कोई बाहरी साझाकरण नहीं होता।",
    smsHeading: "स्वचालित एसएमएस कार्रवाई",
    smsSubtitle: "वैकल्पिक रूप से ऑटो-एसएमएस जवाब सेट करें। कॉल ब्लॉक होने पर म्यूट कॉलर को तुरंत एक ऑटो-रिप्लाई भेजा जाएगा जिसमें उन्हें पास कोड (दोबारा कॉल) नियम की जानकारी दी जाएगी।",
    smsBtnActive: "✓ एसएमएस अनुमति स्वीकृत",
    smsBtnPrompt: "एसएमएस अनुमति प्रदान करें",
    smsBannerTitle: "एंड्रॉइड पॉलिसी और सहमति सुरक्षा नियम",
    smsBannerDesc: "कॉल कटने पर कॉलर को सूचित संदेश भेजने के लिए एसएमएस (SMS SEND/RECEIVE) सर्विस का लोकल इस्तेमाल किया जाता है। सामान्य ऑपरेटर दरें लागू हो सकती हैं।",
    reviewHeading: "सुरक्षा के लिए तैयार",
    reviewSubtitle: "अद्भुत! आपकी लोकल स्मार्ट कॉल फ़िल्टर कॉन्फ़िगरेशन सक्रिय होने के लिए पूरी तरह से तैयार है। यहाँ एक त्वरित विश्लेषण है:",
    reviewIntegration: "कॉल स्क्रीनिंग सर्विस स्थिति",
    reviewIntegrationActive: "सक्रिय (डिफ़ॉल्ट रोल)",
    reviewIntegrationInactive: "निष्क्रिय",
    reviewContacts: "लोकल संपर्क सुरक्षित सूची",
    reviewContactsActive: "स्वीकृत (ऑटो-लोड ऑन)",
    reviewContactsInactive: "अस्वीकृत (मैनुअल इनपुट मोड)",
    reviewSms: "ऑटो-एसएमएस जवाब व्यवहार",
    reviewSmsActive: "सक्रिय",
    reviewSmsInactive: "निष्क्रिय (बंद)",
    reviewBlockUnknown: "अपरिचित कॉल्स ब्लॉक मोड",
    reviewSandboxNote: "* सुरक्षा की सभी एल्गोरिथम सैंडबॉक्स मेमोरी में रन करती हैं। कॉल्स फ़िल्टर काम कर रहा है या नहीं, इसे देखने के लिए आप दाईं ओर सिम्युलेटर का उपयोग करें।",
    osPromptRoleTitle: "ऐप को डिफ़ॉल्ट कॉल स्क्रीनिंग एजेंट सेट करें?",
    osPromptRoleDesc: "एंड्रॉइड अब स्मार्ट कॉल फ़िल्टर को कॉल आने से पहले सैंडबॉक्स जांच करने की अनुमति प्रदान करेगा ताकि अनचाही म्यूट कॉल्स से सुरक्षा मिल सके।",
    osPromptRoleBtn: "डिफ़ॉल्ट सेट करें",
    osPromptContactsTitle: "क्या आप ऐप को कॉन्टैक्ट्स देखने की अनुमति देना चाहते हैं?",
    osPromptContactsDesc: "सुरक्षित सूची को ऑटो-अपडेट करने और परिजनों की पहचान करने के लिए आवश्यक है। आपके संपर्क ऑफलाइन रहते हैं।",
    osPromptContactsBtn: "अनुमति दें",
    osPromptSmsTitle: "क्या आप ऐप को एसएमएस भेजने की आज्ञा देते हैं?",
    osPromptSmsDesc: "इसका उपयोग केवल कॉल ब्लॉक होने पर परिजनों या परिचितों को इमरजेंसी म्यूट बायपास निर्देश भेजने के लिए किया जाएगा।",
    osPromptSmsBtn: "अनुमति दें",
    osPromptClose: "रद्द करें",
    osPromptDeny: "मना करें"
  }
};
