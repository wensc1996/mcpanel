import { post } from '../request';
export interface LoginParam {
    userId: number,
    password: string,
}
export interface LoginResponse {
    userId: number,
    playerId: string,
    loginIp: string,
    roleId: number,
    account: string
}

export function apiLogin (body: LoginParam) {
    return post<null | LoginResponse>({url: '/api/user/login', body})
}