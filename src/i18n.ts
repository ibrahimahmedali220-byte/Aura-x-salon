import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      nav: {
        services: 'Services',
        arVisualizer: 'AR Visualizer',
        virtualTour: '360° Tour',
        aiScanner: 'AI Scanner',
        bridal: 'Bridal',
        liveWaitlist: 'Live Waitlist',
        rewards: 'Rewards',
        wishlist: 'Wishlist',
        vipGuild: 'VIP Guild',
        apothecary: 'Apothecary',
        contact: 'Contact',
        bookAppointment: 'Book Appointment',
        beautyArchive: 'Beauty Archive',
        callConcierge: 'Call Concierge',
        spaAmbience: 'Spa Ambience',
        soundActive: 'Sanctuary Soundscape Active',
        searchPlaceholder: 'Search rituals, artisans, articles...'
      },
      search: {
        placeholder: 'Search rituals, artisans, articles...',
        quickSearch: 'Quick Search',
        all: 'All Results',
        services: 'Rituals & Services',
        team: 'Artisan Directors',
        articles: 'Editorial Journal',
        noResults: 'No matches found',
        noResultsDesc: 'Try searching for balayage, 24K gold, facial, keratin, Johnathan, or Helena.',
        resultsCount: 'results found',
        popularSearches: 'Popular Inquiries:',
        viewDetails: 'View Details',
        bookNow: 'Book Ritual',
        readArticle: 'Read Story',
        pressEnterToSelect: 'Press Enter to select'
      },
      hero: {
        tagline: 'LUXURY HAIR STYLING & BESPOKE SPA STUDIO',
        title: 'Where Timeless Elegance Transcends Artistry',
        subtitle: 'Immerse yourself in Beverly Hills’ most exclusive sanctuary of personal transformation, 24K gold rituals, and world-renowned master artisans.',
        reserveExperience: 'Reserve Your Experience',
        exploreRituals: 'Explore Services Menu'
      },
      booking: {
        title: 'Bespoke Studio Reservation',
        subtitle: 'Select your preferred ritual, artisan director, and sanctuary date.',
        step1: '1. Select Ritual & Stylist',
        step2: '2. Date & Time',
        step3: '3. Guest Details',
        fullName: 'Full Name *',
        phone: 'Phone Number (10 Digits Required) *',
        phoneError: 'Please enter a valid 10-digit mobile number.',
        phoneHint: 'Enter 10-digit mobile number (e.g. 9876543210)',
        email: 'Email Address *',
        beverage: 'VIP Lounge Welcome Elixir',
        specialNotes: 'Special Requests / Sensitivities',
        confirmReservation: 'Secure VIP Reservation',
        congratulations: 'Congratulations! 🎉',
        securedNotice: 'Your Studio Sanctuary reservation has been officially secured with celebratory flower petal confetti!',
        autoSentWhatsapp: 'Your complete reservation details have been automatically opened in WhatsApp with the message ready to send!',
        sendWhatsappDirect: 'Send via WhatsApp',
        visitChannelOptional: 'Official WhatsApp Channel (Optional)',
        copyDossier: 'Copy Full Dossier',
        closeModal: 'Close & Return to Studio'
      },
      sound: {
        enable: 'Enable Atmospheric Spa Soundscape',
        mute: 'Mute Soundscape',
        active: 'Playing Soundscape',
        soundscapeController: 'Ambient Soundscape Controller',
        atelierAmbience: 'Atelier Ambience',
        atelierDesc: 'Slow-motion luxury lounge & signature chime ringtone',
        meditationZen: 'Meditation Zen',
        zenDesc: 'Tibetan singing bowls & deep harmonic relaxation',
        bespokePiano: 'Bespoke Piano',
        pianoDesc: 'Slow-tempo nocturnal grand piano romance',
        volume: 'Volume',
        slowMotionBadge: 'Slow-Motion Audio'
      },
      crownPoints: {
        widgetTitle: 'Crown Points Loyalty',
        sessionEarned: 'earned this session',
        currentBalance: 'Total Crown Points',
        tierStatus: 'Tier Status',
        exploreRewards: 'Redeem in Sovereign Guild',
        earnHint: 'Browsing & exploring earns real-time points',
        pointsNotification: 'Crown Points earned'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        services: 'सेवाएं',
        arVisualizer: 'एआर विज़ुअलाइज़र',
        virtualTour: '360° टूर',
        aiScanner: 'एआई स्कैनर',
        bridal: 'ब्राइडल',
        liveWaitlist: 'लाइव वेटलिस्ट',
        rewards: 'रिवार्ड्स',
        wishlist: 'विशलिस्ट',
        vipGuild: 'वीआईपी गिल्ड',
        apothecary: 'अपोथेकेरी',
        contact: 'संपर्क',
        bookAppointment: 'अपॉइंटमेंट बुक करें',
        beautyArchive: 'ब्यूटी आर्काइव',
        callConcierge: 'कॉल करें',
        spaAmbience: 'स्पा संगीत',
        soundActive: 'लक्ज़री लाउंज संगीत सक्रिय',
        searchPlaceholder: 'सेवाएं, स्टाइलिस्ट या लेख खोजें...'
      },
      search: {
        placeholder: 'सेवाएं, स्टाइलिस्ट या लेख खोजें...',
        quickSearch: 'त्वरित खोज',
        all: 'सभी परिणाम',
        services: 'सेवाएं एवं अनुष्ठान',
        team: 'मास्टर स्टाइलिस्ट',
        articles: 'संपादकीय जर्नल व लेख',
        noResults: 'कोई परिणाम नहीं मिला',
        noResultsDesc: 'बालेयाज, 24K गोल्ड, फेशियल, केराटिन, या जोनाथन खोज कर देखें।',
        resultsCount: 'परिणाम मिले',
        popularSearches: 'लोकप्रिय खोजें:',
        viewDetails: 'विवरण देखें',
        bookNow: 'बुक करें',
        readArticle: 'लेख पढ़ें',
        pressEnterToSelect: 'चुनने के लिए एंटर दबाएं'
      },
      hero: {
        tagline: 'लक्जरी हेयर स्टाइलिंग और बेस्पोक स्पा स्टूडियो',
        title: 'जहाँ शाश्वत सुंदरता और भव्यता का मिलन होता है',
        subtitle: 'बेवर्ली हिल्स के सबसे विशिष्ट अभयारण्य में 24K गोल्ड अनुष्ठानों और विश्व प्रसिद्ध मास्टर कलाकारों के साथ अपने सौंदर्य को नया रूप दें।',
        reserveExperience: 'अपॉइंटमेंट सुरक्षित करें',
        exploreRituals: 'सेवाएं मेनू देखें'
      },
      booking: {
        title: 'वीआईपी स्टूडियो आरक्षण',
        subtitle: 'अपना पसंदीदा अनुष्ठान, आर्टिसन डायरेक्टर और समय चुनें।',
        step1: '१. सेवा और स्टाइलिस्ट चुनें',
        step2: '२. दिनांक और समय',
        step3: '३. आपकी जानकारी',
        fullName: 'पूरा नाम *',
        phone: 'मोबाइल नंबर (कम से कम 10 अंक आवश्यक) *',
        phoneError: 'कृपया अपना 10 अंकों का वैध मोबाइल नंबर सही से दर्ज करें।',
        phoneHint: '10 अंकों का मोबाइल नंबर दर्ज करें (उदा. 9876543210)',
        email: 'ईमेल पता *',
        beverage: 'वीआईपी वेलकम ड्रिंक',
        specialNotes: 'विशेष अनुरोध / त्वचा संवेदनशीलता',
        confirmReservation: 'वीआईपी आरक्षण सुरक्षित करें',
        congratulations: 'बधाई हो! 🎉',
        securedNotice: 'आपका स्टूडियो आरक्षण पुष्प पंखुड़ी कन्फ़ेटी के साथ आधिकारिक रूप से सुरक्षित हो गया है!',
        autoSentWhatsapp: 'आपकी सारी बुकिंग जानकारी सीधे व्हाट्सएप में पेस्ट हो चुकी है, बस सेंड दबाएं!',
        sendWhatsappDirect: 'व्हाट्सएप से भेजें',
        visitChannelOptional: 'व्हाट्सएप चैनल देखें (वैकल्पिक)',
        copyDossier: 'पूरी जानकारी कॉपी करें',
        closeModal: 'बंद करें और स्टूडियो पर लौटें'
      },
      sound: {
        enable: 'लक्ज़री स्पा संगीत चालू करें',
        mute: 'स्पा संगीत बंद करें',
        active: 'लाउंज संगीत चल रहा है',
        soundscapeController: 'साउंडस्केप नियंत्रक',
        atelierAmbience: 'एटेलियर एम्बिएंस',
        atelierDesc: 'स्लो-मोशन लक्ज़री लाउंज व आकर्षक रिंगटोन',
        meditationZen: 'मेडिटेशन ज़ेन',
        zenDesc: 'तिब्बती सिंगिंग बाउल और ध्यान संगीत',
        bespokePiano: 'बेस्पोक पियानो',
        pianoDesc: 'धीमी गति का भव्य पियानो संगीत',
        volume: 'वॉल्यूम',
        slowMotionBadge: 'स्लो-मोशन ऑडियो'
      },
      crownPoints: {
        widgetTitle: 'क्राउन पॉइंट्स लॉयल्टी',
        sessionEarned: 'इस सत्र में अर्जित',
        currentBalance: 'कुल क्राउन पॉइंट्स',
        tierStatus: 'टियर स्तर',
        exploreRewards: 'रिवार्ड्स में रिडीम करें',
        earnHint: 'वेबसाइट देखने पर वास्तविक समय में पॉइंट्स मिलते हैं',
        pointsNotification: 'क्राउन पॉइंट्स अर्जित हुए'
      }
    }
  },
  bn: {
    translation: {
      nav: {
        services: 'সেবাসমূহ',
        arVisualizer: 'এআর ভিজ্যুয়ালাইজার',
        virtualTour: '৩৬০° ট্যুর',
        aiScanner: 'এআই স্ক্যানার',
        bridal: 'ব্রাইডাল',
        liveWaitlist: 'লাইভ ওয়েটলিস্ট',
        rewards: 'রিওয়ার্ডস',
        wishlist: 'উইশলিস্ট',
        vipGuild: 'ভিআইপি গিল্ড',
        apothecary: 'অ্যাপোথেকারি',
        contact: 'যোগাযোগ',
        bookAppointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
        beautyArchive: 'বিউটি আর্কাইভ',
        callConcierge: 'কনসিয়ার্জ কল',
        spaAmbience: 'স্পা সঙ্গীত',
        soundActive: 'লাউঞ্জ সাউন্ডস্কেপ সক্রিয়',
        searchPlaceholder: 'সেবা, মাস্টার আর্টিসান, বা জার্নাল খুঁজুন...'
      },
      search: {
        placeholder: 'সেবা, মাস্টার আর্টিসান, বা জার্নাল খুঁজুন...',
        quickSearch: 'দ্রুত অনুসন্ধান',
        all: 'সকল ফলাফল',
        services: 'সেবাসমূহ ও রিচুয়াল',
        team: 'মাস্টার কারিগর ও টিম',
        articles: 'সম্পাদকীয় জার্নাল ও নিবন্ধ',
        noResults: 'কোনো ফলাফল পাওয়া যায়নি',
        noResultsDesc: 'বালেয়াজ, ২৪কে গোল্ড, ফেসিয়াল, কেরাটিন বা জোনাথন লিখে অনুসন্ধান করে দেখুন।',
        resultsCount: 'টি ফলাফল পাওয়া গেছে',
        popularSearches: 'জনপ্রিয় অনুসন্ধান:',
        viewDetails: 'বিস্তারিত দেখুন',
        bookNow: 'বুক করুন',
        readArticle: 'নিবন্ধ পড়ুন',
        pressEnterToSelect: 'নির্বাচন করতে এন্টার চাপুন'
      },
      hero: {
        tagline: 'লাক্সারি হেয়ার স্টাইলিং ও বেসপোক স্পা স্টুডিও',
        title: 'যেখানে অতুলনীয় নান্দনিকতা ও স্বর্ণালি বিলাসিতার মিলন ঘটে',
        subtitle: 'বেভারলি হিলসের সবচেয়ে অভিজাত অভয়ারণ্যে ২৪ ক্যারেট গোল্ড রিচুয়ালস এবং বিশ্বখ্যাত মাস্টার কারিগরদের সাথে আপনার রূপান্তর উপভোগ করুন।',
        reserveExperience: 'অভিজ্ঞতা বুক করুন',
        exploreRituals: 'সেবাসমূহ দেখুন'
      },
      booking: {
        title: 'বেসপোক স্টুডিও রিজার্ভেশন',
        subtitle: 'আপনার পছন্দের রিচুয়াল, আর্টিসান ডিরেক্টর এবং দিনক্ষণ নির্বাচন করুন।',
        step1: '১. রিচুয়াল ও স্টাইলিস্ট নির্বাচন',
        step2: '২. তারিখ ও সময়',
        step3: '৩. অতিথির বিবরণ',
        fullName: 'পূর্ণ নাম *',
        phone: 'ফোন নম্বর (১০ ডিজিট আবশ্যক) *',
        phoneError: 'অনুগ্রহ করে একটি বৈধ ১০ ডিজিটের মোবাইল নম্বর দিন।',
        phoneHint: '১০ ডিজিটের মোবাইল নম্বর দিন (যেমন: 9876543210)',
        email: 'ইমেইল অ্যাড্রেস *',
        beverage: 'ভিআইপি লাউঞ্জ ওয়েলকাম ড্রিঙ্ক',
        specialNotes: 'বিশেষ অনুরোধ / ত্বকের সংবেদনশীলতা',
        confirmReservation: 'ভিআইপি রিজার্ভেশন নিশ্চিত করুন',
        congratulations: 'অভিনন্দন! 🎉',
        securedNotice: 'আপনার স্টুডিও রিজার্ভেশন পুষ্পবৃষ্টির সাথে আনুষ্ঠানিকভাবে সুরক্ষিত হয়েছে!',
        autoSentWhatsapp: 'আপনার সম্পূর্ণ বুকিং তথ্য সরাসরি হোয়াটসঅ্যাপে তৈরি হয়ে গেছে, শুধু সেন্ড চাপুন!',
        sendWhatsappDirect: 'হোয়াটসঅ্যাপে পাঠান',
        visitChannelOptional: 'অফিসিয়াল হোয়াটসঅ্যাপ চ্যানেল (ঐচ্ছিক)',
        copyDossier: 'সম্পূর্ণ তথ্য কপি করুন',
        closeModal: 'বন্ধ করুন এবং ফিরে যান'
      },
      sound: {
        enable: 'স্পা সাউন্ডস্কেপ চালু করুন',
        mute: 'স্পা সাউন্ডস্কেপ বন্ধ করুন',
        active: 'লাউঞ্জ সাউন্ডস্কেপ চলছে',
        soundscapeController: 'সাউন্ডস্কেপ কন্ট্রোলার',
        atelierAmbience: 'অ্যাটেলিয়ার অ্যাম্বিয়েন্স',
        atelierDesc: 'স্লো-মোশন লাক্সারি লাউঞ্জ ও আকর্ষণীয় রিংটোন',
        meditationZen: 'মেডিটেশন জেন',
        zenDesc: 'তিব্বতি বাটি ও গভীর প্রশান্তি সঙ্গীত',
        bespokePiano: 'বেসপোক পিয়ানো',
        pianoDesc: 'ধীর লয়ের পিয়ানো সুর',
        volume: 'ভলিউম',
        slowMotionBadge: 'স্লো-মোশন অডিও'
      },
      crownPoints: {
        widgetTitle: 'ক্রাউন পয়েন্টস লয়ালটি',
        sessionEarned: 'এই সেশনে অর্জিত',
        currentBalance: 'মোট ক্রাউন পয়েন্টস',
        tierStatus: 'টিয়ার স্ট্যাটাস',
        exploreRewards: 'রিওয়ার্ডসে রিডিম করুন',
        earnHint: 'ওয়েবসাইট ঘুরে দেখলে রিয়েল-টাইমে পয়েন্ট বাড়ে',
        pointsNotification: 'ক্রাউন পয়েন্ট অর্জিত হয়েছে'
      }
    }
  }
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('aura_dor_lang') || 'en' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
