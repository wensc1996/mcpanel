import { message } from "antd"
import { rejects } from "assert"
import { resolve } from "dns"

type requestBody = BodyInit | null | undefined
export interface Param {
    url: string
    init?: {
        method?: 'POST' | 'GET'
        body?: requestBody,
        headers?: Headers
    }
}
export interface requestParam {
    url: string
    body?: requestBody,
    headers?: Headers 
}
export function api<T>(param: Param ): Promise<void | T> {
    return new Promise((resolve, rejects) => {
        fetch(param.url, param.init)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            resolve(response.json())
        }).catch(e => {
            rejects(e)
            // console.log(message)
            message.error('接口异常')
        })
    })
}
export function post<T> (param: requestParam) : Promise<void | T> {
    return api({
        url: param.url,
        init: {
            method: 'POST',
            body: JSON.stringify(param.body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
    })
}
export function get<T> (param: requestParam) : Promise<void | T> {
    return api({
        url: param.url,
        init: {
            method: 'GET',
            body: JSON.stringify(param.body),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
    })
}