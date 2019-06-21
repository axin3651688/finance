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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,a){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])})(e,a)};return function(e,a){function r(){this.constructor=e}t(e,a),e.prototype=null===a?Object.create(a):(r.prototype=a.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_1=require("wijmo/wijmo"),wijmo_chart_1=require("wijmo/wijmo.chart"),selfModule=require("wijmo/wijmo.chart.radar"),FlexRadarSeries=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),Object.defineProperty(e.prototype,"chartType",{get:function(){return this._finChartType},set:function(t){(t=wijmo_1.asEnum(t,RadarChartType,!0))!=this._finChartType&&(this._finChartType=t,this._invalidate())},enumerable:!0,configurable:!0}),e.prototype._getChartType=function(){var t;switch(this.chartType){case RadarChartType.Area:t=wijmo_chart_1.ChartType.Area;break;case RadarChartType.Line:t=wijmo_chart_1.ChartType.Line;break;case RadarChartType.Column:t=wijmo_chart_1.ChartType.Column;break;case RadarChartType.LineSymbols:t=wijmo_chart_1.ChartType.LineSymbols;break;case RadarChartType.Scatter:t=wijmo_chart_1.ChartType.Scatter}return t},e}(wijmo_chart_1.SeriesBase);exports.FlexRadarSeries=FlexRadarSeries;var _RadarLinePlotter=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.isArea=!1,e}return __extends(e,t),e.prototype._getLabelPoint=function(t,e){var a=t._getAxisX(),r=t._getAxisY(),i=a.convert(e.dataX),n=r.convert(e.dataY);return this.chart._convertPoint(n,i)},e.prototype.plotSeries=function(t,e,a,r,i,n,s){var o=wijmo_1.asType(r,wijmo_chart_1.SeriesBase),l=this.chart,_=o._getChartType()||l._getChartType(),h=l.series.indexOf(r),c=r.getValues(0),u=r.getValues(1);if(c){u||(u=this.dataInfo.getXVals());var p=wijmo_chart_1._BasePlotter.cloneStyle(r.style,["fill"]),d=c.length,m=!0;u?d=Math.min(d,u.length):(m=!1,u=new Array(d));var y=this._DEFAULT_WIDTH,g=o._getSymbolFill(h),v=o._getAltSymbolFill(h)||g,f=o._getSymbolStroke(h),x=o._getAltSymbolStroke(h)||f,w=o._getSymbolSize();t.stroke=f,t.strokeWidth=y,t.fill=g;var A=new Array,P=new Array,T=a.actualMax,j=this.stacking!=wijmo_chart_1.Stacking.None&&!o._isCustomAxisY(),b=this.stacking==wijmo_chart_1.Stacking.Stacked100pc&&!o._isCustomAxisY();void 0!==o._getChartType()&&(j=b=!1);for(var C=o.interpolateNulls,L=!1,M=this.getItemFormatter(r),S=0;S<d;S++){var k=m?u[S]:S,R=null==c[S]?0:c[S];if(wijmo_chart_1._DataInfo.isValid(k)&&wijmo_chart_1._DataInfo.isValid(R)){if(j){if(b)R/=this.dataInfo.getStackedAbsSum(k);if(R>=0){var I=isNaN(this.stackPos[k])?0:this.stackPos[k];R=this.stackPos[k]=I+R}else{I=isNaN(this.stackNeg[k])?0:this.stackNeg[k];R=this.stackNeg[k]=I+R}}var N;R=Math.min(R,T),N=new wijmo_chart_1._DataPoint(h,S,k,R);var F=e.convert(k),X=a.convert(R),D=this.chart._convertPoint(X,F);if(k=D.x,R=D.y,isNaN(k)||isNaN(R))L=!0,!0!==C&&(A.push(void 0),P.push(void 0));else{A.push(k),P.push(R);var O=new wijmo_chart_1._CircleArea(new wijmo_1.Point(k,R),.5*w);O.tag=N,this.hitTester.add(O,h)}}else L=!0,!0!==C&&(A.push(void 0),P.push(void 0))}var V=0;if(this.hasLines)if(this.isArea?t.fill=g||i._getColorLight(h):t.fill="none",L&&!0!==C){var G=[],Y=[];for(S=0;S<d;S++)void 0===A[S]?(G.push(void 0),Y.push(0)):(G.push(A[S]),Y.push(P[S]));G.length>1&&(l._isPolar&&_!==wijmo_chart_1.ChartType.Area?this._drawLines(t,G,Y,null,p,this.chart._plotrectId):(l.totalAngle<360&&(G.push(l._center.x),Y.push(l._center.y)),t.drawPolygon(G,Y,null,p,this.chart._plotrectId)),this.hitTester.add(new wijmo_chart_1._LinesArea(G,Y),h),V++)}else l._isPolar&&_!==wijmo_chart_1.ChartType.Area?this._drawLines(t,A,P,null,p,this.chart._plotrectId):(l.totalAngle<360&&(A.push(l._center.x),P.push(l._center.y)),t.drawPolygon(A,P,null,p,this.chart._plotrectId)),this.hitTester.add(new wijmo_chart_1._LinesArea(A,P),h),V++;t.fill=g;for(S=0;S<d;S++){k=A[S],R=P[S];!1===this.hasLines&&(t.fill=c[S]>0?g:v,t.stroke=c[S]>0?f:x),this.isValid(k,R,e,a)&&((this.hasSymbols||M)&&w>0&&this._drawSymbol(t,k,R,w,o,S,M),r._setPointIndex(S,V),V++)}}},e}(wijmo_chart_1._LinePlotter);exports._RadarLinePlotter=_RadarLinePlotter;var RadarChartType,_RadarBarPlotter=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.adjustLimits=function(t,e){this.dataInfo=t;var a=t.getMinX(),r=t.getMinY(),i=t.getMaxX(),n=t.getMaxY(),s=t.getDeltaX();return s<=0&&(s=1),this.chart.totalAngle<360&&(s=0),this.unload(),this.chart.axisY._getLogBase()||(this.origin>n?n=this.origin:this.origin<r&&(r=this.origin)),new wijmo_1.Rect(a,r,i-a+s,n-r)},e.prototype._getLabelPoint=function(t,e){var a=t._getAxisX(),r=t._getAxisY(),i=a.convert(e.dataX),n=r.convert(e.dataY);return this.chart._convertPoint(n,i)},e.prototype.plotSeries=function(t,e,a,r,i,n,s){var o=this.chart.series.indexOf(r),l=wijmo_1.asType(r,wijmo_chart_1.SeriesBase),_=(this.chart._options,this.width),h=this.chart,c=-90*Math.PI/180;n=n||0;var u,p=l._getAxisY()._uniqueId,d=(this.stackNegMap[p],this.stackPosMap[p]),m=this.stacking!=wijmo_chart_1.Stacking.None,y=this.stacking==wijmo_chart_1.Stacking.Stacked100pc,g=r.getValues(0),v=r.getValues(1);if(g){var f;v||(v=this.dataInfo.getXVals()),(f=v?h.totalAngle/v.length:h.totalAngle/(e.actualMax-e.actualMin))>0&&(_=m?f*_*Math.PI/180:f*Math.pow(_,n+1)*Math.PI/180);var x=l._getSymbolFill(o),w=l._getAltSymbolFill(o)||x,A=l._getSymbolStroke(o),P=l._getAltSymbolStroke(o)||A,T=g.length;null!=v&&(T=Math.min(T,v.length));var j,b,C=this.origin,L=0;void 0!==l._getChartType()&&(m=y=!1),C<a.actualMin?C=a.actualMin:C>a.actualMax&&(C=a.actualMax);a.convert(C);var M=e.actualMin,S=e.actualMax,k=a.actualMax;l._isCustomAxisY()&&(m=y=!1),h._areas[o]||(h._areas[o]=[]);for(var R=0;R<T;R++){var I=v?v[R]:R,N=null==g[R]?0:g[R];if(this._getSymbolOrigin&&a.convert(this._getSymbolOrigin(C,R,T)),this._getSymbolStyles){var F=this._getSymbolStyles(R,T);x=F&&F.fill?F.fill:x,w=F&&F.fill?F.fill:w,A=F&&F.stroke?F.stroke:A,P=F&&F.stroke?F.stroke:P}if(j=N>0?x:w,b=N>0?A:P,t.fill=j,t.stroke=b,wijmo_chart_1._DataInfo.isValid(I)&&wijmo_chart_1._DataInfo.isValid(N)){if(m){var X,D,O=I-.5*_,V=I+.5*_;if(O<M&&V<M||O>S&&V>S)continue;if(O=e.convert(O),V=e.convert(V),!wijmo_chart_1._DataInfo.isValid(O)||!wijmo_chart_1._DataInfo.isValid(V))continue;if(y)N/=this.dataInfo.getStackedAbsSum(I);var G=isNaN(d[I])?0:d[I];X=G,D=G+N,d[I]=G+N;var Y=e.convert(I),E=a.convert(X),B=a.convert(D);Y-=_/2,t.drawDonutSegment(h._center.x,h._center.y,B,E,Y+c,_,null,l.symbolStyle),(u=new wijmo_chart_1._DonutSegment(new wijmo_1.Point(h._center.x,h._center.y),B,E,Y+c,_,h.startAngle||0)).tag=new wijmo_chart_1._DataPoint(o,R,I,G+N),this.hitTester.add(u,o)}else{Y=e.convert(I);var W=a.convert(Math.min(N,k));h._convertPoint(W,Y);Y-=_/2,t.drawPieSegment(h._center.x,h._center.y,W,Y+c,_,null,l.symbolStyle),(u=new wijmo_chart_1._PieSegment(new wijmo_1.Point(h._center.x,h._center.y),W,Y+c,_,h.startAngle)).tag=new wijmo_chart_1._DataPoint(o,R,I,N),this.hitTester.add(u,o)}h._areas[o].push(u),r._setPointIndex(R,L),L++}}}},e}(wijmo_chart_1._BarPlotter);exports._RadarBarPlotter=_RadarBarPlotter,function(t){t[t.Column=0]="Column",t[t.Scatter=1]="Scatter",t[t.Line=2]="Line",t[t.LineSymbols=3]="LineSymbols",t[t.Area=4]="Area"}(RadarChartType=exports.RadarChartType||(exports.RadarChartType={}));var FlexRadar=function(t){function e(e,a){var r=t.call(this,e,a)||this;return r._chartType=RadarChartType.Line,r._startAngle=0,r._totalAngle=360,r._reversed=!1,r._areas=[],r}return __extends(e,t),Object.defineProperty(e.prototype,"_radarLinePlotter",{get:function(){return null==this.__radarLinePlotter&&(this.__radarLinePlotter=new _RadarLinePlotter,this._initPlotter(this.__radarLinePlotter)),this.__radarLinePlotter},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_radarColumnPlotter",{get:function(){return null==this.__radarColumnPlotter&&(this.__radarColumnPlotter=new _RadarBarPlotter,this._initPlotter(this.__radarColumnPlotter)),this.__radarColumnPlotter},enumerable:!0,configurable:!0}),e.prototype._initAxes=function(){t.prototype._initAxes.call(this),this.axes.pop(),this.axes.pop(),this.axisX=new FlexRadarAxis(wijmo_chart_1.Position.Bottom),this.axisX.majorGrid=!0,this.axisY=new FlexRadarAxis(wijmo_chart_1.Position.Left),this.axisY.majorTickMarks=wijmo_chart_1.TickMark.Outside,this.axes.push(this.axisX),this.axes.push(this.axisY)},e.prototype._layout=function(e,a,r){t.prototype._layout.call(this,e,a,r);var i=this.axisX._height;this._plotRect.top+=i/2;var n=this._plotRect;this._radius=Math.min(n.width,n.height)/2,this._center=new wijmo_1.Point(n.left+n.width/2,n.top+n.height/2)},Object.defineProperty(e.prototype,"chartType",{get:function(){return this._chartType},set:function(t){(t=wijmo_1.asEnum(t,RadarChartType))!=this._chartType&&(this._chartType=t,this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startAngle",{get:function(){return this._startAngle},set:function(t){t!=this._startAngle&&(this._startAngle=wijmo_1.asNumber(t,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"totalAngle",{get:function(){return this._totalAngle},set:function(t){t!=this._totalAngle&&t>=0&&(this._totalAngle=wijmo_1.asNumber(t,!0),this._totalAngle<=0&&(wijmo_1.assert(!1,"totalAngle must be greater than 0."),this._totalAngle=0),this._totalAngle>360&&(wijmo_1.assert(!1,"totalAngle must be less than or equal to 360."),this._totalAngle=360),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reversed",{get:function(){return this._reversed},set:function(t){t!=this._reversed&&(this._reversed=wijmo_1.asBoolean(t,!0),this.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"stacking",{get:function(){return this._stacking},set:function(t){(t=wijmo_1.asEnum(t,wijmo_chart_1.Stacking))!=this._stacking&&(this._stacking=t,this.invalidate())},enumerable:!0,configurable:!0}),e.prototype._getChartType=function(){var t=wijmo_chart_1.ChartType.Line;switch(this.chartType){case RadarChartType.Area:t=wijmo_chart_1.ChartType.Area;break;case RadarChartType.Line:t=wijmo_chart_1.ChartType.Line;break;case RadarChartType.Column:t=wijmo_chart_1.ChartType.Column;break;case RadarChartType.LineSymbols:t=wijmo_chart_1.ChartType.LineSymbols;break;case RadarChartType.Scatter:t=wijmo_chart_1.ChartType.Scatter}return t},e.prototype._getPlotter=function(e){var a=this.chartType,r=null;if(e){var i=e.chartType;null!=i&&i!=a&&(a=i,!0)}switch(a){case RadarChartType.Line:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case RadarChartType.LineSymbols:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case RadarChartType.Area:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!0,r=this._radarLinePlotter;break;case RadarChartType.Scatter:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!1,this._radarLinePlotter.isArea=!1,r=this._radarLinePlotter;break;case RadarChartType.Column:this._radarColumnPlotter.isVolume=!1,this._radarColumnPlotter.width=.8,r=this._radarColumnPlotter;break;default:r=t.prototype._getPlotter.call(this,e)}return r},e.prototype._convertPoint=function(t,e){var a=new wijmo_1.Point,r=this._center;return a.x=r.x+t*Math.sin(e),a.y=r.y-t*Math.cos(e),a},e.prototype._createSeries=function(){return new FlexRadarSeries},e.prototype._clearCachedValues=function(){t.prototype._clearCachedValues.call(this),this._isPolar=!1,this._areas=[]},e.prototype._performBind=function(){if(this._xDataType=null,this._xlabels.splice(0),this._xvals.splice(0),this._cv){var t=this._cv.items;if(t){for(var e=t.length,a=0;a<e;a++){var r=t[a],i=this.bindingX?new wijmo_1.Binding(this.bindingX):null;if(i){var n=i.getValue(r);wijmo_1.isNumber(n)?(this._xvals.push(wijmo_1.asNumber(n)),this._xDataType=wijmo_1.DataType.Number):wijmo_1.isDate(n)&&(this._xDataType=wijmo_1.DataType.Date),this._xlabels.push(n)}}this._xvals.length==e?this._xlabels.splice(0):this._xvals.splice(0)}}this._xDataType===wijmo_1.DataType.Number&&(this._isPolar=!0)},e.prototype._prepareRender=function(){t.prototype._prepareRender.call(this),this._areas=[]},e}(wijmo_chart_1.FlexChartCore);exports.FlexRadar=FlexRadar;var FlexRadarAxis=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._points=[],e._axisLabels=[],e}return __extends(e,t),e.prototype._render=function(e){var a=this;if(this._hasVisibileSeries()){t.prototype._render.call(this,e);var r=this._axisLabels;if(r.length){var i=function(){var t=a.axisType==wijmo_chart_1.AxisType.X?"wj-axis-x-labels "+wijmo_chart_1.FlexChart._CSS_AXIS_X:"wj-axis-y-labels "+wijmo_chart_1.FlexChart._CSS_AXIS_Y;e.startGroup(t),r.forEach(function(t){var r=t.labelAngle;r>0?wijmo_chart_1.FlexChart._renderRotatedText(e,t.text,t.pos,t.align,t.vAlign,t.pos,r,t.class):r<0?wijmo_chart_1.FlexChart._renderRotatedText(e,t.text,t.pos,t.align,t.vAlign,t.pos,r,t.class):a._renderLabel(e,t.val,t.text,t.pos,t.align,t.vAlign,t.class)}),e.endGroup(),a._axisLabels=[],a._chart.rendered.removeHandler(i)};this._chart.rendered.addHandler(i,this)}}},e.prototype._getHeight=function(e,a){var r=t.prototype._getHeight.call(this,e,a);return this._axisType==wijmo_chart_1.AxisType.Y&&(r=4),this._height=2*r,2*r},e.prototype._getActualRange=function(){return this._isTimeAxis&&null!=this.__actualMax&&null!=this.__actualMin?this.__actualMax-this.__actualMin:t.prototype._getActualRange.call(this)},e.prototype._updateActualLimits=function(e,a,r,i,n){var s=this;void 0===i&&(i=null),void 0===n&&(n=null),t.prototype._updateActualLimits.call(this,e,a,r,i,n);var o,l=this._chart,_=this._lbls,h=this.actualMin.valueOf?this.actualMin.valueOf():this.actualMin,c=this.actualMax.valueOf?this.actualMax.valueOf():this.actualMax;this._lbls&&this===l.axisX&&(l._angles=[],this._isTimeAxis&&0===this._lbls.length&&this._values.forEach(function(t){_.push(s._formatValue(t))}),o=_.length,l.totalAngle<360&&(o-=1),_.forEach(function(t,e){var a=h+e/o*(c-h),r=l.startAngle+e/o*l.totalAngle;isNaN(r)||isNaN(a)||l._angles.push({value:s.convert(a),angle:r}),s._isTimeAxis?((null==s.__actualMin||s.__actualMin>t)&&(s.__actualMin=t),(null==s.__actualMax||s.__actualMax<t)&&(s.__actualMax=t)):null==s.__actualMin&&null==s.__actualMax||(s.__actualMin=null,s.__actualMax=null)}),this._isTimeAxis&&this._lbls.length>0&&(this._updateAutoFormat(0),this._lbls=_.map(function(t){var e=wijmo_1.asDate(t).valueOf();return s._formatValue(e)})))},e.prototype._updateActualLimitsByChartType=function(t,e,a){var r=this._chart;if(r._getChartType()!=wijmo_chart_1.ChartType.Column&&360===r.totalAngle&&this.axisType===wijmo_chart_1.AxisType.X)if(this._isTimeAxis){var i=(r._xlabels.length||r._xvals.length)-1;a+=(a-e)/(i=i<1?1:i)}else r._isPolar||(a+=1);return{min:e,max:a}},e.prototype.convert=function(t,e,a){var r=null==e?this.actualMax:e,i=null==a?this.actualMin:a,n=this._chart;if(!n)return NaN;if(r==i)return 0;if(this.axisType===wijmo_chart_1.AxisType.X)return n.reversed?(n.startAngle-(t-i)/(r-i)*n.totalAngle)*Math.PI/180:(n.startAngle+(t-i)/(r-i)*n.totalAngle)*Math.PI/180;if(this._getLogBase()){if(t<=0)return NaN;var s=Math.log(r/i);return Math.log(t/i)/s*n._radius}return(t-i)/(r-i)*n._radius},e.prototype._renderLineAndTitle=function(t){var e=this._chart,a=wijmo_chart_1.FlexChart._CSS_LINE,r=(e.startAngle-90)*Math.PI/180,i=e.totalAngle*Math.PI/180,n=e._radius;this.axisType===wijmo_chart_1.AxisType.X&&this.axisLine&&(t.stroke=wijmo_chart_1.FlexChart._FG,e._isPolar?(r=e.reversed?r-i:r,t.drawPieSegment(e._center.x,e._center.y,n,r,i,a)):this._renderPolygon(t,n,a))},e.prototype._renderPolygon=function(t,e,a){var r=this._chart,i=r._angles,n=i.length,s=r.axisX.minorGrid,o=[],l=[];if(i.forEach(function(t,a){if(s&&a>0){var n=r._convertPoint(e,t.value-(t.value-i[a-1].value)/2);o.push(n.x),l.push(n.y)}var _=r._convertPoint(e,t.value);o.push(_.x),l.push(_.y)}),r.totalAngle<360)o.push(r._center.x),l.push(r._center.y);else if(s&&n>=2){var _=r._convertPoint(e,i[n-1].value-(i[n-2].value-i[n-1].value)/2);o.push(_.x),l.push(_.y)}t.drawPolygon(o,l,a)},e.prototype._renderMinors=function(t,e,a,r){var i,n=this,s=this._chart,o=wijmo_chart_1.FlexChart._CSS_GRIDLINE_MINOR,l=this.minorGrid,_=s._angles,h=_.length,c=s.axisX.minorGrid,u=wijmo_chart_1.FlexChart._FG,p=this._GRIDLINE_WIDTH,d=(s.startAngle,Math.PI,s.totalAngle,Math.PI,this._TICK_OVERLAP),m=this.minorTickMarks,y=!0;this._vals.minor=e,m==wijmo_chart_1.TickMark.Outside?d=1:m==wijmo_chart_1.TickMark.Inside?d=-1:m==wijmo_chart_1.TickMark.Cross?d=0:y=!1,this.axisType==wijmo_chart_1.AxisType.Y?(t.stroke=u,t.strokeWidth=p,e.forEach(function(e){var a=n.convert(e);if(l&&n._renderYGridLine(t,s,a,o),y&&(_.forEach(function(e,r){if(c&&r>0){i=e.value-(e.value-_[r-1].value)/2;var o=s._convertPoint(a,i);n._drawMinorTickLength(t,d,i,o)}i=e.value;var l=s._convertPoint(a,i);n._drawMinorTickLength(t,d,i,l)}),c&&h>=2)){i=_[h-1].value-(_[h-2].value-_[h-1].value)/2;var r=s._convertPoint(a,i);n._drawMinorTickLength(t,d,i,r)}})):(t.stroke=u,t.strokeWidth=p,e.forEach(function(e){var a=n.convert(e);l&&(n._renderXGridLine(t,s,a,o),y&&n._drawMinorTickLength(t,d,a-Math.PI/2,s._convertPoint(s._radius,a)))}))},e.prototype._drawMinorTickLength=function(t,e,a,r){var i=this._TICK_HEIGHT,n=wijmo_chart_1.FlexChart._CSS_TICK_MINOR,s=.5*(e-1)*i*Math.cos(a),o=.5*(1+e)*i*Math.cos(a),l=.5*(e-1)*i*Math.sin(a),_=.5*(1+e)*i*Math.sin(a);t.drawLine(r.x+s,r.y+l,r.x+o,r.y+_,n)},e.prototype._renderLabelsAndTicks=function(t,e,a,r,i,n,s,o,l){this._points=[],i=this.labelAngle||0;var _,h=this._chart,c=this.labelPadding||2,u=wijmo_chart_1.FlexChart._CSS_LABEL,p=wijmo_chart_1.FlexChart._CSS_GRIDLINE,d=wijmo_chart_1.FlexChart._CSS_TICK,m=wijmo_chart_1.FlexChart._FG,y=this._TICK_WIDTH,g=this.majorGrid,v=wijmo_chart_1.FlexChart._FG,f=this._GRIDLINE_WIDTH,x=h.startAngle*Math.PI/180,w=(h.totalAngle,Math.PI,1);if(this.axisType==wijmo_chart_1.AxisType.Y){g=a!=this.actualMin&&g&&a!=this.actualMax;var A=this.convert(a),P=h._convertPoint(A,x);if(g&&(t.stroke=v,t.strokeWidth=f,this._renderYGridLine(t,h,A,p)),t.stroke=m,t.strokeWidth=y,s){(_=(h.startAngle%360+360)%360)<=90&&_>=75||_>=270&&_<=285?w=2:(_>90&&_<=105||_<270&&_>=255)&&(w=0);var T=new wijmo_1.Point(P.x-c-Math.abs(o-l),P.y);this._axisLabels.push({val:a,text:r,pos:T,align:2,vAlign:w,labelAngle:i,class:u})}n!=wijmo_chart_1.TickMark.None&&t.drawLine(P.x-l*Math.cos(x),P.y-l*Math.sin(x),P.x-o*Math.cos(x),P.y-o*Math.sin(x),d)}else{var j=this.convert(a);if(g&&(t.stroke=v,t.strokeWidth=f,this._renderXGridLine(t,h,j,p)),t.stroke=m,t.strokeWidth=y,s){var b,C,L;T=h._convertPoint(h._radius+c,j);b=h._angles&&h._angles.length?h._angles[e].angle:h.startAngle+(a-this.actualMin)*h.totalAngle/(this.actualMax-this.actualMin),b=(b%=360)>=0?b:b+360,C=this._getXLabelVAlign(b),L=this._getXLabelAlign(b),h._isPolar&&(r=this._formatValue(b)),i>0?wijmo_chart_1.FlexChart._renderRotatedText(t,r,T,L,C,T,i,u):i<0?wijmo_chart_1.FlexChart._renderRotatedText(t,r,T,L,C,T,i,u):this._renderLabel(t,a,r,T,L,C,u)}n!=wijmo_chart_1.TickMark.None&&this._renderXTick(t,h,j,d,o,l)}return!0},e.prototype._renderXGridLine=function(t,e,a,r){var i=e._center,n=e._convertPoint(e._radius,a);t.drawLine(i.x,i.y,n.x,n.y,r)},e.prototype._renderXTick=function(t,e,a,r,i,n){var s,o;e._center;s=e._convertPoint(e._radius+i,a),o=e._convertPoint(e._radius+n,a),t.drawLine(s.x,s.y,o.x,o.y,r)},e.prototype._renderYGridLine=function(t,e,a,r){e._angles;var i=e._center,n=e.startAngle*Math.PI/180,s=e.totalAngle*Math.PI/180;e._isPolar?(n=(e.startAngle-90)*Math.PI/180,n=e.reversed?n-s:n,t.drawPieSegment(i.x,i.y,a,n,s,r)):this._renderPolygon(t,a,r)},e.prototype._getXLabelVAlign=function(t){var e=1,a=this._chart,r=a.startAngle;return a.reversed&&(t=(360+r+(r%360-t%360))%360),0===t?e=2:180===t&&(e=0),e},e.prototype._getXLabelAlign=function(t){var e=0,a=this._chart,r=a.startAngle;return a.reversed&&(t=(360+r+(r%360-t%360))%360),t>0&&t<180?e=-1:t>180&&t<360&&(e=1),e+1},e.prototype._createTimeLabels=function(e,a,r,i){var n=this;if(this._axisType==wijmo_chart_1.AxisType.Y)t.prototype._createTimeLabels.call(this,e,a,r,i);else{var s=this._values;this.format;if(!s||0===s.length)return;s.forEach(function(t){r.push(t),i.push(n._formatValue(t))})}},e.prototype._niceNumber=function(e,a,r){var i=this._chart,n=this.actualMax-this.actualMin,s=i.totalAngle;return s>360&&(s%=360),i._isPolar?s%8==0?n/8:s%6==0?n/6:s%4==0?n/4:s%3==0?n/3:s%2==0?n/2:t.prototype._niceNumber.call(this,e,a,r):t.prototype._niceNumber.call(this,e,a,r)},e}(wijmo_chart_1.Axis);exports.FlexRadarAxis=FlexRadarAxis,wijmo_1._registerModule("wijmo.chart.radar",selfModule);