import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { store } from './store'

import { library } from '../node_modules/@fortawesome/fontawesome-svg-core'
import { fas } from '../node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/vue-fontawesome'
library.add(fas)

createApp(App).component('fa', FontAwesomeIcon).use(router).use(store).use(VueChartkick).mount('#app')
