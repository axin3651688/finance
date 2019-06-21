import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartFinanceModule } from '@grapecity/wijmo.angular2.chart.finance';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { WjChartAnnotationModule } from '@grapecity/wijmo.angular2.chart.annotation';
import { WjChartFinanceAnalyticsModule } from '@grapecity/wijmo.angular2.chart.finance.analytics';
import { DataService } from './app.data';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartFinance from '@grapecity/wijmo.chart.finance';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: any;
    tooltip: string;
    selectedFib: string;
    properties: any;
    // references control in the view
    @ViewChild('theChart') theChart: wjChartFinance.FinancialChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
        this.tooltip =  '<b>Date:{date:MMM dd}</b><br/>' +
            '<table>' +
            '<tr><td>high</td><td>{high:c}</td><tr/>' +
            '<tr><td>low</td><td>{low:c}</td><tr/>' +
            '<tr><td>open</td><td>{open:c}</td><tr/>' +
            '<tr><td>close</td><td>{close:c}</td><tr/>' +
            '</table>';
        this.selectedFib = 'retracements';
        this.properties = {
            retracements: {
                labelPosition: 'Left',
                uptrend: true,
            },
            arcs: {
                labelPosition: 'Top',
                start: new wjChart.DataPoint(46, 19.75),
                end: new wjChart.DataPoint(54, 17.1)

            },
            fans: {
                labelPosition: 'Top',
                start: new wjChart.DataPoint(10, 18.12),
                end: new wjChart.DataPoint(32, 20.53)
            },
            timeZones: {
                labelPosition: 'Right',
                start: 0,
                end: 3
            }
        };
    }
    //
    valueChanged() {
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
          .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjChart.Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartFinanceModule, WjChartInteractionModule, WjChartAnnotationModule, WjChartFinanceAnalyticsModule, BrowserModule],
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

