export const SETTINGS_TYPE = {
  PROFILE: 'profile',
  APPEARANCE: 'appearance',
  SECURITY: 'security',
} as const

export type SettingsType = typeof SETTINGS_TYPE[keyof typeof SETTINGS_TYPE]