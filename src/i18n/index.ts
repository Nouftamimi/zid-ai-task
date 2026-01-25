// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import en from './en.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const LANGUAGE_KEY = 'APP_LANGUAGE';

export const initI18n = async () => {
  const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  const lang = savedLang || 'en';
  const isRTL = lang === 'ar';

  // 🔥 MUST run before render
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(isRTL);

  await i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const setLanguage = async (lang: 'en' | 'ar') => {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
};

export default i18n;
