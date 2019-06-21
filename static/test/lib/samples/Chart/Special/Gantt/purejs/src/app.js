import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create Gantt chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        chartType: 'Bar',
        bindingX: 'name',
        tooltip: {
            content: getTooltipContent
        },
        axisY: {
            majorGrid: false,
            minorGrid: true,
            reversed: true
        },
        itemFormatter: ganttItemFormatter,
        rendered: ganttChartRendered,
        series: [
            { binding: 'start,end' }
        ],
        palette: getRandomPalette()
    });
    //
    // utilities
    function getTooltipContent(ht) {
        let str = wjCore.format('<b>{name}</b>:<br/>{start:d} - {end:d}', {
            name: ht.x,
            start: ht.item.start,
            end: ht.item.end
        });
        //
        if (ht.item && ht.item.percent != null) {
            str += wjCore.format('<br/><i>percent complete: {percent}%</i>', ht.item);
        }
        //
        return str;
    }
    //
    // show the percentage complete for each task
    function ganttItemFormatter(engine, hti, defaultFormatter) {
        // draw the item as usual
        defaultFormatter();
        //
        // show percentage done
        let task = hti.item;
        //
        if (wjCore.isNumber(task.percent) && task.percent > 0) {
            let pct = wjCore.clamp(task.percent, 0, 100) / 100, rc = getTaskRect(hti.series.chart, task).inflate(-8, -8);
            //
            engine.fill = pct == 1 ? 'green' : 'gold'; //engine.stroke;
            engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
        }
    }
    //
    // show the task dependencies
    function ganttChartRendered(chart, e) {
        let tasks = chart.collectionView.items;
        //
        tasks.forEach(task => {
            let parents = getTaskParents(task, tasks); // get the parent tasks
            //
            parents.forEach(function (parent) {
                drawConnectingLine(e.engine, chart, task, parent); // draw connector
            });
        });
    }
    //
    function drawConnectingLine(engine, chart, task, parent) {
        let rc1 = getTaskRect(chart, parent), // parent rect
        rc2 = getTaskRect(chart, task), // task rect
        x1 = rc1.left + rc1.width / 2, // parent x center
        x2 = rc2.left, // task left
        y1 = rc1.bottom, // parent bottom
        y2 = rc2.top + rc2.height / 2; // task y center
        //
        // draw connecting line
        let xs = [x1, x1, x2], ys = [y1, y2, y2];
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
    }
    //
    function getTaskRect(chart, task) {
        let x1 = chart.axisX.convert(task.start.valueOf()), x2 = chart.axisX.convert(task.end.valueOf()), index = chart.collectionView.items.indexOf(task), y1 = chart.axisY.convert(index - .35), y2 = chart.axisY.convert(index + .35);
        //
        return new wjCore.Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
    }
    //
    function getTaskParents(task, tasks) {
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
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
        .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return wjChart.Palettes[palettes[rand]];
}
