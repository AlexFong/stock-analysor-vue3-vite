import axios from 'axios'
import type { AxiosRequestConfig, AxiosHeaders } from 'axios'
import { cookies } from '@/utils'
import { ElMessage } from 'element-plus'
import qs from 'qs'

// 创建一个 axios 实例
const $http = axios.create({
	// baseURL: configUrl.ROOT,
	timeout: 30 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
})

// 请求拦截器，在请求发送之前做一些处理
$http.interceptors.request.use(
	(config) => {
		const headers: any = config.headers || {}
		const token: string = cookies.get('token') || ''
		headers.token = token
		config.headers = headers
		return config
	},
	(error) => {
		// 发送失败
		console.log(error)
		return Promise.reject(error)
	},
)

// 响应拦截器
$http.interceptors.response.use(
	(response) => {
		const dataAxios = response.data
		const { code } = dataAxios
		// 这个状态码是和后端约定的
		console.log('response', code, dataAxios)
		switch (code) {
			case '200':
				return dataAxios
			case 0:
				return dataAxios
			case 1:
				return dataAxios
			default:
				// 不是正确的 code
				errorCreate(`${dataAxios.msg}: ${response.config.url}`)
				break
		}
	},
	(error) => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误'
					break
				case 401:
					error.message = '未授权，请登录'
					break
				case 403:
					error.message = '拒绝访问'
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`
					break
				case 408:
					error.message = '请求超时'
					break
				case 500:
					error.message = '服务器内部错误'
					break
				case 501:
					error.message = '服务未实现'
					break
				case 502:
					error.message = '网关错误'
					break
				case 503:
					error.message = '服务不可用'
					break
				case 504:
					error.message = '网关超时'
					break
				case 505:
					error.message = 'HTTP版本不受支持'
					break
				default:
					break
			}
		}
		return Promise.reject(error)
	},
)

// 创建一个错误
function errorCreate(msg: string) {
	const error = new Error(msg)
	if (process.env.NODE_ENV === 'dev') {
		console.warn(error)
	}
	// 显示提示
	ElMessage({
		message: error.message,
		type: 'error',
		duration: 5 * 1000,
	})
	throw error
}

export { $http }

export const get = (url: string, data: any) => {
	const reqUrl = data ? `${url}?${qs.stringify(data)}` : url
	return $http({
		url: reqUrl,
		method: 'get',
	})
}

export const post = (url: string, data: any, isStringify: boolean = false, isJson: boolean = false, header: AxiosHeaders | undefined = undefined) => {
	const headerParams: AxiosHeaders | undefined = header ? header : isJson ? { 'Content-Type': 'application/json' } : undefined
	const reqConfig: AxiosRequestConfig<any> = {
		url,
		method: 'post',
		data: isStringify ? qs.stringify(data) : data,
		headers: headerParams ? headerParams : undefined,
	}
	return $http(reqConfig)
}
