<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" chartType="Bar" bindingX="name" :tooltipContent="getTooltipContent"
            :itemFormatter="ganttItemFormatter" :rendered="ganttChartRendered" :palette="palette">
            <wj-flex-chart-series binding="start,end"></wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisY" :majorGrid=false :minorGrid=true :reversed=true>
            </wj-flex-chart-axis>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            getTooltipContent(ht) {
                let str = wijmo.format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
                    name: ht.x,
                    start: ht.item.start,
                    end: ht.item.end
                });
                //
                if (ht.item && ht.item.percent != null) {
                    str += wijmo.format('<br/><i>percent complete: {percent}%</i>', ht.item);
                }
                //
                return str;
            },
            // show the percentage complete for each task
            ganttItemFormatter(engine, ht, defaultFormatter) {
                // draw the item as usual
                defaultFormatter();
                //
                // show percentage done
                let task = ht.item;
                //
                if (wijmo.isNumber(task.percent) && task.percent > 0) {
                    let pct = wijmo.clamp(task.percent, 0, 100) / 100,
                        rc = this.$_getTaskRect(ht.series.chart, task).inflate(-8, -8);
                    //
                    engine.fill = pct == 1 ? 'green' : 'gold';//engine.stroke;
                    engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
                }
            },
            // show the task dependencies
            ganttChartRendered(chart, e) {
                let tasks = chart.collectionView.items;
                //
                tasks.forEach(task => { // for each task
                    let parents = this.$_getTaskParents(task, tasks); // get the parent tasks
                    //
                    parents.forEach(parent => { // for each parent
                        this.$_drawConnectingLine(e.engine, chart, task, parent); // draw connector
                    });
                });
            },
            $_drawConnectingLine(engine, chart, task, parent) {
                let rc1 = this.$_getTaskRect(chart, parent),   // parent rect
                    rc2 = this.$_getTaskRect(chart, task),     // task rect
                    x1 = rc1.left + rc1.width / 2,      // parent x center
                    x2 = rc2.left,                      // task left
                    y1 = rc1.bottom,                    // parent bottom
                    y2 = rc2.top + rc2.height / 2;      // task y center
                //
                // draw connecting line
                let xs = [x1, x1, x2],
                    ys = [y1, y2, y2];
                //
                engine.drawLines(xs, ys, 'connector', {
                    stroke: 'black'
                });
                //
                // draw arrow at the end
                let sz = 5;
                //
                xs = [x2 - 2 * sz, x2, x2 - 2 * sz];
                ys = [y2 - sz, y2, y2 + sz];
                //
                engine.drawPolygon(xs, ys, 'arrow', {
                    fill: 'black'
                });
            },
            $_getTaskRect(chart, task) {
                let x1 = chart.axisX.convert(task.start.valueOf()),
                    x2 = chart.axisX.convert(task.end.valueOf()),
                    index = chart.collectionView.items.indexOf(task),
                    y1 = chart.axisY.convert(index - .35),
                    y2 = chart.axisY.convert(index + .35);
                //
                return new wijmo.Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
            },
            $_getTaskParents(task, tasks) {
                let parents = [];
                //
                if (task.parent) {
                    task.parent.split(',').forEach(name => {
                        for (let i = 0; i < tasks.length; i++) {
                            if (tasks[i].name === name) {
                                parents.push(tasks[i]);
                                break;
                            }
                        }
                    });
                }
                //
                return parents;
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>