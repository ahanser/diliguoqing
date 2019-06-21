// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/ObjectPool","../support/Evented"],function(d,f,n,p,q){function e(e){return e&&"render"in e}Object.defineProperty(f,"__esModule",{value:!0});d=function(d){function b(a){var c=d.call(this)||this;c._height=0;c.pixelRatio=1;c.resolution=0;c.rotation=0;c._width=0;c.x=0;c.y=0;c.data=a;return c}n(b,d);b.prototype.release=function(){this.data=null};Object.defineProperty(b.prototype,"data",{get:function(){return this._data},
set:function(a){this._data=a;this._width=this._height=0;a&&!e(a)&&(a instanceof HTMLImageElement?(this._width=a.naturalWidth,this._height=a.naturalHeight):0<a.width&&0<a.height&&(this._width=a.width,this._height=a.height))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"height",{get:function(){return e(this._data)?this._data.height:this._height},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"ready",{get:function(){return e(this._data)?0<this._data.width&&0<
this._data.height:0<this._width},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"width",{get:function(){return e(this.data)?this._data.width:this._width},enumerable:!0,configurable:!0});b.prototype.draw=function(a,c,b,d,g,f,l,h,k){if(this.ready)if(e(this._data))this._data.render(a,c,b,d,g,f,l,h,k);else{var m=this._data;m&&!("render"in m)&&d&&g&&h&&k&&a.drawImage(this._data,c,b,d,g,f,l,h,k)}};b.pool=new p(b,!0);return b}(q.default);f.default=d});