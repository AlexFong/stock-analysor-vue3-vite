import axios from 'axios'
import qs from 'qs'
import { to } from '@/utils'

const get = (url: string, data?: any) => {
	const reqUrl = data ? `${url}?${qs.stringify(data)}` : url
	return axios({
		url: reqUrl,
		method: 'get',
	})
}

/**
 * 个股分时数据
 * https://quotes.sina.cn/cn/api/openapi.php/CN_MinlineService.getMinlineData?symbol=sh600006
 * @param symbol 如sh600006
 * @returns
 */
export const getStockMinLineData = (symbol: string) => get('/sina/quotes/CN_MinlineService.getMinlineData', { symbol })

/**
 * 个股数据
 * http://qt.gtimg.cn/q=sh600006
 * @param symbol  如sh600006
 * @returns
 */
export const getStockInfo = (symbol: string) => get(`/sina/stockinfo/q=${symbol}`, null)
export interface InfoItem {
	key: string
	label: string
	value: string
	type: 'base' | 'trading' | 'trade' | 'unknown' | ''
}
export const getStockInfoFormat: InfoItem[] = [
	{ key: '', label: 'useless1', value: '', type: '' },
	{ key: '', label: '名称', value: '', type: 'base' },
	{ key: '', label: '代码', value: '', type: 'base' },
	{ key: '', label: '股价', value: '', type: 'base' },
	{ key: '', label: '昨收', value: '', type: 'trade' },
	{ key: '', label: '今开', value: '', type: 'trade' },
	{ key: '', label: '成交量', value: '', type: 'trade' },
	{ key: '', label: '成交额', value: '', type: 'trade' },
	{ key: '', label: '未知', value: '', type: 'unknown' },
	{ key: '', label: '买1价', value: '', type: 'trading' },
	{ key: '', label: '买1量', value: '', type: 'trading' },
	{ key: '', label: '买2价', value: '', type: 'trading' },
	{ key: '', label: '买2量', value: '', type: 'trading' },
	{ key: '', label: '买3价', value: '', type: 'trading' },
	{ key: '', label: '买3量', value: '', type: 'trading' },
	{ key: '', label: '买4价', value: '', type: 'trading' },
	{ key: '', label: '买4量', value: '', type: 'trading' },
	{ key: '', label: '买5价', value: '', type: 'trading' },
	{ key: '', label: '买5量', value: '', type: 'trading' },
	{ key: '', label: '卖1价', value: '', type: 'trading' },
	{ key: '', label: '卖1量', value: '', type: 'trading' },
	{ key: '', label: '卖2价', value: '', type: 'trading' },
	{ key: '', label: '卖2量', value: '', type: 'trading' },
	{ key: '', label: '卖3价', value: '', type: 'trading' },
	{ key: '', label: '卖3量', value: '', type: 'trading' },
	{ key: '', label: '卖4价', value: '', type: 'trading' },
	{ key: '', label: '卖4量', value: '', type: 'trading' },
	{ key: '', label: '卖5价', value: '', type: 'trading' },
	{ key: '', label: '卖5量', value: '', type: 'trading' },
	{ key: '', label: 'useless2', value: '', type: 'unknown' },
	{ key: '', label: 'useless3', value: '', type: 'unknown' },
	{ key: '', label: '跌价', value: '', type: 'trade' },
	{ key: '', label: '跌幅', value: '', type: 'trade' },
	{ key: '', label: '最高', value: '', type: 'trade' },
	{ key: '', label: '最低', value: '', type: 'trade' },
	{ key: '', label: '价/量/额', value: '', type: 'trade' },
	{ key: '', label: '成交量', value: '', type: 'trade' },
	{ key: '', label: '成交额', value: '', type: 'trade' },
	{ key: '', label: '换手率', value: '', type: 'trade' },
	{ key: '', label: 'PE/TTM', value: '', type: 'base' },
	{ key: '', label: '最高？', value: '', type: 'trade' },
	{ key: '', label: '最低？', value: '', type: 'trade' },
	{ key: '', label: '振幅', value: '', type: 'trade' },
	{ key: '', label: '流通值', value: '', type: 'base' },
	{ key: '', label: '总市值', value: '', type: 'base' },
	{ key: '', label: '市净率', value: '', type: 'base' },
	{ key: '', label: '涨停', value: '', type: 'trade' },
	{ key: '', label: '跌停', value: '', type: 'trade' },
	{ key: '', label: 'useless4', value: '', type: 'unknown' },
	{ key: '', label: '委买委卖差', value: '', type: 'trade' },
	{ key: '', label: '均价', value: '', type: 'trade' },
	{ key: '', label: 'unknown2', value: '', type: 'unknown' },
	{ key: '', label: 'unknown3', value: '', type: 'unknown' },
	{ key: '', label: 'useless5', value: '', type: 'unknown' },
	{ key: '', label: 'useless6', value: '', type: 'unknown' },
	{ key: '', label: 'unknown4', value: '', type: 'unknown' },
	{ key: '', label: '成交额/万', value: '', type: 'trade' },
	{ key: '', label: '盘后成交额', value: '', type: 'trade' },
	{ key: '', label: '盘后成交量', value: '', type: 'trade' },
	{ key: '', label: 'unknown5', value: '', type: 'unknown' },
	{ key: '', label: 'unknown6', value: '', type: 'unknown' },
	{ key: '', label: 'unknown7', value: '', type: 'unknown' },
	{ key: '', label: 'unknown8', value: '', type: 'unknown' },
	{ key: '', label: 'unknown9', value: '', type: 'unknown' },
	{ key: '', label: 'unknown10', value: '', type: 'unknown' },
	{ key: '', label: 'unknown11', value: '', type: 'unknown' },
	{ key: '', label: 'unknown12', value: '', type: 'unknown' },
	{ key: '', label: 'unknown13', value: '', type: 'unknown' },
	{ key: '', label: 'unknown14', value: '', type: 'unknown' },
]

/**
 * 根据编码查询相关证券
 * https://suggest3.sinajs.cn/suggest/type=11,12,13,14,15&key=600001&name=suggestdata_1675070117548
 * type: 沪深11~15，基金21~26，港股31~33，期货85
 * 11,12,13,14,15,21,22,23,24,25,26,31,32,33,85
 * @param key 如sh600006、600006
 * @returns
 */
export const getStockSearch = (key: string) => {
	return new Promise(async (resolve) => {
		const [err, res] = await to(get(`/sina/suggest/type=&key=${key}`))
		if (!err && res.status === 200) {
			const list: string[] = res.data.split('"')[1].split(';')
			const newList: StockSearchItem[] = []
			list.forEach((e) => {
				const dataList = e.split(',')
				const item: StockSearchItem = Object.assign({}, searchItemFormat)
				const keys = Object.keys(item) as searchItemKeys[]
				keys.forEach((key) => {
					;(item as any)[key] = dataList[Number((item as any)[key])]
				})
				item.label = item.cName + ' - ' + item.symbol
				newList.push(item)
			})
			resolve(newList)
		} else {
			console.log(err, res)
			return resolve([])
		}
	})
}
type searchItemKeys = keyof typeof searchItemFormat
type searchItemValue = (typeof searchItemFormat)[searchItemKeys]
export interface StockSearchItem {
	symbol: string
	market: string
	code: string
	symbol2: string
	cName: string
	unknown: string
	cName2: string
	unknown2: string
	unknown3: string
	unknown4: string
	label: string
}
const searchItemFormat: StockSearchItem = {
	symbol: '0',
	market: '1',
	code: '2',
	symbol2: '3',
	cName: '4',
	unknown: '5',
	cName2: '6',
	unknown2: '7',
	unknown3: '8',
	unknown4: '9',
	label: '',
}

// 全部
// https://quotes.sina.cn/cn/api/openapi.php/CompanyFinanceService.getFinanceReport2022?paperCode=sh600036&source=gjzb&type=0&page=1&num=10&callback=hqccall3192538084
// 年
// https://quotes.sina.cn/cn/api/openapi.php/CompanyFinanceService.getFinanceReport2022?paperCode=sh600036&source=gjzb&type=4&page=1&num=10&callback=hqccall4307339635
/**
 * 获取财务信息
 * @param symbol 如sh600001
 * @param type 0:全部，1:一季报，4:年
 * @param num 数量
 */
export const getCompanyFinance = (symbol: string, type: number = 0, num: number = 10) => get(`/sina/quotes/CompanyFinanceService.getFinanceReport2022?paperCode=${symbol}&source=gjzb&type=${type}&page=1&num=${num}`)
