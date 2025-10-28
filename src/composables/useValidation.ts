import { computed, type Ref } from 'vue'

type ValidationType = 'email' | 'password'

export function useValidation(validation: Ref<string>, type: ValidationType) {
    const errorText = computed(() => {
        const value = validation.value.trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (value.length === 0) {
            return 'Это поле обязательно!'
        }

        if (type === 'email') {
            if (!emailRegex.test(value)) {
                return 'Неверный формат email'
            }
            return null
        }

        if (type === 'password') {
            if (value.length < 6) {
                return 'Пароль должен содержать минимум 6 символов'
            }
            return null
        }

        return null
    })

    return { errorText }
}
