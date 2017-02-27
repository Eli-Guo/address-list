import Vuex from 'vuex'
import Vue  from 'vue'
import * as mutations from './module/mutations'
import * as actions   from './module/actions'
Vue.use(Vuex)

const state = {
  count : 0
};

const getters = {
  getCount :  state => state.count
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
