import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode,ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjcChartInteraction from '@grapecity/wijmo.chart.interaction';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    isViewInitialized = false;
    data: any[];
    palette: any[];
    pt: wjcCore.Point;
    props: any[];
    // references control in the view
    @ViewChild('chart1') chart1: wjcChart.FlexChart;
    @ViewChild('chart2') chart2: wjcChart.FlexChart;
    @ViewChild('chart3') chart3: wjcChart.FlexChart;
    @ViewChild('selector') selector: wjcChartInteraction.RangeSelector;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = [ '#88bde6', 'blue', 'red' ];
        this.pt = new wjcCore.Point();
        this.markerContent = this.markerContent.bind(this);
        this.props = ['MeanPressure', 'Precipitation'];
    }
    //
    ngAfterViewInit() {
        this.isViewInitialized = true;
            
        [this.chart1, this.chart2, this.chart3].forEach(chart => {
            if (chart) {
                chart.rendered.addHandler(() => {
                    var ele = chart.hostElement.querySelector('.wj-chart-linemarker');
                    if (ele) {
                        (<HTMLElement>ele).style.display = 'none';
                    }
                });
            }
        });
    }
    //
    rangeChanged() {
        this.update(this.selector.min, this.selector.max);
    }
    //
    update(min: number, max: number) {
        [this.chart1, this.chart2, this.chart3].forEach(function (chart) {
            chart.axisX.min = min;
            chart.axisX.max = max;
            chart.invalidate();
        });
    }
    //   
    markerPositionChanged(chart: wjcChart.FlexChart, marker: wjcChart.LineMarker, point: wjcCore.Point) {
        this.pt = point;
        this.changeMarker(chart, marker);
    }
    //
    changeMarker(curChart: wjcChart.FlexChart, marker: wjcChart.LineMarker) {
        if (!this.isViewInitialized) {
            return;
        }
        let curHost = curChart.hostElement,
            vline: HTMLElement = curHost.querySelector('.wj-chart-linemarker-vline');
            
        [this.chart1, this.chart2, this.chart3].forEach(chart => {
            if (chart) {
                var ele = <any>chart.hostElement.querySelector('.wj-chart-linemarker');
                if (chart === curChart) {
                    ele.style.display = 'block';
                } else {
                    ele.style.display = 'none';
                }
            }
        });

        vline.style.height = 326 + 'px';
    }
    //
    markerContent() {
        return this.getMarkercontent(new wjcCore.Point(this.pt.x, NaN));
    }
    getMarkercontent(pt: wjcCore.Point) {
        if (!this.chart1 || !this.chart1.itemsSource) {
            return;
        }
        var chart = this.chart1,
            ht = chart.series[0].hitTest(pt),
            item = chart.itemsSource[ht.pointIndex],
            content = '',
            len = this.props.length;

        if (!item) {
            return;
        }
        for (var i = 0; i < chart.series.length; i++) {
            var series = chart.series[i];
            // find series lines to get its color
            var polyline = series.hostElement.querySelector('polyline');

            // add series info to the marker content
            if (ht.x && ht.y !== null) {
                if (i == 0) {
                    content += wjcCore.Globalize.formatDate(ht.x, 'dd-MMM');
                }
                content += '<div style="color:' + polyline.getAttribute('stroke') + '">' + series.name + ' = ' + item[series.name].toFixed() + '</div>';
            }

        }
        for (var i = 0; i < len; i++) {
            content += '<div>' + this.props[i] + ' = ' + item[this.props[i]].toFixed() + '</div>';
        }
        return content;
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

