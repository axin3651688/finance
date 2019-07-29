import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjChart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data1: any[];
    data2: any[];
    data3: any[];
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data1 = dataService.getData(50, 0, 3);
        this.data2 = dataService.getData(40, 100, 12);
        this.data3 = dataService.getData(30, -100, 24);
    }
    //
    export(type: string) {
        this.theChart.saveImageToFile('FlexChart.' + type);
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

