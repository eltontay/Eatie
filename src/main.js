import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { store } from './store'


createApp(App).use(router).use(store).use(VueChartkick).mount('#app')
