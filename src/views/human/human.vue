<template>
  <div style="height:calc(100% - 100px)">
    <areaBounced :isRegion="flag.areaBounced"
                 @changeBounced="changeBounced" />

    <stateBounced :isState="flag.stateBounced"
                  @changeBounced="changeBounced" />
    <search-header @changeBounced="changeBounced" />
    <div class="content">
      <div id="earth"></div>
      <right-bounced />
    </div>
  </div>
</template>
<script>
import searchHeader from "@/views/interference/searchHeader";
import rightBounced from "@/views/interference/rightBounced";

import areaBounced from "@/views/interference/bounced/areaBounced";

import stateBounced from "@/views/interference/bounced/stateBounced";

import esriLoader from "esri-loader";
export default {
  name: "Human",
  components: {
    searchHeader,
    rightBounced,
    areaBounced,
    stateBounced
  },
  data() {
    return {
      flag: {
        areaBounced: false,
        stateBounced: false
      }
    };
  },
  methods: {
    //加载地图
    //加载地图
    init() {
      const options = {
        url: "http://192.168.5.31:7001/arcgisApi/4.9/init.js"
      };
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView", "dojo/domReady!"],
          options
        )
        .then(
          ([Map, MapView]) => {
            var gl = this.initGoogleLayerClass();

            gl.then(gl => {
              console.log(gl);
              // 代码书写部分
              var map = new Map({
                basemap: "topo"
              });
              var view = new MapView({
                container: "earth",
                map: map,
                center: [109.71511, 38.09042],
                zoom: 6
              });
              var mapBaseLayer = new gl({
                urlTemplate:
                  "http://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil",
                title: "GoogleVectorMap"
              });
              map.add(mapBaseLayer, 0);
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
        url: "http://192.168.5.31:7001/arcgisApi/4.9/init.js"
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
    changeBounced(data) {
      console.log(data);
      this.flag.hasOwnProperty(data) && (this.flag[data] = !this.flag[data]);
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


