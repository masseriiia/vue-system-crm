export const INPUT_TYPES = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
    CHECKBOX: 'checkbox',
    NUMBER: 'number'
} as const

export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES]