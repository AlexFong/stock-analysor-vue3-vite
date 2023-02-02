<template>
	<div class="echart-ctn" ref="echartCtn"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, computed, reactive } from 'vue'
import { getStockMinLineData } from '@/api/sina'
import { to } from '@/utils'
import * as moment from 'moment'

import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption, GridComponent, GridComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, UniversalTransition])
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption>

// 获取分时数据
const props = defineProps(['symbol'])
const symbol = props.symbol
const mountStockMinLineData = async () => {
	const [err, res] = await to(getStockMinLineData(symbol))
	if (!err && res.status === 200 && res.data.result.status.code === 0) {
		const data = res.data.result.data
		echartProp.data = data
	} else {
		console.warn(err, res)
	}
}

// echart相关
const echartCtn = ref(null) // 声明一个 ref 来存放该元素的引用，必须和模板里的 ref 同名
const echartProp = reactive({
	data: [],
})
let myChart
let option: EChartsOption
const mountEchart = () => {
	const chartDom = echartCtn.value as unknown as HTMLElement
	myChart = echarts.init(chartDom, 'dark')

	interface DataItem {
		name: string
		time: string
		value: [string, string]
	}

	interface OriDataItem {
		m: string
		v: string // 量
		p: string // 价
		avg_p: string
	}
	const getTimeText = (m: string) => moment('2023-01-29 ' + m)._d
	const formatData = (list: OriDataItem[]) => {
		const result: DataItem[] = []
		list.forEach((e) => {
			const timeText = getTimeText(e.m)

			result.push({
				name: timeText,
				time: e.m,
				value: [timeText, e.p],
			})
		})
		return result
	}

	let data: DataItem[] = formatData(echartProp.data)

	option = {
		title: {
			text: '分时图',
		},
		backgroundColor: '#f9f9f9',
		tooltip: {
			trigger: 'axis',
			formatter: function (params: any) {
				params = params[0]
				const time = params.data.time.slice(0, -3)
				const value = params.value[1]
				return time + '  /  ' + value
			},
			axisPointer: {
				type: 'cross',
				animation: false,
				snap: true,
			},
		},
		xAxis: {
			type: 'time',
			min: getTimeText('09:15:00'),
			max: getTimeText('16:30:00'),
			splitLine: {
				show: true,
				lineStyle: {
					color: '#ccc',
				},
			},
			minorTick: {
				show: true,
			},
			minorSplitLine: {
				show: true,
				lineStyle: {
					color: '#eee',
				},
			},
		},
		yAxis: {
			type: 'value',
			// boundaryGap: [0, '100%'],
			min: function (value) {
				return (value.min * 0.99).toFixed(2)
			},
			max: function (value) {
				return (value.max * 1.01).toFixed(2)
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#ccc',
				},
			},
		},
		series: [
			{
				name: 'Price Data',
				type: 'line',
				showSymbol: false,
				data,
				step: 'end',
				smooth: true,
				markLine: {
					silent: true,
					// symbol: ['none', 'none'],
					lineStyle: {
						color: '#f00',
					},
					data: [
						{
							type: 'average',
						},
						{
							name: 'Y 轴值为 100 的水平线',
							yAxis: 27.9,
						},
					],
				},
			},
		],
	}
	option && myChart.setOption(option)
}

onMounted(async () => {
	await mountStockMinLineData()
	mountEchart()
})
</script>

<style scoped>
.echart-ctn {
	width: 100%;
	height: 300px;
}
</style>
