import type { ValueOf } from "@/app/utils/types.ts"

export const INPUT_TYPES = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
    CHECKBOX: 'checkbox',
    NUMBER: 'number'
} as const

export type InputType = ValueOf<typeof INPUT_TYPES>
