import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FoodCalculator from '@/views/FoodCalculator.vue'
import About from '@/views/About.vue'
import SignUpPage from '@/views/SignUpPage.vue'
const routes = [
{
path: '/',
name: 'Home',
component: Home
},
{
path: '/foodCalculator',
name: 'FoodCalculator',
component: FoodCalculator
},
{
path: '/about',
name: 'About',
component: About
},
{
path: '/signUpPage',
name: 'SignUpPage',
component: SignUpPage
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router