import { unstable_cache } from 'next/cache';
import prisma from './prisma';

export interface SettingsType {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  mapLink?: string;
}

const DEFAULT_SETTINGS: SettingsType = {
  phone: "+971 56 588 2185",
  whatsapp: "971565882185",
  email: "info@najmatraozan.com",
  location: "Al Quoz Industrial Area, Dubai, UAE",
  mapLink: "https://maps.app.goo.gl/",
};

// Next.js caches this query heavily so it doesn't hit the DB on every page load
export const getSiteSettings = unstable_cache(
  async (): Promise<SettingsType> => {
    try {
      const settings = await prisma.siteSettings.findFirst();
      if (!settings) {
        return DEFAULT_SETTINGS;
      }
      return {
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        location: settings.location,
        mapLink: settings.mapLink,
      };
    } catch (error) {
      console.error("Failed to fetch site settings, using defaults:", error);
      return DEFAULT_SETTINGS;
    }
  },
  ['global-site-settings'], 
  { tags: ['settings'] } // This tag allows us to instantly purge the cache when the admin updates it
);
