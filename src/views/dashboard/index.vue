<template>
<div>
    <div id="viewDiv"></div>
</div>
</template>

<script>
import esriLoader from 'esri-loader';
export default {
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const options = {
                url: 'http://localhost:9000/arcgis/4.9/init.js'
            }
            esriLoader.loadModules([
        "esri/views/MapView",
      "esri/WebMap"
                ], options)
                .then(([
                    MapView, WebMap
                ]) => {

                           // 代码书写部分

            var webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: "f2e9b762544945f390ca4ac3671cfa72"
        }
      });

      /************************************************************
       * Set the WebMap instance to the map property in a MapView.
       ************************************************************/
      var view = new MapView({
        map: webmap,
        container: "viewDiv"
      });


        
                }, reason => {
                    console.log(reason);
                });
        },
    }
}
</script>

<style>
#viewDiv {

    width: 100%;
    height: 500px;
}
</style>
