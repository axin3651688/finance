import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { WjChartFinanceModule } from '@grapecity/wijmo.angular2.chart.finance';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';
import * as wjChartInteraction from '@grapecity/wijmo.chart.interaction';
import * as wjFinance from '@grapecity/wijmo.chart.finance';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    tooltip: string;
    volYAxis: wjChart.Axis;
    @ViewChild('theChart') theChart: wjFinance.FinancialChart;
    @ViewChild('rsChart') rsChart: wjFinance.FinancialChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.tooltip = '<b>{date:MMM dd}</b><br/>' +
            '<table>' +
            '<tr><td>high</td><td>{high:c}</td><tr/>' +
            '<tr><td>low</td><td>{low:c}</td><tr/>' +
            '<tr><td>open</td><td>{open:c}</td><tr/>' +
            '<tr><td>close</td><td>{close:c}</td><tr/>' +
            '<tr><td>volume</td><td>{volume:c}</td><tr/>' +
            '</table>';
    }
    //
    ngAfterViewInit() {
        let al = new wjAnnotation.AnnotationLayer(this.theChart, this.dataService.getAnnotations());
    }
    //
    render() {
        let volYAxis = this.volYAxis;
        if (!volYAxis) {
            var volSeries = this.theChart.series[1];
            volYAxis = new wjChart.Axis(0);
            volSeries.axisY = volYAxis;
            if (volSeries.getValues(0)) {
                volYAxis.max = Math.max.apply(null, volSeries.getValues(0)) * 8;
            }
        }
    }
    //
    reRender(rs: wjChartInteraction.RangeSelector, chart: wjFinance.FinancialChart) {
        // set range
        if (rs) {
            var range = this.findRange(chart.axisX.actualMin, chart.axisX.actualMax);
            rs.min = range.min;
            rs.max = range.max;
        }
    }
    //
    rangeChanged (rs: wjChartInteraction.RangeSelector, chart: wjFinance.FinancialChart) {
        // update main chart's x & y range
        chart.axisX.min = rs.min;
        chart.axisX.max = rs.max;
        let yRange = this.findYRange(this.data, rs.min, rs.max);
        chart.axisY.min = yRange.min;
        chart.axisY.max = yRange.max;
        chart.invalidate();
    }
    // helper method to calculate (upper) percentage of total range
    // the default will show the top 20% of the available range
    findRange(min: number, max: number, percent?: number) {
        var pctToShow = wjCore.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2,
            range = {
                min: NaN,
                max: NaN
            };

        if (wjCore.isDate(min) && wjCore.isDate(max)) {
            range.max = max.valueOf();
            range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
        } else if (wjCore.isNumber(min) && wjCore.isNumber(max)) {
            range.max = max;
            range.min = (max - min) * (1 - pctToShow) + min;
        }

        return range;
    }
    //
    // assumes High, Low, Open, Close, and Volume data
    // also assumes category axis
    findYRange(data: any[], xmin: number, xmax: number) {
        var item, i, ymin = null, ymax = null;

        for (i = 0; i < data.length; i++) {
            item = data[i];

            let v = item.date.valueOf();
            if (xmin > v || v > xmax) {
                continue;
            }

            if (ymax === null || item.close > ymax) {
                ymax = item.close;
            }
            if (ymin === null || item.close < ymin) {
                ymin = item.close;
            }
        }

        return {
            min: ymin,
            max: ymax
        };
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartInteractionModule, WjChartFinanceModule, BrowserModule],
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

