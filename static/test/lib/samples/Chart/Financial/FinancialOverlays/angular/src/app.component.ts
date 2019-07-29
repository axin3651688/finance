import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartFinanceModule } from '@grapecity/wijmo.angular2.chart.finance';
import { WjChartFinanceAnalyticsModule } from '@grapecity/wijmo.angular2.chart.finance.analytics';
import { DataService } from './app.data';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: any;
    tooltip: string;
    properties: any;
    overlays: any[];
    selectedOverlay: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.tooltip = '<b>Date:{date:MMM dd}</b><br/>' +
            '<table>' +
            '<tr><td>high</td><td>{high:c}</td><tr/>' +
            '<tr><td>low</td><td>{low:c}</td><tr/>' +
            '<tr><td>open</td><td>{open:c}</td><tr/>' +
            '<tr><td>close</td><td>{close:c}</td><tr/>' +
            '</table>';
        this.palette = this.getRandomPalette();
        this.overlays = dataService.getOverlays();
        this.selectedOverlay = this.overlays[0].abbreviation;
        this.properties = {
            // Bollinger Bands
            bollingerPeriod: 20,
            bollingerMultiplier: 2,

            // Moving Average Envelopes
            envelopePeriod: 20,
            envelopeType: 'Simple',
            envelopeSize: 0.03
        };
    }
    //
    bpChanged = (input: wjInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.bollingerPeriod = input.value;
    };
    //
    bmChanged = (input: wjInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.bollingerMultiplier = input.value;
    };
    //
    esChanged = (input: wjInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.envelopeSize = input.value;
    };
    //
    epChanged = (input: wjInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.envelopePeriod = input.value;
    };
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
    imports: [WjInputModule, WjChartModule, WjChartFinanceModule, WjChartFinanceAnalyticsModule, BrowserModule],
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

