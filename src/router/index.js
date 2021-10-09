import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import FoodCalculator from "@/views/FoodCalculator.vue";
import About from "@/views/About.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import MyGoals from "@/views/MyGoals.vue";
import CreateGoal1 from "@/views/CreateGoal1.vue";
import CreateGoal2 from "@/views/CreateGoal2.vue";
import CreateGoal3 from "@/views/CreateGoal3.vue";
import CreateGoal4 from "@/views/CreateGoal4.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/foodCalculator",
    name: "FoodCalculator",
    component: FoodCalculator,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/signUpPage",
    name: "SignUpPage",
    component: SignUpPage,
  },
  {
    path: "/myGoals",
    name: "MyGoals",
    component: MyGoals,
  },
  {
    path: "/createGoal1",
    name: "CreateGoal1",
    component: CreateGoal1,
  },
  {
    path: "/createGoal2",
    name: "CreateGoal2",
    component: CreateGoal2,
  },
  {
    path: "/createGoal3",
    name: "CreateGoal3",
    component: CreateGoal3,
  },
  {
    path: "/createGoal4",
    name: "CreateGoal4",
    component: CreateGoal4,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
