"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { common_en, game_en, channel_en, profile_en } from '/locales/en/index';
import { common_ko, game_ko, channel_ko, profile_ko } from '/locales/ko/index';
import { common_fr, game_fr, channel_fr, profile_fr } from '/locales/fr/index';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: common_en,
        game: game_en,
        channel: channel_en,
        profile: profile_en
      },
      ko: {
        common: common_ko,
        game: game_ko,
        channel: channel_ko,
        profile: profile_ko
      },
      fr: {
        common: common_fr,
        game: game_fr,
        channel: channel_fr,
        profile: profile_fr
      }
    },
    lng: "en",
    fallbackLng: "en",
    ns: ['common', 'game', 'channel', 'prfofile'],
    interpolation: {
      escapeValue: false
    }
  });

export default function I18nProvider({ children }: { children: any }) {
  return children;
}