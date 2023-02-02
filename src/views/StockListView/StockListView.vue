<template>
	<StockSearch />
	<div class="stock-list">
		<el-table :data="list" @row-click="toDetail">
			<el-table-column :key="v.label" v-bind="v" v-for="v in tableColumn" />
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { stockList, StockItem } from './StockList'
import StockSearch from './components/StockSearch.vue'
import { getStockSearch, StockSearchItem } from '@/api/sina'

const list: StockItem[] = reactive(stockList)

const tableColumn = [
	{ label: '代码', prop: 'code', width: '180' },
	{ label: '市场', prop: 'market', width: '180' },
	{ label: '名称', prop: 'cName', width: '180' },
	{ label: '财务分', prop: 'financeHealth', width: '180' },
]

const router = useRouter()
const toDetail = async (stock: StockItem) => {
	const { code, cName, financeHealth } = stock
	const res = (await getStockSearch(String(code))) as StockSearchItem[]
	console.log(res, res[0])
	const item = res[0] as StockSearchItem
	const { symbol, market } = item

	router.push({ name: 'stockdetail', query: { symbol, code, market, cName, financeHealth } })
}
</script>

<style scoped></style>
