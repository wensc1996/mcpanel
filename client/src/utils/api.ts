import { post } from './request';
import { requestParam } from './request'
import { LoginResponse } from '../types/response'
export function apiLogin (body: requestParam['body']) {
    return post({url: '/api/login', body})
}