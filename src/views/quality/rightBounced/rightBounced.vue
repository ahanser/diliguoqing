<template>
  <div>
    <!-- 高分弹框 -->
    <div class="switchTab" 
         v-show="rightBounceArr">
      <el-tabs v-model="activeName"
               @tab-click="handleClick1"
               type="border-card">
        <el-tab-pane :label="item.name"
                     v-for="(item,index) in tabs" 
                     :source="item.source"
                     :cycle="item.cycle"
                     :key="index"
                      ref="tab"
                     @click="clickTab(item)"
                     :name="item.name">
          <ul class="switchTabKind">
            <li class="curr">{{item.year}}</li>
          </ul>
          <span>
            <el-radio-group v-model="checkedCities11"
                               :min="zhongmin"
                               :max="zhongmax">
              <el-radio v-for="(city,index) in item.flies"
                           :label="city"
                           :key="index">{{city}}</el-radio>
            </el-radio-group>
          </span>
        </el-tab-pane>
        <!-- <el-tab-pane label="中分" name="second">中分</el-tab-pane> -->
        <el-button type="primary"
                   size="mini"
                   @click="bouncedEchart"
                   style="background:#2E5686;border:none;color:#fff;margin:130px 70px 15px 0;float:right">确定</el-button>
      </el-tabs>
     
    </div>
      <el-dialog  id="dialog"
        title=""
        @open="getBaseMap"
        :visible.sync="dialogVisibleQuality"
        width="60%"
        top="10vh"
        >
        <h1 id="mapTitle" style="text-align:center;">{{this.getCityName[0]+'的'+this.radioTyleBounceArr.selectType}}<span style="text-align:center; font-size:13px; margin-left:20px" >{{mapServerDateTime1}}</span></h1>
        
          <el-button type="primary" @click="download()" style="position:absolute; bottom:25px;right:47%; z-index:1111111">下载</el-button>
        <div id="item" ref="item" style="width:95%;height:450px;margin:0 auto;">
        
            <!-- <img :src="qualityImg" alt="" style="width:98%;"> -->
        </div>
        <span slot="footer" class="dialog-footer" style="text-align:center;">
          <!-- <i class="el-icon-download" style="margin-right:5px;"></i>
          <i class="el-icon-tickets" style="margin-left:5px;"></i> -->
         
          <!-- <el-button type="primary" >保存</el-button> -->
           
           <h3 style="text-align:right;">
           天水师范学院-资源与环境工程学院
          </h3> 
        </span>
       
      </el-dialog>

      <!--  -->
        <el-dialog  id="dialog"
        title=""
        :visible.sync="dialogVisiblebianhua"
        width="40%"
        top="10vh"
        >
        <h1 id="mapTitle" style="text-align:center;">{{this.getCityName[0]+'的'+this.radioTyleBounceArr.selectType}}<span style="text-align:center; font-size:13px; margin-left:20px" >{{mapServerDateTime1}}</span></h1>
          <el-table :data="tableDatainfo" style="width: 100%" border :header-cell-style="{background:'#1E90FF',color:'#fff'}">
                <el-table-column prop="type" label="类别" align="center">
                </el-table-column>
                <el-table-column prop="all" label="全部土地类别"  align="center">
                </el-table-column>
   
              </el-table>
        <el-button type="primary" @click="download()" style="position:absolute; bottom:10px;right:43%; z-index:1111111">下载</el-button>
          
        <span slot="footer" class="dialog-footer" style="text-align:center;">
       
         
   
        </span>
       
      </el-dialog>
    
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import url from "@/api/port";
//import pdf from "@/assets/Git.pdf";
import esriLoader from "esri-loader"
export default {
  name: "RightBounced",
  data() {
    return {
      ok: false,
      ok1: false,
      ok2: false,
      ok3: false,
      ok4: false,
      current: 0,
      dialogVisibleQuality:false,//估算和分析共用的弹框
      qualityImg:"",//绑定的图片
      dialogVisiblechange:true,//变化的弹框
      qualityChange1:"",//绑定的图片
      qualityChange2:"",
      liList: [
      ],
      dialogVisiblebianhua:false,
      tabs:[],
      mapServerDateTime1:'',
      map:"",
      view:"",
      tabArr: [],
      zhongmin: 0,
      zhongmax: 1,
      checkedCities11: [],
      cities: [
      ],
      mapTitle:"地上生物量分布图",
      activeName: "",
      fileTime:'',
      tableDatainfo: [{
            type: '均值',
            all: '暂无数据',
      
          }, {
            type: '面积',
            all: '暂无数据',
         
          }, {
            type: '2016-05-01',
             all: '暂无数据',
            
          }, {
            type: '2016-05-03',
            all: '暂无数据',
           
          }, {
            type: '2016-05-03',
            all: '暂无数据',
           
          }]
    };
  },
  computed: {
    ...mapGetters("quality", [
      "rightBounceArr",
      "scoreTyleBounceArr",
      "radioTyleBounceArr",
      "selectBounceArr",
      "stateBounceArr",
      "resetSelectArr",
      "getsearchDataOBj",//数据源传过去的 tab页数组
      "parametersObj",//区域传来的参数对象
      "sourceTypeSelectedOBj",//数据源传来的参数
      "getCityArr",//区域传来的城市数组
      "getDateObj",//点击查询传入来的开始时间和结束时间
      "mapCityArr",//区域传来的县、市或者甘肃省的code  下载图片用
      "getCityName",//区域传过来的县、市或者省的名字
    ])
  },
  
  watch: {
    rightBounceArr(nl, ol) {
      //console.log(nl, ol);
    },
    scoreTyleBounceArr(newval, oldval) {
      //console.log(newval);
      this.tabArr = newval;
    },
    // resetSelectArr(nl,ol){
    //   this.checkedCities11=[];
    // },
    stateBounceArr(nl, ol) {
      //this.tabs = nl;
      console.log(nl);
      this.activeName = this.tabArr[0].name;
    },
    radioTyleBounceArr(val, oldval) {//监听左侧组件的下拉框变化
          //console.log(val);
          //console.log(oldval);
          

    if(oldval !== ''){
    console.log("下拉框发生了变化");
        this.checkedCities11 = [];
        //开始时间  17-07-07有数据
				//console.log("TCL: radioTyleBounceArr -> this.radioTyleBounceArr.secrchType", this.radioTyleBounceArr)
        this.getfileList(this.parametersObj.cityCode,this.radioTyleBounceArr.secrchType,this.getDateObj.startTime,this.sourceTypeSelectedOBj,this.getDateObj.endTime);
          }
    

    },
    getsearchDataOBj(nl,ol){//监听点击查询 获取文件列表的数组   
      //console.log(nl);
      this.tabs=nl;
    }
  },
  methods: {
    
     download(){//估算的下载
            console.log(this.checkedCities11);
            var soucrce=this.sourceTypeSelectedOBj.substr(7,3)
    
            console.log(url.downloadMapServer+"?areaCode="+this.mapCityArr.exportCode+"&dateFolderName="+this.checkedCities11+"&algorithmType="+this.radioTyleBounceArr.secrchType+"&sourceType="+soucrce+"");
        
            createImg(url.downloadMapServer+"?areaCode="+this.mapCityArr.exportCode+"&dateFolderName="+this.checkedCities11+"&algorithmType="+this.radioTyleBounceArr.secrchType+"&sourceType="+soucrce+"");
            function createImg(url){
                  var oA = document.createElement("a");
                  oA.download = '';// 设置下载的文件名，默认是'下载'
                  oA.href = url;
                  document.body.appendChild(oA);
                  oA.click();
                  oA.remove(); // 下载之后把创建的元素删除
            }
            function saveAsPNG(canvas) {
                return canvas.toDataURL("image/png");
            }
    },
     ...mapActions("quality", ["rightListArr","resetSelect"]),
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    addClass: function(index) {
      this.current = index;
    },

      

    // },
    getfileList(areaCode,type,startDate,sourceCycleType,endDate){
         var _this=this;
         _this.$http.post(url.searchButton, {
            "areaCode": areaCode,
            "algorithmType": type,
            "sourceCycleType":sourceCycleType,
            "endDate":endDate,
            "startDate":startDate
          })
          .then(function (response) {
             
								
                  var tallScoreFlie=[];//高分的文件列表 
                  var zhongScoreFlie=[];//中分的文件列表
                  var diScoreFlie=[];//低分的文件列表
                
                  for(let i=0;i<response.data.length;i++){
                      if(response.data[i].sourceType=="GF2" || response.data[i].sourceType=="GF1"){//高分的文件列表 
                          tallScoreFlie.push(response.data[i].dateFolderName);
                          // var fileName={
                          //   name:response.data[i].dateFolderName,
                          //   id:response.data[i].id,
                          //   sourceType:response.data[i].sourceType,
                          //   areaCode:response.data[i].areaCode
                          // };
                          // tallScoreFlie.push(fileName);
                      }
                      if(response.data[i].sourceType=="HJ1" || response.data[i].sourceType=="LANDSAT"){//中分的文件列表
                          zhongScoreFlie.push(response.data[i].dateFolderName);
                      }
                      if(response.data[i].sourceType=="modis" || response.data[i].sourceType=="MODIS"){//低分的文件列表
                          diScoreFlie.push(response.data[i].dateFolderName);  
                      }
                  }
                  console.log(tallScoreFlie);
                  console.log(diScoreFlie);
                    function uniq(array){//去重
                      var temp = []; //一个新的临时数组
                      for(var i = 0; i < array.length; i++){
                          if(temp.indexOf(array[i]) == -1){
                              temp.push(array[i]);
                          }
                      }
                      return temp;
                  }
                  var a=_this.tabs;

                  //console.log(a);
                  for(let i =0;i<a.length;i++){
                    //console.log(a[i].name);
                    if(a[i].name=="高分"){
                      a[i].flies=uniq(tallScoreFlie);
                    }
                      if(a[i].name=="低分"){
                      a[i].flies=uniq(diScoreFlie);
                    }
                      if(a[i].name=="中分"){
                      a[i].flies=uniq(zhongScoreFlie);
                    }
                  }

                  

                  //console.log(a);
          })
          .catch(function (error) {
                console.log('请求失败');
                
          });
    },
        bouncedEchart() {
      //console.log(this.radioTyleBounceArr);
      //console.log( this.current);
      // console.log(this.checkedCities11);
      // console.log(this.parametersObj.cityCode);
      // console.log(proTime);
      //console.log(this.getCityArr);//区域模块传来的code码
   //加载专题图
  
           if(this.radioTyleBounceArr.radioType=='2'){
            this.gettabledata()
                      if (this.checkedCities11.length < 1) {
                         const h = this.$createElement;
                         this.$message({
                           message: h("p", null, [
                             h("span", null, "请选择"),
                  h("i", { style: "color: teal" }, "文件")
                ]),
                duration: 1000
              });
              return;
            }
            this.mapTitle="植被覆盖率生物量分布图";
      this.dialogVisiblebianhua=true
        
            var proTime=this.checkedCities11.substr(0,12);
            var cycle=this.checkedCities11.substr(12,4);
            // var cycle="CO0D";
            console.log(proTime);
            //文件名称处理
             var fileTime2=proTime.substring(0,8).substring(0, 4) + "年" + proTime.substring(0,8).substring(4, 6) + "月" + proTime.substring(0,8).substring(6, 8)+'日'
         
             this.fileTime=fileTime2
             return
      }
           if (this.checkedCities11.length < 1) {
              const h = this.$createElement;
              this.$message({
                message: h("p", null, [
                  h("span", null, "请选择"),
                  h("i", { style: "color: teal" }, "文件")
                ]),
                duration: 1000
              });
              return;
            }
            //console.log(definitionExpression);
            this.dialogVisibleQuality=true;
            this.mapTitle="植被覆盖率生物量分布图";
            // var proTime="201708270000";
            //console.log("TCL: bouncedEchart -> this.checkedCities11", this.checkedCities11)
            var proTime=this.checkedCities11.substr(0,12);
            var cycle=this.checkedCities11.substr(12,4);
            // var cycle="CO0D";
            console.log(proTime);
            //文件名称处理
             var fileTime2=proTime.substring(0,8).substring(0, 4) + "年" + proTime.substring(0,8).substring(4, 6) + "月" + proTime.substring(0,8).substring(6, 8)+'日'
         
             this.fileTime=fileTime2
       
             
            var definitionExpression='';
                  //console.log('打印城市');
                  
                //console.log(this.getCityArr);
                
              if(this.getCityArr.length==1){
                definitionExpression="qxdm='"+this.getCityArr[0]+"'";
              }else if(this.getCityArr.length>1){
                for(let i=0;i<this.getCityArr.length;i++){
                let b  = "qxdm='"+this.getCityArr[i]+"'"+"or ";
                definitionExpression=(definitionExpression+b);
              }
              definitionExpression=definitionExpression.substr(0,definitionExpression.length-3);
              
              
            }
            definitionExpression= "1=1 and ("+definitionExpression+"  ) and ProTime='"+proTime+"'"+" and Cycle = '"+cycle+"'";
             //console.log("TCL: bouncedEchart -> definitionExpression", definitionExpression)
           
          
              var _this=this;
              setTimeout(function(){
          // console.log("http://192.168.5.17:6080/arcgis/rest/services/GDBServer/"
          // +_this.radioTyleBounceArr.secrchType
          // +"_FB/MapServer");
                  this.map='';
                  this.view=''
                 _this.getMapServer(
          "http://192.168.5.17:6080/arcgis/rest/services/GDBServer/"
          +_this.radioTyleBounceArr.secrchType
          +"_FB/MapServer",definitionExpression);
          //"1=1 and (qxdm ='620524000000') and ProTime='"+proTime+"'"+" and Cycle = '"+cycle+"'"
                //console.log('我要调用地图');           
              },100);
             //let definitionExpression="1=1 and (qxdm ='150726000000'   )and ProTime = '201708270000' and Cycle = 'COOD'";
        
      //}
    

      if (this.radioTyleBounceArr == "") {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h("span", null, "请选择"),
            h("i", { style: "color: teal" }, "查询类型")
          ]),
          duration: 1000
        });
        return;
      }
      if (
        this.radioTyleBounceArr.radioType == "1" &&
        this.radioTyleBounceArr.selectType == "植被覆盖度"
      ) {

        if (this.checkedCities11.length < 1) {
          const h = this.$createElement;
          this.$message({
            message: h("p", null, [
              h("span", null, "请选择"),
              h("i", { style: "color: teal" }, "一个城市")
            ]),
            duration: 1000
          });
          return;
        }
        this.ok = true;
        this.ok1 = true;
      }
     
    
    
    },
  
   
   
    init() {
      this.$store.dispatch("quality/rightListArr", false);
    },
      getBaseMap() {
      const options = {
         url: "http://192.168.5.17:8082/arcgisApi/4.9/init.js"
       };
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView",   "esri/geometry/Point",
            "esri/geometry/Polygon",
            "esri/Graphic",
            "esri/symbols/SimpleLineSymbol", "esri/layers/FeatureLayer","dojo/domReady!"],
          options
        )
        .then(
          ([Map, MapView, Point, Polygon, Graphic, SimpleLineSymbol,FeatureLayer]) => {
            var gl = this.initGoogleLayerClass();

            gl.then(gl => {
              //console.log(gl);
              // 代码书写部分
              this.map = new Map({
                basemap: "topo"
              });
              //console.log(this.$refs.item);
              this.view = new MapView({
                container: "item",
                map: this.map,
                center: [105.729696,34.585272],
                zoom: 7
              });
              var mapBaseLayer = new gl({
               urlTemplate:"http://192.168.5.17:8857/tile/service/v1/tile?map=1&x={x}&y={y}&z={z}",
               title: "GoogleVectorMap"
              });
              this.map.add(mapBaseLayer, 0);
                               
            });
          },
          reason => {
            console.log(reason);
          }
        );
    },
    async initGoogleLayerClass() {
      var gl = null;
      const options = {
        url: "http://192.168.5.17:8082/arcgisApi/4.9/init.js"
      };
      await esriLoader
        .loadModules(
          ["esri/config", "esri/request", "esri/layers/BaseTileLayer"],
          options
        )
        .then(
          ([esriConfig, esriRequest, BaseTileLayer]) => {
            // 代码书写部分
            gl = BaseTileLayer.createSubclass({
              properties: {
                urlTemplate: null
              },
              getTileUrl: function(level, row, col) {
                return this.urlTemplate
                  .replace("{z}", level)
                  .replace("{x}", col)
                  .replace("{y}", row);
              },
              fetchTile: function(level, row, col) {
                var url = this.getTileUrl(level, row, col);

                return esriRequest(url, {
                  responseType: "image",
                  allowImageDataAccess: true
                }).then(
                  function(response) {
                    var image = response.data;
                    var width = this.tileInfo.size[0];
                    var height = this.tileInfo.size[0];
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(image, 0, 0, width, height);
                    return canvas;
                  }.bind(this)
                );
              }
            });
            //增加跨域配置
            esriConfig.request.corsEnabledServers.push("http://www.google.cn/");
          },
          reason => {
            console.log(reason);
          }
        );
      return gl;
    },
    //专题图加载
getMapServer(url,definitionExpression) {
        var dateType=this.checkedCities11.substr(12,4);//后四位类型
        var dateMmouth=this.checkedCities11.substr(4,2);//月份
        var dateDay=this.checkedCities11.substr(6,2);//天
        var dateYear =this.checkedCities11.substr(0,4);//年
        // console.log(Number(dateDay));
      if(dateType=="COTD"){
          if(1<=Number(dateDay)<=10){
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月上旬";
          }else if(10<Number(dateDay)<=20){
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月中旬";
          }else{
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月下旬";
          }
      }else if(dateType=="COAQ"){
          if(1<=Number(dateMmouth)<=3){
             this.mapServerDateTime1=dateYear+"年一季度";
          }
           if(3<Number(dateMmouth)<=6){
             this.mapServerDateTime1=dateYear+"年二季度";
          }
            if(6<Number(dateMmouth)<=9){
             this.mapServerDateTime1=dateYear+"年三季度";
          }
            if(9<Number(dateMmouth)<=12){
             this.mapServerDateTime1=dateYear+"年四季度";
          }
      }else if(dateType=="COAY"){
            this.mapServerDateTime1=dateYear+"年";
      }else{
            this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月"+dateDay+"日";
      }
      const options = {
         url: "http://192.168.5.17:8082/arcgisApi/4.9/init.js"
       };
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView",  "esri/geometry/Point",
            "esri/geometry/Polygon",
            "esri/Graphic",
            "esri/tasks/support/Query",
            "esri/renderers/UniqueValueRenderer",
            "esri/symbols/SimpleLineSymbol", "esri/layers/FeatureLayer","esri/geometry/Extent","esri/widgets/Compass","esri/widgets/Legend","esri/widgets/ScaleBar", "esri/Color","dojo/domReady!"],
          options
        )
        .then(
          ([Map, MapView,Point, Polygon, Graphic,Query,UniqueValueRenderer, SimpleLineSymbol,FeatureLayer,Extent,Compass,Legend,ScaleBar,Color]) => {


                this.map.renderer = {
                            type: "unique-value",
                            field: "GRIDCODE",
                            defaultSymbol: {//与defaultLabel配套使用
                                type: "simple-fill",
                                color: new Color([0, 76,115, 1]),
                                outline: {  // autocasts as new SimpleLineSymbol()
                                    color: [0, 0, 0, 0.1],
                                    width: "0.5px"
                                }
                            },
                            defaultLabel: ">200",//无数据处渲染的颜色
                            legendOptions:{//图例说明
                                title: " "
                            },
                            uniqueValueInfos: [{
                                value: "1",
                                symbol: {
                                    type: "simple-fill",
                                    color: new Color([168, 56, 0, 1]),//轻旱
                                    outline: {
                                        width: 0
                                    }
                                },
                                label:"<10"
                            }, {
                                value: "2",
                                symbol: {
                                    type: "simple-fill",
                                    color: new Color([255, 170, 0, 1]),//中旱
                                    outline: {
                                        width: 0
                                    }
                                },
                                label:"10-50"
                            }, {
                                value: "3",
                                symbol: {
                                    type: "simple-fill",
                                    color: new Color([255, 255, 0, 1]),//重旱
                                    outline: {
                                        width: 0
                                    }
                                },
                                label:"50-100"
                            }, {
                                value: "4",
                                symbol: {
                                    type: "simple-fill",
                                    color: new Color([56, 168,0, 1]),//特旱
                                    outline: {
                                        width: 0
                                    }
                                },
                                label:"100-150"
                            }, {
                                value: "5",
                                symbol: {
                                    type: "simple-fill",
                                    color: new Color([0, 132,168, 1]),//特旱
                                    outline: {
                                        width: 0
                                    }
                                },
                                label:"150-200"
                            }]
                };
                //console.log(definitionExpression);
                
                const layer = new FeatureLayer({
                          url: url,
                          definitionExpression: definitionExpression ,
                          //renderer: this.map.renderer,
                        //   portalItem: {  // autocasts as new PortalItem()
                        //   id: "aee69aacda2644c280e8553af275d6a7"
                        // }  // the first layer in the service is returned

                });
        
                // console.log("layer");
                // console.log(layer);
          
                // layer.opacity=0.2;
                this.map.add(layer);
                // this.map.add(layer1);
                const query = new Query();
      
                
                query.where = definitionExpression;
                query.returnGeometry = true;
                query.outSpatialReference={wkid:4326};
                var _this=this;
                var res='';
            
                layer.queryFeatures(query).then(function(results){
                      console.log('选择数量');  
                      console.log(results);
                      
                     console.log(_this.parametersObj.cityCode.split(',')[0].split(';').length);
                     if(_this.parametersObj.cityCode.split(',')[0].split(';').length>10){
                        _this.view.extent=results.features[0].geometry.extent
                       _this.view.zoom=6;
                      // _this.view.center=[105.719348,34.591929];
                       return
                    }
                    
                    var zoomExtent=results.features[0].geometry.extent;
                    if(results.features.length>1&&results.features.length<=10){ 
                      
                      // _this.view.goTo({
                      //       target: results.features[0].geometry.extent        
                                        
                      //   });
                      console.log(results.features)                   
                      console.log('进来方法了');
                      console.log(_this.parametersObj.cityCode);
                      
                       _this.view.extent=results.features[0].geometry.extent
                     
                    }
                   else{
                        if(zoomExtent!=null){
                          console.log(_this.view);
                            // _this.view.goTo({
                            //     target: zoomExtent.expand(-50)
                            // });
                            _this.view.extent=results.features[0].geometry.extent
                            _this.view.zoom=7;
                        }

                    }
                })

                // const viewObj = this.view;
                // layer.when(function(){
                //   viewObj.extent = layer.fullExtent;
                      
                // });
                
            
              // var pt = new Point({
              //   latitude: 49,
              //   longitude: -126
              // });
                var compass = new Compass({//指南针
                  view: this.view,
                });
                compass.classes();
                // adds the compass to the top left corner of the MapView
                this.view.ui.add(compass, "bottom-left");

                //图列
                var  title
                this.radioTyleBounceArr.secrchType=='NPP'?title='图例 单位 (gC/㎡)':(this.radioTyleBounceArr.secrchType=='NDVI'?title='图例  单位(ndvi)':title='图例 单位  (%)')
                var legend = new Legend({
                  view: this.view,
                  layerInfos: [{
                    layer: layer,
                    title: title
                  }],
                 
                });

                this.view.ui.add(legend, "bottom-right");

                //比例尺
                var scaleBar = new ScaleBar({
                    view: this.view,
                    style:"line",
                    unit:"metric"
                  });
                  // Add widget to the bottom left corner of the view
                  this.view.ui.add(scaleBar, {
                    position: "bottom-left"
                });
               
                        
          },
          reason => {
            console.log(reason);
          }
        );
    },
    gettabledata(){
      let that=this
       var dateType=this.checkedCities11.substr(12,4);//后四位类型
        var dateMmouth=this.checkedCities11.substr(4,2);//月份
        var dateDay=this.checkedCities11.substr(6,2);//天
        var dateYear =this.checkedCities11.substr(0,4);//年
        // console.log(Number(dateDay));
      if(dateType=="COTD"){
          if(1<=Number(dateDay)<=10){
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月上旬";
          }else if(10<Number(dateDay)<=20){
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月中旬";
          }else{
             this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月下旬";
          }
      }else if(dateType=="COAQ"){
          if(1<=Number(dateMmouth)<=3){
             this.mapServerDateTime1=dateYear+"年一季度";
          }
           if(3<Number(dateMmouth)<=6){
             this.mapServerDateTime1=dateYear+"年二季度";
          }
            if(6<Number(dateMmouth)<=9){
             this.mapServerDateTime1=dateYear+"年三季度";
          }
            if(9<Number(dateMmouth)<=12){
             this.mapServerDateTime1=dateYear+"年四季度";
          }
      }else if(dateType=="COAY"){
            this.mapServerDateTime1=dateYear+"年";
      }else{
            this.mapServerDateTime1=dateYear+"年"+dateMmouth+"月"+dateDay+"日";
      }
      this.$http.post('http://192.168.5.61:8080/api/dbf/getDbfInfo',{
        algorithmType: that.radioTyleBounceArr.secrchType,
          areaCode:  that.parametersObj.cityCode,
          dataType: that.sourceTypeSelectedOBj.substr(7,3),
          dateFolderNames: that.checkedCities11
     
      }).then(function(res){
        console.log(res);
        that.tableDatainfo=res.data[0].data
      })
    }
  
  },
  mounted() {
    this.init();
    
  }
};
</script>
<style lang="scss">
 

.switchTab {
  position: absolute;
  top: 30px;
  right: 4%;
  width: 15%;
  background: #fff;
  z-index: 99;
  border-radius: 5px;
  .el-tabs__content{
    height: 400px;
  }
  .el-tab-pane {
    float: left;
    width: 100%;
    .switchTabKind {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      height: 36px;
      border-bottom: 1px solid rgb(204, 185, 185);
      li {
        float: left;
        width: 20%;
        line-height: 36px;
        list-style: none;
        text-align: center;
        cursor: pointer;
      }
      li.curr {
        background: #0a2e54;
        color: #fff;
        font-size: 14px;
      }
    }
    .el-radio-group {
      margin-top: 30px;
    }
    .el-radio {
      display: block;
      margin: 10px 0 20px 30px;
    }
  }
 
}
#dialog{
  .el-dialog__footer{
    text-align: center !important;
    i{
      font-size: 30px;
      cursor: pointer;
    }
    
  }
 
}
 .esri-view-height-xsmall .esri-expand .esri-widget--panel, .esri-view-height-xsmall .esri-expand .esri-widget--panel-height-only, .esri-view-height-xsmall .esri-ui-corner .esri-component.esri-widget--panel, .esri-view-height-xsmall .esri-ui-corner .esri-component.esri-widget--panel-height-only{
    width: 150px;
    max-height: 500px;
  }
  .esri-scale-bar__bar-container--line:last-child{
    align-items:flex-end;
  }
  #mapTitle{
    line-height: 35px;
    font-size: 25px;
  }
</style>

