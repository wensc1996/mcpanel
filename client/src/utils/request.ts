import { message } from "antd"
export interface IResponse <V>{
    code: number,
    data: V,
    msg: string;
}
export function api<IResponse>(url: RequestInfo | URL, init?: RequestInit | undefined ): Promise<IResponse> {
    return new Promise((resolve, rejects) => {
        fetch(url, init)
        .then(response => {
            if (!response.ok) {
                rejects(response)
                throw new Error(response.statusText)
            }
            resolve(response.json())
        }).catch(e => {
            rejects(e)
            message.error('接口异常', 3)
        })
    })
}
export function post<V>(param: {
    url: RequestInfo | URL,
    body: unknown
}) : Promise<IResponse<V>> {
    return api(param.url, {
        method: 'POST',
        body: JSON.stringify(param.body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
}
export function get<V> (param: {
    url: RequestInfo | URL,
    body: unknown
}): Promise<IResponse<V>> {
    return api(param.url, {
        method: 'GET',
        body: JSON.stringify(param.body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
}