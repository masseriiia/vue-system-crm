import { EMethod, EStatus } from "../enums"

export function useFetch(baseUrl: string) {
    async function request<T, R>(method: EMethod, url: string, body?: T): Promise<R> {
        const fullUrl = baseUrl + url
        const options: RequestInit = {
            method: method,
            headers: {
                Authorization: `Bearer ${$cookies.get('token')}`,
                'Content-Type': 'application/json;charset=utf-8',
            }
        }

        if (method !== EMethod.GET && method !== EMethod.DELETE) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(fullUrl, options)

        if (!response.ok) {
            if (response.status === EStatus.UNAUTHORIZED) {
                $cookies.remove('token')
            }
            const error = new Error()
            error.status = response.status
            error.data = await response.json()
            throw error
        }

        return await response.json()
    }

    function get<R>(url: string): Promise<R> {
        return request(EMethod.GET, url)
    }

    function post<T, R>(url: string, body: T): Promise<R> {
        return request(EMethod.POST, url, body)
    }

    function put<T, R>(url: string, body: T): Promise<R> {
        return request(EMethod.PUT, url, body)
    }

    function del<R>(url: string): Promise<R> {
        return request(EMethod.DELETE, url)
    }

    return { get, post, put, del }
}
