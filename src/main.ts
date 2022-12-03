import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import RegularVue from './Regular.vue'
import BDRipVue from './BDRip.vue'

const routes = [
  { path: '/', component: RegularVue },
  { path: '/bdrip', component: BDRipVue },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)  
  .mount('#app')
