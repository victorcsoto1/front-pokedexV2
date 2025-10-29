export function getToken() {
    return localStorage.getItem('token');
}

export function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
    return JSON.parse(jsonPayload);
    } catch(error) {
        return null
    }
}

export function isTokenValid(token) {
    if (!token)
        return false;

    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp)
        return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
}