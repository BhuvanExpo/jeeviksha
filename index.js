// ============================================================
// JEEVIKSHA — index.js (ES Module)
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ── Feature-detection constants (set once at module level) ──
const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HEADER_OFFSET = 80;

// ── Scroll Lock (iOS-safe: remembers scroll position) ───────
let _scrollY = 0;

const lockScroll = () => {
  _scrollY = window.scrollY;
  document.body.style.top = `-${_scrollY}px`;
  document.body.classList.add('scroll-locked');
};

const unlockScroll = () => {
  const modalOpen = document.getElementById('pilot-modal')?.classList.contains('open');
  const navOpen   = document.getElementById('nav-menu')?.classList.contains('active');
  if (modalOpen || navOpen) return;
  document.body.classList.remove('scroll-locked');
  document.body.style.top = '';
  window.scrollTo({ top: _scrollY, behavior: 'instant' });
};

// ── Confetti (lazy-loaded) ───────────────────────────────────
const loadConfetti = () => new Promise((resolve, reject) => {
  if (typeof window.confetti === 'function') { resolve(window.confetti); return; }
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
  s.onload  = () => resolve(window.confetti);
  s.onerror = reject;
  document.head.appendChild(s);
});

const launchConfetti = async () => {
  if (REDUCED_MOTION) return;
  try {
    const burst = await loadConfetti();
    const end   = Date.now() + 2200;
    const colors = ['#00246B', '#CADCFC', '#ffffff', '#5A6B82'];
    (function frame() {
      burst({ particleCount: 6, angle: 60,  spread: 55, origin: { x: 0, y: 0.65 }, colors });
      burst({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  } catch (_) { /* optional celebration */ }
};

// ── Firebase Setup ───────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCOFXkrAAuFg3CjxzKyarOZzngyVIKWlsk",
  authDomain:        "jeeviksha-2028.firebaseapp.com",
  projectId:         "jeeviksha-2028",
  storageBucket:     "jeeviksha-2028.firebasestorage.app",
  messagingSenderId: "900674793950",
  appId:             "1:900674793950:web:223df75d7517626f47ed4f",
  measurementId:     "G-R5VE22QD8W"
};

let db = null;
let isFirebaseConfigured = false;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseConfigured = true;
    console.log('JEEVIKSHA: Firebase initialized successfully.');
  } catch (err) {
    console.error('JEEVIKSHA: Firebase initialization failed:', err);
  }
} else {
  console.warn('JEEVIKSHA: Running with placeholder Firebase credentials — offline mode.');
}

// ── Offline fallback ─────────────────────────────────────────
const saveSubmissionLocally = (submission) => {
  try {
    const localData = localStorage.getItem('jeeviksha_offline_submissions');
    const submissions = localData ? JSON.parse(localData) : [];
    submissions.push({ ...submission, offlineSavedAt: new Date().toISOString() });
    localStorage.setItem('jeeviksha_offline_submissions', JSON.stringify(submissions));
    console.log('JEEVIKSHA: Submission cached locally:', submission);
  } catch (e) {
    console.error('JEEVIKSHA: Failed to save locally:', e);
  }
};

// ── Translation Dictionary ───────────────────────────────────
const TRANSLATIONS = {
  en: {
    "nav-vision":            "The Vision",
    "nav-how-it-works":      "How it Works",
    "nav-who-we-serve":      "Who We Serve",
    "nav-join-pilot":        "Join Pilot",
    "hero-title":            "Organizing the Foundation of <span class=\"highlight\">Bharat's Economy</span>",
    "hero-subtitle":         "A direct-matching digital ecosystem connecting rural laborers with farmers and contractors. Zero middlemen. Zero commissions. Securing livelihoods, dignity, and fair wages.",
    "hero-cta-primary":      "Join the Pilot Program",
    "hero-cta-secondary":    "Read Our Vision",
    "vision-badge":          "Empowering Bharat",
    "vision-title":          "The Vision Behind JEEVIKSHA",
    "vision-text":           "For decades, India's rural workforce has been trapped in an informal system dictated by exploitative intermediaries and informational asymmetry. Our vision is to bring dignity, transparency, and digital access to rural labor. We are replacing word-of-mouth hiring with a merit-based, transaction-backed digital infrastructure that protects livelihoods and secures fair wages.",
    "compare-title":         "Re-Engineering Rural Employment",
    "compare-subtitle":      "Comparing the traditional exploitative thekedar model against our modern digital ecosystem.",
    "problem-title":         "The Traditional Problem",
    "problem-1-title":       "Thekedar System Exploitation",
    "problem-1-desc":        "Exploitative middlemen dictate arbitrary wages and siphon off labourers' true daily earnings through steep commissions and informal debt traps.",
    "problem-2-title":       "Chronic Seasonal Supply Deficits",
    "problem-2-desc":        "Agricultural districts face severe, time-sensitive labour shortages during peak Kharif and Rabi cycles due to uncoordinated regional mobility.",
    "problem-3-title":       "Informational Asymmetry",
    "problem-3-desc":        "Employers lack real-time visibility into local labour pools, while workers lack verifiable professional identities or wage histories.",
    "solution-title":        "The JEEVIKSHA Solution",
    "solution-1-title":      "0% Worker Commission",
    "solution-1-desc":       "Laborers face zero commission charges. They retain 100% of their hard-earned manual daily wages directly routed to their bank accounts.",
    "solution-2-title":      "Algorithmic Matching Engine",
    "solution-2-desc":       "Processes employer demands in real-time, cross-referencing precise geofenced pin codes to deploy labor exactly where and when required.",
    "solution-3-title":      "Progressive Web App (PWA)",
    "solution-3-desc":       "Built on an optimised HTML, CSS, and JS stack designed to run smoothly on budget smartphones and low-bandwidth connections.",
    "serve-title":           "Built for Bharat's Dual Market",
    "serve-subtitle":        "Tailored technology solving two distinct challenges with one unified ecosystem.",
    "workforce-title":       "For the Workforce",
    "workforce-desc":        "A voice-first, vernacular-supported progressive web app (PWA) allowing daily wage laborers to bypass complex tech barriers and find local, fair-paying work instantly.",
    "workforce-feat-1":      "Voice-guided vernacular navigation",
    "workforce-feat-2":      "Direct-to-bank instant daily payout",
    "workforce-feat-3":      "Verifiable digital professional identity",
    "workforce-cta":         "Join workforce pilot",
    "employer-title":        "For Farmers & Contractors",
    "employer-desc":         "A robust institutional SaaS dashboard featuring pre-verified labor compliance, transparent wallet-based payments, and real-time attendance trackers.",
    "employer-feat-1":       "Secure prepaid hiring wallet",
    "employer-feat-2":       "Automated geofenced attendance",
    "employer-feat-3":       "Instant compliance & tax reporting",
    "employer-cta":          "Access SaaS dashboard",
    "footer-info":           "Rebuilding Bharat's rural workforce infrastructure with transparency, dignity, and technological accessibility.",
    "footer-email-title":    "Email Administration",
    "footer-call-title":     "Call Program Office",
    "footer-location-title": "Location",
    "footer-location-text":  "Bangalore, Karnataka",
    "footer-copy":           "&copy; 2026 JEEVIKSHA Private Limited. All Rights Reserved.",
    "footer-link-privacy":   "Privacy Policy",
    "footer-link-terms":     "Terms of Service",
    "modal-title":           "Join the Pilot Program",
    "modal-subtitle":        "Enter your details below to secure early access and partner with JEEVIKSHA.",
    "modal-label-name":      "Full Name",
    "modal-placeholder-name":"Enter your full name",
    "modal-label-role":      "Who Are You?",
    "role-title-workforce":  "Workforce / Laborer",
    "role-desc-workforce":   "Looking for local, fair-paying work",
    "role-title-farmer":     "Farmer",
    "role-desc-farmer":      "Need time-sensitive agricultural labor",
    "role-title-contractor": "Contractor",
    "role-desc-contractor":  "Hiring for construction or civil works",
    "role-title-institution":"Institution",
    "role-desc-institution": "Government or enterprise partner",
    "modal-label-languages": "Spoken Languages (Select all that apply)",
    "modal-label-phone":     "Contact Number (WhatsApp preferred)",
    "modal-placeholder-phone":"10-digit mobile number",
    "modal-submit":          "Submit Request",
    "success-title":         "Request Submitted!",
    "success-desc":          "Thank you for reaching out. Our program office will contact you at <strong id=\"success-phone\"></strong> within 24 hours to guide you through the next steps.",
    "success-cta-whatsapp":  "Join WhatsApp Community",
    "success-cta-done":      "Done"
  },
  hi: {
    "nav-vision":            "दृष्टिकोण",
    "nav-how-it-works":      "यह कैसे काम करता है",
    "nav-who-we-serve":      "हम किसकी सेवा करते हैं",
    "nav-join-pilot":        "पायलट से जुड़ें",
    "hero-title":            "भारत की अर्थव्यवस्था की <span class=\"highlight\">नींव को व्यवस्थित करना</span>",
    "hero-subtitle":         "ग्रामीण कामगारों को किसानों और ठेकेदारों से जोड़ने वाला एक सीधा डिजिटल पारिस्थितिकी तंत्र। शून्य बिचौलिए। शून्य कमीशन। आजीविका, गरिमा और उचित मजदूरी सुनिश्चित करना।",
    "hero-cta-primary":      "पायलट कार्यक्रम में शामिल हों",
    "hero-cta-secondary":    "हमारा दृष्टिकोण पढ़ें",
    "vision-badge":          "सशक्त भारत",
    "vision-title":          "जीविक्षा के पीछे का दृष्टिकोण",
    "vision-text":           "दशकों से, भारत का ग्रामीण कार्यबल शोषक बिचौलियों और सूचना की कमी के अनौपचारिक जाल में फंसा हुआ है। हमारा दृष्टिकोण ग्रामीण श्रम को गरिमा, पारदर्शिता और डिजिटल पहुंच प्रदान करना है।",
    "compare-title":         "ग्रामीण रोजगार का पुनर्गठन",
    "compare-subtitle":      "पारंपरिक शोषक ठेकेदारी मॉडल की तुलना हमारे आधुनिक डिजिटल पारिस्थितिकी तंत्र से करें।",
    "problem-title":         "पारंपरिक समस्या",
    "problem-1-title":       "ठेकेदार प्रणाली द्वारा शोषण",
    "problem-1-desc":        "शोषक बिचौलिए मनमानी मजदूरी तय करते हैं और कर्ज के जाल के माध्यम से मजदूरों की वास्तविक दैनिक कमाई का एक बड़ा हिस्सा कमीशन के रूप में वसूलते हैं।",
    "problem-2-title":       "लगातार मौसमी आपूर्ति घाटा",
    "problem-2-desc":        "क्षेत्रीय आवाजाही में समन्वय की कमी के कारण कृषि जिलों को खरीफ और रबी की फसल के समय गंभीर श्रम कमी का सामना करना पड़ता है।",
    "problem-3-title":       "सूचना की कमी",
    "problem-3-desc":        "नियोक्ताओं के पास स्थानीय श्रम बल की वास्तविक समय में जानकारी नहीं होती, जबकि श्रमिकों के पास कोई सत्यापित पहचान या मजदूरी का इतिहास नहीं होता है।",
    "solution-title":        "जीविक्षा (JEEVIKSHA) का समाधान",
    "solution-1-title":      "0% श्रमिक कमीशन",
    "solution-1-desc":       "श्रमिकों के लिए शून्य कमीशन शुल्क। वे अपनी मेहनत की शत-प्रतिशत दैनिक मजदूरी सीधे अपने बैंक खातों में प्राप्त करते हैं।",
    "solution-2-title":      "एल्गोरिथमिक मैचिंग इंजन",
    "solution-2-desc":       "नियोक्ता की जरूरतों को वास्तविक समय में संसाधित करता है, और सटीक जियोफेंस्ड पिन कोड के माध्यम से जहां और जब आवश्यकता हो वहां श्रम तैनात करता है।",
    "solution-3-title":      "प्रोग्रेसिव वेब ऐप (PWA)",
    "solution-3-desc":       "कम बजट वाले स्मार्टफोन और कमजोर नेटवर्क कनेक्शन पर भी सुचारू रूप से चलने के लिए अनुकूलित HTML, CSS और JS पर निर्मित।",
    "serve-title":           "भारत के दोहरे बाजार के लिए निर्मित",
    "serve-subtitle":        "एक एकीकृत पारिस्थितिकी तंत्र के साथ दो अलग-अलग चुनौतियों का समाधान करने वाली तकनीक।",
    "workforce-title":       "कार्यबल (मजदूरों) के लिए",
    "workforce-desc":        "आवाज और स्थानीय भाषाओं पर आधारित एक प्रोग्रेसिव वेब ऐप (PWA) जो दैनिक वेतन भोगी मजदूरों को तकनीकी बाधाओं को पार कर तुरंत काम खोजने में मदद करता है।",
    "workforce-feat-1":      "आवाज आधारित स्थानीय भाषा में नेविगेशन",
    "workforce-feat-2":      "सीधे बैंक खाते में दैनिक भुगतान",
    "workforce-feat-3":      "सत्यापित डिजिटल व्यावसायिक पहचान",
    "workforce-cta":         "कार्यबल पायलट में शामिल हों",
    "employer-title":        "किसानों और ठेकेदारों के लिए",
    "employer-desc":         "पूर्व-सत्यापित श्रम अनुपालन, पारदर्शी वॉलेट-आधारित भुगतान और वास्तविक समय उपस्थिति ट्रैकर वाला एक मजबूत संस्थागत SaaS डैशबोर्ड।",
    "employer-feat-1":       "सुरक्षित प्रीपेड भर्ती वॉलेट",
    "employer-feat-2":       "स्वचालित जियोफेंस्ड उपस्थिति",
    "employer-feat-3":       "त्वरित अनुपालन और कर रिपोर्टिंग",
    "employer-cta":          "SaaS डैशबोर्ड खोलें",
    "footer-info":           "पारदर्शिता, गरिमा और तकनीकी पहुंच के साथ भारत के ग्रामीण कार्यबल के बुनियादी ढांचे का पुनर्निर्माण।",
    "footer-email-title":    "ईमेल प्रशासन",
    "footer-call-title":     "प्रोग्राम कार्यालय को कॉल करें",
    "footer-location-title": "स्थान",
    "footer-location-text":  "बेंगलुरु, कर्नाटक",
    "footer-copy":           "&copy; 2026 जीविक्षा प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।",
    "footer-link-privacy":   "गोपनीयता नीति",
    "footer-link-terms":     "सेवा की शर्तें",
    "modal-title":           "पायलट कार्यक्रम में शामिल हों",
    "modal-subtitle":        "JEEVIKSHA के साथ साझेदारी करने और शुरुआती पहुंच सुरक्षित करने के लिए नीचे अपना विवरण दर्ज करें।",
    "modal-label-name":      "पूरा नाम",
    "modal-placeholder-name":"अपना पूरा नाम दर्ज करें",
    "modal-label-role":      "आप कौन हैं?",
    "role-title-workforce":  "कार्यबल / मजदूर",
    "role-desc-workforce":   "स्थानीय और उचित वेतन वाले काम की तलाश में",
    "role-title-farmer":     "किसान",
    "role-desc-farmer":      "खेती के लिए समय पर मजदूरों की आवश्यकता है",
    "role-title-contractor": "ठेकेदार",
    "role-desc-contractor":  "निर्माण या नागरिक कार्यों के लिए भर्ती",
    "role-title-institution":"संस्था",
    "role-desc-institution": "सरकारी या कॉर्पोरेट भागीदार",
    "modal-label-languages": "बोली जाने वाली भाषाएं (जो लागू हों उन्हें चुनें)",
    "modal-label-phone":     "संपर्क नंबर (WhatsApp को प्राथमिकता)",
    "modal-placeholder-phone":"10 अंकों का मोबाइल नंबर",
    "modal-submit":          "अनुरोध सबमिट करें",
    "success-title":         "अनुरोध सबमिट हो गया!",
    "success-desc":          "पहुंचने के लिए धन्यवाद। हमारा कार्यक्रम कार्यालय अगले चरणों में आपका मार्गदर्शन करने के लिए 24 घंटे के भीतर <strong id=\"success-phone\"></strong> पर आपसे संपर्क करेगा।",
    "success-cta-whatsapp":  "WhatsApp कम्युनिटी से जुड़ें",
    "success-cta-done":      "हो गया"
  },
  kn: {
    "nav-vision":            "ದೃಷ್ಟಿಕೋನ",
    "nav-how-it-works":      "ಕೆಲಸ ಮಾಡುವ ವಿಧಾನ",
    "nav-who-we-serve":      "ಸೇವೆ ಯಾರಿಗೆ",
    "nav-join-pilot":        "ಪೈಲಟ್‌ಗೆ ಸೇರಿ",
    "hero-title":            "ಭಾರತದ ಆರ್ಥಿಕತೆಯ <span class=\"highlight\">ಬುನಾದಿಯನ್ನು ಸಂಘಟಿಸುವುದು</span>",
    "hero-subtitle":         "ಗ್ರಾಮೀಣ ಕಾರ್ಮಿಕರನ್ನು ರೈತರು ಮತ್ತು ಗುತ್ತಿಗೆದಾರರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುವ ಡಿಜಿಟಲ್ ವ್ಯವಸ್ಥೆ. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ. ಕಮಿಷನ್ ಇಲ್ಲ. ಜೀವನೋಪಾಯ, ಘನತೆ ಮತ್ತು ನ್ಯಾಯಯುತ ವೇತನದ ಭರವಸೆ.",
    "hero-cta-primary":      "ಪೈಲಟ್ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಸೇರಿ",
    "hero-cta-secondary":    "ನಮ್ಮ ದೃಷ್ಟಿಕೋನ ಓದಿ",
    "vision-badge":          "ಸಶಕ್ತ ಭಾರತ",
    "vision-title":          "ಜೀವೀಕ್ಷಾದ ಹಿಂದಿನ ದೃಷ್ಟಿಕೋನ",
    "vision-text":           "ದಶಕಗಳಿಂದ ಭಾರತದ ಗ್ರಾಮೀಣ ಕಾರ್ಮಿಕರು ಮಧ್ಯವರ್ತಿಗಳ ಶೋಷಣೆ ಮತ್ತು ಮಾಹಿತಿಯ ಕೊರತೆಯ ಜಾಲದಲ್ಲಿ ಸಿಲುಕಿದ್ದಾರೆ. ಗ್ರಾಮೀಣ ಶ್ರಮಕ್ಕೆ ಘನತೆ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಡಿಜಿಟಲ್ ಸಂಪರ್ಕ ನೀಡುವುದು ನಮ್ಮ ದೃಷ್ಟಿಕೋನ.",
    "compare-title":         "ಗ್ರಾಮೀಣ ಉದ್ಯೋಗದ ಮರು-ರೂಪೀಕರಣ",
    "compare-subtitle":      "ಸಾಂಪ್ರದಾಯಿಕ ಶೋಷಣೆಯ ಗುತ್ತಿಗೆದಾರ ವ್ಯವಸ್ಥೆಗೂ ನಮ್ಮ ಆಧುನಿಕ ಡಿಜಿಟಲ್ ವ್ಯವಸ್ಥೆಗೂ ಇರುವ ವ್ಯತ್ಯಾಸ.",
    "problem-title":         "ಸಾಂಪ್ರದಾಯಿಕ ತೊಂದರೆಗಳು",
    "problem-1-title":       "ಗುತ್ತಿಗೆದಾರ ವ್ಯವಸ್ಥೆಯ ಶೋಷಣೆ",
    "problem-1-desc":        "ಮಧ್ಯವರ್ತಿಗಳು ತಮಗೆ ಇಷ್ಟಬಂದಂತೆ ವೇತನ ನಿರ್ಧರಿಸಿ, ಕಾರ್ಮಿಕರ ದಿನದ ಗಳಿಕೆಯಲ್ಲಿ ಹೆಚ್ಚಿನ ಹಣವನ್ನು ಕಮಿಷನ್ ರೂಪದಲ್ಲಿ ಪಡೆಯುತ್ತಾರೆ.",
    "problem-2-title":       "ನಿರಂತರ ಕಾಲೋಚಿತ ಕಾರ್ಮಿಕರ ಕೊರತೆ",
    "problem-2-desc":        "ವಲಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಸಂಘಟನೆ ಇಲ್ಲದಿರುವುದರಿಂದ ಕೃಷಿ ವಲಯದಲ್ಲಿ ತೀವ್ರ ಕಾರ್ಮಿಕರ ಕೊರತೆ ಉಂಟಾಗುತ್ತದೆ.",
    "problem-3-title":       "ಮಾಹಿತಿಯ ಕೊರತೆ",
    "problem-3-desc":        "ಉದ್ಯೋಗದಾತರಿಗೆ ಸ್ಥಳೀಯ ಕಾರ್ಮಿಕರ ಮಾಹಿತಿ ಸಿಗುವುದಿಲ್ಲ, ಕಾರ್ಮಿಕರಿಗೆ ತಮ್ಮ ಡಿಜಿಟಲ್ ಗುರುತು ಇರುವುದಿಲ್ಲ.",
    "solution-title":        "ಜೀವೀಕ್ಷಾ (JEEVIKSHA) ಪರಿಹಾರ",
    "solution-1-title":      "0% ಕಾರ್ಮಿಕ ಕಮಿಷನ್",
    "solution-1-desc":       "ಕಾರ್ಮಿಕರಿಗೆ ಯಾವುದೇ ಕಮಿಷನ್ ಶುಲ್ಕ ಇರುವುದಿಲ್ಲ. ಅವರು ಗಳಿಸಿದ ಸಂಪೂರ್ಣ ದಿನಗೂಲಿ ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ.",
    "solution-2-title":      "ಅಲ್ಗಾರಿದಮಿಕ್ ಮ್ಯಾಚಿಂಗ್ ಎಂಜಿನ್",
    "solution-2-desc":       "ಉದ್ಯೋಗದಾತರ ಬೇಡಿಕೆಯನ್ನು ತಕ್ಷಣವೇ ಪರಿಶೀಲಿಸಿ, ಜಿಯೋಫೆನ್ಸ್ಡ್ ಪಿನ್ ಕೋಡ್ ಆಧಾರದ ಮೇಲೆ ಕಾರ್ಮಿಕರನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.",
    "solution-3-title":      "ಪ್ರೋಗ್ರೆಸಿವ್ ವೆಬ್ ಆಪ್ (PWA)",
    "solution-3-desc":       "ಕಡಿಮೆ ಬಜೆಟ್ ಫೋನ್‌ಗಳಲ್ಲಿ ಮತ್ತು ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸರಾಗವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    "serve-title":           "ಭಾರತದ ಉಭಯ ಮಾರುಕಟ್ಟೆಗಾಗಿ ವಿನ್ಯಾಸಿತ",
    "serve-subtitle":        "ಒಂದೇ ಸಂಯೋಜಿತ ವ್ಯವಸ್ಥೆಯ ಮೂಲಕ ಎರಡು ವಿಭಿನ್ನ ಸವಾಲುಗಳನ್ನು ಪರಿಹರಿಸುವ ತಂತ್ರಜ್ಞಾನ.",
    "workforce-title":       "ಕಾರ್ಮಿಕರಿಗಾಗಿ",
    "workforce-desc":        "ಧ್ವನಿ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುವ PWA ಮೂಲಕ ಗ್ರಾಮೀಣ ಕಾರ್ಮಿಕರು ಸುಲಭವಾಗಿ ತಕ್ಷಣ ಉದ್ಯೋಗ ಕಂಡುಕೊಳ್ಳಬಹುದು.",
    "workforce-feat-1":      "ಧ್ವನಿ ಆಧಾರಿತ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯ ನೆವಿಗೇಷನ್",
    "workforce-feat-2":      "ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ದಿನದ ವೇತನ ಜಮೆ",
    "workforce-feat-3":      "ಸತ್ಯೀಕೃತ ಡಿಜಿಟಲ್ ವೃತ್ತಿಪರ ಗುರುತು",
    "workforce-cta":         "ಕಾರ್ಮಿಕ ಪೈಲಟ್‌ಗೆ ಸೇರಿ",
    "employer-title":        "ರೈತರು ಮತ್ತು ಗುತ್ತಿಗೆದಾರರಿಗಾಗಿ",
    "employer-desc":         "ಕಾರ್ಮಿಕ ನಿಯಮಗಳ ಅನುಸರಣೆ, ವಾಲೆಟ್ ಪಾವತಿ ಮತ್ತು ಹಾಜರಾತಿ ಟ್ರ್ಯಾಕರ್ ಒಳಗೊಂಡ SaaS ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.",
    "employer-feat-1":       "ಸುರಕ್ಷಿತ ಪ್ರಿಪೇಯ್ಡ್ ವಾಲೆಟ್",
    "employer-feat-2":       "ಸ್ವಯಂಚಾಲಿತ ಜಿಯೋಫೆನ್ಸ್ಡ್ ಹಾಜರಾತಿ",
    "employer-feat-3":       "ತ್ವರಿತ ನಿಯಮಗಳ ಅನುಸರಣೆ ಮತ್ತು ತೆರಿಗೆ ವರದಿ",
    "employer-cta":          "SaaS ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ",
    "footer-info":           "ಪಾರದರ್ಶಕತೆ, ಘನತೆ ಮತ್ತು ತಂತ್ರಜ್ಞಾನದ ಪ್ರವೇಶದೊಂದಿಗೆ ಭಾರತದ ಗ್ರಾಮೀಣ ಕಾರ್ಮಿಕ ವಲಯದ ಮರುನಿರ್ಮಾಣ.",
    "footer-email-title":    "ಇಮೇಲ್ ಆಡಳಿತ",
    "footer-call-title":     "ಕಾರ್ಯಕ್ರಮದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ",
    "footer-location-title": "ಸ್ಥಳ",
    "footer-location-text":  "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ",
    "footer-copy":           "&copy; 2026 ಜೀವೀಕ್ಷಾ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    "footer-link-privacy":   "ಗೌಪ್ಯತಾ ನೀತಿ",
    "footer-link-terms":     "ಸೇವಾ ನಿಯಮಗಳು",
    "modal-title":           "ಪೈಲಟ್ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಸೇರಿ",
    "modal-subtitle":        "JEEVIKSHA ನೊಂದಿಗೆ ಪಾಲುದಾರರಾಗಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಕೆಳಗೆ ನಮೂದಿಸಿ.",
    "modal-label-name":      "ಪೂರ್ಣ ಹೆಸರು",
    "modal-placeholder-name":"ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    "modal-label-role":      "ನೀವು ಯಾರು?",
    "role-title-workforce":  "ಕಾರ್ಮಿಕರು / ದಿನಗೂಲಿ",
    "role-desc-workforce":   "ಸ್ಥಳೀಯ ಮತ್ತು ನ್ಯಾಯಯುತ ವೇತನದ ಕೆಲಸ ಹುಡುಕುತ್ತಿದ್ದಾರೆ",
    "role-title-farmer":     "ರೈತರು",
    "role-desc-farmer":      "ಕೃಷಿ ಕೆಲಸಗಳಿಗಾಗಿ ಕಾರ್ಮಿಕರ ಅಗತ್ಯ",
    "role-title-contractor": "ಗುತ್ತಿಗೆದಾರರು",
    "role-desc-contractor":  "ನಿರ್ಮಾಣ ಕೆಲಸಗಳಿಗಾಗಿ ನೇಮಕಾತಿ",
    "role-title-institution":"ಸಂಸ್ಥೆ",
    "role-desc-institution": "ಸರ್ಕಾರ ಅಥವಾ ಕಾರ್ಪೊರೇಟ್ ಪಾಲುದಾರರು",
    "modal-label-languages": "ಮಾತನಾಡುವ ಭಾಷೆಗಳು (ಅನ್ವಯ ಆಗುವದನ್ನು ಆರಿಸಿ)",
    "modal-label-phone":     "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ (WhatsApp ಆದ್ಯತೆ)",
    "modal-placeholder-phone":"10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "modal-submit":          "ವಿನಂತಿ ಸಲ್ಲಿಸಿ",
    "success-title":         "ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!",
    "success-desc":          "ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. 24 ಗಂಟೆಗಳ ಒಳಗೆ <strong id=\"success-phone\"></strong> ಸಂಖ್ಯೆಗೆ ನಮ್ಮ ಸಿಬ್ಬಂದಿ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.",
    "success-cta-whatsapp":  "WhatsApp ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ",
    "success-cta-done":      "ಮುಕ್ತಾಯ"
  }
};

// ── DOM Translation ──────────────────────────────────────────
const updateDOMTranslations = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!TRANSLATIONS[lang]?.[key]) return;
    if (key === 'success-desc') {
      // Preserve #success-phone text when re-rendering
      const phoneVal = document.getElementById('success-phone')?.innerText ?? '';
      el.innerHTML = TRANSLATIONS[lang][key];
      const strong = el.querySelector('#success-phone');
      if (strong) strong.innerText = phoneVal;
    } else {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang]?.[key]) el.placeholder = TRANSLATIONS[lang][key];
  });
  document.documentElement.lang = lang;
};

// ── Main Init ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Language Overlay ──────────────────────────────────
  const langOverlay    = document.getElementById('language-overlay');
  const langOptions    = document.querySelectorAll('.lang-option');
  const btnLangCont    = document.getElementById('btn-lang-continue');
  const navbarLangSel  = document.getElementById('navbar-lang-select');
  let selectedLanguage = '';

  const savedLang = localStorage.getItem('jeeviksha_lang');
  if (savedLang) {
    langOverlay.style.display = 'none';
    navbarLangSel.value = savedLang;
    updateDOMTranslations(savedLang);
  } else {
    langOverlay.style.display = 'flex';
  }

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      langOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedLanguage = opt.getAttribute('data-lang');
      btnLangCont.disabled = false;
    });
  });

  btnLangCont.addEventListener('click', () => {
    if (!selectedLanguage) return;
    localStorage.setItem('jeeviksha_lang', selectedLanguage);
    updateDOMTranslations(selectedLanguage);
    navbarLangSel.value = selectedLanguage;
    langOverlay.classList.add('fade-out');
    setTimeout(() => { langOverlay.style.display = 'none'; }, 400);
  });

  navbarLangSel.addEventListener('change', e => {
    const lang = e.target.value;
    localStorage.setItem('jeeviksha_lang', lang);
    updateDOMTranslations(lang);
  });

  // ── 2. Mobile Nav Drawer ─────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu    = document.getElementById('nav-menu');
  const navLinks   = document.querySelectorAll('.nav-link, .nav-menu .btn');
  const navBackdrop= document.getElementById('nav-backdrop');

  const toggleMenu = () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
    navBackdrop?.classList.toggle('active', !expanded);
    navBackdrop?.setAttribute('aria-hidden', String(expanded));
    expanded ? unlockScroll() : lockScroll();
  };

  menuToggle.addEventListener('click', toggleMenu);
  navBackdrop?.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) toggleMenu();
  });

  // ── 3. Smooth Anchor Scroll ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      // CTAs with #pilot open the modal — don't intercept
      if (anchor.id?.startsWith('cta-') && id === '#pilot') return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: REDUCED_MOTION ? 'instant' : 'smooth' });
    });
  });

  // Close nav when a link/CTA is clicked
  navLinks.forEach(link => {
    if (link.closest('.nav-lang-select-container')) return;
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) toggleMenu();
    });
  });

  // ── 4. Modal ─────────────────────────────────────────────
  const pilotModal  = document.getElementById('pilot-modal');
  const pilotForm   = document.getElementById('pilot-form');
  const pilotSuccess= document.getElementById('pilot-success');
  const closeBtn    = document.getElementById('modal-close');
  const doneBtn     = document.getElementById('btn-success-close');
  const formSpinner = document.getElementById('form-spinner');
  const successPhone= document.getElementById('success-phone');

  const openModal = (preselectedRole = 'workforce') => {
    const radio = pilotForm.querySelector(`input[name="role"][value="${preselectedRole}"]`);
    if (radio) radio.checked = true;
    pilotModal.classList.add('open');
    pilotModal.setAttribute('aria-hidden', 'false');
    lockScroll();
    requestAnimationFrame(() => document.getElementById('pilot-name')?.focus());
  };

  const closeModal = () => {
    pilotModal.classList.remove('open');
    pilotModal.setAttribute('aria-hidden', 'true');
    unlockScroll();
    setTimeout(() => {
      pilotForm.reset();
      pilotForm.style.display        = 'flex';
      pilotSuccess.style.display     = 'none';
      formSpinner.style.display      = 'none';
      pilotForm.querySelector('button[type="submit"]').disabled = false;
    }, 300);
  };

  // Wire CTAs → modal
  const ctaMap = {
    'cta-nav-pilot':       'workforce',
    'cta-hero-primary':    'workforce',
    'cta-serve-workforce': 'workforce',
    'cta-serve-employers': 'farmer',
  };
  Object.entries(ctaMap).forEach(([id, role]) => {
    document.getElementById(id)?.addEventListener('click', e => {
      e.preventDefault();
      openModal(role);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  doneBtn.addEventListener('click', closeModal);
  pilotModal.addEventListener('click', e => { if (e.target === pilotModal) closeModal(); });

  // ── 5. Form Submit ───────────────────────────────────────
  pilotForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = pilotForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formSpinner.style.display = 'inline-block';

    const nameVal  = document.getElementById('pilot-name').value.trim();
    const roleVal  = pilotForm.querySelector('input[name="role"]:checked')?.value ?? 'workforce';
    const langs    = Array.from(pilotForm.querySelectorAll('input[name="languages"]:checked')).map(el => el.value);
    const phoneVal = document.getElementById('pilot-phone').value.trim();

    const submissionData = { name: nameVal, role: roleVal, languages: langs, phone: '+91 ' + phoneVal };

    const showSuccessUI = () => {
      formSpinner.style.display  = 'none';
      pilotForm.style.display    = 'none';
      successPhone.innerText     = '+91 ' + phoneVal;
      pilotSuccess.style.display = 'flex';
      launchConfetti();
    };

    if (isFirebaseConfigured && db) {
      const firestoreWrite = addDoc(collection(db, 'pilot_submissions'), {
        ...submissionData,
        timestamp: serverTimestamp()
      });
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000));
      Promise.race([firestoreWrite, timeout])
        .then(docRef => {
          console.log('JEEVIKSHA: Firestore write OK —', docRef.id);
          showSuccessUI();
        })
        .catch(err => {
          console.error('JEEVIKSHA: Firestore write failed — using local fallback.', err);
          saveSubmissionLocally(submissionData);
          showSuccessUI();
        });
    } else {
      setTimeout(() => { saveSubmissionLocally(submissionData); showSuccessUI(); }, 1200);
    }
  });

  // ── 6. Keyboard / Escape ─────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (pilotModal.classList.contains('open')) closeModal();
    else if (navMenu.classList.contains('active')) toggleMenu();
  });

}); // end DOMContentLoaded

// ── Scroll-Reveal (IntersectionObserver) ────────────────────
(function () {
  if (REDUCED_MOTION) return;
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => observer.observe(el));
})();

// ── Theme Toggle ─────────────────────────────────────────────
(function () {
  const DARK_KEY  = 'jeeviksha_theme';
  const root      = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(DARK_KEY, theme);
    toggleBtn?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  const saved    = localStorage.getItem(DARK_KEY);
  const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefDark ? 'dark' : 'light'));

  toggleBtn?.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();

// ── Magic Card spotlight ─────────────────────────────────────
(function () {
  if (IS_TOUCH || REDUCED_MOTION) return;
  const card = document.getElementById('modal-card');
  if (!card) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
})();

// ── Mouse Interaction Suite ──────────────────────────────────
(function () {
  if (REDUCED_MOTION || IS_TOUCH) return;

  // 1. Global cursor glow
  let rafGlow;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafGlow);
    rafGlow = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--gx', e.clientX + 'px');
      document.documentElement.style.setProperty('--gy', e.clientY + 'px');
    });
  });

  // 2. 3D card tilt
  const TILT_MAX   = 8;
  const tiltTargets = document.querySelectorAll('.serve-card, .comparison-column');
  tiltTargets.forEach(el => {
    let rafTilt;
    el.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafTilt);
      rafTilt = requestAnimationFrame(() => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        el.style.transform  = `perspective(800px) rotateX(${-dy * TILT_MAX}deg) rotateY(${dx * TILT_MAX}deg) scale(1.03)`;
        el.style.transition = 'transform 0.08s linear';
        el.style.setProperty('--tx', ((e.clientX - r.left) / r.width  * 100) + '%');
        el.style.setProperty('--ty', ((e.clientY - r.top)  / r.height * 100) + '%');
      });
    });
    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafTilt);
      el.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  // 3. Magnetic buttons
  const MAG_STRENGTH = 0.35;
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp').forEach(btn => {
    let rafMag;
    btn.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafMag);
      rafMag = requestAnimationFrame(() => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) * MAG_STRENGTH;
        const dy = (e.clientY - r.top  - r.height / 2) * MAG_STRENGTH;
        btn.style.transform  = `translate(${dx}px, ${dy}px) scale(1.04)`;
        btn.style.transition = 'transform 0.1s linear';
      });
    });
    btn.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafMag);
      btn.style.transform  = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  // 4. Hero parallax
  const heroImg = document.querySelector('.hero-image-wrapper');
  if (heroImg) {
    const PAR = 0.018;
    let rafPar;
    document.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafPar);
      rafPar = requestAnimationFrame(() => {
        const dx = (e.clientX - window.innerWidth  / 2) * PAR;
        const dy = (e.clientY - window.innerHeight / 2) * PAR;
        heroImg.style.transform  = `translate(${dx}px, ${dy}px) scale(1.02)`;
        heroImg.style.transition = 'transform 0.12s linear';
      });
    });
  }

  // 5. Header spotlight
  const headerEl = document.querySelector('header');
  if (headerEl) {
    let rafHeader;
    headerEl.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafHeader);
      rafHeader = requestAnimationFrame(() => {
        const r = headerEl.getBoundingClientRect();
        headerEl.style.setProperty('--hx', (e.clientX - r.left) + 'px');
        headerEl.style.setProperty('--hy', (e.clientY - r.top)  + 'px');
      });
    });
    headerEl.addEventListener('mouseleave', () => {
      headerEl.style.setProperty('--hx', '-9999px');
      headerEl.style.setProperty('--hy', '-9999px');
    });
  }

  // 6. Magnetic nav links
  const NAV_MAG = 0.28;
  document.querySelectorAll('.nav-link').forEach(link => {
    let rafNav;
    link.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafNav);
      rafNav = requestAnimationFrame(() => {
        const r  = link.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) * NAV_MAG;
        const dy = (e.clientY - r.top  - r.height / 2) * NAV_MAG;
        link.style.transform  = `translate(${dx}px, ${dy}px)`;
        link.style.transition = 'transform 0.08s linear, color var(--transition-fast)';
      });
    });
    link.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafNav);
      link.style.transform  = '';
      link.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), color var(--transition-fast)';
    });
  });

  // 7. Magnetic theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const TT_MAG = 0.4;
    let rafTheme;
    themeToggle.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafTheme);
      rafTheme = requestAnimationFrame(() => {
        const r  = themeToggle.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) * TT_MAG;
        const dy = (e.clientY - r.top  - r.height / 2) * TT_MAG;
        themeToggle.style.transform  = `translate(${dx}px, ${dy}px) scale(1.12)`;
        themeToggle.style.transition = 'transform 0.08s linear';
      });
    });
    themeToggle.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafTheme);
      themeToggle.style.transform  = '';
      themeToggle.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
    });
  }

  // 8. Hamburger tilt
  const menuToggleEl = document.getElementById('menu-toggle');
  if (menuToggleEl) {
    menuToggleEl.addEventListener('mousemove', e => {
      const r  = menuToggleEl.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width  - 0.5) * 20;
      const dy = ((e.clientY - r.top)  / r.height - 0.5) * 20;
      menuToggleEl.style.transform  = `perspective(300px) rotateX(${-dy}deg) rotateY(${dx}deg) scale(1.1)`;
      menuToggleEl.style.transition = 'transform 0.06s linear';
    });
    menuToggleEl.addEventListener('mouseleave', () => {
      menuToggleEl.style.transform  = '';
      menuToggleEl.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
  }

})(); // end mouse suite