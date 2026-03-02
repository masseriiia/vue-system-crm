import { useFetch } from '@/app/composables/useFetch'
import { setRefreshToken, setToken } from '@/modules/auth/api/tokenService.ts'

export async function loginService(email: string, password: string) {
    const api = useFetch(import.meta.env.VITE_API)
    
    const res = await api.post<{email: string, password: string}, {accessToken: string, refreshToken: string}>('/auth/login',{ email, password })

    setToken(res.accessToken)
    setRefreshToken(res.refreshToken)
}
