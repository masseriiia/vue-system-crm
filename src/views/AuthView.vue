<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { loginService } from '@/services/authService.ts'
import { useToast } from 'vue-toastification'
import { currentUserStore } from '@/stores/currentUser.ts'
import AppModal from '@/components/AppModal.vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

const store = currentUserStore()
const toast = useToast()

const isLoading = ref<boolean>(false)
const auth = reactive({
  email: '',
  password: ''
})

const emailErrorText = computed(() => {
  const email = auth.email.trim()
  if (email.length === 0) {
    return 'Это поле обязательно!'
  }
  return null
})
const passwordErrorText = computed(() => {
  const password = auth.password.trim()
  if (password.length === 0) {
    return 'Это поле обязательно!'
  }

  return null
})

const isSubmitDisable = computed(() => {
  return isLoading.value || !!emailErrorText.value || !!passwordErrorText.value
})

const handleLoginSubmit = async () => {
  isLoading.value = true
  try {
    await loginService(auth.email, auth.password)
    await store.fetchCurrentUser()
    toast.success('Вы успешно авторизовались!')

    auth.email = ''
    auth.password = ''

  } catch (error) {
    toast.error(error.message)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <template v-if="store.isLoggedIn">
    <AppModal>
      <p class="text-center">Вы авторизованы</p>
      <button class="btn btn-outline" @click="store.logout()" >Выйти из аккаунта</button>
    </AppModal>
  </template>
  <template v-else>
    <AppModal>
      <h2 class="text-2xl font-bold text-center mb-6">Добро пожаловать</h2>
      <p class=" text-center">Войдите в свою учетную запись</p>
      <form class="flex flex-col gap-4" @submit.prevent="handleLoginSubmit">
        <div>
          <label>
            <span class="label-text">Почта</span>
            <AppInput type="email" v-model="auth.email" :error="emailErrorText" placeholder="Введите почту"/>
          </label>
        </div>
        <div>
          <label>
            <span class="label-text">Пароль</span>
            <AppInput type="password" v-model="auth.password" :error="passwordErrorText" placeholder="Введите пароль"/>
          </label>
        </div>
        <AppButton :disabled="isSubmitDisable">
          Войти
        </AppButton>
      </form>
      <div class="text-center">
        <span class="text-gray-400">ИЛИ</span>
      </div>
      <div class="flex justify-center items-center gap-2">
        <p class="flex-grow-0">Нет аккаунта?</p>
        <AppButton to="/register">Зарегистрироваться</AppButton>
      </div>
    </AppModal>
  </template>
</template>


