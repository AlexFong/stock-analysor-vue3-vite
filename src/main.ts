import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { $http } from './api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 挂载全局变量
app.config.globalProperties.$http = $http

app.mount('#app')
