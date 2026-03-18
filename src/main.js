// Vue3 不再导入 Vue 构造函数
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建 app 实例并挂载
const app = createApp(App)
app.use(router) // 注册路由
app.mount('#app')