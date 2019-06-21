import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjcCore from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjcGauge from '@grapecity/wijmo.gauge';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    // nation data
    yrMin = 1800;
    yrMax = 2009;
    animLength = 15000; // 15s for the full animation
    animating = 0;
    data: wjcCore.CollectionView;
    //
    private _year: number;
    @ViewChild('lineGauge') lineGauge: wjcGauge.LinearGauge;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this._year = this.yrMin;
        this.data = dataService.getData();
        this.toggleAnimation(); // start animation when data is loaded
    }
    get year(): number {
        return this._year;
    }
    set year(value: number) {
        this._year = value;
        this._updateData();
    }
    //
    ngAfterViewInit() {
        if (this.lineGauge) {
            this.lineGauge.face.thickness = 0.08;
        }
    }
    //
    toggleAnimation() {
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        } else {
            let min = (this.year < this.yrMax - 10) ? this.year : this.yrMin,
                max = this.yrMax,
                duration = this.animLength * (max - min) / (this.yrMax - this.yrMin);
            //
            this.animating = wjcCore.animate((pct: number) => {
                this.year = Math.round(min + (max - min) * pct);
                if (pct == 1) {
                    this.animating = null;
                }
            }, duration);
        }
    }
    //
    stopAnimation() {
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        }
    }
    //
    chartItemFormatter(engine: wjcChart.IRenderEngine, hitTestInfo: wjcChart.HitTestInfo, defaultFormat: Function) {
        if (hitTestInfo.chartElement == wjcChart.ChartElement.SeriesSymbol) {
            let fill = 'black',
                stroke = 'black';
            //
            switch (hitTestInfo.item.region) {
                case 'Sub-Saharan Africa':
                    fill = '#1F77B4';
                    break;
                case 'South Asia':
                    fill = '#FF7F0E';
                    break;
                case 'Middle East & North Africa':
                    fill = '#2CA02C';
                    break;
                case 'America':
                    fill = '#D62728';
                    break;
                case 'Europe & Central Asia':
                    fill = '#9467BD';
                    break;
                case 'East Asia & Pacific':
                    fill = '#8C564B';
                    break;
            }
            //
            engine.fill = fill;
            engine.stroke = stroke;
            engine.strokeWidth = 1;
            //
            defaultFormat();
        }
    }
    //
    private _updateData() {
        let year = this.year,
            items: TDataItem[] = this.data.items;
        //
        items.forEach(item => {
            (<any>item).yearIncome = this._interpolate(item.income, year);
            (<any>item).yearLifeExpectancy = this._interpolate(item.lifeExpectancy, year);
            //
            let pop = this._interpolate(item.population, year);
            if (pop > 1000000) pop = Math.round(pop / 1000000) * 1000000;
            (<any>item).yearPopulation = pop;
        });
        //
        this.data.refresh();
    }
    //
    private _interpolate(arr: number[][], year: number): number {
        // binary search
        let min = 0,
            max = arr.length - 1,
            cur: number,
            item: number[];
        //
        while (min <= max) {
            cur = (min + max) >>> 1,
                item = arr[cur];
            if (item[0] > year) {
                max = cur - 1;
            } else if (item[0] < year) {
                min = cur + 1;
            } else {
                return item[1]; // found year, no need to interpolate
            }
        }
        //
        // before the first/after the last
        if (min == 0) return arr[min][1];
        if (min == arr.length) return arr[max][1];
        //
        // in range: interpolate
        let pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
        return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
    }
}
//
@NgModule({
    imports: [WjChartModule, WjGaugeModule, BrowserModule],
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