<template>
	<el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="Please input" @select="handleSelect" clearable value-key="label" />
	<div>
		<p v-for="v in searchResult">{{ v[0] }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getStockSearch, StockSearchItem } from '@/api/sina'

const input = ref('')

let searchResult: string[][] = reactive([])

const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
	const res = await getStockSearch(queryString)
	cb(res)
}

const handleSelect = (item: StockSearchItem) => {
	console.log(item)
	toDetail(item)
}

const router = useRouter()
const toDetail = (stock: StockSearchItem) => {
	const { symbol, code, market, cName } = stock
	router.push({ name: 'stockdetail', query: { symbol, code, market, cName } })
}
</script>

<style scoped></style>
