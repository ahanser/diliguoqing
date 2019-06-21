// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ./I3SBinaryReader ../../lib/gl-matrix ../../support/meshProcessing ../../webgl-engine/lib/Util".split(" "),function(G,r,B,x,C,m){function D(a,c,b,d,e,h,g){switch(b){case 1:for(b=0;b<g;b++)d[e]=a[c],c+=1,e+=h;break;case 2:for(b=0;b<g;b++)d[e]=a[c],d[e+1]=a[c+1],c+=2,e+=h;break;case 3:for(b=0;b<g;b++)d[e]=a[c],d[e+1]=a[c+1],d[e+2]=a[c+2],c+=3,e+=h;break;case 4:for(b=0;b<g;b++)d[e]=a[c],d[e+1]=a[c+1],d[e+2]=a[c+2],d[e+3]=a[c+3],c+=4,e+=h;break;default:throw q("Unhandled stride size "+
b);}}function E(a,c,b,d,e,h){switch(c){case 1:for(c=0;c<h;c++)b[d]=a,d+=e;break;case 2:for(c=0;c<h;c++)b[d]=a,b[d+1]=a,d+=e;break;case 3:for(c=0;c<h;c++)b[d]=a,b[d+1]=a,b[d+2]=a,d+=e;break;case 4:for(c=0;c<h;c++)b[d]=a,b[d+1]=a,b[d+2]=a,b[d+3]=a,d+=e;break;default:throw q("Unhandled stride size "+c);}}function F(a){switch(a){case 5120:return Int8Array;case 5126:return Float32Array;case 5124:return Int32Array;case 5122:return Int16Array;case 5121:return Uint8Array;case 5125:return Uint32Array;case 5123:return Uint16Array}throw Error("Unhandled data type: "+
a);}function A(a){switch(a){case 5120:return"Int8";case 5126:return"Float32";case 5124:return"Int32";case 5122:return"Int16";case 5121:return"UInt8";case 5125:return"UInt32";case 5123:return"UInt16"}throw Error("Unhandled data type: "+a);}function v(a){return 0<a&&0===a%Uint32Array.BYTES_PER_ELEMENT}function q(a){return Error("I3SGeometryUtil processing failed: "+a)}Object.defineProperty(r,"__esModule",{value:!0});var w=new Uint8Array(64);r.interleaveGeometryBuffer=function(a,c,b,d,e){void 0===d&&
(d=[]);void 0===e&&(e=[]);var h=a.params.vertexAttributes,g=h.position.count;if(!v(b[0].stride))throw q("Layout stride must use "+Uint32Array.BYTES_PER_ELEMENT+"-byte words");var n=new Uint32Array(b[0].stride/Uint32Array.BYTES_PER_ELEMENT*g);b=b.slice(0).sort(function(a,c){return a.offset-c.offset});a=function(a){if(-1!==e.indexOf(a.name))return"continue";var b=h[a.name],p=F(a.type),f=void 0,m=!1;if(null==b)if(m=d.filter(function(b){return b.name===a.name})[0]){b={valueType:A(a.type),byteOffset:0,
count:g,valuesPerElement:a.count};for(f=0;f<w.length;f++)w[f]=m.byteValue;f=w.buffer;m=!0}else throw q("Geometry definition is missing attribute");else f=c;if(A(a.type)!==b.valueType)throw q("Geometry definition type must match attribute type");if(0!==b.byteOffset%Uint32Array.BYTES_PER_ELEMENT||0!==a.offset%Uint32Array.BYTES_PER_ELEMENT)throw q(a.name+" offset must use "+Uint32Array.BYTES_PER_ELEMENT+"-byte words");if(!v(b.valuesPerElement*p.BYTES_PER_ELEMENT)||!v(a.count*p.BYTES_PER_ELEMENT))throw q(a.name+
" data must use "+Uint32Array.BYTES_PER_ELEMENT+"-byte words");var f=new Uint32Array(f),l=b.byteOffset/Uint32Array.BYTES_PER_ELEMENT,b=b.valuesPerElement*p.BYTES_PER_ELEMENT/Uint32Array.BYTES_PER_ELEMENT,p=a.offset/Uint32Array.BYTES_PER_ELEMENT,k=a.stride/Uint32Array.BYTES_PER_ELEMENT;m?E(f[0],b,n,p,k,g):D(f,l,b,n,p,k,g)};for(var m=0;m<b.length;m++)a(b[m]);return n.buffer};r.processAndInterleaveNormals=function(a,c,b,d,e){if("none"===a){var h=e.normals,g=e.positions;c=e.normalInd;a=e.positionInd;
m.assert(e.normalInd.length===e.positionInd.length);e=x.vec3.create();d=x.vec3.create();b=x.vec2.create();for(var n=g.data,q=g.offsetIdx,g=g.strideIdx,r=h.data,v=h.offsetIdx,h=h.strideIdx,p=0;p<a.length;p+=3){var f=a[p],f=q+g*f,t=n[f],l=n[f+1],k=n[f+2],f=a[p+1],f=q+g*f;e[0]=n[f]-t;e[1]=n[f+1]-l;e[2]=n[f+2]-k;f=a[p+2];f=q+g*f;d[0]=n[f]-t;d[1]=n[f+1]-l;d[2]=n[f+2]-k;x.vec3.cross(e,d,e);m.encodeNormal(e,b);for(t=0;3>t;t++)l=v+h*c[p+t],r[l]=m.encodeInt16(b[0]),r[l+1]=m.encodeInt16(b[1])}}else if(c=B.createTypedView(b,
c.params.vertexAttributes.normal),b=e.normals,l="earth-centered"===a?d:null,a=c.length/3,e=b.data,d=b.offsetIdx,b=b.strideIdx,null!=l)for(n=l[0],q=l[1],g=l[2],r=l[4],v=l[5],h=l[6],p=l[8],t=l[9],l=l[10],k=0;k<a;k++){var f=c[3*k],w=c[3*k+1],z=c[3*k+2];u[0]=n*f+q*w+g*z;u[1]=r*f+v*w+h*z;u[2]=p*f+t*w+l*z;m.encodeNormal(u,y);e[d+k*b]=m.encodeInt16(y[0]);e[d+k*b+1]=m.encodeInt16(y[1])}else for(k=0;k<a;k++)u[0]=c[3*k],u[1]=c[3*k+1],u[2]=c[3*k+2],m.encodeNormal(u,y),e[d+k*b]=m.encodeInt16(y[0]),e[d+k*b+1]=
m.encodeInt16(y[1])};r.extractPositionData=function(a,c,b){c=c[0];if(null==c||"position"!==c.name||5126!==c.type)return null;var d=new Float32Array(a),e=c.stride/4,h=3*d.length/e,g=new Float32Array(h);for(a=0;a<h/3;a++)g[3*a]=d[a*e+c.offset],g[3*a+1]=d[a*e+c.offset+1],g[3*a+2]=d[a*e+c.offset+2];c=C.deduplicate(g.buffer,3);a=65536>c.uniqueCount;if(b)for(d=new (a?Uint16Array:Uint32Array)(b.length),a=0;a<b.length;a++)d[a]=c.indices[b[a]];else d=a?new Uint16Array(c.indices):c.indices;return{data:new Float32Array(c.buffer),
indices:d}};var u=x.vec3.create(),y=x.vec2.create()});