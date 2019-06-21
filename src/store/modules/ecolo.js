export default {
  namespaced: true,
  state: {
    //生态分布
    areaBounce: [],
    kindBounce: '',
    stateBounce: '',
    rightBounce: '',
    leftBounce: '',
    leftBounceShow: '',
    leftBounceSelectType: '', //左侧组件选择的下拉框类型
    stateVal: "", //数据源传值到search
    resetSelect:"",//关闭弹框，下拉框和单选框复位
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
    leftBounceArr(state) {
      return state.leftBounce
    },
    leftBounceArrShow(state) {
      return state.leftBounceShow
    },
    leftBounceArrSelectType(state) {
      return state.leftBounceSelectType
    },
    stateValArr(state) {
      return state.stateVal
    },
    resetSelectArr(state){
      return state.resetSelect
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
    LEFT_LIST_ARR(state, arr) {
      state.leftBounce = arr
    },
    LEFT_LIST_ARR_SHOW(state, arr) {
      state.leftBounceShow = arr
    },
    LEfT_BOUNCE_ARR_SELECTTYPE(state, arr) {
      state.leftBounceSelectType = arr
    },
    CHANGE_STATE(state, arr) {
      state.stateVal = arr
    },
    RESET_SELECT(state,arr){
      state.resetSelect=arr;
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
    leftListArr({
      commit
    }, value) {
      commit("LEFT_LIST_ARR", value)
    },
    leftListArrShow({
      commit
    }, value) {
      commit("LEFT_LIST_ARR_SHOW", value)
    },
    leftBounceArrSelectType({
      commit
    }, value) {
      commit("LEfT_BOUNCE_ARR_SELECTTYPE", value)
    },
    changeState({
      commit
    }, value) {
      commit("CHANGE_STATE", value)
    },
    resetSelect({
      commit
    }, value) {
      commit("RESET_SELECT", value)
    },
    getMapCity({
      commit
    }, value) {
      commit("MAPCITY_ARR", value)
    },
  }
}
