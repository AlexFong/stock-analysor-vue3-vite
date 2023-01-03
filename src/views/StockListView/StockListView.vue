<template>
	<div class="stock-list">
		<el-table :data="list" style="width: 100%">
			<el-table-column :key="v.label" v-bind="v" v-for="v in tableColumn" />
		</el-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import StockList from "./StockList"

export default defineComponent({
  setup() {
    const list = reactive(StockList)

    const tableColumn = [
      { label: '代码', prop: 'code', width: '180' },
      { label: '市场', prop: 'market', width: '180' },
      { label: '名称', prop: 'cName', width: '180' },
      { label: '财务分', prop: 'financeHealth', width: '180' },
    ]
    return { list, tableColumn };
  },
});
</script>

<style scoped></style>
