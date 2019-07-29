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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var AnnotationAttachment,AnnotationPosition,wijmo_1=require("wijmo/wijmo"),wijmo_chart_1=require("wijmo/wijmo.chart"),selfModule=require("wijmo/wijmo.chart.annotation");!function(t){t[t.DataIndex=0]="DataIndex",t[t.DataCoordinate=1]="DataCoordinate",t[t.Relative=2]="Relative",t[t.Absolute=3]="Absolute"}(AnnotationAttachment=exports.AnnotationAttachment||(exports.AnnotationAttachment={})),function(t){t[t.Center=0]="Center",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom",t[t.Left=4]="Left",t[t.Right=8]="Right"}(AnnotationPosition=exports.AnnotationPosition||(exports.AnnotationPosition={}));var AnnotationBase=function(){function t(t){this._resetDefaultValue(),t&&this._copy(this,t)}return Object.defineProperty(t.prototype,"attachment",{get:function(){return this._attachment},set:function(t){(t=wijmo_1.asEnum(t,AnnotationAttachment))!=this._attachment&&(this._attachment=t,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"point",{get:function(){return this._point},set:function(t){null!=t.x&&null!=t.y&&(t.x===this._point.x&&t.y===this._point.y||(this._point=t,this._repaint()))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"seriesIndex",{get:function(){return this._seriesIndex},set:function(t){(t=wijmo_1.asNumber(t,!1,!0))!=this._seriesIndex&&(this._seriesIndex=t,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pointIndex",{get:function(){return this._pointIndex},set:function(t){t!==this._pointIndex&&(this._pointIndex=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this._position},set:function(t){t!=this._position&&(this._position=t,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"offset",{get:function(){return this._offset},set:function(t){null!=t.x&&null!=t.y&&(t.x===this._offset.x&&t.y===this._offset.y||(this._offset=t,this._repaint()))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"style",{get:function(){return null==this._style&&(this._style={}),this._style},set:function(t){t!=this._style&&(this._style=t,this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isVisible",{get:function(){return this._isVisible},set:function(t){(t=wijmo_1.asBoolean(t,!1))!=this._isVisible&&(this._isVisible=t,this._toggleVisibility(t))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tooltip",{get:function(){return this._tooltip},set:function(t){this._tooltip=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return this._name},set:function(t){this._name=t},enumerable:!0,configurable:!0}),t.prototype.render=function(e){var i;this._element=e.startGroup(this._getCSSClass()),e.fill="#88bde6",e.strokeWidth=1,e.stroke="#000000",this._render(e),e.endGroup(),this._element[t._DATA_KEY]=this,this._isVisible?this._attachment===AnnotationAttachment.DataIndex&&(!(i=this._layer._chart.series[this._seriesIndex])||i.visibility!==wijmo_chart_1.SeriesVisibility.Legend&&i.visibility!==wijmo_chart_1.SeriesVisibility.Hidden||this._toggleVisibility(!1)):this._toggleVisibility(!1)},t.prototype.destroy=function(){},t.prototype._copy=function(t,e){for(var i in e)i in t&&this._processOptions(i,t,e)},t.prototype._processOptions=function(t,e,i){e[t]=i[t]},t.prototype._resetDefaultValue=function(){this._attachment=AnnotationAttachment.Absolute,this._point=new wijmo_chart_1.DataPoint(0,0),this._seriesIndex=0,this._pointIndex=0,this._position=AnnotationPosition.Center,this._offset=new wijmo_1.Point(0,0),this._isVisible=!0,this._tooltip=""},t.prototype._toggleVisibility=function(t){var e=t?"visible":"hidden";this._element&&this._element.setAttribute("visibility",e)},t.prototype._getCSSClass=function(){return t._CSS_ANNOTATION},t.prototype._render=function(t){this._element=null},t.prototype._repaint=function(){this._layer&&this._layer._renderAnnotation(this)},t.prototype._convertPoint=function(t){var e,i,n,o,r,s,a,h=this._attachment,_=new wijmo_1.Point;switch(this._layer&&this._layer._chart&&(i=(e=this._layer._chart)._plotRect),h){case AnnotationAttachment.DataIndex:if(!e.series||e.series.length<=this.seriesIndex)break;if(!(s=(r=e.series[this.seriesIndex])._getItem(this.pointIndex)))break;n=r.axisX||e.axisX,o=r.axisY||e.axisY,"string"==typeof(a=s[r.bindingX]||s.x)&&(a=this.pointIndex),_.x=this._convertDataToLen(i.width,n,a),_.y=this._convertDataToLen(i.height,o,s[r._getBinding(0)]||o.actualMin+.25,!0);break;case AnnotationAttachment.DataCoordinate:n=e.axisX,o=e.axisY,_.x=this._convertDataToLen(i.width,n,t.x),_.y=this._convertDataToLen(i.height,o,t.y,!0);break;case AnnotationAttachment.Relative:_.x=i.width*t.x,_.y=i.height*t.y;break;case AnnotationAttachment.Absolute:default:_.x=t.x,_.y=t.y}return _},t.prototype._convertDataToLen=function(t,e,i,n){void 0===n&&(n=!1);var o=null==e.min?e.actualMin:e.min,r=null==e.max?e.actualMax:e.max;if(e._getLogBase()){if(i<=0)return NaN;var s=Math.log(r/o);return n?t*(1-Math.log(i/o)/s):t*Math.log(i/o)/s}return n?t*(1-(i-o)/(r-o)):t*(i-o)/(r-o)},t.prototype._renderCenteredText=function(t,e,i,n,o,r){var s,a;this._isValidPoint(i)&&(o?e.drawStringRotated(t,i,i,o,n,r):e.drawString(t,i,n,r),(s=this._element.querySelector("text"))&&(a=s.getBBox(),s.setAttribute("x",(i.x-a.width/2).toFixed(1)),s.setAttribute("y",(i.y+a.height/6).toFixed(1))))},t.prototype._adjustOffset=function(t,e){t.x=t.x+e.x,t.y=t.y+e.y},t.prototype._getOffset=function(t){var e=this._getPositionOffset(t);return new wijmo_1.Point(this._offset.x+e.x,this._offset.y+e.y)},t.prototype._getPositionOffset=function(t){var e=new wijmo_1.Point(0,0),i=this.position,n=this._getSize(t);return(i&AnnotationPosition.Top)===AnnotationPosition.Top?e.y-=n.height/2:(i&AnnotationPosition.Bottom)===AnnotationPosition.Bottom&&(e.y+=n.height/2),(i&AnnotationPosition.Left)===AnnotationPosition.Left?e.x-=n.width/2:(i&AnnotationPosition.Right)===AnnotationPosition.Right&&(e.x+=n.width/2),e},t.prototype._getSize=function(t){return new wijmo_1.Size},t.prototype._isValidPoint=function(t){return isFinite(t.x)&&isFinite(t.y)},t.prototype._measureString=function(t,e,i){var n,o=t;return o._textGroup&&null==o._textGroup.parentNode?(o._svg.appendChild(o._textGroup),n=o.measureString(e,i,null,this.style),o.endRender()):n=o.measureString(e,i,null,this.style),n},t._DATA_KEY="wj-chart-annotation",t._CSS_ANNOTATION="gcchart-annotation",t._CSS_ANNO_TEXT="anno-text",t._CSS_ANNO_SHAPE="anno-shape",t}();exports.AnnotationBase=AnnotationBase;var Text=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._text="",this.position=AnnotationPosition.Top},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_TEXT},Object.defineProperty(e.prototype,"text",{get:function(){return this._text},set:function(t){t!==this._text&&(this._text=t,this._repaint())},enumerable:!0,configurable:!0}),e.prototype._render=function(t){var e,i=this._convertPoint(this.point);e=this._getOffset(t),this._adjustOffset(i,e),this._renderCenteredText(this._text,t,i,AnnotationBase._CSS_ANNO_TEXT,null,this.style)},e.prototype._getSize=function(t){return t?this._measureString(t,this._text,AnnotationBase._CSS_ANNO_TEXT):new wijmo_1.Size},e._CSS_TEXT="gcchart-anno-text",e}(AnnotationBase);exports.Text=Text;var Shape=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._content=""},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_SHAPE},Object.defineProperty(e.prototype,"content",{get:function(){return this._content},set:function(t){t!==this._content&&(this._content=t,this._repaint())},enumerable:!0,configurable:!0}),e.prototype._render=function(t){this._shapeContainer=t.startGroup(),t.stroke="#000",this._renderShape(t),t.stroke=null,t.endGroup(),this._content&&this._renderText(t)},e.prototype._getContentCenter=function(){return this.point},e.prototype._renderShape=function(t){},e.prototype._renderText=function(t){var e,i;e=this._convertPoint(this._getContentCenter()),this._isValidPoint(e)&&(i=this._getOffset(),this._adjustOffset(e,i),this._renderCenteredText(this._content,t,e,AnnotationBase._CSS_ANNO_TEXT))},e._CSS_SHAPE="gcchart-anno-shape",e}(AnnotationBase);exports.Shape=Shape;var Ellipse=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(t){t!==this._width&&(this._width=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(t){t!==this._height&&(this._height=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._width=100,this._height=80},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_ELLIPSE},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i=this._convertPoint(this.point),n=this._width,o=this._height,r=this._getOffset();this._adjustOffset(i,r),this._isValidPoint(i)&&e.drawEllipse(i.x,i.y,n/2,o/2,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){return new wijmo_1.Size(this.width,this.height)},e._CSS_ELLIPSE="gcchart-anno-ellipse",e}(Shape);exports.Ellipse=Ellipse;var Rectangle=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(t){t!==this._width&&(this._width=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(t){t!==this._height&&(this._height=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._width=100,this._height=80},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_RECTANGLE},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i=this._convertPoint(this.point),n=this._width,o=this._height,r=this._getOffset();this._adjustOffset(i,r),this._isValidPoint(i)&&e.drawRect(i.x-n/2,i.y-o/2,this._width,this._height,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){return new wijmo_1.Size(this.width,this.height)},e._CSS_RECTANGLE="gcchart-anno-rectangle",e}(Shape);exports.Rectangle=Rectangle;var Line=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"start",{get:function(){return this._start},set:function(t){null!=t.x&&null!=t.y&&(t.x===this._start.x&&t.y===this._start.y||(this._start=t,this._repaint()))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"end",{get:function(){return this._end},set:function(t){null!=t.x&&null!=t.y&&(t.x===this._end.x&&t.y===this._end.y||(this._end=t,this._repaint()))},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._start=new wijmo_chart_1.DataPoint(0,0),this._end=new wijmo_chart_1.DataPoint(0,0),this.position=AnnotationPosition.Top},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_LINE},e.prototype._getContentCenter=function(){var t=this.start,e=this.end;return wijmo_1.isDate(t.x)&&wijmo_1.isDate(e.x)?new wijmo_chart_1.DataPoint(new Date(t.x.getTime()+(e.x-t.x)/2),(t.y+e.y)/2):new wijmo_chart_1.DataPoint((t.x+e.x)/2,(t.y+e.y)/2)},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i,n=this._convertPoint(this._start),o=this._convertPoint(this._end);this._cS=n,this._cE=o,i=this._getOffset(),this._adjustOffset(n,i),this._adjustOffset(o,i),this._isValidPoint(n)&&this._isValidPoint(o)&&e.drawLine(n.x,n.y,o.x,o.y,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){var t=this._cS,e=this._cE;return new wijmo_1.Size(Math.abs(t.x-e.x),Math.abs(t.y-e.y))},e.prototype._renderText=function(t){var e,i,n,o=this._cS,r=this._cE;e=this._convertPoint(this._getContentCenter()),i=this._getOffset(),this._adjustOffset(e,i),this._isValidPoint(e)&&(n=(n=180*Math.atan2(r.y-o.y,r.x-o.x)/Math.PI)<-90?n+180:n>90?n-180:n,this._renderCenteredText(this.content,t,e,AnnotationBase._CSS_ANNO_TEXT,n))},e.prototype._renderCenteredText=function(e,i,n,o,r,s){var a,h,_,p;null!=r&&(_=this._measureString(i,e,o).height/2,p=r*Math.PI/180,a=_*Math.sin(p),h=_*Math.cos(p),n.x=n.x+a,n.y=n.y-h);t.prototype._renderCenteredText.call(this,e,i,n,o,r,s)},e._CSS_LINE="gcchart-anno-line",e}(Shape);exports.Line=Line;var Polygon=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype._processOptions=function(e,i,n){var o=this;if("points"===e){var r=n[e];wijmo_1.isArray(r)&&r.forEach(function(t){o.points.push(t)})}else t.prototype._processOptions.call(this,e,i,n)},Object.defineProperty(e.prototype,"points",{get:function(){return this._points},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){var e=this;t.prototype._resetDefaultValue.call(this),e._points=new wijmo_1.ObservableArray,e._points.collectionChanged.addHandler(function(){e._element&&e._repaint()})},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_POLYGON},e.prototype._getContentCenter=function(){var t,e=this.points,i=e.length,n=0,o=0;for(t=0;t<i;t++)n+=wijmo_1.isDate(e[t].x)?e[t].x.getTime():e[t].x,o+=wijmo_1.isDate(e[t].y)?e[t].y.getTime():e[t].y;return new wijmo_chart_1.DataPoint(n/i,o/i)},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i,n,o=[],r=[],s=this._points,a=s.length,h=this._getOffset();for(i=0;i<a;i++){if(n=this._convertPoint(s[i]),!this._isValidPoint(n))return;this._adjustOffset(n,h),o.push(n.x),r.push(n.y)}e.drawPolygon(o,r,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){var t,e,i,n,o,r,s,a=this,h=a._points.length;for(s=[].map.call(a._points,function(t){return a._convertPoint(t)}),o=0;o<h;o++)r=s[o],0!==o?(r.x<t?t=r.x:r.x>e&&(e=r.x),r.y<i?i=r.y:r.y>n&&(n=r.y)):(t=e=r.x,i=n=r.y);return new wijmo_1.Size(e-t,n-i)},e._CSS_POLYGON="gcchart-anno-polygon",e}(Shape);exports.Polygon=Polygon;var Circle=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"radius",{get:function(){return this._radius},set:function(t){t!==this._radius&&(this._radius=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._radius=100},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_CIRCLE},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i=this._convertPoint(this.point),n=this._getOffset();this._adjustOffset(i,n),this._isValidPoint(i)&&e.drawPieSegment(i.x,i.y,this.radius,0,360,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){var t=2*this.radius;return new wijmo_1.Size(t,t)},e._CSS_CIRCLE="gcchart-anno-circle",e}(Shape);exports.Circle=Circle;var Square=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"length",{get:function(){return this._length},set:function(t){t!==this._length&&(this._length=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._length=100},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_SQUARE},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i=this._convertPoint(this.point),n=this.length,o=this._getOffset();this._adjustOffset(i,o),this._isValidPoint(i)&&e.drawRect(i.x-n/2,i.y-n/2,n,n,AnnotationBase._CSS_ANNO_SHAPE,this.style)},e.prototype._getSize=function(){return new wijmo_1.Size(this.length,this.length)},e._CSS_SQUARE="gcchart-anno-square",e}(Shape);exports.Square=Square;var Image=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(t){t!==this._width&&(this._width=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(t){t!==this._height&&(this._height=wijmo_1.asNumber(t,!1,!0),this._repaint())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"href",{get:function(){return this._href},set:function(t){t!==this._href&&(this._href=t,this._repaint())},enumerable:!0,configurable:!0}),e.prototype._resetDefaultValue=function(){t.prototype._resetDefaultValue.call(this),this._width=100,this._height=100,this._href=""},e.prototype._getCSSClass=function(){return t.prototype._getCSSClass.call(this)+" "+e._CSS_IMAGE},e.prototype._renderShape=function(e){t.prototype._renderShape.call(this,e);var i=this._convertPoint(this.point),n=this._href,o=this.width,r=this.height,s=this._getOffset();n.length>0&&this._isValidPoint(i)&&(this._adjustOffset(i,s),e.drawImage(n,i.x-o/2,i.y-r/2,o,r)),this._applyStyle(this._element,this.style)},e.prototype._getSize=function(){return new wijmo_1.Size(this.width,this.height)},e.prototype._applyStyle=function(t,e){if(e)for(var i in e)t.setAttribute(this._deCase(i),e[i])},e.prototype._deCase=function(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})},e._CSS_IMAGE="gcchart-anno-image",e}(Shape);exports.Image=Image;var AnnotationLayer=function(){function t(t,e){var i=this;i._init(t),i._renderGroup(),i._bindTooltip(),e&&wijmo_1.isArray(e)&&e.forEach(function(t){var e,n=t.type||"Circle";selfModule[n]&&(e=new selfModule[n](t),i._items.push(e))})}return t.prototype._init=function(t){this._items=new wijmo_1.ObservableArray,this._items.collectionChanged.addHandler(this._itemsChanged,this),this._chart=t,this._forceTTShowing=!1,this._annoTTShowing=!1,this._engine=t._currentRenderEngine,t.rendered.addHandler(this._renderAnnotations,this),t.lostFocus.addHandler(this._lostFocus,this)},t.prototype._lostFocus=function(t){this._toggleTooltip(this._tooltip,t,this._chart.hostElement)},Object.defineProperty(t.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),t.prototype.getItem=function(t){var e=this.getItems(t);return e.length>0?e[0]:null},t.prototype.getItems=function(t){var e=[];if(0===this._items.length||!t||""===t)return e;for(var i=0;i<this._items.length;i++)t===this._items[i].name&&e.push(this._items[i]);return e},t.prototype._bindTooltip=function(){var t,e=this,i=e._chart.hostElement,n=e._tooltip;n||(n=e._tooltip=new wijmo_chart_1.ChartTooltip,t=wijmo_1.Tooltip.prototype.hide,wijmo_1.Tooltip.prototype.hide=function(){e._forceTTShowing||t.call(n)}),i&&(i.addEventListener("click",function(t){e._toggleTooltip(n,t,i)}),document.addEventListener("mousemove",function(t){e._showTooltip()&&e._toggleTooltip(n,t,i)}))},t.prototype._showTooltip=function(){return!this._chart.isTouching},t.prototype._toggleTooltip=function(t,e,i){var n=this._getAnnotation(e.target,i);if(n&&n.tooltip)this._forceTTShowing=!0,this._annoTTShowing=!0,t.show(this._layerEle,n.tooltip,new wijmo_1.Rect(e.clientX,e.clientY,5,5));else{if(!this._annoTTShowing)return;this._annoTTShowing=!1,this._forceTTShowing=!1,t.hide()}},t.prototype._getAnnotation=function(t,e){var i=this._getAnnotationElement(t,e);return null==i?null:i[AnnotationBase._DATA_KEY]},t.prototype._getAnnotationElement=function(t,e){if(!t||!e)return null;var i=t.parentNode;return wijmo_1.hasClass(t,AnnotationBase._CSS_ANNOTATION)?t:null==i||i===document.body||i===document||i===e?null:this._getAnnotationElement(i,e)},t.prototype._itemsChanged=function(t,e){var i=e.action,n=e.item;switch(i){case wijmo_1.NotifyCollectionChangedAction.Add:case wijmo_1.NotifyCollectionChangedAction.Change:n._layer=this,this._renderAnnotation(n);break;case wijmo_1.NotifyCollectionChangedAction.Remove:this._destroyAnnotation(n);break;default:this._destroyAnnotations(),this._renderAnnotations()}},t.prototype._renderAnnotations=function(){var t,e=this.items,i=e.length;for(this._renderGroup(),t=0;t<i;t++)this._renderAnnotation(e[t])},t.prototype._renderGroup=function(){var e=this._engine,i=this._chart._plotRect;i&&(this._layerEle&&null!=this._layerEle.parentNode||(this._plotrectId="plotRect"+(1e6*Math.random()).toFixed(),e.addClipRect({left:0,top:0,width:i.width,height:i.height},this._plotrectId),this._layerEle=e.startGroup(t._CSS_Layer,this._plotrectId),this._layerEle.setAttribute("transform","translate("+i.left+", "+i.top+")"),e.endGroup()))},t.prototype._renderAnnotation=function(t){this._layerEle&&null!=this._layerEle.parentNode&&(t._element&&t._element.parentNode==this._layerEle&&this._layerEle.removeChild(t._element),t.render(this._engine),this._layerEle.appendChild(t._element))},t.prototype._destroyAnnotations=function(){var t,e=this.items,i=e.length;for(t=0;t<i;t++)this._destroyAnnotation(e[t]);this._layerEle.innerHTML=""},t.prototype._destroyAnnotation=function(t){this._layerEle&&this._layerEle.removeChild(t._element),t.destroy()},t._CSS_Layer="wj-chart-annotationlayer",t}();exports.AnnotationLayer=AnnotationLayer,wijmo_1._registerModule("wijmo.chart.annotation",selfModule);