import axios from 'axios'

export interface predictData {
	year: string
	predictNum: string
	min: string
	aver: string
	max: string
	industryAver: string
}

export const format = {
	年度: 'year',
	预测机构数: 'predictNum',
	最小值: 'min',
	均值: 'aver',
	最大值: 'max',
	行业平均数: 'industryAver',
}

/**
 * 获取表格元素的头部键值
 * @param el 表格元素
 */
const getTableHead = (el: HTMLTableElement) => {
	const rows = el.rows
	if (!rows.length) {
		return []
	}
	const keys: Array<string> = []
	const headCells = rows?.item(0)?.cells
	// LOOP THROUGH EACH CELL
	if (headCells) {
		for (let j = 0; j < headCells.length; j++) {
			const innerHTML = headCells.item(j)?.innerHTML
			keys.push(innerHTML)
		}
	}
	return keys
}

/**
 * 获取表格元素的值
 * @param el 表格元素
 * @param keys 表格头部键值
 */
const getTableData = (el: HTMLTableElement, keys: string[]): predictData[] => {
	const rows = el.rows
	if (!rows.length) {
		return
	}

	const format = {
		年度: 'year',
		预测机构数: 'predictNum',
		最小值: 'min',
		均值: 'aver',
		最大值: 'max',
		行业平均数: 'industryAver',
	}

	const list: predictData[] = []
	// LOOP ROW AFTER HEADER.
	for (let i = 1; i < rows.length; i++) {
		const objCells: HTMLCollectionOf<HTMLTableCellElement> | undefined = rows.item(i)?.cells
		const data = {}
		if (objCells) {
			// LOOP THROUGH EACH CELL
			for (let j = 0; j < objCells.length; j++) {
				const label: string = keys[j] || ''
				const key = format[label]
				data[key] = objCells.item(j)?.innerHTML || '-'
			}
		}
		list.push(data)
	}
	return list
}

/**
 * 获取预测页面，解码成string
 * @param code
 * @returns
 */
const getHtml = (code: string) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: `/10jqka/worth/${code}/worth.html`,
			responseType: 'arraybuffer', // 关键步骤
			responseEncoding: 'utf8',
		})
			.then((res: any) => {
				const { data } = res
				const utf8decoder = new TextDecoder('GBK') // 解码器
				const html: string = utf8decoder.decode(data) // 解码
				resolve(html)
			})
			.catch((err: any) => {
				console.warn(err)
				reject(err)
			})
	})
}

export const getPredict = async (code: string) => {
	const html = (await getHtml(code)) as string
	const el = document.createElement('div')
	el.innerHTML = html
	const table: HTMLTableElement | null = el.querySelector('.fr.yjyc .m_table.m_hl')
	if (table) {
		const keys: string[] = getTableHead(table)
		const list: predictData[] = getTableData(table, keys)
		if (list?.length) {
			return list
		}
	}
	return []
}
