import { Request, Response, NextFunction } from 'express';
import i18n from './config';

// Extend Express Request interface to include i18n
declare global {
  namespace Express {
    interface Request {
      i18n: any;
      t: (key: string) => string;
    }
  }
}

export const i18nMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // Get language from query parameter, header, or use default
  const lang = req.query.lang as string || req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';

  // Initialize i18n for this request
  i18n.changeLanguage(lang);

  // Add helper method to request
  req.t = (key: string) => i18n.t(key);
  req.i18n = i18n;

  next();
};

export const t = (key: string, language: string = 'en') => {
  return i18n.t(key, { lng: language });
};

export default i18n;
