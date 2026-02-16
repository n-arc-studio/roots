import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { languageService } from '../services/languageService';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = async (lang: 'en' | 'ja') => {
    try {
      // Update on backend if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        await languageService.updateLanguagePreference(lang);
      }

      // Update local language preference
      changeLanguage(lang);
    } catch (error) {
      console.error('Failed to update language preference:', error);
      // Still change language locally even if API fails
      changeLanguage(lang);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded-md transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ja')}
        className={`px-3 py-1 rounded-md transition-colors ${
          currentLanguage === 'ja'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        title="日本語"
      >
        日本語
      </button>
    </div>
  );
};
