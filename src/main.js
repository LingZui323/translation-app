// Vue 3 标准写法，适配所有 Vue 3 项目
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建应用实例 + 挂载路由 + 挂载到 DOM
const app = createApp(App)
app.use(router)
app.mount('#app')