import { createRouter, createWebHistory } from 'vue-router'
// 导入所有页面组件
import TranslationPage from '@/views/TranslationPage'
import TextVoiceTranslation from '@/views/TextVoiceTranslation' // 新增
import SpotQuery from '@/views/SpotQuery'
import HistoryRecord from '@/views/HistoryRecord'
import LoginPage from '@/views/LoginPage'

const routes = [
  { path: '/', redirect: '/translation' }, // 默认跳转到图片翻译主页
  { path: '/login', name: 'LoginPage', component: LoginPage }, // 登录页（无需登录）
  { path: '/translation', name: 'TranslationPage', component: TranslationPage, meta: { requiresAuth: true } }, // 图片翻译主页
  { path: '/text-voice-translation', name: 'TextVoiceTranslation', component: TextVoiceTranslation, meta: { requiresAuth: true } }, // 文字/语音翻译
  { path: '/spot-query', name: 'SpotQuery', component: SpotQuery, meta: { requiresAuth: true } }, // 景点查询
  { path: '/history-record', name: 'HistoryRecord', component: HistoryRecord, meta: { requiresAuth: true } } // 历史记录
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局登录拦截守卫
router.beforeEach((to, from, next) => {
  // 获取登录状态
  const isLogin = localStorage.getItem('translation_username')
  // 判断是否需要登录
  const requiresAuth = to.meta.requiresAuth
  
  // 未登录访问需要登录的页面 → 跳登录页
  if (requiresAuth && !isLogin) {
    next('/login')
  } 
  // 已登录访问登录页 → 跳主页
  else if (to.path === '/login' && isLogin) {
    next('/translation')
  } 
  // 其他情况正常访问
  else {
    next()
  }
})

export default router