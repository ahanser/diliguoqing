<template>
  <div style="height:calc(100% - 100px);">
    <areaBounced :isRegion="flag.areaBounced"
                 @changeBounced="changeBounced" />
    <elocoBounced :isEcolo="flag.elocoBounced"
                  @changeBounced="changeBounced" />
    <stateBounced :isState="flag.stateBounced"
                  @changeBounced="changeBounced" />
    <search-header @changeBounced="changeBounced" />
    <div class="content">
      <div id="earth"></div>
      <left-bounced />
      <right-bounced />
    </div>
  </div>
</template>
<script>
import searchHeader from "@/views/component/searchHeader";
import rightBounced from "@/views/component/rightBounced";
import leftBounced from "@/views/component/leftBounced";
import areaBounced from "@/views/component/bounced/areaBounced";
import elocoBounced from "@/views/component/bounced/elocoBounced";
import stateBounced from "@/views/component/bounced/stateBounced";
import { mapGetters, mapActions } from "vuex";
import url from "@/api/port";
import esriLoader from "esri-loader";
export default {
  name: "TryPage",
  components: {
    searchHeader,
    rightBounced,
    areaBounced,
    leftBounced,
    elocoBounced,
    stateBounced
  },
  data() {
    return {
      flag: {
        areaBounced: false,
        elocoBounced: false,
        stateBounced: false
      },
      map:"",
      view:""
    };
  },
   computed: {
    ...mapGetters("ecolo", [
        "mapCityArr"
      ])
  },
  watch:{
    mapCityArr(nl,ol){
      var _this=this;
    
      console.log(_this.map.layers.items);
      for(let i=0;i<_this.map.layers.items.length;i++){//清楚上一次保留的图层
          if(_this.map.layers.items[i].id=="city"){
              _this.map.remove(_this.map.layers.items[i]);
              _this.map.layers.items.splice(1, _this.map.layers.items.length-1);
          }
      }
      
      
        
      
      // _this.view.graphics.removeAll();
      const options = {
        url: "http://192.168.1.19:6001/arcjs49/init.js"
      };
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView",   "esri/geometry/Point",
            "esri/geometry/Polygon",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/symbols/SimpleLineSymbol", "dojo/domReady!"],
          options
        )
        .then(
          ([Map, MapView, Point, Polygon, Graphic, GraphicsLayer,SimpleLineSymbol]) => {
            var gl = this.initGoogleLayerClass();

            gl.then(gl => {

                    console.log(this.mapCityArr);
                    
                    this.$http.post(url.getAreaBorder,{
                      "ids":this.mapCityArr.areaId
                    }).then(function(res){

                          console.log(res);
                          console.log(_this);
                          if(res.status==200){  
                            if(res.data.length!=0){
                                  for(var i=0;i<res.data.length;i++){
                                      var polygon = new Polygon({
                                          type: "polygon",
                                          hasZ: true,
                                          hasM: true,
                                          rings: res.data[i].coordinates,
                                          spatialReference: 4326
                                      });
                                      var fillSy = new SimpleLineSymbol({
                                          color: "gray",
                                          width: 2,
                                          join: "miter"
                                        
                                      });
                                      var polygonGraphic = new Graphic({
                                          geometry: polygon,
                                          id:"city",
                                          symbol: fillSy
                                      });
                                       var layer = new GraphicsLayer({
                                        graphics: [polygonGraphic],
                                        id:"city"
                                      });

                                      console.log(polygonGraphic);
                                      
                                       _this.map.add(layer);
                                      
                                  }
                            }
                            
                          }
                          
                    });

                    this.$http.post(url.getCityBorder,{
                      "pids":this.mapCityArr.cityId
                    }).then(function(res){

                          console.log(res);
                          console.log(_this);
                          if(res.status==200){ 
                            if(res.data.length!=0){
                                  for(var i=0;i<res.data.length;i++){
                                      var polygon = new Polygon({
                                          type: "polygon",
                                          hasZ: true,
                                          hasM: true,
                                          rings: res.data[i].coordinates,
                                          spatialReference: 4326
                                      });
                                      var fillSy = new SimpleLineSymbol({
                                          color: "gray",
                                          width: 2,
                                          join: "miter"
                                        
                                      });
                                      var polygonGraphic = new Graphic({
                                          geometry: polygon,
                                          symbol: fillSy,
                                           id:"city"
                                      });
                                      var layer = new GraphicsLayer({
                                        graphics: [polygonGraphic]
                                      });

                                      
                                       _this.map.add(layer);
                                      
                                      
                                  }
                            } 
                            
                          }
                          
                    });
                    
            });
          },
          reason => {
            console.log(reason);
          }
        );
    }
  },
  methods: {
    
    //加载地图
    init() {

      const options = {
        url: "http://192.168.1.19:6001/arcjs49/init.js"
      };
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView",   "esri/geometry/Point",
            "esri/geometry/Polygon",
            "esri/Graphic",
            "esri/symbols/SimpleLineSymbol", "dojo/domReady!"],
          options
        )
        .then(
          ([Map, MapView, Point, Polygon, Graphic, SimpleLineSymbol]) => {
            var gl = this.initGoogleLayerClass();

            gl.then(gl => {
              console.log(gl);
              // 代码书写部分
              this.map = new Map({
                basemap: "topo"
              });
              this.view = new MapView({
                container: "earth",
                map:this.map,
                center: [109.71511, 38.09042],
                zoom: 4.9
              });
              var mapBaseLayer = new gl({
                urlTemplate:
                  "http://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                title: "GoogleVectorMap"
              });   
                  
                    console.log(this.mapCityArr);
                    this.map.add(mapBaseLayer, 0);
                    var _this=this;
                    _this.$http.post(url.getAreaBorder,{
                      "ids":["1"]
                    }).then(function(res){

                          console.log(res);
                         
                          //加载内蒙古市的边界
                          if(res.status==200){  
                            if(res.data.length!=0){
                                  for(var i=0;i<res.data.length;i++){
                                    var polygon = new Polygon({
                                        type: "polygon",
                                        hasZ: true,
                                        hasM: true,
                                        rings: res.data[i].coordinates,
                                        spatialReference: 4326
                                    });
                                    var fillSy = new SimpleLineSymbol({
                                        color: "dodgerblue",
                                        width: 2,
                                        join: "miter"
                                      
                                    });
                                    var polygonGraphic = new Graphic({
                                        geometry: polygon,
                                        symbol: fillSy
                                    });  
                                    _this.view.graphics.add(polygonGraphic);
                                    _this.view.center=[117.0,42.53];
                                }
                            }
                            
                          }
                          
                    });

                         


            });
          },
          reason => {
            console.log(reason);
          }
        );
    },
    changeBounced(data) {
      console.log(data);
      this.flag.hasOwnProperty(data) && (this.flag[data] = !this.flag[data]);
    },
    async initGoogleLayerClass() {
      var gl = null;
      const options = {
        url: "http://192.168.1.19:6001/arcjs49/init.js"
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
.content {
  position: relative;

  height: calc(100% - 60px);
  #earth {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}
</style>


