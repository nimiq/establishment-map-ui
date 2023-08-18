import { createRouter, createWebHistory } from 'vue-router'
import { detectLanguage, setLanguage } from './i18n/i18n-setup'
import MapView from '@/components/MapView.vue'
import './index.css'

const NewCandidate = () => import('@/components/forms/NewCandidate.vue')
const ReportLocation = () => import('@/components/forms/ReportLocation.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/location/add',
      name: 'add_location',
      component: NewCandidate,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/location/:uuid/report',
      name: 'report_location',
      component: ReportLocation,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/@:lat(-?\\d+.?\\d+?),:lng(-?\\d+.?\\d+?),:zoom(\\d+)z',
      component: MapView,
      name: 'coords',
    },
    {
      path: '/',
      component: MapView,
      name: 'map',
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to, from) => {
  const mapViews = ['map', 'coords', 'location_detail']
  const formViews = ['add_location', 'report_location']
  if (to.name && typeof to.name === 'string' && mapViews.includes(to.name)
    && from.name && typeof from.name === 'string' && formViews.includes(from.name))
    to.meta.transition = 'slide-right'
})

// This router navigation guard is to prevent switching to the new route before the language file finished loading.
// If there are any routes which do not require translations, they can be skipped here.
router.beforeResolve((to, from, next) => {
  setLanguage(detectLanguage()).then(() => next())
})
