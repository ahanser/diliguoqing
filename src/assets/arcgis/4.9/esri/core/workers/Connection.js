// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../promiseUtils"],function(h,k,e){return function(){function a(b){this._clientIdx=0;this._clients=b}a.prototype.broadcast=function(b,f){for(var a=[],d=0,c=this._clients;d<c.length;d++)a.push(c[d].invoke(b,f));return a};a.prototype.close=function(){for(var b=0,a=this._clients;b<a.length;b++)a[b].close();this._clients=[]};a.prototype.invoke=function(b,a,g,d){var c=d&&d.client;if(!this._clients||!this._clients.length)return e.reject(Error("Connection closed"));null!=c&&-1!==
this._clients.indexOf(c)||this._clients.some(function(a){return a.isBusy()?!1:(c=a,!0)})||(this._clientIdx=(this._clientIdx+1)%this._clients.length,c=this._clients[this._clientIdx]);b=c.invoke(b,a,g);d&&(d.client=c);return b};a.prototype.openPorts=function(){return e.all(this._clients.map(function(a){return a.openPort()}))};return a}()});