import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			utils: fileURLToPath(new URL('./src/uti', import.meta.url)),
		},
	},
	// 应用服务器、代理配置
	server: {
		port: 5174,
		open: true,
		proxy: {
			// 同花顺机构预期盈利接口
			'/10jqka/worth/': {
				target: 'http://basic.10jqka.com.cn/',
				// target: 'http://localhost:8080/api/stockanalysor/10jqka/basic/',
				changeOrigin: true,
				// rewrite: (path) => path.replace('/^\/10jqka\/', ''),
				rewrite: (path) => path.replace('/10jqka/worth', ''),
			},

			// 新浪财经接口
			'/sina/stockinfo/': {
				target: 'http://qt.gtimg.cn/',
				// target: 'http://localhost:8080/apistockanalysor/sina/qt/',
				changeOrigin: true,
				rewrite: (path) => path.replace('/sina/stockinfo/', ''),
			},
			'/sina/quotes/': {
				target: 'https://quotes.sina.cn/cn/api/openapi.php/',
				// target: 'http://localhost:8080/apistockanalysor/sina/quotes/',
				changeOrigin: true,
				rewrite: (path) => path.replace('/sina/quotes/', ''),
			},
			'/sina/suggest/': {
				target: 'https://suggest3.sinajs.cn/suggest/',
				// https://suggest3.sinajs.cn/suggest/type=11,12,13,14,15&key=600001&name=suggestdata_1675070117548
				changeOrigin: true,
				rewrite: (path) => path.replace('/sina/suggest/', ''),
			},
		},
		cors: true,
		fs: {
			strict: false,
		},
	},
	// 部署配置
	build: {
		outDir: 'stockanalysor',
		assetsDir: 'assets',
	},
})
