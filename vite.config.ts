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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 应用服务器、代理配置
  server: {
    port: 5174,
    open: true,
    proxy: {
      // 字符串简写写法
      '/10jqka': 'http://localhost:8080/',
      '/api': 'http://localhost:8080/'
    },
    cors: true,
    headers: [],
    fs: {
      strict: false
    }
  },
  // 部署配置
  build: {
    outDir: 'stockanalysor',
    assetsDir: 'assets'
  }
})
