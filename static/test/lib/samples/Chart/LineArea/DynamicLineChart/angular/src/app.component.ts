import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('chart') chart: wjChart.FlexChart;
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(200);
    }
    //
    ngAfterViewInit() {
        this._addPoints();
    }
    //
    private _addPoints() {
        // append new points, remove old points
        let arr = this.chart.collectionView.sourceCollection,
            pt = arr[arr.length - 1],
            y = Math.random() * 100;
        //
        arr.push({ x: pt.x + 1, y: y });
        arr.splice(0, 1);
        //
        // update chart
        this.chart.collectionView.refresh();
        //
        // and keep updating
        setTimeout(() => this._addPoints(), 1000)
    }
}
//\\
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