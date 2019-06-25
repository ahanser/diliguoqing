<template>
  <div style="height:calc(100% - 100px)">
    <areaBounced :isRegion="flag.areaBounced" @changeBounced="changeBounced"/>
    <elocoBounced :isEcolo="flag.elocoBounced" @changeBounced="changeBounced"/>
    <stateBounced :isState="flag.stateBounced" @changeBounced="changeBounced"/>
    <search-header @changeBounced="changeBounced"/>
    <div class="content">
      <div id="earth"></div>
      <left-bounced/>
      <right-bounced/>
    </div>
  </div>
</template>
<script>
import searchHeader from '@/views/quality/searchHeader'
import rightBounced from '@/views/quality/rightBounced'
import leftBounced from '@/views/quality/leftBounced'
import areaBounced from '@/views/quality/bounced/areaBounced'
import elocoBounced from '@/views/quality/bounced/elocoBounced'
import stateBounced from '@/views/quality/bounced/stateBounced'
import { mapGetters, mapActions } from 'vuex'
import url from '@/api/port'
import esriLoader from 'esri-loader'
export default {
  name: 'Ecolo',
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
      map: '',
      view: '',
      mapConfig: {
        map: null,
        dimension: '3D', // 地图的维度
        container: 'earth', // 地图容器
        scale: 110329633.40563367, // 3D视图下的比例尺
        zoom: 2, // 2D视图下的比例尺
        center: [105.578034, 34.062071]
      }
    }
  },
  computed: {
    ...mapGetters('quality', ['mapCityArr'])
  },
  watch: {
    mapCityArr(nl, ol) {
      var _this = this

      for (let i = 0; i < _this.map.layers.items.length; i++) {
        //清除上一次保留的图层
        if (_this.map.layers.items[i].id == 'city') {
          //console.log("TCL: mapCityArr -> _this.map.layers.items[i]", _this.map.layers.items[i])
          _this.map.remove(_this.map.layers.items[i])
          //_this.map.add(_this.map.layers.items[0]);
          _this.map.layers.items.splice(1, _this.map.layers.items.length - 1)
        }
      }

      // _this.view.graphics.removeAll();
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Point',
            'esri/geometry/Polygon',
            'esri/Graphic',
            'esri/layers/GraphicsLayer',
            'esri/symbols/SimpleLineSymbol',
            'esri/layers/Layer',
            'dojo/domReady!'
          ],
          options
        )
        .then(
          ([
            Map,
            MapView,
            Point,
            Polygon,
            Graphic,
            GraphicsLayer,
            SimpleLineSymbol,
            Layer
          ]) => {
            var gl = this.initGoogleLayerClass()

            gl.then(gl => {
              this.$http
                .post(url.getAreaBorder, {
                  ids: this.mapCityArr.areaId
                })
                .then(function(res) {
                  if (res.status == 200) {
                    if (res.data.length != 0) {
                      for (var i = 0; i < res.data.length; i++) {
                        var polygon = new Polygon({
                          type: 'polygon',
                          hasZ: true,
                          hasM: true,
                          rings: res.data[i].coordinates,
                          spatialReference: 4326
                        })
                        var fillSy = new SimpleLineSymbol({
                          color: 'gray',
                          width: 2,
                          join: 'miter'
                        })
                        var polygonGraphic = new Graphic({
                          geometry: polygon,
                          id: 'city',
                          symbol: fillSy
                        })
                        var layer = new GraphicsLayer({
                          graphics: [polygonGraphic],
                          id: 'city'
                        })

                        //console.log("TCL: mapCityArr -> polygonGraphic", polygonGraphic)

                        _this.map.add(layer)
                        if (_this.map.allLayers.items.length >= 50) {
                          let allLayerDone = {
                            status: '1'
                          }
                          _this.$store.dispatch(
                            'quality/launchallLayerDone',
                            allLayerDone
                          )
                        }
                      }
                    }
                  }
                })

              this.$http
                .post(url.getCityBorder, {
                  pids: this.mapCityArr.cityId
                })
                .then(function(res) {
                  //console.log(res);
                  //console.log(_this);
                  if (res.status == 200) {
                    if (res.data.length != 0) {
                      for (var i = 0; i < res.data.length; i++) {
                        var polygon = new Polygon({
                          type: 'polygon',
                          hasZ: true,
                          hasM: true,
                          rings: res.data[i].coordinates,
                          spatialReference: 4326
                        })
                        var fillSy = new SimpleLineSymbol({
                          color: 'gray',
                          width: 2,
                          join: 'miter'
                        })
                        var polygonGraphic = new Graphic({
                          geometry: polygon,
                          symbol: fillSy,
                          id: 'city'
                        })
                        var layer = new GraphicsLayer({
                          graphics: [polygonGraphic]
                        })

                        _this.map.add(layer)
                      }
                    }
                  }
                })
            })
          },
          reason => {
            console.log(reason)
          }
        )
    }
  },
  methods: {
    //加载地图
    //加载地图
    init() {
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/geometry/Point',
            'esri/geometry/Polygon',
            'esri/Graphic',
            'esri/symbols/SimpleLineSymbol',
            'esri/layers/FeatureLayer',
            'esri/layers/GraphicsLayer',
            'dojo/domReady!'
          ],
          options
        )
        .then(
          ([
            Map,
            MapView,
            Point,
            Polygon,
            Graphic,
            SimpleLineSymbol,
            FeatureLayer,
            GraphicsLayer
          ]) => {
            var gl = this.initGoogleLayerClass()

            gl.then(gl => {
              // 代码书写部分
              this.map = new Map({
                basemap: 'topo'
              })
              this.view = new MapView({
                container: 'earth',
                map: this.map,
                center: [105.726247, 34.584797],
                zoom: 6
              })
              var mapBaseLayer = new gl({
                urlTemplate:
                  'http://192.168.5.17:8857/tile/service/v1/tile?map=1&x={x}&y={y}&z={z}',
                title: 'GoogleVectorMap'
              })
              this.map.add(mapBaseLayer, 0)
              var _this = this
              _this.$http
                .post(url.getAreaBorder, {
                  ids: ['1']
                })
                .then(function(res) {

                  //加载甘肃省的边界
                  if (res.status == 200) {
                    if (res.data.length != 0) {
                      for (var i = 0; i < res.data.length; i++) {
                        var polygon = new Polygon({
                          type: 'polygon',
                          hasZ: true,
                          hasM: true,
                          rings: res.data[i].coordinates,
                          spatialReference: 4326
                        })
                        var fillSy = new SimpleLineSymbol({
                          color: 'dodgerblue',
                          width: 2,
                          join: 'miter'
                        })
                        var polygonGraphic = new Graphic({
                          geometry: polygon,
                          symbol: fillSy
                        })
                        _this.view.graphics.add(polygonGraphic)
                        _this.view.center = [102.643981, 37.932784]
                      }
                    }
                  }
                })
            })
          },
          reason => {
            console.log(reason)
          }
        )
    },

    async initGoogleLayerClass() {
      var gl = null
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      await esriLoader
        .loadModules(
          ['esri/config', 'esri/request', 'esri/layers/BaseTileLayer'],
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
                  .replace('{z}', level)
                  .replace('{x}', col)
                  .replace('{y}', row)
              },
              fetchTile: function(level, row, col) {
                var url = this.getTileUrl(level, row, col)

                return esriRequest(url, {
                  responseType: 'image',
                  allowImageDataAccess: true
                }).then(
                  function(response) {
                    var image = response.data
                    var width = this.tileInfo.size[0]
                    var height = this.tileInfo.size[0]
                    var canvas = document.createElement('canvas')
                    var context = canvas.getContext('2d')
                    canvas.width = width
                    canvas.height = height
                    context.drawImage(image, 0, 0, width, height)
                    return canvas
                  }.bind(this)
                )
              }
            })
            //增加跨域配置
            esriConfig.request.corsEnabledServers.push('http://www.google.cn/')
          },
          reason => {
            console.log(reason)
          }
        )
      return gl
    },

    // 创建3D地图
    set3dMap: function(layer) {
      this.activeLayer = layer
      var _this = this
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/views/SceneView',
            'esri/layers/WebTileLayer',
            'esri/core/watchUtils',
            'esri/views/MapView',
            'esri/geometry/Point',
            'esri/geometry/Polygon',
            'esri/Graphic',
            'esri/symbols/SimpleLineSymbol',
            'esri/layers/FeatureLayer',
            'esri/layers/GraphicsLayer',
            'dojo/domReady!'
          ],
          options
        )
        .then(
          ([
            Map,
            SceneView,
            WebTileLayer,
            watchUtils,
            MapView,
            Point,
            Polygon,
            Graphic,
            SimpleLineSymbol,
            FeatureLayer,
            GraphicsLayer
          ]) => {
            if (layer.name != 'Esri') {
              _this.mapConfig.map = new Map()
              var tiledLayer = new WebTileLayer({
                urlTemplate: layer.url
              })
              _this.mapConfig.map.add(tiledLayer)
            } else {
              _this.mapConfig.map = new Map({
                basemap: 'satellite'
              })
            }
            var map_3d = new SceneView(_this.mapConfig)
            watchUtils.whenTrue(map_3d, 'stationary', function() {
              _this.mapConfig.center = [
                map_3d.center.longitude,
                map_3d.center.latitude
              ]
              if (map_3d.viewpoint) {
                _this.mapConfig.scale = map_3d.viewpoint.scale
                _this.mapConfig.zoom = _this.zoomScaleExchange(
                  _this.mapConfig.scale
                )
              }
            })
          }
        )
    },
    changeBounced(data) {
      this.flag.hasOwnProperty(data) && (this.flag[data] = !this.flag[data])
    }
  },
  mounted() {
    this.init()
  }
}
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    bottom: 0px;
    .esri-view-root {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .esri-view-surface {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .esri-display-object {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>


