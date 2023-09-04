import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import router from './router'
import store from './store'
import { setupStore } from './store'

import { registerApp } from './global/index'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

setupStore()

app.use(router).use(store).use(registerApp).mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
