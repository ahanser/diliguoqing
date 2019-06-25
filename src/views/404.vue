<template>
  <div>
    <section id="app" class="row no-gutters">
      <div class="col-12 position-relative">
        <div id="map-container" style="position:absolute;height:100%;width:100%;"></div>
        <div id="info-div">
          <input
            class="esri-component esri-widget--button esri-widget esri-interactive"
            type="button"
            :value="relativeDimension()"
            @click="toggleDimension()"
          >
        </div>
        <ul id="layer-toggle-button-container" class="unstyled-list">
          <li
            class="layer-toggle-button text-center p-0 mx-1 row"
            @click="selectTileLayer(layer)"
            v-for="layer in tileLayer"
            v-if="layer!=activeLayer"
          >
            <small class="font-weight-light w-100 text-center py-1">{{ layer.name }}</small>
            <div class="w-100"></div>
            <img :src="layer.img" class="img-fluid w-100">
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import esriLoader from 'esri-loader'
import url from '@/api/port'
export default {
  name: 'Ecolo',
  components: {},
  data() {
    return {
      activeLayer: null,
      mapConfig: {
        map: null,
        dimension: '2D', // 地图的维度
        container: 'map-container', // 地图容器
        // scale: 15468599.40563367, // 3D视图下的比例尺
        center: [105.726247, 34.584797],
        zoom: 5
      },
      view: '',
      tileLayer: {
        localMap: {
          url:
            'http://192.168.5.17:8857/tile/service/v1/tile?map=1&x={col}&y={row}&z={level}',
          name: '',
          img: '/static/img/tiandituVec.png'
        },
        imageMap: {
          url:
            'http://192.168.5.27:8857/tile/service/v1/tile?map=2&x={col}&y={row}&z={level}',
          name: '',
          img: '/static/img/tiandituImg.png'
        }
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 比例尺与放大级别转换
    zoomScaleExchange: function(value) {
      var exchangeInfo = [
        591657550.5,
        295828775.3,
        147914387.6,
        73957193.82,
        36978596.91,
        18489298.45,
        9244649.227,
        4622324.614,
        2311162.307,
        1155581.153,
        577790.5767,
        288895.2884,
        144447.6442,
        72223.82209,
        36111.91104,
        18055.95552,
        9027.977761,
        4513.98888,
        2256.99444,
        1128.49722
      ]
      if (value < 21) {
        return exchangeInfo[value - 1]
      } else {
        if (value > exchangeInfo[0]) {
          return 1
        } else if (value < 1128.49722) {
          return 20
        } else {
          for (var index = 0; index < exchangeInfo.length; index++) {
            if (exchangeInfo[index] < value) {
              return index - 1
            }
          }
        }
      }
    },
    // 2D / 3D 切换按钮文字
    relativeDimension: function() {
      if (this.mapConfig.dimension === '3D') {
        return '2D'
      } else {
        return '3D'
      }
    },
    // 2D / 3D 切换
    toggleDimension: function() {
      if (this.mapConfig.dimension === '3D') {
        this.mapConfig.dimension = '2D'
        this.set2dMap(this.activeLayer)
      } else {
        this.mapConfig.dimension = '3D'
        this.set3dMap(this.activeLayer)
      }
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

            this.view = new MapView({
              container: 'earth',
              map: this.map,
              center: [105.726247, 34.584797],
              zoom: 6
            })
            _this.mapConfig.map = new Map()
            var tiledLayer = new WebTileLayer({
              urlTemplate: layer.url
            })
            _this.mapConfig.map.add(tiledLayer)

            var map_3d = (_this.view = new SceneView(_this.mapConfig))
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
    // 创建2D地图
    set2dMap: function(layer) {
      this.activeLayer = layer
      var _this = this
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/core/watchUtils',
            'esri/layers/WebTileLayer',
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
            watchUtils,
            WebTileLayer,
            MapView,
            Point,
            Polygon,
            Graphic,
            SimpleLineSymbol,
            FeatureLayer,
            GraphicsLayer
          ]) => {
            _this.mapConfig.map = new Map(
              
            )
            var tiledLayer = new WebTileLayer({
              urlTemplate: layer.url
            })
            _this.mapConfig.map.add(tiledLayer)
            // _this.mapConfig.map.add(_this.imageMap)
            var map_2d = (_this.view = new MapView(_this.mapConfig))
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

            watchUtils.whenTrue(map_2d, 'stationary', function() {
              _this.mapConfig.center = [
                map_2d.center.longitude,
                map_2d.center.latitude
              ]
              if (map_2d.viewpoint) {
                _this.mapConfig.scale = map_2d.viewpoint.scale
                _this.mapConfig.zoom = _this.zoomScaleExchange(
                  _this.mapConfig.scale
                )
              }
            })
          }
        )
    },
    // 切换底图
    selectTileLayer: function(type) {
      if (this.mapConfig.dimension === '3D') {
        this.set3dMap(type)
      } else if (this.mapConfig.dimension === '2D') {
        this.set2dMap(type)
      }
    }
  },
  mounted() {
    // _this.mapConfig.zoom = _this.zoomScaleExchange(_this.mapConfig.scale)
    this.set2dMap(this.tileLayer.localMap)
  }
}
</script>
<style lang="scss">
* {
  outline: none;
}
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#map-container {
  height: 500px;
}

#info-div {
  position: absolute;
  top: 15px;
  left: 60px;
}

#info-div input {
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
}

#layer-toggle-button-container {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 9;
}
#layer-toggle-button-container li {
  float: right;
}
.layer-toggle-button {
  width: 60px;
  height: 60px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px;
  background-color: #fff;
  color: #6e6e6e;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition: background-color 125ms ease-in-out;
}
.layer-toggle-button:hover {
  background-color: #f0f0f0;
  color: #2e2e2e;
}
</style>


