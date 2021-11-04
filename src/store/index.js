import { createStore } from 'vuex'

export const store = createStore({
//   state () {
//     return {
//       count: 1
//     }
//   },
  state: {
    goals: [],
    goal: {
      gender: '',
      height: '',
      weight: '',
      activity: '',
    }
  },
  getters: {
    getGoal(state){
      return state.goal
    },
    getGoals(state){
      return state.goals
    }
  },
  mutations: {
    setGender (state, gender) {
      state.goal.gender = gender
    },
    setHeight (state, height) {
      state.goal.height = height
    },
    setWeight (state, weight) {
      state.goal.weight = weight
    },
    setActivity (state, activity) {
      state.goal.activity = activity
    },
    ADD_GOAL(state, data){
      state.goals.push(data);
    }
  }
})
