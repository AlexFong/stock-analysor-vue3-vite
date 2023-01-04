<template>
	<div>StockDetail</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    console.log(route, route.params)
    return {};
  },
});
</script>

<style scoped></style>
