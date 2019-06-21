export default {
  namespaced: true,
  state: {
    //生态分布
    areaBounce: [],
    kindBounce: '',
    stateBounce: '',
    rightBounce: '',
    leftBounceShow: '',
    scoreTypeBounce: "", //生态质量数据源选择的中分或者低分的类型 传向右边组件
    leftBounceRadioType: "", //生态质量左侧单选框选中的类型
    leftBounceSelect: "", //生态质量左侧下拉框变化时把单选框是否选中的状态
    stateVal: "",//数据源传值到search
    resetSelect:"",//关闭弹框，下拉框和单选框复位
    mapCity:"",//区域选择的城市数组
    parameters:"",//区域弹框传的的参数
    sourceTypeSelected:"",//数据源选中的中分和时间的类型
    searchData:"",//点击查询传入的文件列表的数组数据
    cityArr:"",//区域弹框选择的城市数组
    date:"",//页面上的开始时间和结束时间
    cityName:"",//勾选的区域城市的名字
    allLayerDone:"",//全部图层加载完成的状态
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
    leftBounceArrShow(state) {
      return state.leftBounceShow
    },
    scoreTyleBounceArr(state) {
      return state.scoreTypeBounce
    },
    radioTyleBounceArr(state) {
      return state.leftBounceRadioType
    },
    selectBounceArr(state) {
      return state.leftBounceSelect
    },
    stateValArr(state) {
      return state.stateVal
    },
    resetSelectArr(state){
      return state.resetSelect
    },
    mapCityArr(state){
      return state.mapCity
    },
    parametersObj(state){
      return state.parameters
    },
    sourceTypeSelectedOBj(state){
      return state.sourceTypeSelected
    },
    getsearchDataOBj(state){
      return state.searchData
    },
    getCityArr(state){
      return state.cityArr
    },
    getDateObj(state){
      return state.date
    },
    getCityName(state){
      return state.cityName
    },
    getallLaterIsDone(state){
      return state.allLayerDone
    },
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
    LEFT_LIST_ARR_SHOW(state, arr) {
      state.leftBounceShow = arr
    },
    SCORE_LIST_ARR(state, arr) {
      state.scoreTypeBounce = arr
    },
    RADIO_LIST_ARR(state, arr) {
      state.leftBounceRadioType = arr
    },
    SELECT_LIST_ARR(state, arr) {
      state.leftBounceSelect = arr
    },
    CHANGE_STATE(state, arr) {
      state.stateVal = arr
    },
    RESET_SELECT(state,arr){
      state.resetSelect=arr;
    },
    MAPCITY_ARR(state,arr){
      state.mapCity=arr;
    },
    PARAMETERS_OBJ(state,arr){
      state.parameters=arr;
    },
    STATE_SOURCETYPE(state,arr){
      state.sourceTypeSelected=arr;
    },
    SEARCH_DATA(state,arr){
      state.searchData=arr;
    },
    CITY_ARR(state,arr){
      state.cityArr=arr;
    },
    DATE_OBJ(state,arr){
      state.date=arr;
    },
    CITY_NAME(state,arr){
      state.cityName=arr;
    },
    ALL_LAYER_DONE(state,arr){
      state.allLayerDone=arr;
    },
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
    leftListArrShow({
      commit
    }, value) {
      commit("LEFT_LIST_ARR_SHOW", value)
    },
    scoreListArr({
      commit
    }, value) {
      commit("SCORE_LIST_ARR", value)
    },
    radioListArr({
      commit
    }, value) {
      commit("RADIO_LIST_ARR", value)
    },
    selectListArr({
      commit
    }, value) {
      commit("SELECT_LIST_ARR", value)
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
    getParameters({
      commit
    }, value) {
      commit("PARAMETERS_OBJ", value)
    },
    launchStatesourceType({
      commit
    }, value) {
      commit("STATE_SOURCETYPE", value)
    },
    launchSearchData({
      commit
    }, value) {
      commit("SEARCH_DATA", value)
    },
    launchCityArr({
      commit
    }, value) {
      commit("CITY_ARR", value)
    },
    launchDateObj({
      commit
    }, value) {
      commit("DATE_OBJ", value)
    }, launchCityName({
      commit
    }, value) {
      commit("CITY_NAME", value)
    },
    launchallLayerDone({
      commit
    }, value) {
      commit("ALL_LAYER_DONE", value)
    },
  }
}
