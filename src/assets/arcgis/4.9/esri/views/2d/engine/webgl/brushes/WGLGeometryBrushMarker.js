// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../enums ../Utils ./WGLGeometryBrush ../shaders/MaterialPrograms ../../../../webgl/Texture ../../../../webgl/VertexArrayObject".split(" "),function(r,t,v,w,u,x,n,y,p){Object.defineProperty(t,"__esModule",{value:!0});r=function(q){function m(){var a=null!==q&&q.apply(this,arguments)||this;a._iconVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,
type:5120,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:24,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:24,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:24,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]};a._iconVertexAttributesWithVV=
{geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:40,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:40,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:40,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:40,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:40,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:40,normalized:!1,divisor:0},
{name:"a_vv",count:4,type:5126,offset:24,stride:40,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]};a._iconVertexAttributesWithHeatmap={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:28,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:28,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:28,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,
stride:28,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:28,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:28,normalized:!1,divisor:0},{name:"a_weight",count:1,type:5126,offset:24,stride:28,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]};a._spritesTextureSize=new Float32Array(2);return a}v(m,q);m.prototype.dispose=function(){};m.prototype.getGeometryType=
function(){return w.WGLGeometryType.MARKER};m.prototype.drawGeometry=function(a,c,b,e){e=a.context;var f=a.painter,d=a.rendererInfo,k=b.indexCount,l=b.indexFrom,g=b.materialInfo;b=g.materialKeyInfo;var h=b.heatmap;if(a=f.materialManager.getProgram(g.materialKey,a.drawPhase)){e.bindProgram(a);var m=this._getVAO(e,c,b.hasVV(),h);e.bindVAO(m);h?(g=this._getIntensityTexture(e,d.heatmapParameters),e.bindTexture(g,1),a.setUniform1i("u_texture",1),this._spritesTextureSize[0]=Math.round(d.heatmapParameters.radius),
this._spritesTextureSize[1]=Math.round(d.heatmapParameters.radius)):(h=g.texBindingInfo[0],g=h.pageId,f.textureManager.bindSpritePage(e,g,h.unit),a.setUniform1i(h.semantic,h.unit),h=f.textureManager.sprites,this._spritesTextureSize[0]=h.getWidth(g)/4,this._spritesTextureSize[1]=h.getHeight(g)/4);f=d.vvMaterialParameters.vvRotationEnabled&&"geographic"===d.vvMaterialParameters.vvRotationType?f.extrudeMatrix:f.extrudeNoRotationMatrix;a.setUniformMatrix4fv("u_transformMatrix",c.tileTransform.transform);
a.setUniformMatrix4fv("u_extrudeMatrix",f);a.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord);a.setUniform2fv("u_mosaicSize",this._spritesTextureSize);a.setUniform1f("u_opacity",1);b.vvSizeMinMaxValue&&a.setUniform4fv("u_vvSizeMinMaxValue",d.vvSizeMinMaxValue);b.vvSizeScaleStops&&a.setUniform1f("u_vvSizeScaleStopsValue",d.vvSizeScaleStopsValue);b.vvSizeFieldStops&&(a.setUniform1fv("u_vvSizeFieldStopsValues",d.vvSizeFieldStopsValues),a.setUniform1fv("u_vvSizeFieldStopsSizes",d.vvSizeFieldStopsSizes));
b.vvSizeUnitValue&&a.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",d.vvSizeUnitValueToPixelsRatio);b.vvColor&&(a.setUniform1fv("u_vvColorValues",d.vvColorValues),a.setUniform4fv("u_vvColors",d.vvColors));b.vvOpacity&&(a.setUniform1fv("u_vvOpacityValues",d.vvOpacityValues),a.setUniform1fv("u_vvOpacities",d.vvOpacities));b.vvRotation&&a.setUniform1f("u_vvRotationType","geographic"===d.vvMaterialParameters.vvRotationType?0:1);e.drawElements(4,k,5125,4*l);e.bindVAO(null)}};m.prototype._getVAO=function(a,
c,b,e){if(c.iconGeometry.vao)return c.iconGeometry.vao;var f=c.iconGeometry.vertexBufferMap[u.C_VBO_GEOMETRY],d=c.iconGeometry.vertexBufferMap[u.C_VBO_VISIBILITY],k=c.iconGeometry.indexBuffer;if(!f||!k)return null;c.iconGeometry.vao=b?new p(a,n.icon.attributes,this._iconVertexAttributesWithVV,{geometry:f,visibility:d},k):e?new p(a,n.icon.attributes,this._iconVertexAttributesWithHeatmap,{geometry:f,visibility:d},k):new p(a,n.icon.attributes,this._iconVertexAttributes,{geometry:f,visibility:d},k);return c.iconGeometry.vao};
m.prototype._getIntensityTexture=function(a,c){if(c.intensityKernel&&!c.refreshIntensityKernel)return c.intensityKernel;c.intensityKernel&&(c.intensityKernel.dispose(),c.intensityKernel=null);for(var b=c.radius,e=c.kernelSize,f=c.blurRadius,d=b*b,k=[],l=-1;++l<e;)k[l]=Math.exp(-Math.pow(l-f,2)/(2*d))/(b/2*Math.sqrt(2*Math.PI));for(var b=[],g,h=0;h<e;h++)for(d=k[h],l=0;l<e;l++)g=h*e+l,f=k[l],b[4*g+0]=d*f,b[4*g+1]=0,b[4*g+2]=0,b[4*g+3]=1;a=new y(a,{target:3553,pixelFormat:6408,internalFormat:a.capabilities.colorBufferFloat.RGBA32F,
dataType:5126,samplingMode:a.capabilities.textureFloatLinear?9729:9728,wrapMode:33071,width:e,height:e},new Float32Array(b));c.intensityKernel=a;c.refreshIntensityKernel=!1;return a};return m}(x.default);t.default=r});