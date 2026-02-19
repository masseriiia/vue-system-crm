<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { loginService } from '@/services/authService.ts'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/useUserStore.ts'
import AppModal from '@/components/AppModal.vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { useValidation } from '@/composables/useValidation.ts'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/constants/routes.ts'

const store = useUserStore()
const toast = useToast()
const router = useRouter()

const isLoading = ref<boolean>(false)
const auth = reactive({
    email: '',
    password: '',
})
const touched = reactive({
    email: false,
    password: false,
})

const { errorText: emailErrorText } = useValidation(toRef(auth, 'email'), 'email')
const { errorText: passwordErrorText } = useValidation(toRef(auth, 'password'), 'password')

const isSubmitDisable = computed(() => {
    return isLoading.value || !!emailErrorText.value || !!passwordErrorText.value
})

const submitForm = async () => {
    isLoading.value = true
    try {
        await loginService(auth.email, auth.password)
        await store.fetchCurrentUser()
        await router.push({ name: ROUTE_NAMES.DASHBOARD })
        toast.success('Вы успешно авторизовались!')
    } catch (error) {
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <AppModal>
        <h2 class="text-2xl text-gray-900 dark:text-white font-bold text-center mb-6">Добро пожаловать</h2>
        <p class="text-center text-gray-900 dark:text-white">Войдите в свою учетную запись</p>
        <form class="flex flex-col gap-4" @submit.prevent="submitForm">
            <div>
                <label>
                    <span class="label-text text-gray-900 dark:text-white">Почта</span>
                    <AppInput
                        type="email"
                        v-model="auth.email"
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
                        v-model="auth.password"
                        v-model:touched="touched.password"
                        :error="passwordErrorText"
                        placeholder="Введите пароль"
                    />
                </label>
            </div>
            <AppButton :disabled="isSubmitDisable"> Войти </AppButton>
        </form>
        <div class="text-center">
            <span class="text-gray-400">ИЛИ</span>
        </div>
        <div class="flex justify-center items-center gap-2">
            <p class="flex-grow-0 text-gray-900 dark:text-white">Нет аккаунта?</p>
            <AppButton variant="secondary" :to="ROUTE_PATHS.REGISTER">Зарегистрироваться</AppButton>
        </div>
    </AppModal>
</template>
