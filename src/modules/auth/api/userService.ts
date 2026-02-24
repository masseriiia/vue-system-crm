import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/modules/auth/api/tokenService.ts'

export async function getCurrentUserData() {
    const token = getToken()
    let dataMe = null

    if (token) {
        dataMe = await fetch(`${import.meta.env.VITE_API}/auth/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
    }

    if (!token || dataMe?.status === 401) {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
            console.error('Токен не найден')
            return null
        }

        dataMe = await fetch(`${import.meta.env.VITE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        })

        if (!dataMe.ok) {
            throw new Error('Проблема с токеном!')
        }

        const res = await dataMe.json()

        setToken(res.accessToken)

        if (res.refreshToken) {
            setRefreshToken(res.refreshToken)
        }

        dataMe = await fetch(`${import.meta.env.VITE_API}/auth/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${res.accessToken}`
            },
        })
    }

    return await dataMe?.json()
}
