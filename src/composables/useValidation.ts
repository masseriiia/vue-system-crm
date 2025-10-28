import { computed, type Ref } from 'vue'

export function useValidation(validation: Ref<string>) {
  const errorText = computed(() => {
    if (validation.value.trim().length === 0) {
      return 'Это поле обязательно!'
    }
    return null
  })

  return { errorText }
}
