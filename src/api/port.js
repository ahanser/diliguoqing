let areaApi = "http://192.168.5.17:8080"; 
let mapPai=  "http://192.168.5.17:8082"; 
let downApi="http://192.168.5.17:8080";
const url = {
    //生态质量
    getAreaCity:`${areaApi}/api/area/list`,//获取行政区域的城市
    getAreaBorder:`${areaApi}/api/area/getByIds`,//根据选择的行政区域获取县区域边界
    getCityBorder:`${areaApi}/api/area/getListByPids`,//根据选择的行政区域获取县区域边界
    searchButton:`${areaApi}/api/algorithmFile/getByTime`,//查询按钮的接口
    getCodeList:`${areaApi}/api/algorithmFile/getByTime`,//选择区域、生态类型和数据源查询右侧组件数据列表的接口
    getShapeImg:`${areaApi}/api/algorithmFile/getByCycle`,//右侧文件类型弹出照片的接口
    getOption:`${areaApi}/api/algorithmFile/getAlgorithmType`,//左侧下拉列表数组数据的接口
    downloadMapServer:`${areaApi}/api/algorithmFile/downLoadPngById`,//下载地图服务照片
    mapSever:`${mapPai}/arcgisApi/4.9/init.js`,

    report:`${downApi}/api/dbf/getDbfInfoExcel`,//报告下载按钮
    excel:`${downApi}/api/dbf/report`//表格下载按钮
};

export default url;