import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService, TTask } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: TTask[];
    palette: string[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this._getRandomPalette();
    }
    //
    getTooltipContent(ht: wjChart.HitTestInfo) {
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
    ganttItemFormatter = (engine: wjChart.IRenderEngine, ht: wjChart.HitTestInfo, defaultFormatter: Function) => {
        // draw the item as usual
        defaultFormatter();
        //
        // show percentage done
        let task: TTask = ht.item;
        //
        if (wjCore.isNumber(task.percent) && task.percent > 0) {
            let pct = wjCore.clamp(task.percent, 0, 100) / 100,
                rc = this._getTaskRect(ht.series.chart, task).inflate(-8, -8);
            //
            engine.fill = pct == 1 ? 'green' : 'gold';//engine.stroke;
            engine.drawRect(rc.left, rc.top, rc.width * pct, rc.height);
        }
    }
    //
    // show the task dependencies
    ganttChartRendered = (chart: wjChart.FlexChart, e: wjChart.RenderEventArgs) => {
        let tasks: TTask[] = chart.collectionView.items;
        //
        tasks.forEach(task => { // for each task
            let parents = this._getTaskParents(task, tasks); // get the parent tasks
            //
            parents.forEach(parent => { // for each parent
                this._drawConnectingLine(e.engine, chart, task, parent); // draw connector
            });
        });
    }
    //
    //
    private _getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
            .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjChart.Palettes[palettes[rand]];
    }
    //
    private _drawConnectingLine(engine: wjChart.IRenderEngine, chart: wjChart.FlexChart, task: TTask, parent: TTask) {
        let rc1 = this._getTaskRect(chart, parent),   // parent rect
            rc2 = this._getTaskRect(chart, task),     // task rect
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
    }
    //
    private _getTaskRect(chart: wjChart.FlexChartCore, task: TTask) {
        let x1 = chart.axisX.convert(task.start.valueOf()),
            x2 = chart.axisX.convert(task.end.valueOf()),
            index = chart.collectionView.items.indexOf(task),
            y1 = chart.axisY.convert(index - .35),
            y2 = chart.axisY.convert(index + .35);
        //
        return new wjCore.Rect(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
    }
    //
    private _getTaskParents(task: TTask, tasks: TTask[]) {
        let parents: TTask[] = [];
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
@NgModule({
    imports: [WjChartModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

