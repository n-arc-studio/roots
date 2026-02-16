import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

i18next
  .use(FsBackend)
  .init({
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation'],
    backend: {
      loadPath: path.join(__dirname, '../i18n/locales/{{lng}}.json'),
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
