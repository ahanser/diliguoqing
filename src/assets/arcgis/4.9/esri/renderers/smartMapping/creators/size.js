// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper dojo/i18n!../../nls/smartMapping ../../../core/lang ../../../core/promiseUtils ../../../core/screenUtils ../../ClassBreaksRenderer ./support/ageUtils ./support/utils ../support/utils ../symbology/size ../../support/AuthoringInfo ../../support/AuthoringInfoVisualVariable ../../support/utils".split(" "),function(Q,r,p,w,H,d,z,A,n,e,g,v,B,I,x){function J(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return d.reject(e.createError("size-visual-variable:missing-parameters",
"'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));if(a.valueExpression&&!a.sqlExpression&&!a.view)return d.reject(e.createError("size-visual-variable:missing-parameters","View is required when 'valueExpression' is specified"));var b=p({},a);a=[0,1,2];var c=g.createLayerAdapter(b.layer,a);return(b.layer=c)?c.load().then(function(){var a=c.geometryType;if("mesh"===a)return d.reject(e.createError("size-visual-variable:invalid-parameters","Size visualization is not applicable to layers with 'mesh' geometry type"));
if(b.worldScale){if("polyline"===a||"polygon"===a)return d.reject(e.createError("size-visual-variable:not-supported","'worldScale' sizing is not supported for polyline and polygon layers"));if(!b.view||"3d"!==b.view.type)return d.reject(e.createError("size-visual-variable:invalid-parameters","'view' parameter should be an instance of SceneView when 'worldScale' parameter is true"))}a=g.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});return(a=
e.verifyBasicFieldValidity(c,a,"size-visual-variable:invalid-parameters"))?d.reject(a):b}):d.reject(e.createError("size-visual-variable:invalid-parameters","'layer' must be one of these types: "+g.getLayerTypeLabels(a).join(", ")))}function K(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return d.reject(e.createError("size-continuous-renderer:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));if(a.valueExpression&&!a.sqlExpression&&
!a.view)return d.reject(e.createError("size-continuous-renderer:missing-parameters","View is required when 'valueExpression' is specified"));var b=p({},a);b.symbolType=b.symbolType||"2d";b.defaultSymbolEnabled=null==b.defaultSymbolEnabled?!0:b.defaultSymbolEnabled;a=[0,1,2];var c=g.createLayerAdapter(b.layer,a);return(b.layer=c)?c.load().then(function(){var a=c.geometryType,f=-1<b.symbolType.indexOf("3d");if("mesh"===a)return d.reject(e.createError("size-continuous-renderer:invalid-parameters","Size visualization is not applicable to layers with 'mesh' geometry type"));
if(f&&("polyline"===a||"polygon"===a))return d.reject(e.createError("size-continuous-renderer:not-supported","3d symbols are not supported for polyline and polygon layers"));if(-1<b.symbolType.indexOf("3d-volumetric")&&(!b.view||"3d"!==b.view.type))return d.reject(e.createError("size-continuous-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or 3d-volumetric-uniform"));a=g.getFieldsList({field:b.field,normalizationField:b.normalizationField,
valueExpression:b.valueExpression});return(a=e.verifyBasicFieldValidity(c,a,"size-continuous-renderer:invalid-parameters"))?d.reject(a):b}):d.reject(e.createError("size-continuous-renderer:invalid-parameters","'layer' must be one of these types: "+g.getLayerTypeLabels(a).join(", ")))}function L(a){if(!a||!a.layer||!a.field&&!a.valueExpression)return d.reject(e.createError("size-class-breaks-renderer:missing-parameters","'layer' and 'field' or 'valueExpression' parameters are required"));if(a.valueExpression&&
!a.view)return d.reject(e.createError("size-class-breaks-renderer:missing-parameters","View is required when 'valueExpression' is specified"));var b=p({},a);b.symbolType=b.symbolType||"2d";b.defaultSymbolEnabled=null==b.defaultSymbolEnabled?!0:b.defaultSymbolEnabled;b.classificationMethod=b.classificationMethod||"equal-interval";b.normalizationType=g.getNormalizationType(b);a=[0,1,2];var c=g.createLayerAdapter(b.layer,a);return(b.layer=c)?null!=b.minValue&&null!=b.maxValue||null==b.minValue&&null==
b.maxValue?c.load().then(function(){var a=c.geometryType,f=-1<b.symbolType.indexOf("3d");if("mesh"===a)return d.reject(e.createError("size-class-breaks-renderer:invalid-parameters","Size visualization is not applicable to layers with 'mesh' geometry type"));if(f&&("polyline"===a||"polygon"===a))return d.reject(e.createError("size-class-breaks-renderer:not-supported","3d symbols are not supported for polyline and polygon layers"));if(-1<b.symbolType.indexOf("3d-volumetric")&&(!b.view||"3d"!==b.view.type))return d.reject(e.createError("size-class-breaks-renderer:invalid-parameters",
"'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or 3d-volumetric-uniform"));a=g.getFieldsList({field:b.field,normalizationField:b.normalizationField});return(a=e.verifyBasicFieldValidity(c,a,"size-class-breaks-renderer:invalid-parameters"))?d.reject(a):b}):d.reject(e.createError("size-class-breaks-renderer:missing-parameters","Both 'minValue' and 'maxValue' are required when specifying custom data range")):d.reject(e.createError("size-class-breaks-renderer:invalid-parameters",
"'layer' must be one of these types: "+g.getLayerTypeLabels(a).join(", ")))}function M(a){a=p({},a);delete a.basemap;delete a.sizeScheme;delete a.legendOptions;delete a.symbolType;delete a.defaultSymbolEnabled;a.analyzeData=!(null!=a.minValue&&null!=a.maxValue);return a}function C(a){a=p({},a);var b=-1<a.symbolType.indexOf("3d-volumetric");if(a.worldScale=b)a.axis="3d-volumetric-uniform"===a.symbolType?"all":"height";delete a.symbolType;delete a.defaultSymbolEnabled;return a}function N(a){if(!(a&&
a.layer&&a.view&&a.startTime&&a.endTime))return d.reject(e.createError("size-age-renderer:missing-parameters","'layer', 'view', 'startTime', 'endTime' parameters are required"));var b=p({},a);b.symbolType=b.symbolType||"2d";b.defaultSymbolEnabled=null==b.defaultSymbolEnabled?!0:b.defaultSymbolEnabled;a=[0,1,2];var c=g.createLayerAdapter(b.layer,a);return(b.layer=c)?c.load().then(function(){var a=c.geometryType,f=-1<b.symbolType.indexOf("3d");return"mesh"===a?d.reject(e.createError("size-age-renderer:invalid-parameters",
"Size visualization is not applicable to layers with 'mesh' geometry type")):!f||"polyline"!==a&&"polygon"!==a?-1<b.symbolType.indexOf("3d-volumetric")&&(!b.view||"3d"!==b.view.type)?d.reject(e.createError("size-age-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or 3d-volumetric-uniform")):(a=n.verifyDates(c,b.startTime,b.endTime,"size-age-renderer:invalid-parameters"))?d.reject(a):b.unit&&-1===n.supportedAgeUnits.indexOf(b.unit)?
d.reject(e.createError("size-age-renderer:invalid-unit","Supported units are: "+n.supportedAgeUnits.join(", "))):b:d.reject(e.createError("size-age-renderer:not-supported","3d symbols are not supported for polyline and polygon layers"))}):d.reject(e.createError("size-age-renderer:invalid-parameters","'layer' must be one of these types: "+g.getLayerTypeLabels(a).join(", ")))}function D(a){var b=a.sizeScheme,c=a.basemap;b?b=v.cloneScheme(b):(b=(a=v.getSchemes({basemap:a.basemap,geometryType:a.geometryType,
worldScale:a.worldScale,view:a.view}))&&a.primaryScheme,c=a&&a.basemapId);return{scheme:b,basemapId:c}}function E(a,b){var c;switch(b){case "point":case "multipoint":c=[a.minSize,a.maxSize];break;case "polyline":c=[a.minWidth,a.maxWidth];break;case "polygon":c=[a.marker.minSize,a.marker.maxSize]}return c}function F(a,b,c,d){var f=d.field,u=d.layer.geometryType,k=d.defaultSymbolEnabled,q=v.cloneScheme(a.sizeScheme),h="polygon"===u,m=h?q.marker:q,l=h?q.background:null,q="polyline"===u?m.noDataWidth:
m.noDataSize,l=l?e.createSymbol(l,l.color,u,d.symbolType):null;return{renderer:new A({backgroundFillSymbol:l,classBreakInfos:[{minValue:-G,maxValue:G,symbol:e.createSymbol(m,m.color,h?"point":u,d.symbolType)}],defaultLabel:k?w.other:null,defaultSymbol:k?e.createSymbol(m,m.noDataColor,h?"point":u,d.symbolType,null,null,q):null,field:f,normalizationField:c,normalizationType:b,valueExpression:d.valueExpression,valueExpressionTitle:d.valueExpressionTitle,visualVariables:a.visualVariables.map(function(a){return x.cloneSizeVariable(a)}),
authoringInfo:a.authoringInfo&&a.authoringInfo.clone()}),visualVariables:a.visualVariables.map(function(a){return x.cloneSizeVariable(a)}),statistics:a.statistics,defaultValuesUsed:a.defaultValuesUsed,sizeScheme:v.cloneScheme(a.sizeScheme),basemapId:a.basemapId}}function O(a,b,c){b=E(a,b);a=z.toPt(b[0]);b=(z.toPt(b[1])-a)/(4<=c?c-1:c);for(var d=[],e=0;e<c;e++)d.push(a+b*e);return d}function P(a,b){var c=a.defaultSymbolEnabled,h=a.layer.geometryType,f="polygon"===h,u=D({basemap:a.basemap,geometryType:h,
sizeScheme:a.sizeScheme,worldScale:-1<a.symbolType.indexOf("3d-volumetric"),view:a.view}),k=u.scheme,q=b.result,g=q.classBreakInfos,m=a.classificationMethod,l=a.normalizationType,p=O(k,h,g.length),t=f?k.marker:k,n=f?k.background:null,r="polyline"===h?t.noDataWidth:t.noDataSize,c=new A({backgroundFillSymbol:n?e.createSymbol(n,n.color,h,a.symbolType):null,classBreakInfos:g.map(function(b,c){return{minValue:b.minValue,maxValue:b.maxValue,symbol:e.createSymbol(t,t.color,f?"point":h,a.symbolType,null,
null,p[c]),label:b.label}}),defaultLabel:c?w.other:null,defaultSymbol:c?e.createSymbol(t,t.noDataColor,f?"point":h,a.symbolType,null,null,r):null,field:a.field,valueExpression:a.valueExpression,valueExpressionTitle:a.valueExpressionTitle,normalizationType:l,normalizationField:a.normalizationField,normalizationTotal:"percent-of-total"===l?q.normalizationTotal:void 0,legendOptions:a.legendOptions,authoringInfo:new B({type:"class-breaks-size",classificationMethod:m,standardDeviationInterval:a.standardDeviationInterval})});
"standard-deviation"!==m&&x.setLabelsForClassBreaks({classBreakInfos:c.classBreakInfos,classificationMethod:m,normalizationType:l,round:!0});return d.resolve({renderer:c,sizeScheme:v.cloneScheme(k),classBreaksResult:q,defaultValuesUsed:b.defaultValuesUsed,basemapId:u.basemapId})}function y(a){return J(a).then(function(a){var b=a.normalizationField,h=b?"field":void 0;return(a.statistics?d.resolve(a.statistics):e.getSummaryStatistics({layer:a.layer,field:a.field,valueExpression:a.valueExpression,sqlExpression:a.sqlExpression,
sqlWhere:a.sqlWhere,normalizationType:h,normalizationField:b,minValue:a.minValue,maxValue:a.maxValue,view:a.view})).then(function(c){var h=a.layer,k=a.field,f=k&&"function"!==typeof k?h.getField(k):null,g=f&&"date"===f.type,m=h.geometryType,h=D({basemap:a.basemap,geometryType:m,sizeScheme:a.sizeScheme,worldScale:a.worldScale,view:a.view});if(f=h.scheme){var l=E(f,m),n=(g=e.getDefaultDataRange(c,g,!1))||[c.min,c.max],m=[],t="height"===a.axis,p=t?a.axis:void 0,r=l[0],l=l[1];t&&(l=e.getSizeRangeForAxis({minSize:r,
maxSize:l},p),m.push({type:"size",axis:"width-and-depth",minSize:l.minSize}),l=l.maxSize);m.unshift({type:"size",field:k,valueExpression:a.valueExpression,valueExpressionTitle:a.valueExpressionTitle,valueUnit:"unknown",normalizationField:b,axis:p,minSize:r,maxSize:l,minDataValue:n[0],maxDataValue:n[1],legendOptions:a.legendOptions});k=new I({type:"size",minSliderValue:c.min,maxSliderValue:c.max});k=new B({visualVariables:[k]});c=d.resolve({basemapId:h.basemapId,visualVariables:m,statistics:c,defaultValuesUsed:!!g,
sizeScheme:v.cloneScheme(f),authoringInfo:k})}else c=d.reject(e.createError("size-visual-variable:insufficient-info","Unable to find size scheme"));return c})})}Object.defineProperty(r,"__esModule",{value:!0});var G=Math.pow(2,53)-1;r.createVisualVariables=y;r.createContinuousRenderer=function(a){return K(a).then(function(a){return y(C(a)).then(function(b){var c=a.normalizationField;return F(b,c?"field":void 0,c,a)})})};r.createClassBreaksRenderer=function(a){return L(a).then(function(a){return e.getClassBreaks(M(a)).then(function(b){return P(a,
b)})})};r.createAgeRenderer=function(a){return N(a).then(function(a){var b=a.defaultSymbolEnabled,e=a.view,f=a.layer,g=a.startTime,k=a.endTime,q=a.symbolType;return(a.unit?d.resolve({unit:a.unit,statistics:null,valueExpression:null}):n.getSuggestedAgeUnit({view:e,layer:f,startTime:g,endTime:k})).then(function(c){var d=c.unit,e=c.statistics,h=c.valueExpression||n.getAgeExpressions({layer:f,startTime:g,endTime:k,unit:d}).valueExpression;c=H.substitute({unit:d,startTime:n.formatDate(g,d,f),endTime:n.formatDate(k,
d,f)},w["ageInfo_"+d]);return y(C({layer:f,basemap:a.basemap,valueExpression:h,symbolType:q,statistics:e,legendOptions:{title:c},sizeScheme:a.sizeScheme,view:a.view})).then(function(a){a=F(a,null,null,{layer:f,valueExpression:h,defaultSymbolEnabled:b,symbolType:q});return p({},a,{unit:d})})})})}});