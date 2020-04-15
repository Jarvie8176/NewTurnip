import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import NotificationManager from "../notification/notificationManager";
import { GetDefaultTranslations } from "./strings/default";
import { XLTN_EN } from "./strings/en";
import { XLTN_ZH } from "./strings/zh";

const XLTN_DEFAULT = GetDefaultTranslations();

const resources = {
  dev: { translation: XLTN_DEFAULT },
  en: { translation: XLTN_EN },
  zh: { translation: XLTN_ZH },
};

i18next
  .use(LanguageDetector)
  .init({ resources, debug: true, react: { wait: true } })
  .catch(NotificationManager.ShowError);
