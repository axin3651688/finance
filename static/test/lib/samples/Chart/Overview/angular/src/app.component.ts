import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
import { AggregateSeries } from './AggregateSeries';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartInteraction from '@grapecity/wijmo.chart.interaction';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: string[];
    aggSeries: AggregateSeries;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)', 'rgba(83,179,235,1)', 'rgba(252,101,6,1)', 'rgba(212,35,35,1)', 
        'rgba(227,187,0,1)', 'rgba(204,204,204,1)', 'rgba(34,34,34,1)'];
    }
    //
    ngAfterViewInit() {
        let series = new AggregateSeries();
        let theChart = this.theChart;
        theChart.beginUpdate();
        series.itemsSource = this.data;
        series.chartType = wjChart.ChartType.Column;
        series.binding = 'close';
        series.bindingX = 'date';
        series.name = 'Aggregate Avg';
        series.groupAggregate = wjCore.Aggregate.Avg;
        //series.groupAggregate = core.Aggregate.Avg;
        series.autoGroupIntervals = ["YYYY"];
        series.autoInterval = true;
        theChart.series.push(series);
        this.aggSeries = series;
        theChart.endUpdate();
    }
    //
    tooltip(ht: wjChart.HitTestInfo) {
        if (!ht) {
            return '';
        } else if (ht.x && ht.y) {
            return '<b>Date:</b> ' + wjCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                '<b>Value:</b> ' + ht.y.toFixed(2);
        }
    }
    //
    chartItemFormatter(engine: wjChart.IRenderEngine, hitTestInfo: wjChart.HitTestInfo, defaultFormat: Function) {
        let ht = hitTestInfo;
  
        if(ht.series instanceof AggregateSeries && ht.chartElement == wjChart.ChartElement.SeriesSymbol) {
          let s: any = ht.series,
            len = s.getValues(0).length,
            vLen = s._values.length,
            c: any = ht.chart,
            ax = c.axisX,
            dx = c._dataInfo.dx * vLen / len,
            pt = ht.point,
            y = c.axisY.convert(c.axisY.actualMin),
            x = Math.abs(ax.convert(dx) - ax.convert(0));
          
          engine.drawRect(pt.x - x / 2, pt.y, x, y - pt.y, null, s.symbolStyle/* ,'plotRect'*/);
        } else {
          // render element as usual
          defaultFormat();
        }
    }
    //
    rangeChanged(sender: wjChartInteraction.RangeSelector) {
        let theChart = this.theChart;
        theChart.beginUpdate();
        theChart.axisX.min = sender.min;
        theChart.axisX.max = sender.max;
        if(this.aggSeries.autoGroupIntervals.length === 1) {
            this.aggSeries.autoGroupIntervals = ['WW', 'MM', 'YYYY'];
        }
        theChart.endUpdate();
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartInteractionModule, BrowserModule],
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

