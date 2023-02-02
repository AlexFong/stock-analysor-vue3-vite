<template>
	<div>
		<el-table :data="list">
			<el-table-column :key="v.label" v-bind="v" v-for="v in tableColumn" />
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineProps } from 'vue'
import { getPredict, predictData } from './getPredict'

const list: predictData[] = reactive([])
const tableColumn = [
	{ label: '年度', prop: 'year', width: '100' },
	{ label: '预测机构数', prop: 'predictNum', width: '100' },
	{ label: '最小值', prop: 'min', width: '100' },
	{ label: '均值', prop: 'aver', width: '100' },
	{ label: '最大值', prop: 'max', width: '100' },
	{ label: '行业平均数', prop: 'industryAver', width: '100' },
]

const props = defineProps(['code'])
const code = props.code
const init = async () => {
	const predictData = await getPredict(code)
	predictData.forEach((e) => {
		list.push(e)
	})
}

onMounted(() => {
	init()
})
</script>

<style scoped></style>
