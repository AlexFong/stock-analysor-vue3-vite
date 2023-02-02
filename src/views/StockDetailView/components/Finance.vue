<template>
	<div class="finance">
		<div class="header">
			<div>
				<span>同比：</span>
				<el-switch v-model="showTongBi">同比</el-switch>
			</div>
			<el-select v-model="type" @change="typeChange" label="123">
				<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>
		<div class="data-ctn">
			<!-- 渲染标题 -->
			<div v-if="finance.data.report_count">
				<br />
				<div v-for="vv in getNthList(0)" :key="vv.item_title">
					<div class="title no-wrap" :class="{ category: !vv.item_field }">{{ vv.item_title }}</div>
				</div>
			</div>

			<div class="data-ctn-scroller">
				<div v-for="(v, i) in finance.data.report_date" :key="v.date_value">
					<div>{{ v.date_description }}</div>
					<!-- <div>发布日期{{ finance.data.report_list[v.date_value].publish_date }}</div> -->
					<div v-for="vv in finance.data.report_list[v.date_value].data" :key="vv.item_title + vv.item_value">
						<div v-if="vv.item_field" class="fc">
							<div class="value" :title="'item_precision:' + vv.item_precision">{{ getValue(vv) }}</div>
							<div v-show="showTongBi" class="tong-bi" :style="getTongBiStyle(vv)">{{ getTongBi(vv) }}</div>
						</div>
						<div v-else>{{ '&nbsp;' }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, computed } from 'vue'
import { getCompanyFinance } from '@/api/sina'
import { to } from '@/utils'

const props = defineProps(['symbol'])
const symbol = props.symbol
const finance = reactive({
	data: {
		report_count: '',
		report_date: [],
		report_list: {},
	},
})
const mountCompanyFinance = async (type = 0, num = 8) => {
	const [err, res] = await to(getCompanyFinance(symbol, type, num))
	if (!err && res.status === 200) {
		const data = res.data.result.data
		console.log(1, data)
		finance.data = data
	} else {
		console.warn(err, res)
	}
}
mountCompanyFinance()

const showTongBi = ref(true)

const type = ref(0)
const typeOptions = [
	{ label: '全部', value: 0 },
	{ label: '年报', value: 4 },
	{ label: '一季', value: 1 },
	{ label: '半年', value: 2 },
	{ label: '三季', value: 3 },
]
const typeChange = (value: number) => {
	mountCompanyFinance(value)
}

const getNthList = (nth: number) => {
	const max = finance.data.report_date.length
	if (!Number.isInteger(nth) || nth < 0 || nth > max) {
		console.warn('getNthList需要传入合法的非负正整数!')
	}
	const key = finance.data.report_date[nth].date_value
	return finance.data.report_list[key].data
}

interface DataItem {
	item_field: string
	item_title: string
	item_value: string
	item_display_type: 1 | 2
	item_display: string
	item_precision: 'f2' | 'ps4' | 'p2'
	item_source: string
	item_number: string
	item_group_no: 1 | 2
	item_tongbi: number
}
const getValue = (item: DataItem) => {
	if (!Number(item.item_value)) {
		return '--'
	}
	switch (item.item_precision) {
		case 'f2':
			const num = (Number(item.item_value) * Math.pow(10, -8)).toFixed(2)
			return num + '亿'
		case 'ps4':
			return Number(item.item_value).toFixed(4)
		case 'p2':
			return Number(item.item_value).toFixed(2) + '%'
		default:
			return item.item_value
	}
}
const getTongBi = (item: DataItem) => {
	if (!Number(item.item_value)) {
		return '--'
	}
	return (Number(item.item_tongbi) * 100).toFixed(2) + '%'
}
const getTongBiStyle = (item: DataItem) => {
	const tongbi = Number(item.item_tongbi)
	if (!tongbi) {
		return
	}
	if (tongbi > 0.1) {
		const larger = tongbi - 0.1
		const gb = 255 - larger * 256 * 2 < 0 ? 0 : 255 - larger * 256 * 2 // 0最红 => 255白
		return {
			backgroundColor: `rgba(256,${gb},${gb},${larger + 0.4})`,
		}
	} else if (tongbi < -0.1) {
		const smaller = -0.1 - tongbi
		const rb = 255 - smaller * 256 * 2 < 0 ? 0 : 255 - smaller * 256 * 2 // 0最红 => 255白
		return {
			backgroundColor: `rgba(${rb},255,${rb},${smaller + 0.4})`,
		}
	}
	return
}
</script>

<style lang="scss">
.finance {
	.header {
		display: flex;

		> * {
			margin-right: 20px;
		}
	}
	.data-ctn {
		display: flex;
		height: 600px;
		overflow-y: auto;

		&-scroller {
			display: flex;
			border: 1px solid #fff9;
			width: 700px;
			height: fit-content;
			overflow-x: auto;
			// overflow-y: visible;
		}
		.category {
			width: 160px;
			background-color: aliceblue;
		}
		.title {
			width: 280px;
		}
		.value {
			text-align: right;
			width: 100px;
			padding: 0 10px;
			border-left: 1px solid #aaa3;
		}
		.tong-bi {
			text-align: right;
			width: 80px;
			margin: 0 10px;
		}
	}
}
</style>
