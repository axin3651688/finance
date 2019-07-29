import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        setInterval(()=>{
            this.data = dataService.getData();
        }, 1000);
    }

    chartRendering(s: wjChart.FlexChart, e: any) { // behind the regular chart elements
        var xMin = s.axisX.actualMin.valueOf(),
            xMax = s.axisX.actualMax.valueOf(),
            yMin = s.axisY.actualMin,
            yMax = s.axisY.actualMax;
        if(isNaN(xMin) && isNaN(xMax)) {
            return;
        }
        this.drawAlarmZone(s, e.engine, xMin, 80, xMax, yMax, 'alarm-zone');
        this.drawAlarmZone(s, e.engine, xMin, 50, xMax, 80, 'warning-zone');
        this.drawAlarmZone(s, e.engine, xMin, yMin, xMax, 50, 'safe-zone');
    }
    
    // draw an alarm zone into the chart
    drawAlarmZone(chart: wjChart.FlexChart, engine: wjChart.IRenderEngine, xMin: number, yMin: number, xMax: number, yMax: number, className: string) {
        var pt1 = chart.dataToPoint(xMin, yMin);
        var pt2 = chart.dataToPoint(xMax, yMax);
        engine.drawRect(
            Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y), 
            Math.abs(pt2.x - pt1.x), Math.abs(pt2.y - pt1.y),
            className);
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

