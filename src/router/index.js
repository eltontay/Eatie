import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FoodCalculator from '@/views/FoodCalculator.vue';
import About from '@/views/About.vue';
import MyGoals from '@/views/MyGoals.vue';
import Goal1 from '@/views/GoalStep1.vue';
import Goal2 from '@/views/GoalStep2.vue';
import Goal3 from '@/views/GoalStep3.vue';
import Goal4 from '@/views/GoalStep4.vue';
import SignIn from '@/views/SignUpPage.vue';
import Myprogress from '@/views/MyProgress.vue';
import AccountProfile from '@/views/AccountProfile.vue';
import TempAddFood from '@/views/TempAddFood.vue'; //temporary, removed when done

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/foodCalculator',
    name: 'FoodCalculator',
    component: FoodCalculator,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/myGoals',
    name: 'MyGoals',
    component: MyGoals,
  },
  {
    path: '/goalStep1',
    name: 'GoalStep1',
    component: Goal1,
  },
  {
    path: '/goalStep2',
    name: 'GoalStep2',
    component: Goal2,
  },
  {
    path: '/goalStep3',
    name: 'GoalStep3',
    component: Goal3,
  },
  {
    path: '/goalStep4',
    name: 'GoalStep4',
    component: Goal4,
  },
  {
    path: '/myProgress',
    name: 'MyProgress',
    component: Myprogress,
  },
  {
    path: '/tempAddFood', //temporary, remove once done
    name: 'TempAddFood',
    component: TempAddFood,
  },
  {
    path: '/SignIn', //temporary, remove once done
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/Profile', //temporary, remove once done
    name: 'AccountProfile',
    component: AccountProfile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
