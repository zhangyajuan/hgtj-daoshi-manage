import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import student from './modules/student'
import teacher from './modules/teacher'
import recommendation from './modules/recommendation'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    student,
    teacher,
    recommendation
  },
  getters
})

export default store
