import { createRouter, createWebHashHistory } from 'vue-router'

// 导入页面组件（删除TicketPricePage，新增MenuRecognitionPage）
import LoginPage from '../views/LoginPage.vue'
import TranslationPage from '../views/TranslationPage.vue'
import HotSpotsRank from '../views/HotSpotsRank.vue'
import RecommendSpotsPage from '../views/RecommendSpotsPage.vue'
import ImageTranslatePage from '../views/ImageTranslatePage.vue'
import TravelPlanPage from '../views/TravelPlanPage.vue'
import MenuRecognitionPage from '../views/MenuRecognitionPage.vue' // 新增

// 登录拦截守卫
const requireAuth = (to, from, next) => {
  const isLogin = localStorage.getItem('translation_username')
  isLogin ? next() : next('/login')
}

const routes = [
  { path: '/', redirect: '/translation' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/translation', name: 'Translation', component: TranslationPage, beforeEnter: requireAuth },
  { path: '/hot-spots', name: 'HotSpots', component: HotSpotsRank, beforeEnter: requireAuth },
  // 替换：删除原ticket-price路由，新增menu-recognition路由
  { path: '/menu-recognition', name: 'MenuRecognition', component: MenuRecognitionPage, beforeEnter: requireAuth },
  { path: '/recommend-spots', name: 'RecommendSpots', component: RecommendSpotsPage, beforeEnter: requireAuth },
  { path: '/image-translate', name: 'ImageTranslate', component: ImageTranslatePage, beforeEnter: requireAuth },
  { path: '/travel-plan', name: 'TravelPlan', component: TravelPlanPage, beforeEnter: requireAuth }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router