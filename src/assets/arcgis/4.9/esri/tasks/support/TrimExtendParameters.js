// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","../../core/kebabDictionary"],function(b,c){var d=c({0:"default-curve-extension",1:"relocate-ends",2:"keep-end-attributes",4:"no-end-attributes",8:"no-extend-at-from",16:"no-extend-at-to"});return b.createSubclass({declaredClass:"esri.tasks.support.TrimExtendParameters",properties:{extendHow:"default-curve-extension",polylines:null,trimExtendTo:null},toJSON:function(){var b=(this.polylines||[]).map(function(a){return a.toJSON()}),a={};a.polylines=JSON.stringify(b);a.trimExtendTo=
JSON.stringify(this.trimExtendTo.toJSON());a.sr=JSON.stringify(this.polylines[0].spatialReference.toJSON());a.extendHow=d.toJSON(this.extendHow);return a}})});