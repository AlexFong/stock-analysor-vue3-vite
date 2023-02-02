import cookies from './util.cookies'

export { cookies }

/**
 * 对于父子组绑定的sync使用
 * 在子组件中的computed调用
 * @export get/set
 * @param {*} value
 */
// export function getSet(value: string, setFn: Function | null = null) {
//   return {
//     get() {
//       return this[value]
//     },
//     set(nd) {
//       if (setFn) {
//         setFn(nd)
//       } else {
//         this.$emit(`update:${value}`, nd)
//       }
//     }
//   }
// }

/**
 * 局部请求接口进行统一处理，支持单个/多个方法
 * @param {[Promise, Array]} promise - 异步方法
 * @param {Object} context - 源对象的上下文
 * @param {[String, Array]} - 要设置loading的key
 * @param {Object} self - this的上下文
 */
export const to = (method: Promise<T> | Promise<T>[], context?: any, loading?: string = 'loading', self?: any) => {
	if (toType(method) !== 'Array') method = [method]
	// 开启loading
	autoLoading(context, loading, true, self)
	return Promise.all(method)
		.then((res) => [null, ...res])
		.catch((err) => [err])
		.finally(() => {
			// 关闭loading
			autoLoading(context, loading, false, self)
		})
}

/**
 * 自动控制loading
 * @param {Object} context - 源对象的上下文
 * @param {[String, Array]} loading - key
 * @param {Boolean} is - true/false
 * @param {Object} self - this的上下文
 */
const autoLoading = (context, loading, is, self) => {
	// 如果没传上下文时，则不用操作loading
	if (!context || toType(context) !== 'Object') return

	// !请求记录，是为了防止axios有检测重复请求时，当上一个请求检测重复时，这里会关闭loading
	// !所以这里检测当关闭loading时，则remove本身的context，然后继续检测还有没有上一个相同的context时
	// !有的话，则不用关闭，直接return
	// !只有当最后一个context则才会关闭loading

	// 如果是开启loading则记一个请求记录
	autoLoading.pending = autoLoading.pending || []
	if (is) {
		autoLoading.pending.push(context)
	}

	// 判断是否有存在过上下文
	const isExistContext = (pending, context) => {
		return pending.findIndex((e) => e === context)
	}

	// loading开关
	const handleLoading = (context, loading, is, self) => {
		if (!is) {
			// 当关闭的时候销毁自身请求记录
			autoLoading.pending.splice(isExistContext(autoLoading.pending, context), 1)

			// 再次判断还有存在上下文
			// 如果有，则说明上一个请求还在ing中，那么就不用关闭
			// 否则，则正常流程走
			const isExist = !!~isExistContext(autoLoading.pending, context)
			if (isExist) return
		}
		if (self) {
			self.$set(context, loading, is)
		} else {
			if (context[loading] !== undefined) context[loading] = is
		}
	}

	if (Array.isArray(loading)) {
		loading.forEach((e) => {
			handleLoading(context, e, is, self)
		})
	} else {
		handleLoading(context, loading, is, self)
	}
}

/**
 * 返回检测类型
 * @param {*} value - 要被检测类型的数据
 * @returns {String}
 */
export function toType(value: any) {
	const type = Object.prototype.toString.call(value).slice(8, -1)
	console.log('toType', value, type)
	return type
}
/**
 * 睡眠
 * @export
 * @param {number} [time=500] - 睡觉时间，单位毫秒
 * @returns
 */
export function sleep(time = 500) {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}

/**
 * 生成指定范围的随机数
 * @export
 * @param {Number} minNum - 最小值
 * @param {Number} maxNum - 最大值
 * @returns
 */
export function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10)
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
		default:
			return 0
	}
}

/**
 * 解析url
 * @export
 * @param {String} name
 * @returns
 */
export function getQueryString(name) {
	try {
		const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		const urlObj = window.location
		const r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split('?')[1].match(reg) : urlObj.search.substr(1).match(reg)
		if (r != null) return unescape(r[2])
		return null
	} catch (error) {
		return null
	}
}

/**
 * 图片转为base64
 * @param {String} src - 图片url
 * @param {Array} styles - 叠加样式
 */
export function getBase64(src, styles) {
	return new Promise((resolve, reject) => {
		const image = new Image()
		image.setAttribute('crossOrigin', 'Anonymous')
		image.src = src
		image.onload = ({ target }) => {
			const canvas = document.createElement('canvas')
			canvas.width = target.width
			canvas.height = target.height
			const ctx = canvas.getContext('2d')
			ctx.drawImage(target, 0, 0, target.width, target.height)

			// 绘制图片样式
			styles && drawImgStyle(ctx, styles)

			const ext = target.src.substring(target.src.lastIndexOf('.') + 1).toLowerCase()
			const dataURL = canvas.toDataURL('image/' + ext)
			resolve(dataURL)
		}
		image.onerror = () => {
			resolve(src)
		}
	})
}

/**
 * 防抖，连续操作时，只在最后一次触发
 * @export
 * @param {Function} fun - 运行函数
 * @param {Number} wait - 延迟时间
 * @returns
 */
export function debounce(fn, wait) {
	let timer = null
	return function () {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, arguments)
		}, wait)
	}
}

/**
 * 节流，一定时间内，只能触发一次操作
 * @export
 * @param {Function} fn - 运行函数
 * @param {Number} wait - 延迟时间
 * @returns
 */
export function throttle(fn, wait) {
	let canRun = true
	return function () {
		if (!canRun) {
			return
		}
		fn.apply(this, arguments)
		canRun = false
		setTimeout(() => {
			canRun = true
		}, wait)
	}
}

/**
 * 深拷贝
 * @param {Array|Object} data
 * @returns 深拷贝后的数据
 */
export function deepCopy(data) {
	return JSON.parse(JSON.stringify(data))
}

/** 获取BaseUrl */
export function getBaseUrl() {
	const url = location.href.split('#')[0]
	return url.padEnd('/') ? url : url + '/'
}

/** 获取静态资源AssetsUrl */
export function getAssetsUrl() {
	return getBaseUrl() + process.env.BASE_ASSETS + '/'
}
