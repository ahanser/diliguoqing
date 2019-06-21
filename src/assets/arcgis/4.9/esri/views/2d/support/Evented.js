// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(d,e){Object.defineProperty(e,"__esModule",{value:!0});d=function(){function b(){this._listeners={}}b.prototype.on=function(a,b){var c=this;null==this._listeners[a]&&(this._listeners[a]=new Map);var f={};this._listeners[a].set(f,b);return{remove:function(){return c._listeners[a].delete(f)}}};b.prototype.once=function(a,b){var c=this.on(a,function(a){c.remove();b(a)});return c};b.prototype.emit=function(a,b){this.hasEventListener(a)&&this._listeners[a].forEach(function(a){return a(b)})};
b.prototype.hasEventListener=function(a){return null!=this._listeners[a]&&0<this._listeners[a].size};return b}();e.default=d});