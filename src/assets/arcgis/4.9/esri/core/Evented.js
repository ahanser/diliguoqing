// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/aspect","dojo/on"],function(l,m,h,k){function f(c,a,b,g){var d;Array.isArray(a)?d=a:-1<a.indexOf(",")&&(d=a.split(/\s*,\s*/));if(d){var e=[];for(a=0;a<d.length;a++)e.push(f(c,d[a],b,g));e.remove=function(){for(var a=0;a<e.length;a++)e[a].remove()};return e}return g(c,a)}return function(){function c(){}c.prototype.emit=function(a,b){if(this.hasEventListener(a))return b=b||{},b.target||(b.target=this),k.emit(this,a,b)};c.prototype.on=function(a,b){return f(this,a,b,
function(a,c){return h.after(a,"on"+c,b,!0)})};c.prototype.hasEventListener=function(a){a="on"+a;return!(!this[a]||!this[a].after)};return c}()});