<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { registerService } from '@/modules/auth/api/registerService.ts'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useValidation } from '@/modules/auth/composables/useValidation.ts'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/app/constants'
import AppInput from '@/ui/AppInput.vue'
import AppModal from '@/ui/AppModal.vue'
import AppButton from '@/ui/AppButton.vue'

const router = useRouter()
const toast = useToast()

const isLoading = ref<boolean>(false)
const register = reactive({
    email: '',
    password: '',
})
const touched = reactive({
    email: false,
    password: false,
})

const { errorText: emailErrorText } = useValidation(toRef(register, 'email'), 'email')
const { errorText: passwordErrorText } = useValidation(toRef(register, 'password'), 'password')

const isSubmitDisable = computed(() => {
    return isLoading.value || !!emailErrorText.value || !!passwordErrorText.value
})

const handleRegisterSubmit = async () => {
    isLoading.value = true
    try {
        await registerService(register.email, register.password)
        await router.push({name: ROUTE_NAMES.AUTH })
        toast.success('Вы успешно зарегистрировались!')
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message)
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <AppModal>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Создать аккаунт</h2>
        <p class="text-center text-gray-900 dark:text-white">Заполните форму для регистрации</p>
        <form class="flex flex-col gap-4" @submit.prevent="handleRegisterSubmit">
            <div>
                <label>
                    <span class="label-text text-gray-900 dark:text-white">Почта</span>
                    <AppInput
                        type="email"
                        v-model="register.email"
                        v-model:touched="touched.email"
                        :error="emailErrorText"
                        placeholder="Введите почту"
                    />
                </label>
            </div>
            <div>
                <label>
                    <span class="label-text text-gray-900 dark:text-white">Пароль</span>
                    <AppInput
                        type="password"
                        v-model="register.password"
                        v-model:touched="touched.password"
                        :error="passwordErrorText"
                        placeholder="Введите пароль"
                    />
                </label>
            </div>
            <AppButton :disabled="isSubmitDisable">Зарегистрироваться</AppButton>
        </form>
        <div class="text-center">
            <span class="text-gray-400">ИЛИ</span>
        </div>
        <div class="flex justify-center items-center gap-2">
            <p class="flex-grow-0 text-gray-900 dark:text-white">Уже есть аккаунт?</p>
            <AppButton variant="secondary" :to="ROUTE_PATHS.AUTH">Войти</AppButton>
        </div>
    </AppModal>
</template>
