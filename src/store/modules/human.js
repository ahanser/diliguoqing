export default {
  namespaced: true,
  state: {
    //生态分布
    areaBounce: [],
    kindBounce: '',
    stateBounce: '',
    rightBounce: '',
    mapCity:"",//区域选择的城市数组
  },
  getters: {
    getterListArr(state) {
      return state.areaBounce
    },
    kindBounceArr(state) {
      return state.kindBounce
    },
    stateBounceArr(state) {
      return state.stateBounce
    },
    rightBounceArr(state) {
      return state.rightBounce
    },
    mapCityArr(state){
      return state.mapCity
    }
  },
  mutations: {
    CHANGE_LIST_ARR(state, arr) {
      state.areaBounce = arr;
    },
    KIND_LIST_ARR(state, arr) {
      state.kindBounce = arr;
    },
    STATE_LIST_ARR(state, arr) {
      state.stateBounce = arr;
    },
    RIGHT_LIST_ARR(state, arr) {
      state.rightBounce = arr
    },
    MAPCITY_ARR(state,arr){
      state.mapCity=arr;
    }
  },
  actions: {
    changeListArr({
      commit
    }, value) {
      commit("CHANGE_LIST_ARR", value)
    },
    kindListArr({
      commit
    }, value) {
      commit("KIND_LIST_ARR", value)
    },
    stateListArr({
      commit
    }, value) {
      commit("STATE_LIST_ARR", value)
    },
    rightListArr({
      commit
    }, value) {
      commit("RIGHT_LIST_ARR", value)
    },
    getMapCity({
      commit
    }, value) {
      commit("MAPCITY_ARR", value)
    }
  }
}
