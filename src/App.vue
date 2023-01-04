<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<el-row class="row-bg" justify="space-around">
					<el-col :span="6">
						<nav class="nowrap">
							<RouterLink to="/">Home</RouterLink>
							<RouterLink to="/about">About</RouterLink>
							<RouterLink to="/stocklist">StockList</RouterLink>
						</nav>
					</el-col>
					<el-col :span="6">
						<h2 class="title nowrap">Stock Analysor</h2>
					</el-col>
					<el-col :span="6">icon</el-col>
				</el-row>
			</el-header>
			<el-main>
				<RouterView />
			</el-main>
			<el-footer class="fc">Footer</el-footer>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
.common-layout {
	width: 100%;

	.el-header {
		height: 80px;
		width: 100%;
		display: flex;
		align-items: center;

		.row-bg {
			width: 100%;

			.el-col {
				display: flex;
				align-items: center;
			}

			nav {
				font-size: 12px;
				text-align: center;
			}

			nav a {
				display: inline-block;
				padding: 0 1rem;
				border-left: 1px solid var(--color-border);
			}

			nav a:first-of-type {
				border: 0;
			}
		}
	}

	@media (min-width: 1024px) {
		header {
			display: flex;
			place-items: center;
			padding-right: calc(var(--section-gap) / 2);
		}

		nav {
			text-align: left;
			margin-left: -1rem;
			font-size: 1rem;

			padding: 1rem 0;
			margin-top: 1rem;
		}
	}
}
</style>
