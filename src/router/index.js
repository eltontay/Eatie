import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import FoodCalculator from '@/views/FoodCalculator.vue';
import CalendarView from '@/views/CalendarView.vue';
import MyJournal from '@/views/MyJournal.vue';
import MyGoals from '@/views/MyGoals.vue';
import Goal1 from '@/views/GoalStep1.vue';
import Goal2 from '@/views/GoalStep2.vue';
import Goal3 from '@/views/GoalStep3.vue';
import Goal4 from '@/views/GoalStep4.vue';
import SignIn from '@/views/SignUpPage.vue';
import JourneyProgress from '@/views/JourneyProgress.vue';
import DailyProgress from '@/views/DailyProgress.vue';
import AccountProfile from '@/views/AccountProfile.vue';
import WeightUpdate from '@/views/WeightUpdate.vue';
import EditProfile from '@/views/EditProfile.vue';
import NotFound from '@/views/NotFound.vue';
import ContactUs from '@/views/ContactUs.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/FoodCalculator',
    name: 'FoodCalculator',
    component: FoodCalculator,
  },
  {
    path: '/CalendarView',
    name: 'CalendarView',
    component: CalendarView,
  },
  {
    path: '/MyJournal',
    name: 'MyJournal',
    component: MyJournal,
  },
  {
    path: '/MyGoals',
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
    path: '/DailyProgress',
    name: 'DailyProgress',
    component: DailyProgress,
  },
  {
    path: '/JourneyProgress',
    name: 'JourneyProgress',
    component: JourneyProgress,
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/Profile',
    name: 'AccountProfile',
    component: AccountProfile,
  },
  {
    path: '/WeightUpdate',
    name: 'WeightUpdate',
    component: WeightUpdate,
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: EditProfile,
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUs,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
