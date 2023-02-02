<template>
	<div>
		<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</el-checkbox>
		<el-checkbox-group v-model="checkedTypes" @change="handleCheckedCitiesChange">
			<el-checkbox v-for="type in types" :key="type.value" :label="type.value">{{ type.label }}</el-checkbox>
		</el-checkbox-group>
	</div>

	<div>
		<el-descriptions v-show="checkedTypes.includes('base')" class="margin-top" title="base" :column="3" :size="info.size" border>
			<!-- <template #extra>
        <el-button type="primary">Operation</el-button>
      </template> -->
			<el-descriptions-item v-for="v in stockInfoStore.getInfo('base')" :key="v.label">
				<template #label>
					<div class="cell-item">
						<!-- <el-icon :style="iconStyle">
            <user />
          </el-icon> -->
						{{ v.label }}
					</div>
				</template>
				{{ v.value }}
			</el-descriptions-item>
		</el-descriptions>

		<el-descriptions v-show="checkedTypes.includes('trade')" class="margin-top" title="trade" :column="3" :size="info.size" border>
			<el-descriptions-item v-for="v in stockInfoStore.getInfo('trade')" :key="v.label">
				<template #label>
					<div class="cell-item">
						{{ v.label }}
					</div>
				</template>
				{{ v.value }}
			</el-descriptions-item>
		</el-descriptions>

		<el-descriptions v-show="checkedTypes.includes('trading')" class="margin-top" title="trading" :column="2" :size="info.size" border>
			<el-descriptions-item v-for="v in stockInfoStore.getInfo('trading')" :key="v.label">
				<template #label>
					<div class="cell-item">
						{{ v.label }}
					</div>
				</template>
				{{ v.value }}
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { InfoItem } from '@/api/sina'
import { useStockInfoStore } from '@/stores/stockInfo'

// checkbox 选择展示的数据
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedTypes = ref(['base'])
const types = [
	{ label: '基础', value: 'base' },
	{ label: '交易', value: 'trade' },
	{ label: '实时5档', value: 'trading' },
]
const handleCheckAllChange = (val: boolean) => {
	checkedTypes.value = val ? types.map((e) => e.value) : []
	isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
	const checkedCount = value.length
	checkAll.value = checkedCount === types.length
	isIndeterminate.value = checkedCount > 0 && checkedCount < types.length
}

// 展示数据
const stockInfoStore = useStockInfoStore()
interface Info {
	data: InfoItem[]
	size: '' | 'default' | 'small' | 'large'
}
const info: Info = reactive({
	data: stockInfoStore.info,
	size: 'default',
})
</script>

<style scoped></style>
