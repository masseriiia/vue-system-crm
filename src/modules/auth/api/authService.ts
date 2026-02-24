import { setRefreshToken, setToken } from '@/modules/auth/api/tokenService.ts'

export async function loginService(email: string, password: string) {
    const data = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!data.ok) {
        throw new Error('Произошла ошибка!')
    }

    const res = await data.json()

    setToken(res.accessToken)
    setRefreshToken(res.refreshToken)
}
