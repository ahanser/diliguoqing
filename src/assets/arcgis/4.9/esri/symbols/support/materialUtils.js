// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../Color ../../core/screenUtils ../../core/accessorSupport/ensureType ../../webdoc/support/opacityUtils".split(" "),function(l,c,e,k,d,f){function g(b,a){b=null!=a.transparency?f.transparencyToOpacity(a.transparency):1;if((a=a.color)&&Array.isArray(a))return new e([a[0]||0,a[1]||0,a[2]||0,b])}function h(b,a){a.color=b.toJSON().slice(0,3);b=f.opacityToTransparency(b.a);0!==b&&(a.transparency=b)}Object.defineProperty(c,"__esModule",{value:!0});c.readColorAndTransparency=g;
c.writeColorAndTransparency=h;c.colorAndTransparencyProperty={type:e,json:{type:[d.Integer],read:{source:["color","transparency"],reader:g},write:{target:{color:{type:[d.Integer]},transparency:{type:d.Integer}},writer:h}}};c.screenSizeProperty={type:Number,cast:k.toPt,json:{write:!0}}});