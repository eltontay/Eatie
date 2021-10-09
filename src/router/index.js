import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FoodCalculator from '@/views/FoodCalculator.vue'
import About from '@/views/About.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import MyGoals from '@/views/MyGoals.vue'
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
},
{
path: '/myGoals',
name: 'MyGoals',
component: MyGoals   
}
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router