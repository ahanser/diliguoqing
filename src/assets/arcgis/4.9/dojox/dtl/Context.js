//>>built
define(["dojo/_base/lang","./_base"],function(h,d){return d.Context=h.extend(function(a){this._this={};d._Context.call(this,a)},d._Context.prototype,{getKeys:function(){var a=[],b;for(b in this)this.hasOwnProperty(b)&&"_this"!=b&&a.push(b);return a},extend:function(a){return h.delegate(this,a)},filter:function(a){var b=new d.Context,f=[],c,g;if(a instanceof d.Context)f=a.getKeys();else if("object"==typeof a)for(var e in a)f.push(e);else for(c=0;g=arguments[c];c++)"string"==typeof g&&f.push(g);c=0;
for(e;e=f[c];c++)b[e]=this[e];return b},setThis:function(a){this._this=a},getThis:function(){return this._this},hasKey:function(a){return this._getter&&"undefined"!=typeof this._getter(a)||"undefined"!=typeof this[a]?!0:!1}})});