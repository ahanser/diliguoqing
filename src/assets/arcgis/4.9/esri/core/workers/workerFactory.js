// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../tsSupport/assignHelper dojo/_base/kernel ../../config ../../request ../has ../Logger ../promiseUtils ../urlUtils ./loaderConfig ./utils ./WorkerFallback".split(" "),function(x,u,k,y,f,z,c,A,B,v,w,l,d){function p(a){return B.create(function(g){function m(h){if(h=l.receiveMessage(h))switch(h.type){case C:h=a;var d=f.workers.loaderUrl||w.DEFAULT_LOADER_URL,e;null!=f["default"]?(e=k({},f),delete e["default"],e=JSON.parse(JSON.stringify(e))):e=JSON.parse(JSON.stringify(f));var b=
f.workers.loaderConfig,b=w.default({baseUrl:b.baseUrl,locale:y.locale,has:k({"config-deferredInstrumentation":0,"dojo-test-sniff":0,"esri-secure-context":c("esri-secure-context"),"esri-workers-arraybuffer-transfer":c("esri-workers-arraybuffer-transfer"),"events-keypress-typed":0,"host-webworker":1},b.has),map:k({},b.map),paths:k({},b.paths),packages:b.packages||[]});h.postMessage({type:D,configure:{esriConfig:e,loaderUrl:d,loaderConfig:b}});break;case E:a.removeEventListener("message",m),a.removeEventListener("error",
n),g(a)}}function n(g){g.preventDefault();a.removeEventListener("message",m);a.removeEventListener("error",n);q.warn("Failed to create Worker. Fallback to execute module in main thread",g);a=new d;a.addEventListener("message",m);a.addEventListener("error",n)}a.addEventListener("message",m);a.addEventListener("error",n)})}Object.defineProperty(u,"__esModule",{value:!0});var r=v.normalize(x.toUrl("./worker.js")),F=!v.hasSameOrigin(r,location.href),q=A.getLogger("esri.core.workers"),t=null;c.add("esri-workers-arraybuffer-transfer",
!c("safari")||12<=c("safari"));var E=l.MessageType.CONFIGURED,D=l.MessageType.CONFIGURE,C=l.MessageType.HANDSHAKE;u.createWorker=function(){if(!c("esri-workers"))return p(new d);if(!F){var a=void 0;try{a=new Worker(r)}catch(g){q.warn("Failed to create Worker. Fallback to execute module in main thread",event),a=new d}return p(a)}t||(t=z(r,{responseType:"text"}));return t.then(function(a){return new Worker(URL.createObjectURL(new Blob([a.data],{type:"text/javascript"})))}).catch(function(a){q.warn("Failed to create Worker. Fallback to execute module in main thread",
a);return new d}).then(function(a){return p(a)})}});