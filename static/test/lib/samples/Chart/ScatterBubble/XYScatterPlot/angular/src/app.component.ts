import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjcChart from '@grapecity/wijmo.chart';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnnotationModule } from '@grapecity/wijmo.angular2.chart.annotation';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flexChart') chart: wjcChart.FlexChart;
    series1: any[];
    series2: any[];
    series3: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.series1 = dataService.getData(50, 0, 3);
        this.series2 = dataService.getData(40, 100, 12);
        this.series3 = dataService.getData(30, -100, 24);
    }
    //
    changeAxisOrigin(e: MouseEvent) {
        let origin = (<HTMLInputElement>e.target).checked ? 0 : null;
        this.chart.axisX.origin = origin;
        this.chart.axisY.origin = origin;
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnnotationModule, BrowserModule],
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