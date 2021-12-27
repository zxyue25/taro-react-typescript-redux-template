import { request } from "@tarojs/taro";

// 请求头类型
const contentTypes = {
    json: 'application/json; charset=utf-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
    multipart: 'multipart/form-data',
}

// 默认参数
const defaultOptions = {
    timeout: 3000,
    credentials: "include", // 设置H5端携带Cookie
    dataType: "json" // 返回的数据结构
}

interface OptionParams {
    url: string,
    method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT",
    data?: object,
    options?: any,
    contentType: 'json' | 'urlencoded' | 'multipart',
    prefixUrl: string
}

const callApi = ({
    url,
    method = 'GET',
    data,
    options,
    contentType = 'json',
    prefixUrl = 'api'
}: OptionParams) => {
    if (!url) {
        const error = new Error('请传入url')
        return Promise.reject(error)
    }

    const fullUrl = `/${prefixUrl}/${url}`

    const newOptions = {
        ...defaultOptions,
        header: {
            'content-type':
                (options.header && options.header['content-type']) ||
                contentTypes[contentType],
            'X-Requested-With': 'XMLHttpRequest',
        },
        ...options,
        data,
        method
    }

    return request({
        url: fullUrl,
        ...newOptions
    })
        .then((response) => {
            const { data } = response
            if (data.code === 'xxx') {
                // 与服务端约定
                // 登录校验失败
            } else if (data.code === 'xxx') {
                // 与服务端约定
                // 无权限
            } else if (data.code === 'xxx') {
                // 与服务端约定
                return Promise.resolve(data)
            } else {
                return Promise.reject(data)
            }
        })
        .catch((error) => {
            return Promise.reject(error)
        })

}

export default callApi