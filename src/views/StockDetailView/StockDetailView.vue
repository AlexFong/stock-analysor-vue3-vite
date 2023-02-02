<template>
	<h1>stock detail view</h1>
	<h3>{{ query }}</h3>
	<div v-if="isDataInit">
		<MinLine :symbol="symbol" />
		<Finance :symbol="symbol" />
		<PredictTable :code="code" />
		<StockInfo />
	</div>
</template>

<script setup lang="ts">
import PredictTable from './components/PredictTable.vue'
import StockInfo from './components/StockInfo.vue'
import MinLine from './components/MinLine.vue'
import Finance from './components/Finance.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getStockInfo, getStockInfoFormat, InfoItem } from '@/api/sina'
import { to } from '@/utils'
import { useStockInfoStore } from '@/stores/stockInfo'
import { ElMessage } from 'element-plus'

const route = useRoute()
const query = route.query
const symbol = query.symbol as string
const code = query.code as string

const stockInfoStore = useStockInfoStore()
let isDataInit = ref(false)

const mountStockInfo = async () => {
	const [err, res] = await to(getStockInfo(symbol))
	if (!err && res.status === 200 && typeof res.data === 'string') {
		const oriData: [] = res.data.split('~')
		const data: InfoItem[] = getStockInfoFormat
		for (let i = 0; i < data.length; i++) {
			const e = data[i]
			e.value = oriData[i]
		}
		stockInfoStore.setInfo(data)
		isDataInit.value = true
		ElMessage('this is a message.')
		ElMessage.error('Oops, this is a error message.')
	} else {
		console.warn(err, res)
		ElMessage({
			type: 'error',
			message: '数据请求异常，请刷新',
		})
	}
}
mountStockInfo()
</script>

<style scoped></style>
