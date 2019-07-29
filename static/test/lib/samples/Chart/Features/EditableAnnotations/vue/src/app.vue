<template>
    <div class="container-fluid">
        <div class="form-group">
            <label id="labelIsEditable" for="checkboxIsEditable">Is Editable:</label>
            <input type="checkbox" id="checkboxIsEditable" v-model="isEditable" v-on:change="editableChange" />
            <wj-flex-chart bindingX="x" chartType="Scatter" :itemsSource="data" tooltipContent="" :rendered="chartRendered" :initialized="chartInitialized">
                <wj-flex-chart-series name="Data" binding="y"></wj-flex-chart-series>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    import { EditableAnnotationLayer, Button } from './EditableAnnotationLayer';
    import { AxisScrollbar } from './AxisScrollbar';
    import * as core from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';
    import * as annotation from '@grapecity/wijmo.chart.annotation';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                isEditable: true,
                al: null
            }
        },
        methods: {
            editableChange: function() {
                if(this.al) {
                    this.al.isEditable = this.isEditable;
                }
            },
            chartInitialized: function(flex) {
                this.theChart = flex;
                let axisScrollBar = new AxisScrollbar(this.theChart.axes[0]);
                window.setTimeout(function () {
                    axisScrollBar.maxPos = 0.5;
                }, 20);
            },
            chartRendered: function() {
                let al = this.al;
                if (!al) {
                    al = new EditableAnnotationLayer(this.theChart);
                    this.al = al;
                    al.isEditable = this.isEditable;

                    //add customize button
                    var triangle, triangleBtn = new Button(function (engine) {
                        var triangleIcon = new annotation.Polygon({
                            tooltip: 'Custom Button - Triangle </br>Select to add Triangle Annotation.',
                            points: [{
                                x: 10, y: 5
                            }, {
                                x: 5, y: 15
                            }, {
                                x: 15, y: 15
                            }],
                            style: {
                                fill: 'yellow'
                            }
                        });
                        triangleIcon.render(engine);
                        return triangleIcon._element;
                    }, function (point, isDataCoordinate) {
                        var x = isDataCoordinate ? point.dx : point.x,
                            y = isDataCoordinate ? point.dy : point.y;
                        triangle = new annotation.Polygon({
                            attachment: isDataCoordinate ? annotation.AnnotationAttachment.DataCoordinate : annotation.AnnotationAttachment.Absolute,
                            tooltip: 'Customize Annotation - Triangle',
                            points: [{
                                x: x, y: y
                            }, {
                                x: x, y: y
                            }, {
                                x: x, y: y
                            }],
                            style: {
                                fill: 'yellow'
                            }
                        });
                        al.items.push(triangle);
                    }, function (originPoint, currentPoint, isDataCoordinate) {
                        var ox = isDataCoordinate ? originPoint.dx : originPoint.x,
                            oy = isDataCoordinate ? originPoint.dy : originPoint.y,
                            cx = isDataCoordinate ? currentPoint.dx : currentPoint.x,
                            cy = isDataCoordinate ? currentPoint.dy : currentPoint.y,
                            offsetX = Math.abs(cx - ox),
                            offsetY = cy - oy,
                            isXDate = core.isDate(ox),
                            isYDate = core.isDate(oy),
                            oaDate = wjChart.FlexChart._fromOADate;

                        triangle.points.clear();
                        triangle.points.push({ x: ox, y: isYDate ? oaDate(oy - offsetY) : oy - offsetY });
                        triangle.points.push({ x: isXDate ? oaDate(ox - offsetX) : ox - offsetX, y: isYDate ? oaDate(oy - 0 + offsetY) : oy + offsetY });
                        triangle.points.push({ x: isXDate ? oaDate(ox - 0 + offsetX) : ox + offsetX, y: isYDate ? oaDate(oy - 0 + offsetY) : oy + offsetY });
                    });
                    al.buttons.push(triangleBtn);

                    //add pre-defined annotations.
                    var watermarker = new annotation.Text({
                        position: annotation.AnnotationPosition.Left | annotation.AnnotationPosition.Top,
                        attachment: annotation.AnnotationAttachment.Relative,
                        text: 'watermarker',
                        tooltip: 'Text Watermarker',
                        point: { x: 1, y: 1 },
                        style: { 'fill': '#cccccc', 'font-size': '30px', opacity: 0.2 }
                    });
                    al.items.push(watermarker);

                    var imgmarker = new annotation.Image({
                        position: annotation.AnnotationPosition.Right | annotation.AnnotationPosition.Top,
                        attachment: annotation.AnnotationAttachment.Relative,
                        tooltip: 'Image Watermarker',
                        point: { x: 0, y: 1 },
                        width: 128,
                        height: 33,
                        href: 'resources/wijmo-logo-text.png',
                        style: { opacity: 0.2 }

                    });
                    al.items.push(imgmarker);

                    var centerHLine = new annotation.Line({
                        attachment: annotation.AnnotationAttachment.DataCoordinate,
                        position: annotation.AnnotationPosition.Center,
                        content: 'Vertical Center Line',
                        start: { x: 50, y: 0 },
                        end: { x: 50, y: 1000 },
                        style: {
                            'stroke-width': '2px',
                            stroke: 'green'
                        }
                    });
                    al.items.push(centerHLine);

                    var centerVLine = new annotation.Line({
                        attachment: annotation.AnnotationAttachment.Relative,
                        position: annotation.AnnotationPosition.Center,
                        content: 'Horizontal Center Line',
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                        style: {
                            'stroke-width': '2px',
                            stroke: 'red'
                        }
                    });
                    al.items.push(centerVLine);

                    var topRange = new annotation.Polygon({
                        attachment: annotation.AnnotationAttachment.Relative,
                        points: [{ x: 0, y: 0 }, { x: 0, y: 0.2 }, { x: 1, y: 0.2 }, { x: 1, y: 0 }],
                        content: 'Top Range',
                        style: { fill: '#FEF0DB', opacity: 0.5, stroke: '#FEF0DB' }
                    });
                    al.items.push(topRange);

                    //flag
                    var pointIndex = 10;
                    ['black', 'blue', 'green', 'red', 'yellow'].forEach(function (v) {
                        var flagSrc = 'resources/flag-' + v + '-icon.png';
                        var flag = new annotation.Image({
                            attachment: annotation.AnnotationAttachment.DataIndex,
                            seriesIndex: 0,
                            pointIndex: pointIndex,
                            width: 24,
                            height: 24,
                            href: flagSrc

                        });
                        al.items.push(flag);
                        pointIndex += 10;
                    });

                    var rect = new annotation.Rectangle({
                        attachment: annotation.AnnotationAttachment.DataCoordinate,
                        point: { x: 10, y: 650 },
                        width: 120,
                        height: 150,
                        style: {
                            'stroke-dasharray': '4 4',
                            stroke: 'red'
                        }
                    });
                    al.items.push(rect);

                    var circle = new annotation.Circle({
                        seriesIndex: 0,
                        attachment: annotation.AnnotationAttachment.DataCoordinate,
                        radius: 80,
                        point: { x: 70, y: 350 },
                        style: {
                            stroke: 'blue',
                            fill: 'blue',
                            opacity: 0.3
                        }
                    });
                    al.items.push(circle);
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }

    .wj-flexchart .wjanno-editable-layer .wjanno-container {
        fill: #eee;
        stroke: #666;
        stroke-width: 1;
    }

    .wj-flexchart .wjanno-editable-layer .wjanno-dc-icon .wjanno-container {
        fill: #eee;
    }

    .wj-flexchart .wjanno-editable-layer .wjanno-icon-selected .wjanno-container {
        fill: #89E;
    }

    .no-selection {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
    }

    .wj-flexchart {
        padding-bottom: 25px;
    }
    /****  Axis Scrollbar Css *****/
    .wj-flexchart .wj-axis-scrollbar-container {
        position: relative;
    }

    .wj-flexchart .wj-axis-scrollbar-container .wj-chart-rangeslider {
        border: 1px solid #EAEAEA;    
        background-color: #EAEAEA;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .wj-flexchart .wj-axis-scrollbar-container .wj-chart-hrangeslider {
        height: 20px;
    }

    .wj-flexchart .wj-axis-scrollbar-container .wj-chart-vrangeslider {
        width: 20px;
    }

</style>
