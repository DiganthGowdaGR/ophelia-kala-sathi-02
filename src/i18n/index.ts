import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        demo: "Demo", 
        analytics: "Analytics",
        success: "Success Stories",
        pricing: "Pricing",
        login: "Login",
        signup: "Sign Up"
      },
      // Hero Section
      hero: {
        title: "AI-Powered Marketing for Indian Artisans",
        subtitle: "Transform your craft photos into viral social media content. Ophelia AI creates engaging stories, captions, and videos that showcase your art to the world.",
        cta_demo: "Try Demo",
        cta_signup: "Create Your Account Today",
        upload_title: "Upload Your Craft",
        upload_subtitle: "Drop your photo, video, audio, or text here"
      },
      // Upload Box
      upload: {
        drag_drop: "Drag & drop your media here",
        or: "or",
        browse: "Browse Files",
        supported: "Supports images, videos, audio & text",
        uploading: "Uploading...",
        processing: "AI is processing your content..."
      },
      // Review Modal
      review: {
        title: "Review Generated Content",
        story: "Story",
        captions: "Social Media Captions", 
        reel_script: "Reel Script",
        price: "Suggested Price",
        post_now: "Post Now",
        dont_post: "Don't Post",
        improve: "Improve Video",
        save_success: "Content saved successfully!",
        post_success: "Posted successfully across all platforms!"
      },
      // Demo Page
      demo: {
        title: "How Ophelia AI Works",
        subtitle: "See how our AI transforms your craft into compelling marketing content",
        step1_title: "Upload Content",
        step1_desc: "Share photos, videos, or descriptions of your craft",
        step2_title: "AI Generation", 
        step2_desc: "Our AI creates engaging stories and social media content",
        step3_title: "Review & Approve",
        step3_desc: "Review and customize the generated content",
        step4_title: "Post & Track",
        step4_desc: "Publish across platforms and track performance"
      },
      // Analytics
      analytics: {
        title: "Your Marketing Analytics",
        subtitle: "Track your social media performance across platforms",
        impressions: "Impressions",
        reach: "Reach",
        engagement: "Engagement", 
        conversions: "Conversions",
        revenue: "Revenue",
        top_posts: "Top Performing Posts",
        platforms: "Platforms"
      },
      // Success Stories
      success: {
        title: "Success Stories from Indian Artisans",
        subtitle: "Discover how AI-powered marketing transformed their businesses",
        cta: "Start Your Journey — Create Account",
        before: "Before",
        after: "After",
        income: "Monthly Income"
      },
      // Auth
      auth: {
        signup_title: "Join Thousands of Artisans",
        login_title: "Welcome Back",
        name: "Full Name",
        email: "Email Address", 
        phone: "Phone Number",
        password: "Password",
        signup_button: "Create Your Account Today",
        login_button: "Sign In",
        or_continue: "Or continue with",
        google: "Google",
        facebook: "Facebook",
        have_account: "Already have an account?",
        no_account: "Don't have an account?"
      },
      // Footer
      footer: {
        about: "About",
        faq: "FAQ", 
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        support: "Support",
        whatsapp: "WhatsApp Support",
        tagline: "Empowering Indian artisans with AI-driven marketing"
      },
      // Common
      common: {
        loading: "Loading...",
        error: "Something went wrong",
        try_again: "Try Again",
        close: "Close",
        save: "Save",
        cancel: "Cancel",
        language: "Language"
      }
    }
  },
  kn: {
    translation: {
      // Navigation - Kannada
      nav: {
        home: "ಮುಖಪುಟ",
        demo: "ಪ್ರದರ್ಶನ",
        analytics: "ಅಂಕಿಅಂಶಗಳು",
        success: "ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
        pricing: "ಬೆಲೆ",
        login: "ಲಾಗಿನ್",
        signup: "ಸೈನ್ ಅಪ್"
      },
      // Hero Section - Kannada
      hero: {
        title: "ಭಾರತೀಯ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ AI-ಚಾಲಿತ ಮಾರ್ಕೆಟಿಂಗ್",
        subtitle: "ನಿಮ್ಮ ಕರಕುಶಲ ಫೋಟೋಗಳನ್ನು ವೈರಲ್ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ವಿಷಯವಾಗಿ ಪರಿವರ್ತಿಸಿ. Ophelia AI ನಿಮ್ಮ ಕಲೆಯನ್ನು ಪ್ರಪಂಚಕ್ಕೆ ಪ್ರದರ್ಶಿಸುವ ಆಕರ್ಷಕ ಕಥೆಗಳು, ಶೀರ್ಷಿಕೆಗಳು ಮತ್ತು ವೀಡಿಯೊಗಳನ್ನು ರಚಿಸುತ್ತದೆ.",
        cta_demo: "ಪ್ರದರ್ಶನ ನೋಡಿ",
        cta_signup: "ಇಂದೇ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
        upload_title: "ನಿಮ್ಮ ಕರಕುಶಲವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        upload_subtitle: "ನಿಮ್ಮ ಫೋಟೋ, ವೀಡಿಯೊ, ಆಡಿಯೊ ಅಥವಾ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ"
      },
      // Upload Box - Kannada
      upload: {
        drag_drop: "ನಿಮ್ಮ ಮಾಧ್ಯಮವನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ",
        or: "ಅಥವಾ",
        browse: "ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
        supported: "ಚಿತ್ರಗಳು, ವೀಡಿಯೊಗಳು, ಆಡಿಯೊ ಮತ್ತು ಪಠ್ಯವನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
        uploading: "ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        processing: "AI ನಿಮ್ಮ ವಿಷಯವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದೆ..."
      },
      // Review Modal - Kannada  
      review: {
        title: "ರಚಿಸಿದ ವಿಷಯವನ್ನು ಪರಿಶೀಲಿಸಿ",
        story: "ಕಥೆ",
        captions: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಶೀರ್ಷಿಕೆಗಳು",
        reel_script: "ರೀಲ್ ಸ್ಕ್ರಿಪ್ಟ್",
        price: "ಸೂಚಿಸಿದ ಬೆಲೆ",
        post_now: "ಈಗ ಪೋಸ್ಟ್ ಮಾಡಿ",
        dont_post: "ಪೋಸ್ಟ್ ಮಾಡಬೇಡಿ",
        improve: "ವೀಡಿಯೊವನ್ನು ಸುಧಾರಿಸಿ",
        save_success: "ವಿಷಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
        post_success: "ಎಲ್ಲಾ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಲಾಗಿದೆ!"
      },
      // Continue with other translations...
      demo: {
        title: "Ophelia AI ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
        subtitle: "ನಮ್ಮ AI ನಿಮ್ಮ ಕರಕುಶಲವನ್ನು ಆಕರ್ಷಕ ಮಾರ್ಕೆಟಿಂಗ್ ವಿಷಯವಾಗಿ ಹೇಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ ನೋಡಿ",
        step1_title: "ವಿಷಯ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        step1_desc: "ನಿಮ್ಮ ಕರಕುಶಲದ ಫೋಟೋಗಳು, ವೀಡಿಯೊಗಳು ಅಥವಾ ವಿವರಣೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
        step2_title: "AI ಉತ್ಪಾದನೆ",
        step2_desc: "ನಮ್ಮ AI ಆಕರ್ಷಕ ಕಥೆಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ವಿಷಯವನ್ನು ರಚಿಸುತ್ತದೆ",
        step3_title: "ಪರಿಶೀಲನೆ ಮತ್ತು ಅನುಮೋದನೆ",
        step3_desc: "ರಚಿಸಿದ ವಿಷಯವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
        step4_title: "ಪೋಸ್ಟ್ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        step4_desc: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ ಪ್ರಕಟಿಸಿ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"
      },
      analytics: {
        title: "ನಿಮ್ಮ ಮಾರ್ಕೆಟಿಂಗ್ ಅಂಕಿಅಂಶಗಳು",
        subtitle: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        impressions: "ಇಂಪ್ರೆಷನ್‌ಗಳು",
        reach: "ಪಹುಂಚು",
        engagement: "ನಿರತತೆ",
        conversions: "ಪರಿವರ್ತನೆಗಳು",
        revenue: "ಆದಾಯ",
        top_posts: "ಉತ್ತಮ ಕಾರ್ಯಕ್ಷಮತೆಯ ಪೋಸ್ಟ್‌ಗಳು",
        platforms: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು"
      },
      success: {
        title: "ಭಾರತೀಯ ಕುಶಲಕರ್ಮಿಗಳಿಂದ ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
        subtitle: "AI-ಚಾಲಿತ ಮಾರ್ಕೆಟಿಂಗ್ ಅವರ ವ್ಯವಸಾಯಗಳನ್ನು ಹೇಗೆ ಪರಿವರ್ತಿಸಿತು ಎಂಬುದನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
        cta: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ — ಖಾತೆ ರಚಿಸಿ",
        before: "ಮೊದಲು",
        after: "ನಂತರ",
        income: "ಮಾಸಿಕ ಆದಾಯ"
      },
      auth: {
        signup_title: "ಸಾವಿರಾರು ಕುಶಲಕರ್ಮಿಗಳ ಸೇರಿ",
        login_title: "ಸ್ವಾಗತ",
        name: "ಪೂರ್ಣ ಹೆಸರು",
        email: "ಇಮೇಲ್ ವಿಳಾಸ",
        phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        signup_button: "ಇಂದೇ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
        login_button: "ಸೈನ್ ಇನ್",
        or_continue: "ಅಥವಾ ಮುಂದುವರಿಸಿ",
        google: "ಗೂಗಲ್",
        facebook: "ಫೇಸ್‌ಬುಕ್",
        have_account: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
        no_account: "ಖಾತೆ ಇಲ್ಲವೇ?"
      },
      footer: {
        about: "ಬಗ್ಗೆ",
        faq: "ಪ್ರಶ್ನೆಗಳು",
        privacy: "ಗೌಪ್ಯತೆ ನೀತಿ",
        terms: "ಸೇವೆಯ ನಿಯಮಗಳು",
        support: "ಬೆಂಬಲ",
        whatsapp: "WhatsApp ಬೆಂಬಲ",
        tagline: "AI-ಚಾಲಿತ ಮಾರ್ಕೆಟಿಂಗ್‌ನೊಂದಿಗೆ ಭಾರತೀಯ ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಶಕ್ತಿಗೊಳಿಸುವುದು"
      },
      common: {
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
        try_again: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
        close: "ಮುಚ್ಚಿ",
        save: "ಉಳಿಸಿ",
        cancel: "ರದ್ದುಗೊಳಿಸಿ",
        language: "ಭಾಷೆ"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;