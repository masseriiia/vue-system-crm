import type { ValueOf } from "@/app/utils/types"

export const SETTINGS_TYPE = {
  PROFILE: 'profile',
  APPEARANCE: 'appearance',
  SECURITY: 'security',
} as const

export type SettingsType = ValueOf<typeof SETTINGS_TYPE>
