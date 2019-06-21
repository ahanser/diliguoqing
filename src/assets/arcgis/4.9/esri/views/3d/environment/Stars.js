// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../request ../../../core/Error ../../../core/Logger ../../../core/promiseUtils ../../../core/watchUtils ../lib/gl-matrix ../support/buffer/glUtil ../support/buffer/InterleavedLayout ../webgl-engine/lib/RenderPass ../webgl-engine/lib/RenderSlot ../webgl-engine/shaders/StarsPrograms ../../webgl/BufferObject ../../webgl/programUtils ../../webgl/Util ../../webgl/VertexArrayObject".split(" "),function(r,m,t,n,u,v,w,e,x,y,z,A,p,B,C,D,E){var F=u.getLogger("esri.views.3d.environment.Stars");
m=function(){function d(a){this.slot=A.POSTPROCESSING_ATMOSPHERE_OPAQUE;this.numBinaryFloats=2;this.numBinaryUInt8=1;this.bytesPerStar=9;this.needsRender=!1;this.didRender=!0;this._numStars=0;this._modelMatrix=e.mat4d.create();this.view=a;this._loadDataPromise=this._loadBrightStarCatalogue()}d.prototype.destroy=function(){this._loadDataPromise.isFulfilled()||this._loadDataPromise.cancel();this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null);this._program&&(this._program.dispose(),this._program=
null);this._vao&&(this._vao.dispose(),this._vao=null)};d.prototype.initializeRenderContext=function(a){var b=this,c=a.rctx;this._program=C.createProgram(c,p.program);this._dateHandle=w.init(this.view,"environment.lighting.date",function(a){return b._update(a)});this._loadDataPromise.then(function(){b._numStars=b._starData.byteLength/b.bytesPerStar;var a=new Float32Array(b._starData,0,b._numStars*b.numBinaryFloats),d=new Uint8Array(b._starData,b._numStars*b.numBinaryFloats*4,b._numStars*b.numBinaryUInt8);
b._vao=b._createVertexArrayObject(c,a,d);b.needsRender=!0})};d.prototype.uninitializeRenderContext=function(a){this.destroy()};d.prototype.render=function(a){if(a.slot!==this.slot||a.pass!==z.MATERIAL||null==this._starData)return!1;var b=a.rctx,c=this._program;b.bindProgram(c);c.setUniformMatrix4fv("view",a.camera.viewMatrix);c.setUniformMatrix4fv("proj",a.camera.projectionMatrix);c.setUniform4fv("viewport",a.camera.fullViewport);c.setUniformMatrix4fv("model",this._modelMatrix);c.setUniform1f("pixelRatio",
a.pixelRatio);b.setDepthTestEnabled(!0);b.setDepthFunction(515);b.setBlendingEnabled(!0);b.setBlendFunctionSeparate(770,771,1,771);b.setDepthWriteEnabled(!1);b.bindVAO(this._vao);D.assertCompatibleVertexAttributeLocations(this._vao,c);b.drawArrays(0,0,this._numStars);b.setBlendingEnabled(!1);b.setDepthWriteEnabled(!0);b.setDepthFunction(513);this.needsRender=!1;return!0};d.prototype._computeDayDuration=function(a){var b=new Date(a.getFullYear(),0,1,11,58,56),c=new Date(a.getFullYear()+1,0,1,11,58,
55);return(+a-+b)/(+c-+b)};d.prototype._update=function(a){if(a){var b=a.getHours()/12,c=a.getMinutes()/60*(2/24),d=a.getSeconds()/60*(2/1440),b=(b+c+d-.9972222)%2;a=2*this._computeDayDuration(a);c=this._modelMatrix;e.mat4d.set(G,c);e.mat4d.rotateZ(c,-a*Math.PI);e.mat4d.multiply(H,c,c);e.mat4d.rotateZ(c,-b*Math.PI);this.needsRender=!0}};d.prototype._hexToRGB=function(a){return[parseInt(a.substring(0,2),16),parseInt(a.substring(2,4),16),parseInt(a.substring(4,6),16)]};d.prototype._unpackUint8Attributes=
function(a){return 192<=a?[2.9,a-192]:160<=a?[2.5,a-160]:128<=a?[2,a-128]:96<=a?[1.5,a-96]:64<=a?[1,a-64]:32<=a?[.7,a-32]:[.4,a]};d.prototype._createVertexArrayObject=function(a,b,c){for(var d=q.createBuffer(this._numStars),e=d.position,l=d.color,k=d.size,f=0;f<this._numStars;f++){var h=b[2*f+0],g=b[2*f+1];e.set(f,0,-Math.cos(h)*Math.sin(g));e.set(f,1,-Math.sin(h)*Math.sin(g));e.set(f,2,-Math.cos(g));h=this._unpackUint8Attributes(c[f]);g=this._hexToRGB(I[h[1]]);l.set(f,0,255*g[0]);l.set(f,1,255*g[1]);
l.set(f,2,255*g[2]);l.set(f,3,255);k.set(f,h[0])}return new E(a,p.program.attributes,{geometry:x.glLayout(q)},{geometry:B.createVertex(a,35044,d.buffer)})};d.prototype._verifyStartData=function(a){if(!a)throw new n("stars:no-data-received","Failed to create stars because star catalogue is missing");a=a.byteLength/this.bytesPerStar;if(0!==a%1||5E4<a||5E3>a)throw new n("stars:invalid-data","Failed to create stars because star catalogue data is invalid");};d.prototype._loadBrightStarCatalogue=function(){var a=
this;return k?(this._starData=k,v.resolve()):t(r.toUrl("./resources/stars.wsv"),{responseType:"array-buffer"}).then(function(b){b=b.data;a._verifyStartData(b);k=b;a._starData=b}).catch(function(a){a&&"cancel"!==a.dojoType&&F.error("loadBrightStarCatalogue",a.message);throw a;})};return d}();var I="9bb2ff;9eb5ff;aabfff;bbccff;ccd8ff ;dae2ff;e4e9ff;eeefff;f8f6ff;fff9fb;fff5ef;fff1e5;ffeddb;ffe9d2;ffe6ca;ffe3c3;ffe0bb;ffddb4;ffdaad;ffd6a5;ffd29c;ffcc8f;ffc178;ffa94b;ff7b00".split(";"),H=e.mat3d.toMat4(e.mat3d.createFrom(1,
0,0,0,.9174771405229186,.39778850739794974,0,-.39778850739794974,.9174771405229186)),G=e.mat3d.toMat4(e.mat3d.createFrom(1,0,0,0,.9174771405229186,-.39778850739794974,0,.39778850739794974,.9174771405229186)),q=y.newLayout().vec3f("position").vec4u8("color").f32("size"),k=null;return m});