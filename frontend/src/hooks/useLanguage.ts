import { useCallback } from 'react';
import i18n from '../i18n/config';

export const useLanguage = () => {
  const currentLanguage = i18n.language as 'en' | 'ja';

  const changeLanguage = useCallback((lang: 'en' | 'ja') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    supportedLanguages: ['en', 'ja'] as const,
  };
};
