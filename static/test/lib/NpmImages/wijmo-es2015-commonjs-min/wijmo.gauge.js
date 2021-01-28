﻿/*!
    *
    * Wijmo Library 5.20191.603
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_1=require("wijmo/wijmo"),selfModule=require("wijmo/wijmo.gauge");class Range{constructor(t){this._min=0,this._max=100,this._thickness=1,this.propertyChanged=new wijmo_1.Event,wijmo_1.isString(t)?this._name=t:t&&wijmo_1.copy(this,t)}get min(){return this._min}set min(t){this._setProp("_min",wijmo_1.asNumber(t,!0))}get max(){return this._max}set max(t){this._setProp("_max",wijmo_1.asNumber(t,!0))}get color(){return this._color}set color(t){this._setProp("_color",wijmo_1.asString(t))}get thickness(){return this._thickness}set thickness(t){this._setProp("_thickness",wijmo_1.clamp(wijmo_1.asNumber(t),0,1))}get name(){return this._name}set name(t){this._setProp("_name",wijmo_1.asString(t))}onPropertyChanged(t){this.propertyChanged.raise(this,t)}_setProp(t,e){let i=this[t];if(e!=i){this[t]=e;let s=new wijmo_1.PropertyChangedEventArgs(t.substr(1),i,e);this.onPropertyChanged(s)}}}var ShowText,GaugeDirection;Range._ctr=0,exports.Range=Range,function(t){t[t.None=0]="None",t[t.Value=1]="Value",t[t.MinMax=2]="MinMax",t[t.All=3]="All"}(ShowText=exports.ShowText||(exports.ShowText={}));class Gauge extends wijmo_1.Control{constructor(t,e){super(t,null,!0),this._ranges=new wijmo_1.ObservableArray,this._rngElements=[],this._format="n0",this._showRanges=!0,this._stackRanges=!1,this._shadow=!0,this._animated=!0,this._readOnly=!0,this._step=1,this._showText=ShowText.None,this._showTicks=!1,this._thickness=.8,this._initialized=!1,this.valueChanged=new wijmo_1.Event,this._getPercent=function(t){let e=this.max>this.min?(t-this.min)/(this.max-this.min):0;return Math.max(0,Math.min(1,e))},Gauge._ctr++;let i=this.hostElement;wijmo_1.setAttribute(i,"role","slider",!0);let s=this.getTemplate();this.applyTemplate("wj-control wj-gauge",s,{_dSvg:"dsvg",_svg:"svg",_filter:"filter",_gFace:"gface",_gRanges:"granges",_gPointer:"gpointer",_gCover:"gcover",_pFace:"pface",_pPointer:"ppointer",_cValue:"cvalue",_tValue:"value",_tMin:"min",_tMax:"max",_pTicks:"pticks"}),this._filterID="wj-gauge-filter-"+Gauge._ctr.toString(36),this._filter.setAttribute("id",this._filterID),this.face=new Range,this.pointer=new Range,this._ranges.collectionChanged.addHandler(()=>{let t=this._ranges;for(let e=0;e<t.length;e++){if(!wijmo_1.tryCast(t[e],Range))throw"ranges array must contain Range objects."}this._rangesDirty=!0,this.invalidate()}),this.addEventListener(i,"keydown",this._keydown.bind(this)),this.addEventListener(i,"click",t=>{0==t.button&&(this.focus(),this._applyMouseValue(t))}),this.addEventListener(i,"mousedown",t=>{0==t.button&&(this.focus(),this._dragging=!0,this._applyMouseValue(t))}),this.addEventListener(i,"mousemove",t=>{this._dragging&&this.containsFocus()&&this._applyMouseValue(t,!0)}),this.addEventListener(i,"mouseup",t=>{this._dragging=!1}),this.addEventListener(i,"mouseleave",t=>{t.target==i&&(this._dragging=!1)}),"ontouchstart"in window&&(this.addEventListener(i,"touchstart",t=>{this.focus(),!t.defaultPrevented&&this._applyMouseValue(t,!1)&&t.preventDefault()}),this.addEventListener(i,"touchmove",t=>{!t.defaultPrevented&&this._applyMouseValue(t,!0)&&t.preventDefault()})),this.addEventListener(i,"wheel",t=>{if(!t.defaultPrevented&&!this.isReadOnly&&this.containsFocus()&&null!=this.value&&this.hitTest(t)){let e=wijmo_1.clamp(-t.deltaY,-1,1);this.value=wijmo_1.clamp(this.value+(this.step||1)*e,this.min,this.max),t.preventDefault()}}),this.isReadOnly=!0,this.initialize(e),this.invalidate()}get value(){return this._pointer.max}set value(t){t!=this.value&&(this._pointer.max=wijmo_1.asNumber(t,!0),this._updateAria())}get min(){return this._face.min}set min(t){t!=this.min&&(this._face.min=wijmo_1.asNumber(t),this._updateAria())}get max(){return this._face.max}set max(t){t!=this.max&&(this._face.max=wijmo_1.asNumber(t),this._updateAria())}get origin(){return this._origin}set origin(t){t!=this._origin&&(this._origin=wijmo_1.asNumber(t,!0),this.invalidate())}get isReadOnly(){return this._readOnly}set isReadOnly(t){this._readOnly=wijmo_1.asBoolean(t),this._setAttribute(this._svg,"cursor",this._readOnly?null:"pointer"),wijmo_1.toggleClass(this.hostElement,"wj-state-readonly",this.isReadOnly)}get step(){return this._step}set step(t){t!=this._step&&(this._step=wijmo_1.asNumber(t,!0),this.invalidate())}get format(){return this._format}set format(t){t!=this._format&&(this._format=wijmo_1.asString(t),this.invalidate())}get getText(){return this._getText}set getText(t){t!=this._getText&&(this._getText=wijmo_1.asFunction(t),this.invalidate())}get thickness(){return this._thickness}set thickness(t){t!=this._thickness&&(this._thickness=wijmo_1.clamp(wijmo_1.asNumber(t,!1),0,1),this.invalidate())}get face(){return this._face}set face(t){t!=this._face&&(this._face&&this._face.propertyChanged.removeHandler(this._rangeChanged),this._face=wijmo_1.asType(t,Range),this._face&&this._face.propertyChanged.addHandler(this._rangeChanged,this),this.invalidate())}get pointer(){return this._pointer}set pointer(t){if(t!=this._pointer){let e=null;this._pointer&&(e=this.value,this._pointer.propertyChanged.removeHandler(this._rangeChanged)),this._pointer=wijmo_1.asType(t,Range),this._pointer&&(e&&(this.value=e),this._pointer.propertyChanged.addHandler(this._rangeChanged,this)),this.invalidate()}}get showText(){return this._showText}set showText(t){(t=wijmo_1.asEnum(t,ShowText))!=this._showText&&(this._showText=t,this.invalidate())}get showTicks(){return this._showTicks}set showTicks(t){t!=this._showTicks&&(this._showTicks=wijmo_1.asBoolean(t),this.invalidate())}get tickSpacing(){return this._tickSpacing}set tickSpacing(t){t!=this._tickSpacing&&(this._tickSpacing=wijmo_1.asNumber(t,!0),this.invalidate())}get thumbSize(){return this._thumbSize}set thumbSize(t){t!=this._thumbSize&&(this._thumbSize=wijmo_1.asNumber(t,!0,!0),this.invalidate())}get showRanges(){return this._showRanges}set showRanges(t){t!=this._showRanges&&(this._showRanges=wijmo_1.asBoolean(t),this._animColor=null,this._rangesDirty=!0,this.invalidate())}get stackRanges(){return this._stackRanges}set stackRanges(t){t!=this._stackRanges&&(this._stackRanges=wijmo_1.asBoolean(t),this._animColor=null,this._rangesDirty=!0,this.invalidate())}get hasShadow(){return this._shadow}set hasShadow(t){t!=this._shadow&&(this._shadow=wijmo_1.asBoolean(t),this.invalidate())}get isAnimated(){return this._animated}set isAnimated(t){this._animated=wijmo_1.asBoolean(t)}get ranges(){return this._ranges}onValueChanged(t){this.valueChanged.raise(this,t)}refresh(t=!0){if(super.refresh(t),this._rangesDirty){this._rangesDirty=!1;let t=this._gRanges;for(let t=0;t<this._rngElements.length;t++){this._rngElements[t].rng.propertyChanged.removeHandler(this._rangeChanged)}for(;t.lastChild;)t.removeChild(t.lastChild);if(this._rngElements=[],this._showRanges)for(let e=0;e<this.ranges.length;e++){let i=this.ranges[e];i.propertyChanged.addHandler(this._rangeChanged,this),this._rngElements.push({rng:i,el:this._createElement("path",t)})}}this._showElement(this._tValue,0!=(this.showText&ShowText.Value)),this._showElement(this._tMin,0!=(this.showText&ShowText.MinMax)),this._showElement(this._tMax,0!=(this.showText&ShowText.MinMax)),this._showElement(this._cValue,0!=(this.showText&ShowText.Value)||this._thumbSize>0),this._updateText();let e=this._getFilterUrl();this._setAttribute(this._pFace,"filter",e),this._setAttribute(this._pPointer,"filter",e),this._updateRange(this._face),this._updateRange(this._pointer),this._updateTicks();for(let t=0;t<this.ranges.length;t++)this._updateRange(this.ranges[t]);this._initialized=!0}hitTest(t,e){wijmo_1.isNumber(t)&&wijmo_1.isNumber(e)?t=new wijmo_1.Point(t,e):t instanceof wijmo_1.Point||(t=wijmo_1.mouseToPage(t)),t=wijmo_1.asType(t,wijmo_1.Point);let i=wijmo_1.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect());return t.x-=i.left+pageXOffset,t.y-=i.top+pageYOffset,this._getValueFromPoint(t)}static _getBBox(t){try{return t.getBBox()}catch(t){return{x:0,y:0,width:0,height:0}}}_getFilterUrl(){return this.hasShadow?"url(#"+this._filterID+")":null}_getRangeElement(t){if(t==this._face)return this._pFace;if(t==this._pointer)return this._pPointer;for(let e=0;e<this._rngElements.length;e++){let i=this._rngElements[e];if(i.rng==t)return i.el}return null}_rangeChanged(t,e){if(t==this._pointer&&"max"==e.propertyName&&(this.onValueChanged(),this._updateText()),t!=this._face)if(t==this._pointer&&"max"==e.propertyName&&(this._animInterval&&clearInterval(this._animInterval),this.isAnimated&&!this.isUpdating&&this._initialized)){let i=this._getPointerColor(e.oldValue),s=this._getPointerColor(e.newValue),h=i?new wijmo_1.Color(i):null,a=s?new wijmo_1.Color(s):null,n=wijmo_1.clamp(Math.abs(e.newValue-e.oldValue)/(this.max-this.min),0,1);this._animInterval=wijmo_1.animate(i=>{this._animColor=h&&a?wijmo_1.Color.interpolate(h,a,i).toString():null,this._updateRange(t,e.oldValue+i*(e.newValue-e.oldValue)),i>=1&&(this._animColor=null,this._animInterval=null,this._updateRange(t),this._updateText())},n*wijmo_1.Control._ANIM_DEF_DURATION)}else this._updateRange(t);else this.invalidate()}_createElement(t,e,i){let s=document.createElementNS(Gauge._SVGNS,t);return i&&s.setAttribute("class",i),e.appendChild(s),s}_centerText(t,e,i){if("none"!=t.getAttribute("display")){let s=wijmo_1.Globalize.format(e,this.format);if(wijmo_1.isFunction(this.getText)){let i=t==this._tValue?"value":t==this._tMin?"min":t==this._tMax?"max":null;wijmo_1.assert(null!=i,"unknown element"),s=this.getText(this,i,e,s)}t.textContent=s;let h=wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(t)),a=i.x-h.width/2,n=i.y+h.height/4;t.setAttribute("x",this._fix(a)),t.setAttribute("y",this._fix(n))}}_copy(t,e){if("ranges"==t){let t=wijmo_1.asArray(e);for(let e=0;e<t.length;e++){let i=new Range;wijmo_1.copy(i,t[e]),this.ranges.push(i)}return!0}return"pointer"==t&&(wijmo_1.copy(this.pointer,e),!0)}_showElement(t,e){this._setAttribute(t,"display",e?"":"none")}_setAttribute(t,e,i){i?t.setAttribute(e,i):t.removeAttribute(e)}_updateRange(t,e=t.max){t==this._pointer&&(t.min=null!=this.origin?this.origin:this.min<0&&this.max>0?0:this.min);let i=this._getRangeElement(t);if(i){this._updateRangeElement(i,t,e);let s=t.color;t==this._pointer&&(s=this._animColor?this._animColor:this._getPointerColor(t.max)),this._setAttribute(i,"style",s?"fill:"+s:null)}}_getPointerColor(t){if(!this._showRanges){let e;for(let i=0;i<this._ranges.length;i++){let s=this._ranges[i];if(t>=s.min&&t<=s.max){e=s;break}}if(e)return e.color}return this._pointer.color}_keydown(t){if(!this._readOnly&&this._step){let e=!0;switch(this._getKey(t.keyCode)){case wijmo_1.Key.Left:case wijmo_1.Key.Down:this.value=wijmo_1.clamp(this.value-this._step,this.min,this.max);break;case wijmo_1.Key.Right:case wijmo_1.Key.Up:this.value=wijmo_1.clamp(this.value+this._step,this.min,this.max);break;case wijmo_1.Key.Home:this.value=this.min;break;case wijmo_1.Key.End:this.value=this.max;break;default:e=!1}e&&t.preventDefault()}}_getKey(t){return t}_applyMouseValue(t,e){if(!this.isReadOnly&&this.containsFocus()){let i=this.hitTest(t),s=this._animated,h=this._step;if(null!=i)return e&&(this._animated=!1),h&&(i=Math.round(i/h)*h),this.value=wijmo_1.clamp(i,this.min,this.max),this._animated=s,!0}return!1}_updateRangeElement(t,e,i){wijmo_1.assert(!1,"Gauge is an abstract class.")}_updateText(){wijmo_1.assert(!1,"Gauge is an abstract class.")}_updateTicks(){wijmo_1.assert(!1,"Gauge is an abstract class.")}_getValueFromPoint(t){return null}_fix(t){return wijmo_1.isNumber(t)?parseFloat(t.toFixed(4)).toString():this._fix(t.x)+" "+this._fix(t.y)}_updateAria(){let t=this.hostElement;t&&(wijmo_1.setAttribute(t,"aria-valuemin",this.min),wijmo_1.setAttribute(t,"aria-valuemax",this.max),wijmo_1.setAttribute(t,"aria-valuenow",this.value))}}Gauge._SVGNS="http://www.w3.org/2000/svg",Gauge._ctr=0,Gauge.controlTemplate='<div wj-part="dsvg" dir="ltr" style="width:100%;height:100%"><svg wj-part="svg" width="100%" height="100%"><defs><filter wj-part="filter"><feOffset dx="3" dy="3"></feOffset><feGaussianBlur result="offset-blur" stdDeviation="5"></feGaussianBlur><feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite><feFlood flood-color="black" flood-opacity="0.2" result="color"></feFlood><feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite><feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite></filter></defs><g wj-part="gface" class="wj-face" style="cursor:inherit"><path wj-part="pface"/></g><g wj-part="granges" class="wj-ranges" style="cursor:inherit"/><g wj-part="gpointer" class="wj-pointer" style="cursor:inherit"><path wj-part="ppointer"/></g><g wj-part="gcover" class="wj-cover" style="cursor:inherit"><path wj-part="pticks" class="wj-ticks"/><circle wj-part="cvalue" class="wj-pointer wj-thumb"/><text wj-part="value" class="wj-value"/><text wj-part="min" class="wj-min" aria-hidden="true"/><text wj-part="max" class="wj-max" aria-hidden="true"/></g></svg></div>',exports.Gauge=Gauge;class RadialGauge extends Gauge{constructor(t,e){super(t,null),this._startAngle=0,this._sweepAngle=180,this._autoScale=!0,wijmo_1.addClass(this.hostElement,"wj-radialgauge"),this._thickness=.4,this.showText=ShowText.All,this.initialize(e)}get startAngle(){return this._startAngle}set startAngle(t){t!=this._startAngle&&(this._startAngle=wijmo_1.clamp(wijmo_1.asNumber(t,!1),-360,360),this.invalidate())}get sweepAngle(){return this._sweepAngle}set sweepAngle(t){t!=this._sweepAngle&&(this._sweepAngle=wijmo_1.clamp(wijmo_1.asNumber(t,!1),-360,360),this.invalidate())}get autoScale(){return this._autoScale}set autoScale(t){t!=this._autoScale&&(this._autoScale=wijmo_1.asBoolean(t),this.invalidate())}get faceBounds(){return this._rcSvg?this._rcSvg.clone():null}get clientSize(){wijmo_1._deprecated("clientSize","clientBounds");let t=this._rcSvg;return t?new wijmo_1.Size(t.width,t.height):null}refresh(t=!0){if(this._setAttribute(this._svg,"viewBox",null),this._rcSvg=wijmo_1.Rect.fromBoundingRect(this._dSvg.getBoundingClientRect()),super.refresh(t),this._ctmInv=null,this._ptSvg=null,this._autoScale){this._setAttribute(this._svg,"viewBox","");let t=wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(this._pFace));0!=(this.showText&ShowText.Value)&&(t=wijmo_1.Rect.union(t,wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(this._tValue)))),0!=(this.showText&ShowText.MinMax)&&(t=wijmo_1.Rect.union(t,wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(this._tMin))),t=wijmo_1.Rect.union(t,wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(this._tMax))));let e=[this._fix(t.left),this._fix(t.top),this._fix(t.width),this._fix(t.height)].join(" ");this._setAttribute(this._svg,"viewBox",e);let i=this._pFace.getCTM();this._ctmInv=i?i.inverse():null,this._ptSvg=this._svg.createSVGPoint()}}_updateRangeElement(t,e,i){if(this._rcSvg){let s=this._rcSvg,h=new wijmo_1.Point(s.width/2,s.height/2),a=Math.min(s.width,s.height)/2,n=a*this.thickness,r=n*e.thickness,o=a-(n-r)/2,_=o-r,g=this.startAngle+180,l=this.sweepAngle,u=e==this._face,c=u?0:this._getPercent(e.min),m=g+l*c,w=l*((u?1:this._getPercent(i))-c);if(this.stackRanges&&e!=this.face&&e!=this.pointer){let t=this.ranges.indexOf(e);if(t>-1){let e=this.ranges.length,i=(o-_)/e;o=(_+=(e-1-t)*i)+i}}if(this._updateSegment(t,h,o,_,m,w),e==this._pointer&&this.thumbSize>0){let t=this._animColor?this._animColor:this._getPointerColor(e.max),s=this._getPoint(h,g+l*this._getPercent(i),(o+_)/2),a=this._cValue;this._setAttribute(a,"cx",this._fix(s.x)),this._setAttribute(a,"cy",this._fix(s.y)),this._setAttribute(a,"style",t?"fill:"+t:null),this._setAttribute(a,"r",this._fix(this.thumbSize/2))}}}_updateText(){if(this._rcSvg){let t=this._rcSvg,e=new wijmo_1.Point(t.width/2,t.height/2),i=Math.min(t.width,t.height)/2,s=Math.max(0,i*(1-this.thickness)),h=this.startAngle+180,a=this.sweepAngle;this._showElement(this._cValue,this.thumbSize>0);let n=0!=(this.showText&ShowText.MinMax)&&Math.abs(a)<=300;this._showElement(this._tMin,n),this._showElement(this._tMax,n),this._centerText(this._tValue,this.value,e);let r=10*(this.sweepAngle<0?-1:1);this._centerText(this._tMin,this.min,this._getPoint(e,h-r,(i+s)/2)),this._centerText(this._tMax,this.max,this._getPoint(e,h+a+r,(i+s)/2))}}_updateTicks(){let t=this.tickSpacing&&this.tickSpacing>0?this.tickSpacing:this.step,e="";if(this.showTicks&&t>0){let i=this._rcSvg,s=new wijmo_1.Point(i.width/2,i.height/2),h=Math.min(i.width,i.height)/2,a=h*this.thickness,n=a*this._face.thickness,r=h-(a-n)/2,o=r-n;for(let i=this.min+t;i<this.max;i+=t){let t=this.startAngle+180+this.sweepAngle*this._getPercent(i);e+="M "+this._fix(this._getPoint(s,t,o))+" L "+this._fix(this._getPoint(s,t,r))+" "}}this._pTicks.setAttribute("d",e)}_updateSegment(t,e,i,s,h,a){a=Math.min(Math.max(a,-359.99),359.99);let n=this._getPoint(e,h,s),r=this._getPoint(e,h,i),o=this._getPoint(e,h+a,i),_=this._getPoint(e,h+a,s),g={large:Math.abs(a)>180?1:0,cw:a>0?1:0,ccw:a>0?0:1,or:this._fix(i),ir:this._fix(s),p1:this._fix(n),p2:this._fix(r),p3:this._fix(o),p4:this._fix(_)},l=wijmo_1.format("M {p1} L {p2} A {or} {or} 0 {large} {cw} {p3} L {p4} A {ir} {ir} 0 {large} {ccw} {p1} Z",g);t.setAttribute("d",l)}_getPoint(t,e,i){return e=e*Math.PI/180,new wijmo_1.Point(t.x+i*Math.cos(e),t.y+i*Math.sin(e))}_getValueFromPoint(t){if(this.autoScale&&this._ctmInv&&(this._ptSvg.x=t.x,this._ptSvg.y=t.y,this._ptSvg=this._ptSvg.matrixTransform(this._ctmInv),t.x=this._ptSvg.x,t.y=this._ptSvg.y),!this._rcSvg)return null;let e=this._rcSvg,i=new wijmo_1.Point(e.width/2,e.height/2),s=Math.min(e.width,e.height)/2,h=s*(1-this.thickness),a=t.x-i.x,n=t.y-i.y,r=n*n+a*a;if(r>s*s+16||r<h*h-16)return null;let o=180*(Math.PI-Math.atan2(-n,a))/Math.PI,_=this.startAngle,g=this.sweepAngle;if(g>0){for(;o<_;)o+=360;for(;o>_+g;)o-=360}else{for(;o<_+g;)o+=360;for(;o>_;)o-=360}let l=Math.abs(o-_)/Math.abs(g);return this.min+l*(this.max-this.min)}}exports.RadialGauge=RadialGauge,function(t){t[t.Right=0]="Right",t[t.Left=1]="Left",t[t.Up=2]="Up",t[t.Down=3]="Down"}(GaugeDirection=exports.GaugeDirection||(exports.GaugeDirection={}));class LinearGauge extends Gauge{constructor(t,e){super(t,null),this._direction=GaugeDirection.Right,wijmo_1.addClass(this.hostElement,"wj-lineargauge"),this.initialize(e)}get direction(){return this._direction}set direction(t){(t=wijmo_1.asEnum(t,GaugeDirection))!=this._direction&&(this._direction=t,this.invalidate())}get faceBounds(){return this._getRangeRect(this._face)}_updateRangeElement(t,e,i){let s=this._getRangeRect(e,i);this._updateSegment(t,s);let h=e==this._pointer&&0!=(this.showText&ShowText.Value),a=h||e==this._pointer&&this.thumbSize>0,n=s.left+s.width/2,r=s.top+s.height/2;switch(this._getDirection()){case GaugeDirection.Right:n=s.right;break;case GaugeDirection.Left:n=s.left;break;case GaugeDirection.Up:r=s.top;break;case GaugeDirection.Down:r=s.bottom}if(h&&this._centerText(this._tValue,i,new wijmo_1.Point(n,r)),h||a){s=wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(this._tValue));let t=this._animColor?this._animColor:this._getPointerColor(e.max),i=null!=this.thumbSize?this.thumbSize/2:.8*Math.max(s.width,s.height),h=this._cValue;this._setAttribute(h,"cx",this._fix(n)),this._setAttribute(h,"cy",this._fix(r)),this._setAttribute(h,"style",t?"fill:"+t:null),this._setAttribute(h,"r",this._fix(i))}}_updateText(){let t=this._getRangeRect(this._face);switch(this._getDirection()){case GaugeDirection.Right:this._setText(this._tMin,this.min,t,"left"),this._setText(this._tMax,this.max,t,"right");break;case GaugeDirection.Left:this._setText(this._tMin,this.min,t,"right"),this._setText(this._tMax,this.max,t,"left");break;case GaugeDirection.Up:this._setText(this._tMin,this.min,t,"bottom"),this._setText(this._tMax,this.max,t,"top");break;case GaugeDirection.Down:this._setText(this._tMin,this.min,t,"top"),this._setText(this._tMax,this.max,t,"bottom")}}_updateTicks(){let t=this.tickSpacing&&this.tickSpacing>0?this.tickSpacing:this.step,e="";if(this.showTicks&&t>0){let i,s=this._getRangeRect(this._face);for(let h=this.min+t;h<this.max;h+=t)switch(this._getDirection()){case GaugeDirection.Right:e+="M "+(i=this._fix(s.left+s.width*this._getPercent(h)))+" "+this._fix(s.top)+" L "+i+" "+this._fix(s.bottom)+" ";break;case GaugeDirection.Left:e+="M "+(i=this._fix(s.right-s.width*this._getPercent(h)))+" "+s.top.toFixed(2)+" L "+i+" "+s.bottom.toFixed(2)+" ";break;case GaugeDirection.Up:i=(s.bottom-s.height*this._getPercent(h)).toFixed(2),e+="M "+this._fix(s.left)+" "+i+" L "+this._fix(s.right)+" "+i+" ";break;case GaugeDirection.Down:i=(s.top+s.height*this._getPercent(h)).toFixed(2),e+="M "+s.left.toFixed(2)+" "+i+" L "+s.right.toFixed(2)+" "+i+" "}}this._pTicks.setAttribute("d",e)}_updateSegment(t,e){let i={p1:this._fix(new wijmo_1.Point(e.left,e.top)),p2:this._fix(new wijmo_1.Point(e.right,e.top)),p3:this._fix(new wijmo_1.Point(e.right,e.bottom)),p4:this._fix(new wijmo_1.Point(e.left,e.bottom))},s=wijmo_1.format("M {p1} L {p2} L {p3} L {p4} Z",i);t.setAttribute("d",s)}_setText(t,e,i,s){if("none"!=t.getAttribute("display")){let h=wijmo_1.Globalize.format(e,this.format);if(wijmo_1.isFunction(this.getText)){let i=t==this._tValue?"value":t==this._tMin?"min":t==this._tMax?"max":null;wijmo_1.assert(null!=i,"unknown element"),h=this.getText(this,i,e,h)}t.textContent=h;let a=wijmo_1.Rect.fromBoundingRect(Gauge._getBBox(t)),n=new wijmo_1.Point(i.left+i.width/2-a.width/2,i.top+i.height/2+a.height/2);switch(s){case"top":n.y=i.top-4;break;case"left":n.x=i.left-4-a.width;break;case"right":n.x=i.right+4;break;case"bottom":n.y=i.bottom+4+a.height}t.setAttribute("x",this._fix(n.x)),t.setAttribute("y",this._fix(n.y))}}_getRangeRect(t,e=t.max){let i=this.hostElement,s=new wijmo_1.Rect(0,0,i.clientWidth,i.clientHeight),h=this._getDirection(),a=this.thumbSize?Math.ceil(this.thumbSize/2):0;if(this.showText!=ShowText.None){let t=parseInt(getComputedStyle(i).fontSize);isNaN(t)||(a=Math.max(a,3*t))}switch(h){case GaugeDirection.Right:case GaugeDirection.Left:s=s.inflate(-a,-s.height*(1-this.thickness*t.thickness)/2);break;case GaugeDirection.Up:case GaugeDirection.Down:s=s.inflate(-s.width*(1-this.thickness*t.thickness)/2,-a)}if(this.stackRanges&&t!=this.face&&t!=this.pointer){let e=this.ranges.indexOf(t);if(e>-1){let t=this.ranges.length;switch(h){case GaugeDirection.Right:case GaugeDirection.Left:s.height/=t,s.top+=e*s.height;break;case GaugeDirection.Up:case GaugeDirection.Down:s.width/=t,s.left+=e*s.width}}}let n=t==this._face,r=n?0:this._getPercent(t.min),o=n?1:this._getPercent(e);switch(h){case GaugeDirection.Right:s.left+=s.width*r,s.width*=o-r;break;case GaugeDirection.Left:s.left=s.right-s.width*o,s.width=s.width*(o-r);break;case GaugeDirection.Down:s.top+=s.height*r,s.height*=o-r;break;case GaugeDirection.Up:s.top=s.bottom-s.height*o,s.height=s.height*(o-r)}return s}_getValueFromPoint(t){let e=this._getRangeRect(this._face),i=0;switch(this._getDirection()){case GaugeDirection.Right:i=e.width>0?(t.x-e.left)/e.width:0;break;case GaugeDirection.Left:i=e.width>0?(e.right-t.x)/e.width:0;break;case GaugeDirection.Up:i=e.height>0?(e.bottom-t.y)/e.height:0;break;case GaugeDirection.Down:i=e.height>0?(t.y-e.top)/e.height:0}return this.min+i*(this.max-this.min)}_getDirection(){let t=this._direction;if(this.rightToLeft)switch(t){case GaugeDirection.Left:t=GaugeDirection.Right;break;case GaugeDirection.Right:t=GaugeDirection.Left}return t}_getKey(t){switch(this._getDirection()){case GaugeDirection.Left:switch(t){case wijmo_1.Key.Left:t=wijmo_1.Key.Right;break;case wijmo_1.Key.Right:t=wijmo_1.Key.Left}break;case GaugeDirection.Down:switch(t){case wijmo_1.Key.Up:t=wijmo_1.Key.Down;break;case wijmo_1.Key.Down:t=wijmo_1.Key.Up}}return t}}exports.LinearGauge=LinearGauge;class BulletGraph extends LinearGauge{constructor(t,e){super(t,null),wijmo_1.addClass(this.hostElement,"wj-bulletgraph"),this._pointer.thickness=.35,this._rngTarget=new Range("target"),this._rngTarget.thickness=.8,this._rngTarget.color="black",this._rngGood=new Range("good"),this._rngGood.color="rgba(0,0,0,.15)",this._rngBad=new Range("bad"),this._rngBad.color="rgba(0,0,0,.3)",this.ranges.push(this._rngBad),this.ranges.push(this._rngGood),this.ranges.push(this._rngTarget),this.initialize(e)}get target(){return this._rngTarget.max}set target(t){this._rngTarget.max=t}get good(){return this._rngGood.max}set good(t){this._rngGood.max=t}get bad(){return this._rngBad.max}set bad(t){this._rngBad.max=t}_getRangeRect(t,e=t.max){let i=super._getRangeRect(t,e);if(t==this._rngTarget)switch(this.direction){case GaugeDirection.Right:i.left=i.right-1,i.width=3;break;case GaugeDirection.Left:i.width=3;break;case GaugeDirection.Up:i.height=3;break;case GaugeDirection.Down:i.top=i.bottom-1,i.height=3}return i}}exports.BulletGraph=BulletGraph,wijmo_1._registerModule("wijmo.gauge",selfModule);