import { setRefreshToken, setToken } from "./tokenService"

export async function registerService(email: string, password: string) {
    const data = await fetch(`${import.meta.env.VITE_API}/auth/register`, {
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
