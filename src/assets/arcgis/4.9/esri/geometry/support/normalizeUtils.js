// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../config ../../core/Error ../../core/Logger ../../core/promiseUtils ../Polygon ../Polyline ../SpatialReference ./spatialReferenceUtils ./webMercatorUtils ../../tasks/GeometryService".split(" "),function(S,x,L,M,N,O,B,w,y,D,z,P){function u(a){return"polygon"===a.type?a.rings:a.paths}function r(a,d){return Math.ceil((a-d)/(2*d))}function E(a,d){for(var f=0,b=u(a);f<b.length;f++)for(var c=0,l=b[f];c<l.length;c++)l[c][0]+=d;return a}function F(a){for(var d=[],f=0,b=0,c=0;c<
a.length;c++){for(var l=a[c],g=null,h=0;h<l.length;h++)g=l[h],d.push(g),0===h?b=f=g[0]:(f=Math.min(f,g[0]),b=Math.max(b,g[0]));g&&d.push([(f+b)/2,0])}return d}function G(a,d){if(!(a instanceof w||a instanceof B))throw Q.error("straightLineDensify: the input geometry is neither polyline nor polygon"),new M("straightLineDensify: the input geometry is neither polyline nor polygon");for(var f=[],b=0,c=u(a);b<c.length;b++){var l=c[b],g=[];f.push(g);g.push([l[0][0],l[0][1]]);for(var h=0;h<l.length-1;h++){var n=
l[h][0],k=l[h][1],q=l[h+1][0],t=l[h+1][1],m=Math.sqrt((q-n)*(q-n)+(t-k)*(t-k)),v=(t-k)/m,e=(q-n)/m,p=m/d;if(1<p){for(var r=1;r<=p-1;r++){var H=r*d;g.push([e*H+n,v*H+k])}m=(m+Math.floor(p-1)*d)/2;g.push([e*m+n,v*m+k])}g.push([q,t])}}return"polygon"===a.type?new B({rings:f,spatialReference:a.spatialReference}):new w({paths:f,spatialReference:a.spatialReference})}function I(a,d,f){d&&(a=G(a,1E6),a=z.webMercatorToGeographic(a,!0));f&&(a=E(a,f));return a}function J(a,d,f){if(Array.isArray(a)){var b=a[0];
if(b>d){var c=r(b,d);a[0]=b+-2*c*d}else b<f&&(c=r(b,f),a[0]=b+-2*c*f)}else b=a.x,b>d?(c=r(b,d),a=a.clone().offset(-2*c*d,0)):b<f&&(c=r(b,f),a=a.clone().offset(-2*c*f,0));return a}function R(a,d){for(var f=-1,b=function(b){var c=d.cutIndexes[b],h=d.geometries[b],l=u(h);b=function(a){var b=l[a];b.some(function(c){if(!(180>c[0])){for(var d=c=0;d<b.length;d++){var e=b[d][0];c=e>c?e:c}c=Number(c.toFixed(9));c=-360*r(c,180);for(d=0;d<b.length;d++)e=h.getPoint(a,d),h.setPoint(a,d,e.clone().offset(c,0))}return!0})};
for(var k=0;k<l.length;k++)b(k);if(c===f)if("polygon"===a[0].type)for(b=0,k=u(h);b<k.length;b++)a[c]=a[c].addRing(k[b]);else{if("polyline"===a[0].type)for(b=0,k=u(h);b<k.length;b++)a[c]=a[c].addPath(k[b])}else f=c,a[c]=h},c=0;c<d.cutIndexes.length;c++)b(c);return a}function K(a,d,f){if(!Array.isArray(a))return K([a],d);d||(C||(C=new P({url:L.geometryServiceUrl})),d=C);for(var b,c,l,g,h,n,k,q=0,t=[],m=[],v=0;v<a.length;v++){var e=a[v];if(e)if(b||(b=e.spatialReference,c=D.getInfo(b),n=(l=b.isWebMercator)?
102100:4326,g=A[n].maxX,h=A[n].minX,k=A[n].plus180Line,n=A[n].minus180Line),c)if("mesh"===e.type)m.push(e);else if("point"===e.type)m.push(J(e.clone(),g,h));else if("multipoint"===e.type)e=e.clone(),e.points=e.points.map(function(a){return J(a,g,h)}),m.push(e);else if("extent"===e.type){var p=e.clone(),e=p._normalize(!1,!1,c);m.push(e.rings?new B(e):e)}else if(e.extent){var p=e.extent,u=2*r(p.xmin,h)*g,e=0===u?e.clone():E(e.clone(),u);p.offset(u,0);p.intersects(k)&&p.xmax!==g?(q=p.xmax>q?p.xmax:q,
e=I(e,l),t.push(e),m.push("cut")):p.intersects(n)&&p.xmin!==h?(q=2*p.xmax*g>q?2*p.xmax*g:q,e=I(e,l,360),t.push(e),m.push("cut")):m.push(e)}else m.push(e.clone());else m.push(e);else m.push(e)}b=r(q,g);c=-90;k=b;for(q=new w;0<b;)v=-180+360*b,q.addPath([[v,c],[v,-1*c]]),c*=-1,b--;if(0<t.length&&0<k)return d.cut(t,q,f).then(function(a){return R(t,a)}).then(function(b){for(var c=[],e=[],h=0;h<m.length;h++){var g=m[h];if("cut"!==g)e.push(g);else{var g=b.shift(),k=a[h];"polygon"===k.type&&k.rings&&1<k.rings.length&&
g.rings.length>=k.rings.length?(c.push(g),e.push("simplify")):e.push(l?z.geographicToWebMercator(g):g)}}return c.length?d.simplify(c,f).then(function(a){for(var b=[],c=0;c<e.length;c++){var d=e[c];"simplify"!==d?b.push(d):b.push(l?z.geographicToWebMercator(a.shift()):a.shift())}return b}):e});b=[];for(c=0;c<m.length;c++)k=m[c],"cut"!==k?b.push(k):(k=t.shift(),b.push(!0===l?z.geographicToWebMercator(k):k));return O.resolve(b)}Object.defineProperty(x,"__esModule",{value:!0});var Q=N.getLogger("esri.geometry.support.normalizeUtils"),
A={102100:{maxX:2.0037508342788905E7,minX:-2.0037508342788905E7,plus180Line:new w({paths:[[[2.0037508342788905E7,-2.0037508342788905E7],[2.0037508342788905E7,2.0037508342788905E7]]],spatialReference:y.WebMercator}),minus180Line:new w({paths:[[[-2.0037508342788905E7,-2.0037508342788905E7],[-2.0037508342788905E7,2.0037508342788905E7]]],spatialReference:y.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new w({paths:[[[180,-180],[180,180]]],spatialReference:y.WebMercator}),minus180Line:new w({paths:[[[-180,
-180],[-180,180]]],spatialReference:y.WebMercator})}};x.straightLineDensify=G;var C;x.normalizeCentralMeridian=K;x.getDenormalizedExtent=function(a){var d;if(!a)return null;var f=a.extent;if(!f)return null;var b=a.spatialReference&&D.getInfo(a.spatialReference);if(!b)return f;var b=b.valid,c=b[0],b=b[1],l=f.width,g=f.xmin;d=f.xmax;d=[d,g];g=d[0];d=d[1];if("extent"===a.type||0===l||l<=b||l>2*b||g<c||d>b)return f;var h;switch(a.type){case "polygon":if(1<a.rings.length)h=F(a.rings);else return f;break;
case "polyline":if(1<a.paths.length)h=F(a.paths);else return f;break;case "multipoint":h=a.points}a=f.clone();for(c=0;c<h.length;c++){var n=h[c][0];0>n?(n+=b,d=Math.max(n,d)):(n-=b,g=Math.min(n,g))}a.xmin=g;a.xmax=d;return a.width<l?(a.xmin-=b,a.xmax-=b,a):f}});