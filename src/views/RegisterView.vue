<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { registerService } from '@/services/registerService.ts'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppModal from '@/components/AppModal.vue'
import { useValidation } from '@/composables/useValidation.ts'

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

        toast.success('Вы успешно зарегистрировались!')

        await router.push('/auth')
    } catch (error) {
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <AppModal>
        <h2 class="text-2xl font-bold text-center mb-6">Создать аккаунт</h2>
        <p class="text-center">Заполните форму для регистрации</p>
        <form class="flex flex-col gap-4" @submit.prevent="handleRegisterSubmit">
            <div>
                <label>
                    <span class="label-text">Почта</span>
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
                    <span class="label-text">Пароль</span>
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
            <p class="flex-grow-0">Уже есть аккаунт?</p>
            <AppButton to="/auth">Войти</AppButton>
        </div>
    </AppModal>
</template>
