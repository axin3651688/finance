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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_1=require("wijmo/wijmo"),wijmo_chart_1=require("wijmo/wijmo.chart"),selfModule=require("wijmo/wijmo.chart.radar");class FlexRadarSeries extends wijmo_chart_1.SeriesBase{get chartType(){return this._finChartType}set chartType(t){(t=wijmo_1.asEnum(t,RadarChartType,!0))!=this._finChartType&&(this._finChartType=t,this._invalidate())}_getChartType(){var t;switch(this.chartType){case RadarChartType.Area:t=wijmo_chart_1.ChartType.Area;break;case RadarChartType.Line:t=wijmo_chart_1.ChartType.Line;break;case RadarChartType.Column:t=wijmo_chart_1.ChartType.Column;break;case RadarChartType.LineSymbols:t=wijmo_chart_1.ChartType.LineSymbols;break;case RadarChartType.Scatter:t=wijmo_chart_1.ChartType.Scatter}return t}}exports.FlexRadarSeries=FlexRadarSeries;class _RadarLinePlotter extends wijmo_chart_1._LinePlotter{constructor(){super(...arguments),this.isArea=!1}_getLabelPoint(t,a){var e=t._getAxisX(),r=t._getAxisY(),i=e.convert(a.dataX),s=r.convert(a.dataY);return this.chart._convertPoint(s,i)}plotSeries(t,a,e,r,i,s,h){var _=wijmo_1.asType(r,wijmo_chart_1.SeriesBase),l=this.chart,n=_._getChartType()||l._getChartType(),o=l.series.indexOf(r),c=r.getValues(0),u=r.getValues(1);if(!c)return;u||(u=this.dataInfo.getXVals());var d=wijmo_chart_1._BasePlotter.cloneStyle(r.style,["fill"]),g=c.length,m=!0;u?g=Math.min(g,u.length):(m=!1,u=new Array(g));var p=this._DEFAULT_WIDTH,v=_._getSymbolFill(o),x=_._getAltSymbolFill(o)||v,w=_._getSymbolStroke(o),y=_._getAltSymbolStroke(o)||w,A=_._getSymbolSize();t.stroke=w,t.strokeWidth=p,t.fill=v;var T=new Array,P=new Array,j=e.actualMax,C=this.stacking!=wijmo_chart_1.Stacking.None&&!_._isCustomAxisY(),L=this.stacking==wijmo_chart_1.Stacking.Stacked100pc&&!_._isCustomAxisY();void 0!==_._getChartType()&&(C=L=!1);var M=_.interpolateNulls,f=!1;let b=this.getItemFormatter(r);for(var S=0;S<g;S++){var k=m?u[S]:S,R=null==c[S]?0:c[S];if(wijmo_chart_1._DataInfo.isValid(k)&&wijmo_chart_1._DataInfo.isValid(R)){if(C){if(L)R/=this.dataInfo.getStackedAbsSum(k);if(R>=0){var I=isNaN(this.stackPos[k])?0:this.stackPos[k];R=this.stackPos[k]=I+R}else{I=isNaN(this.stackNeg[k])?0:this.stackNeg[k];R=this.stackNeg[k]=I+R}}var N;R=Math.min(R,j),N=new wijmo_chart_1._DataPoint(o,S,k,R);var F=a.convert(k),X=e.convert(R),D=this.chart._convertPoint(X,F);if(k=D.x,R=D.y,isNaN(k)||isNaN(R))f=!0,!0!==M&&(T.push(void 0),P.push(void 0));else{T.push(k),P.push(R);var V=new wijmo_chart_1._CircleArea(new wijmo_1.Point(k,R),.5*A);V.tag=N,this.hitTester.add(V,o)}}else f=!0,!0!==M&&(T.push(void 0),P.push(void 0))}var G=0;if(this.hasLines)if(this.isArea?t.fill=v||i._getColorLight(o):t.fill="none",f&&!0!==M){var Y=[],E=[];for(S=0;S<g;S++)void 0===T[S]?(Y.push(void 0),E.push(0)):(Y.push(T[S]),E.push(P[S]));Y.length>1&&(l._isPolar&&n!==wijmo_chart_1.ChartType.Area?this._drawLines(t,Y,E,null,d,this.chart._plotrectId):(l.totalAngle<360&&(Y.push(l._center.x),E.push(l._center.y)),t.drawPolygon(Y,E,null,d,this.chart._plotrectId)),this.hitTester.add(new wijmo_chart_1._LinesArea(Y,E),o),G++)}else l._isPolar&&n!==wijmo_chart_1.ChartType.Area?this._drawLines(t,T,P,null,d,this.chart._plotrectId):(l.totalAngle<360&&(T.push(l._center.x),P.push(l._center.y)),t.drawPolygon(T,P,null,d,this.chart._plotrectId)),this.hitTester.add(new wijmo_chart_1._LinesArea(T,P),o),G++;t.fill=v;for(S=0;S<g;S++){k=T[S],R=P[S];!1===this.hasLines&&(t.fill=c[S]>0?v:x,t.stroke=c[S]>0?w:y),this.isValid(k,R,a,e)&&((this.hasSymbols||b)&&A>0&&this._drawSymbol(t,k,R,A,_,S,b),r._setPointIndex(S,G),G++)}}}exports._RadarLinePlotter=_RadarLinePlotter;class _RadarBarPlotter extends wijmo_chart_1._BarPlotter{adjustLimits(t,a){this.dataInfo=t;var e=t.getMinX(),r=t.getMinY(),i=t.getMaxX(),s=t.getMaxY(),h=t.getDeltaX();return h<=0&&(h=1),this.chart.totalAngle<360&&(h=0),this.unload(),this.chart.axisY._getLogBase()||(this.origin>s?s=this.origin:this.origin<r&&(r=this.origin)),new wijmo_1.Rect(e,r,i-e+h,s-r)}_getLabelPoint(t,a){var e=t._getAxisX(),r=t._getAxisY(),i=e.convert(a.dataX),s=r.convert(a.dataY);return this.chart._convertPoint(s,i)}plotSeries(t,a,e,r,i,s,h){var _=this.chart.series.indexOf(r),l=wijmo_1.asType(r,wijmo_chart_1.SeriesBase),n=(this.chart._options,this.width),o=this.chart,c=-90*Math.PI/180;s=s||0;var u,d=l._getAxisY()._uniqueId,g=(this.stackNegMap[d],this.stackPosMap[d]),m=this.stacking!=wijmo_chart_1.Stacking.None,p=this.stacking==wijmo_chart_1.Stacking.Stacked100pc,v=r.getValues(0),x=r.getValues(1);if(v){var w;x||(x=this.dataInfo.getXVals()),(w=x?o.totalAngle/x.length:o.totalAngle/(a.actualMax-a.actualMin))>0&&(n=m?w*n*Math.PI/180:w*Math.pow(n,s+1)*Math.PI/180);var y=l._getSymbolFill(_),A=l._getAltSymbolFill(_)||y,T=l._getSymbolStroke(_),P=l._getAltSymbolStroke(_)||T,j=v.length;null!=x&&(j=Math.min(j,x.length));var C,L,M=this.origin,f=0;void 0!==l._getChartType()&&(m=p=!1),M<e.actualMin?M=e.actualMin:M>e.actualMax&&(M=e.actualMax);e.convert(M);var b=a.actualMin,S=a.actualMax,k=e.actualMax;l._isCustomAxisY()&&(m=p=!1),o._areas[_]||(o._areas[_]=[]);for(var R=0;R<j;R++){var I=x?x[R]:R,N=null==v[R]?0:v[R];if(this._getSymbolOrigin&&e.convert(this._getSymbolOrigin(M,R,j)),this._getSymbolStyles){var F=this._getSymbolStyles(R,j);y=F&&F.fill?F.fill:y,A=F&&F.fill?F.fill:A,T=F&&F.stroke?F.stroke:T,P=F&&F.stroke?F.stroke:P}if(C=N>0?y:A,L=N>0?T:P,t.fill=C,t.stroke=L,wijmo_chart_1._DataInfo.isValid(I)&&wijmo_chart_1._DataInfo.isValid(N)){if(m){var X,D,V=I-.5*n,G=I+.5*n;if(V<b&&G<b||V>S&&G>S)continue;if(V=a.convert(V),G=a.convert(G),!wijmo_chart_1._DataInfo.isValid(V)||!wijmo_chart_1._DataInfo.isValid(G))continue;if(p)N/=this.dataInfo.getStackedAbsSum(I);var Y=isNaN(g[I])?0:g[I];X=Y,D=Y+N,g[I]=Y+N;var E=a.convert(I),B=e.convert(X),O=e.convert(D);E-=n/2,t.drawDonutSegment(o._center.x,o._center.y,O,B,E+c,n,null,l.symbolStyle),(u=new wijmo_chart_1._DonutSegment(new wijmo_1.Point(o._center.x,o._center.y),O,B,E+c,n,o.startAngle||0)).tag=new wijmo_chart_1._DataPoint(_,R,I,Y+N),this.hitTester.add(u,_)}else{E=a.convert(I);var W=e.convert(Math.min(N,k));o._convertPoint(W,E);E-=n/2,t.drawPieSegment(o._center.x,o._center.y,W,E+c,n,null,l.symbolStyle),(u=new wijmo_chart_1._PieSegment(new wijmo_1.Point(o._center.x,o._center.y),W,E+c,n,o.startAngle)).tag=new wijmo_chart_1._DataPoint(_,R,I,N),this.hitTester.add(u,_)}o._areas[_].push(u),r._setPointIndex(R,f),f++}}}}}var RadarChartType;exports._RadarBarPlotter=_RadarBarPlotter,function(t){t[t.Column=0]="Column",t[t.Scatter=1]="Scatter",t[t.Line=2]="Line",t[t.LineSymbols=3]="LineSymbols",t[t.Area=4]="Area"}(RadarChartType=exports.RadarChartType||(exports.RadarChartType={}));class FlexRadar extends wijmo_chart_1.FlexChartCore{constructor(t,a){super(t,a),this._chartType=RadarChartType.Line,this._startAngle=0,this._totalAngle=360,this._reversed=!1,this._areas=[]}get _radarLinePlotter(){return null==this.__radarLinePlotter&&(this.__radarLinePlotter=new _RadarLinePlotter,this._initPlotter(this.__radarLinePlotter)),this.__radarLinePlotter}get _radarColumnPlotter(){return null==this.__radarColumnPlotter&&(this.__radarColumnPlotter=new _RadarBarPlotter,this._initPlotter(this.__radarColumnPlotter)),this.__radarColumnPlotter}_initAxes(){super._initAxes(),this.axes.pop(),this.axes.pop(),this.axisX=new FlexRadarAxis(wijmo_chart_1.Position.Bottom),this.axisX.majorGrid=!0,this.axisY=new FlexRadarAxis(wijmo_chart_1.Position.Left),this.axisY.majorTickMarks=wijmo_chart_1.TickMark.Outside,this.axes.push(this.axisX),this.axes.push(this.axisY)}_layout(t,a,e){super._layout(t,a,e);var r=this.axisX._height;this._plotRect.top+=r/2;var i=this._plotRect;this._radius=Math.min(i.width,i.height)/2,this._center=new wijmo_1.Point(i.left+i.width/2,i.top+i.height/2)}get chartType(){return this._chartType}set chartType(t){(t=wijmo_1.asEnum(t,RadarChartType))!=this._chartType&&(this._chartType=t,this.invalidate())}get startAngle(){return this._startAngle}set startAngle(t){t!=this._startAngle&&(this._startAngle=wijmo_1.asNumber(t,!0),this.invalidate())}get totalAngle(){return this._totalAngle}set totalAngle(t){t!=this._totalAngle&&t>=0&&(this._totalAngle=wijmo_1.asNumber(t,!0),this._totalAngle<=0&&(wijmo_1.assert(!1,"totalAngle must be greater than 0."),this._totalAngle=0),this._totalAngle>360&&(wijmo_1.assert(!1,"totalAngle must be less than or equal to 360."),this._totalAngle=360),this.invalidate())}get reversed(){return this._reversed}set reversed(t){t!=this._reversed&&(this._reversed=wijmo_1.asBoolean(t,!0),this.invalidate())}get stacking(){return this._stacking}set stacking(t){(t=wijmo_1.asEnum(t,wijmo_chart_1.Stacking))!=this._stacking&&(this._stacking=t,this.invalidate())}_getChartType(){var t=wijmo_chart_1.ChartType.Line;switch(this.chartType){case RadarChartType.Area:t=wijmo_chart_1.ChartType.Area;break;case RadarChartType.Line:t=wijmo_chart_1.ChartType.Line;break;case RadarChartType.Column:t=wijmo_chart_1.ChartType.Column;break;case RadarChartType.LineSymbols:t=wijmo_chart_1.ChartType.LineSymbols;break;case RadarChartType.Scatter:t=wijmo_chart_1.ChartType.Scatter}return t}_getPlotter(t){var a=this.chartType,e=null;if(t){var r=t.chartType;null!=r&&r!=a&&(a=r,!0)}switch(a){case RadarChartType.Line:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,e=this._radarLinePlotter;break;case RadarChartType.LineSymbols:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!1,e=this._radarLinePlotter;break;case RadarChartType.Area:this._radarLinePlotter.hasSymbols=!1,this._radarLinePlotter.hasLines=!0,this._radarLinePlotter.isArea=!0,e=this._radarLinePlotter;break;case RadarChartType.Scatter:this._radarLinePlotter.hasSymbols=!0,this._radarLinePlotter.hasLines=!1,this._radarLinePlotter.isArea=!1,e=this._radarLinePlotter;break;case RadarChartType.Column:this._radarColumnPlotter.isVolume=!1,this._radarColumnPlotter.width=.8,e=this._radarColumnPlotter;break;default:e=super._getPlotter(t)}return e}_convertPoint(t,a){var e=new wijmo_1.Point,r=this._center;return e.x=r.x+t*Math.sin(a),e.y=r.y-t*Math.cos(a),e}_createSeries(){return new FlexRadarSeries}_clearCachedValues(){super._clearCachedValues(),this._isPolar=!1,this._areas=[]}_performBind(){if(this._xDataType=null,this._xlabels.splice(0),this._xvals.splice(0),this._cv){var t=this._cv.items;if(t){for(var a=t.length,e=0;e<a;e++){var r=t[e];let a=this.bindingX?new wijmo_1.Binding(this.bindingX):null;if(a){var i=a.getValue(r);wijmo_1.isNumber(i)?(this._xvals.push(wijmo_1.asNumber(i)),this._xDataType=wijmo_1.DataType.Number):wijmo_1.isDate(i)&&(this._xDataType=wijmo_1.DataType.Date),this._xlabels.push(i)}}this._xvals.length==a?this._xlabels.splice(0):this._xvals.splice(0)}}this._xDataType===wijmo_1.DataType.Number&&(this._isPolar=!0)}_prepareRender(){super._prepareRender(),this._areas=[]}}exports.FlexRadar=FlexRadar;class FlexRadarAxis extends wijmo_chart_1.Axis{constructor(){super(...arguments),this._points=[],this._axisLabels=[]}_render(t){if(this._hasVisibileSeries()){super._render(t);var a=this._axisLabels;if(a.length){var e=()=>{var r=this.axisType==wijmo_chart_1.AxisType.X?"wj-axis-x-labels "+wijmo_chart_1.FlexChart._CSS_AXIS_X:"wj-axis-y-labels "+wijmo_chart_1.FlexChart._CSS_AXIS_Y;t.startGroup(r),a.forEach(a=>{var e=a.labelAngle;e>0?wijmo_chart_1.FlexChart._renderRotatedText(t,a.text,a.pos,a.align,a.vAlign,a.pos,e,a.class):e<0?wijmo_chart_1.FlexChart._renderRotatedText(t,a.text,a.pos,a.align,a.vAlign,a.pos,e,a.class):this._renderLabel(t,a.val,a.text,a.pos,a.align,a.vAlign,a.class)}),t.endGroup(),this._axisLabels=[],this._chart.rendered.removeHandler(e)};this._chart.rendered.addHandler(e,this)}}}_getHeight(t,a){var e=super._getHeight(t,a);return this._axisType==wijmo_chart_1.AxisType.Y&&(e=4),this._height=2*e,2*e}_getActualRange(){return this._isTimeAxis&&null!=this.__actualMax&&null!=this.__actualMin?this.__actualMax-this.__actualMin:super._getActualRange()}_updateActualLimits(t,a,e,r=null,i=null){super._updateActualLimits(t,a,e,r,i);var s,h=this._chart,_=this._lbls,l=this.actualMin.valueOf?this.actualMin.valueOf():this.actualMin,n=this.actualMax.valueOf?this.actualMax.valueOf():this.actualMax;this._lbls&&this===h.axisX&&(h._angles=[],this._isTimeAxis&&0===this._lbls.length&&this._values.forEach(t=>{_.push(this._formatValue(t))}),s=_.length,h.totalAngle<360&&(s-=1),_.forEach((t,a)=>{var e=l+a/s*(n-l),r=h.startAngle+a/s*h.totalAngle;isNaN(r)||isNaN(e)||h._angles.push({value:this.convert(e),angle:r}),this._isTimeAxis?((null==this.__actualMin||this.__actualMin>t)&&(this.__actualMin=t),(null==this.__actualMax||this.__actualMax<t)&&(this.__actualMax=t)):null==this.__actualMin&&null==this.__actualMax||(this.__actualMin=null,this.__actualMax=null)}),this._isTimeAxis&&this._lbls.length>0&&(this._updateAutoFormat(0),this._lbls=_.map(t=>{let a=wijmo_1.asDate(t).valueOf();return this._formatValue(a)})))}_updateActualLimitsByChartType(t,a,e){var r=this._chart;if(r._getChartType()!=wijmo_chart_1.ChartType.Column&&360===r.totalAngle&&this.axisType===wijmo_chart_1.AxisType.X)if(this._isTimeAxis){var i=(r._xlabels.length||r._xvals.length)-1;e+=(e-a)/(i=i<1?1:i)}else r._isPolar||(e+=1);return{min:a,max:e}}convert(t,a,e){var r=null==a?this.actualMax:a,i=null==e?this.actualMin:e,s=this._chart;if(!s)return NaN;if(r==i)return 0;if(this.axisType===wijmo_chart_1.AxisType.X)return s.reversed?(s.startAngle-(t-i)/(r-i)*s.totalAngle)*Math.PI/180:(s.startAngle+(t-i)/(r-i)*s.totalAngle)*Math.PI/180;if(this._getLogBase()){if(t<=0)return NaN;var h=Math.log(r/i);return Math.log(t/i)/h*s._radius}return(t-i)/(r-i)*s._radius}_renderLineAndTitle(t){var a=this._chart,e=wijmo_chart_1.FlexChart._CSS_LINE,r=(a.startAngle-90)*Math.PI/180,i=a.totalAngle*Math.PI/180,s=a._radius;this.axisType===wijmo_chart_1.AxisType.X&&this.axisLine&&(t.stroke=wijmo_chart_1.FlexChart._FG,a._isPolar?(r=a.reversed?r-i:r,t.drawPieSegment(a._center.x,a._center.y,s,r,i,e)):this._renderPolygon(t,s,e))}_renderPolygon(t,a,e){var r=this._chart,i=r._angles,s=i.length,h=r.axisX.minorGrid,_=[],l=[];if(i.forEach((t,e)=>{if(h&&e>0){var s=r._convertPoint(a,t.value-(t.value-i[e-1].value)/2);_.push(s.x),l.push(s.y)}var n=r._convertPoint(a,t.value);_.push(n.x),l.push(n.y)}),r.totalAngle<360)_.push(r._center.x),l.push(r._center.y);else if(h&&s>=2){var n=r._convertPoint(a,i[s-1].value-(i[s-2].value-i[s-1].value)/2);_.push(n.x),l.push(n.y)}t.drawPolygon(_,l,e)}_renderMinors(t,a,e,r){var i,s=this._chart,h=wijmo_chart_1.FlexChart._CSS_GRIDLINE_MINOR,_=this.minorGrid,l=s._angles,n=l.length,o=s.axisX.minorGrid,c=wijmo_chart_1.FlexChart._FG,u=this._GRIDLINE_WIDTH,d=(s.startAngle,Math.PI,s.totalAngle,Math.PI,this._TICK_OVERLAP),g=this.minorTickMarks,m=!0;this._vals.minor=a,g==wijmo_chart_1.TickMark.Outside?d=1:g==wijmo_chart_1.TickMark.Inside?d=-1:g==wijmo_chart_1.TickMark.Cross?d=0:m=!1,this.axisType==wijmo_chart_1.AxisType.Y?(t.stroke=c,t.strokeWidth=u,a.forEach(a=>{var e=this.convert(a);if(_&&this._renderYGridLine(t,s,e,h),m&&(l.forEach((a,r)=>{if(o&&r>0){i=a.value-(a.value-l[r-1].value)/2;var h=s._convertPoint(e,i);this._drawMinorTickLength(t,d,i,h)}i=a.value;var _=s._convertPoint(e,i);this._drawMinorTickLength(t,d,i,_)}),o&&n>=2)){i=l[n-1].value-(l[n-2].value-l[n-1].value)/2;var r=s._convertPoint(e,i);this._drawMinorTickLength(t,d,i,r)}})):(t.stroke=c,t.strokeWidth=u,a.forEach(a=>{var e=this.convert(a);_&&(this._renderXGridLine(t,s,e,h),m&&this._drawMinorTickLength(t,d,e-Math.PI/2,s._convertPoint(s._radius,e)))}))}_drawMinorTickLength(t,a,e,r){var i=this._TICK_HEIGHT,s=wijmo_chart_1.FlexChart._CSS_TICK_MINOR,h=.5*(a-1)*i*Math.cos(e),_=.5*(1+a)*i*Math.cos(e),l=.5*(a-1)*i*Math.sin(e),n=.5*(1+a)*i*Math.sin(e);t.drawLine(r.x+h,r.y+l,r.x+_,r.y+n,s)}_renderLabelsAndTicks(t,a,e,r,i,s,h,_,l){this._points=[],i=this.labelAngle||0;var n,o=this._chart,c=this.labelPadding||2,u=wijmo_chart_1.FlexChart._CSS_LABEL,d=wijmo_chart_1.FlexChart._CSS_GRIDLINE,g=wijmo_chart_1.FlexChart._CSS_TICK,m=wijmo_chart_1.FlexChart._FG,p=this._TICK_WIDTH,v=this.majorGrid,x=wijmo_chart_1.FlexChart._FG,w=this._GRIDLINE_WIDTH,y=o.startAngle*Math.PI/180,A=(o.totalAngle,Math.PI,1);if(this.axisType==wijmo_chart_1.AxisType.Y){v=e!=this.actualMin&&v&&e!=this.actualMax;var T=this.convert(e),P=o._convertPoint(T,y);if(v&&(t.stroke=x,t.strokeWidth=w,this._renderYGridLine(t,o,T,d)),t.stroke=m,t.strokeWidth=p,h){(n=(o.startAngle%360+360)%360)<=90&&n>=75||n>=270&&n<=285?A=2:(n>90&&n<=105||n<270&&n>=255)&&(A=0);var j=new wijmo_1.Point(P.x-c-Math.abs(_-l),P.y);this._axisLabels.push({val:e,text:r,pos:j,align:2,vAlign:A,labelAngle:i,class:u})}s!=wijmo_chart_1.TickMark.None&&t.drawLine(P.x-l*Math.cos(y),P.y-l*Math.sin(y),P.x-_*Math.cos(y),P.y-_*Math.sin(y),g)}else{var C=this.convert(e);if(v&&(t.stroke=x,t.strokeWidth=w,this._renderXGridLine(t,o,C,d)),t.stroke=m,t.strokeWidth=p,h){var L,M,f;j=o._convertPoint(o._radius+c,C);L=o._angles&&o._angles.length?o._angles[a].angle:o.startAngle+(e-this.actualMin)*o.totalAngle/(this.actualMax-this.actualMin),L=(L%=360)>=0?L:L+360,M=this._getXLabelVAlign(L),f=this._getXLabelAlign(L),o._isPolar&&(r=this._formatValue(L)),i>0?wijmo_chart_1.FlexChart._renderRotatedText(t,r,j,f,M,j,i,u):i<0?wijmo_chart_1.FlexChart._renderRotatedText(t,r,j,f,M,j,i,u):this._renderLabel(t,e,r,j,f,M,u)}s!=wijmo_chart_1.TickMark.None&&this._renderXTick(t,o,C,g,_,l)}return!0}_renderXGridLine(t,a,e,r){var i=a._center,s=a._convertPoint(a._radius,e);t.drawLine(i.x,i.y,s.x,s.y,r)}_renderXTick(t,a,e,r,i,s){var h,_;a._center;h=a._convertPoint(a._radius+i,e),_=a._convertPoint(a._radius+s,e),t.drawLine(h.x,h.y,_.x,_.y,r)}_renderYGridLine(t,a,e,r){a._angles;var i=a._center,s=a.startAngle*Math.PI/180,h=a.totalAngle*Math.PI/180;a._isPolar?(s=(a.startAngle-90)*Math.PI/180,s=a.reversed?s-h:s,t.drawPieSegment(i.x,i.y,e,s,h,r)):this._renderPolygon(t,e,r)}_getXLabelVAlign(t){var a=1,e=this._chart,r=e.startAngle;return e.reversed&&(t=(360+r+(r%360-t%360))%360),0===t?a=2:180===t&&(a=0),a}_getXLabelAlign(t){var a=0,e=this._chart,r=e.startAngle;return e.reversed&&(t=(360+r+(r%360-t%360))%360),t>0&&t<180?a=-1:t>180&&t<360&&(a=1),a+1}_createTimeLabels(t,a,e,r){if(this._axisType==wijmo_chart_1.AxisType.Y)super._createTimeLabels(t,a,e,r);else{var i=this._values;this.format;if(!i||0===i.length)return;i.forEach(t=>{e.push(t),r.push(this._formatValue(t))})}}_niceNumber(t,a,e){var r=this._chart,i=this.actualMax-this.actualMin,s=r.totalAngle;return s>360&&(s%=360),r._isPolar?s%8==0?i/8:s%6==0?i/6:s%4==0?i/4:s%3==0?i/3:s%2==0?i/2:super._niceNumber(t,a,e):super._niceNumber(t,a,e)}}exports.FlexRadarAxis=FlexRadarAxis,wijmo_1._registerModule("wijmo.chart.radar",selfModule);