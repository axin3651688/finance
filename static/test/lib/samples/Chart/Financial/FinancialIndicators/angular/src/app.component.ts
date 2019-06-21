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
import { WjChartFinanceAnalyticsModule } from '@grapecity/wijmo.angular2.chart.finance.analytics';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjFinancialChart from '@grapecity/wijmo.chart.finance';
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
    indicators: any;
    selectedIndicator: string;
    @ViewChild('theChart') theChart: wjFinancialChart.FinancialChart;
    @ViewChild('indicatorChart') iChart: wjFinancialChart.FinancialChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
        this.tooltip = '<b>Date:{date:MMM dd}</b><br/>' +
            '<table>' +
            '<tr><td>high</td><td>{high:c}</td><tr/>' +
            '<tr><td>low</td><td>{low:c}</td><tr/>' +
            '<tr><td>open</td><td>{open:c}</td><tr/>' +
            '<tr><td>close</td><td>{close:c}</td><tr/>' +
            '</table>';
        this.indicators = dataService.getIndicatorList();
        this.selectedIndicator = this.indicators[0].abbreviation;
        this.properties = {
            // ATR, CCI, RSI, Williams %R
            atrPeriod: 14,
            cciPeriod: 20,
            rsiPeriod: 14,
            williamsRPeriod: 14,

            // MACD
            fastPeriod: 12,
            slowPeriod: 26,
            smoothingPeriod: 9,
            macdStyles: {   // named styles
                macdLine: {
                    stroke: '#bfa554'
                },
                signalLine: {
                    stroke: '#bf8c54'
                }
            },

            // Fast Stochastic
            stochKPeriod: 14,
            stochDPeriod: 3,
            stochSmoothingPeriod: 1,
            stochStyles: {   // named styles
                kLine: {
                    stroke: '#eddd46'
                },
                dLine: {
                    stroke: '#edb747'
                }
            }
        };
    }
    //
    chartRendered() {
        this.iChart.axisX.min = this.theChart.axisX.actualMin;
        this.iChart.axisX.max = this.theChart.axisX.actualMax;
    }
    //
    fastSlowPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, smoothing;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        smoothing = props.smoothingPeriod;

        props.fastPeriod = wjCore.clamp(props.fastPeriod, 2, Math.abs(len - smoothing));
        props.slowPeriod = wjCore.clamp(props.slowPeriod, 2, Math.abs(len - smoothing));
    }
    //
    smoothingPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.max(props.fastPeriod, props.slowPeriod);
        props.smoothingPeriod = wjCore.clamp(props.smoothingPeriod, 2, Math.abs(len - max));
    }
    //
    stochKPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochDPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochKPeriod = wjCore.clamp(props.stochKPeriod, 2, max);
    }
    //
    stochDPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochDPeriod = wjCore.clamp(props.stochDPeriod, 2, max);
    }
    //
    stochSmoothingPeriodChanged(input: wjInput.InputNumber) {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0 || input.value <= 1) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod - props.stochDPeriod);
        max = max || 1;
        props.stochSmoothingPeriod = wjCore.clamp(input.value, 1, max);
    }
    //
    atrPeriodChanged(input: wjInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.atrPeriod = input.value;
    }
    //
    rsiPeriodChanged(input: wjInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.rsiPeriod = input.value;
    }
    //
    cciPeriodChanged(input: wjInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.cciPeriod = input.value;
    }
    //
    wrPeriodChanged(input: wjInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.williamsRPeriod = input.value;
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

