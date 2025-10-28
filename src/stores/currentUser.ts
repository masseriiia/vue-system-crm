import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCurrentUserData } from '@/services/userService.ts'
import { deleteRefreshToken, deleteToken } from '@/services/tokenService.ts'

export const currentUserStore = defineStore('user', () => {
    const user = ref(null)
    const isLoggedIn = computed(() => !!user.value)

    async function fetchCurrentUser() {
        try {
            const data = await getCurrentUserData()
            user.value = data
        } finally {
        }
    }

    async function logout() {
        user.value = null
        deleteToken()
        deleteRefreshToken()
    }

    return { user, isLoggedIn, fetchCurrentUser, logout }
})
