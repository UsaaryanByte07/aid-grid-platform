import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

const supported = ['en', 'hi'] as const;
const preferred = localStorage.getItem('language') || 'en';
const savedLang = supported.includes(preferred as any) ? preferred : 'en';

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

export default i18n;
