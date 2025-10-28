export function getToken() {
    let token = $cookies.get('token')

    if (!token) {
        token = getRefreshToken()
    }

    return token
}

export function setToken(token: { access_token: string }) {
    $cookies.set('token', token.access_token)
}

export function deleteToken() {
    $cookies.remove('token')
}

export function setRefreshToken(token: { refresh_token: string }) {
    $cookies.set('refresh_token', token.refresh_token)
}

export function getRefreshToken() {
    return $cookies.get('refresh_token')
}

export function deleteRefreshToken() {
    $cookies.remove('refresh_token')
}
