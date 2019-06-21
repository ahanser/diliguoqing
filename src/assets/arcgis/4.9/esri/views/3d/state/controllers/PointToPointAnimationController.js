// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../animation/pointToPoint/Animation ../../lib/gl-matrix ./AnimationController ../../webgl-engine/lib/Camera".split(" "),function(f,g,k,l,m,n,p){Object.defineProperty(g,"__esModule",{value:!0});f=function(d){function a(c,a,b){b=d.call(this,b)||this;b.viewState=c;b.intersectionHelper=a;b.hasTarget=!1;b.animation=new l.default(b.viewState.mode);return b}k(a,d);a.prototype.begin=function(c,a){this.hasTarget=!0;a=this.animationSettings(a);
e.copyFrom(this.viewState.camera);this.intersectionHelper.pickPointFromSegment(e.eye,e.center,h)&&(e.center=h);this.animation.update(e,c,a);this.animation.finished&&this.finish()};a.prototype.finish=function(){this.animation.currentTime=this.animation.time;d.prototype.finish.call(this)};Object.defineProperty(a.prototype,"steppingFinished",{get:function(){return this.hasTarget&&this.animation.finished},enumerable:!0,configurable:!0});a.prototype.stepController=function(c,a){d.prototype.stepController.call(this,
c,a);this.hasTarget&&this.animation.step(c,a)};a.prototype.onControllerEnd=function(a){this.hasTarget&&(this.animation.cameraAt(this.animation.currentTime/this.animation.time,a),this.animation.currentTime=this.animation.time);d.prototype.onControllerEnd.call(this,a)};a.prototype.animationSettings=function(a){void 0===a&&(a={});return{apex:{maximumDistance:this.viewState.constraints.clampAltitude(Infinity)/6,ascensionFactor:void 0,descensionFactor:void 0},speedFactor:a.speedFactor,duration:a.duration,
maxDuration:a.maxDuration,easing:a.easing}};return a}(n.AnimationController);g.PointToPointAnimationController=f;var e=new p,h=m.vec3d.create()});