import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: any;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
            .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjChart.Palettes[palettes[rand]];
    }
    //
    customGridLine(cb: HTMLInputElement) {
        wjCore.toggleClass(this.theChart.hostElement, 'custom-gridlines', cb.checked);
    }
    //
    customUnits(cu: HTMLInputElement) {
        let theChart = this.theChart;
        if (cu.checked) {
            theChart.axisX.majorUnit = 7;
            theChart.axisX.minorUnit = 1;
            theChart.axisY.majorUnit = 20;
            theChart.axisY.minorUnit = 5;
        } else {
            theChart.axisX.majorUnit = null;
            theChart.axisX.minorUnit = null;
            theChart.axisY.majorUnit = null;
            theChart.axisY.minorUnit = null;
        }
    }
}
//
@NgModule({
    imports: [WjChartModule, FormsModule, BrowserModule],
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

