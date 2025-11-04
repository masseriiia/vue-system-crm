import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCurrentUserData } from '@/services/userService.ts'
import { deleteRefreshToken, deleteToken } from '@/services/tokenService.ts'
import { useRouter } from 'vue-router'

export const currentUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref(null)
    const isLoading = ref(false)
    const isLoggedIn = computed(() => !!user.value)

    async function fetchCurrentUser() {
        isLoading.value = true
        try {
            const data = await getCurrentUserData()
            user.value = data
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        user.value = null
        deleteToken()
        deleteRefreshToken()
        await router.push({ name: 'Auth' })
    }

    return { user, isLoading, isLoggedIn, fetchCurrentUser, logout }
})
