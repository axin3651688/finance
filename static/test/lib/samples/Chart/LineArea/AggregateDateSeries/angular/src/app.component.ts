import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as interaction from '@grapecity/wijmo.chart.interaction';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
import { AggregateSeries } from './aggregate-series';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('chart') chart: wjChart.FlexChart;
    data: any;
    palette = ['rgba(55,90,127,1)', 'rgba(0,188,140,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(231,76,60,1)', 'rgba(143,97,179,1)', 'rgba(176,135,37,1)', 'rgba(74,73,73,1)', 'rgba(0,0,0,1)'];
    series: AggregateSeries;
    groupAggregate = 'Sum';
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    rangeChanged(sender: interaction.RangeSelector, chart: wjChart.FlexChart) {
        chart.axisX.min = sender.min;
        chart.axisX.max = sender.max;
    }
    //
    ngAfterViewInit() {
        this.series = new AggregateSeries();
        this.chart.beginUpdate();
        this.series.itemsSource = this.dataService.getData();
        this.series.chartType = wjChart.ChartType.LineSymbols;
        this.series.binding = 'close';
        this.series.bindingX = 'date';
        this.series.groupAggregate = <any>this.groupAggregate;
        this.series.autoGroupIntervals = ['DD', 'WW', 'MM', 'YYYY'];
        this.series.autoInterval = true;
        this.chart.series.push(this.series);
        this.chart.endUpdate();
    }
    //
    getTooltipContent(ht: wjChart.HitTestInfo) {
        return (ht && ht.x && ht.y)
            ? `<b>Date:</b> ${wijmo.Globalize.formatDate(ht.x, 'MM-dd-yyyy')}<br><b>Value:</b> ${ht.y.toFixed(2)}`
            : '';
    }
    //
    onMenuItemClick(menu: input.Menu) {
        this.series.groupAggregate = menu.selectedValue;
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartInteractionModule, WjInputModule, BrowserModule],
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