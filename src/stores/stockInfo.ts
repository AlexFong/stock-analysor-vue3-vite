import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { InfoItem } from '@/api/sina'

export const useStockInfoStore = defineStore('stockInfo', () => {
	// 个股信息
	const info: InfoItem[] = reactive([])
	function setInfo(data: InfoItem[]) {
		info.splice(0, info.length, ...data)
	}
	/**
	 * 查找个股信息
	 * @param value 查找的值，值或数组
	 * @param key 查找的键，默认是type
	 * @returns
	 */
	function getInfo(value: string | string[], key: 'key' | 'label' | 'value' | 'type' = 'type'): InfoItem[] {
		if (typeof value === 'string') {
			return info.filter((e) => e[key] === value)
		} else {
			return info.filter((e) => value.includes(e[key]))
		}
	}

	return { info, setInfo, getInfo }
})
