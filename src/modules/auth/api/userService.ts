import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/modules/auth/api/tokenService.ts'
import { useFetch } from "@/app/composables/useFetch";
import type { IUser } from '@/modules/auth/interfaces'

export async function getCurrentUserData() {
    const api = useFetch(import.meta.env.VITE_API)
    const token = getToken()
    let dataMe: IUser | null = null

    if (token) {
        dataMe = await api.get('/auth/me')
    }

    if (!token) {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
            console.error('Токен не найден')
            return null
        }

        const res = await api.post<{refreshToken: string}, {accessToken: string, refreshToken: string}>('/auth/refresh', { refreshToken })

        setToken(res.accessToken)

        if (res.refreshToken) {
            setRefreshToken(res.refreshToken)
        }

        dataMe = await api.get('/auth/me')
    }

    return dataMe
}
