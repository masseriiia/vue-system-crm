export function getToken() {
    return $cookies.get('token')
}

export function setToken(access: string) {
    $cookies.set('token', access)
}

export function deleteToken() {
    $cookies.remove('token')
}

export function setRefreshToken(refresh: string) {
    $cookies.set('refresh_token', refresh)
}

export function getRefreshToken() {
    return $cookies.get('refresh_token')
}

export function deleteRefreshToken() {
    $cookies.remove('refresh_token')
}
