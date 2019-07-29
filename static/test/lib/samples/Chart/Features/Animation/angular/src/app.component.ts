import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { DataService } from './app.data';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnimation from '@grapecity/wijmo.chart.animation';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    flexChartPoints: number;
    duration: number;
    chartType: string;
    easing: string;
    animationMode: string;
    // references control in the view
    @ViewChild('flexChart') flexChart: wjChart.FlexChart;
    @ViewChild('animation') animation: wjChartAnimation.ChartAnimation;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.flexChartPoints = 10;
        this._setDataSource();
        this.duration = 400;
        this.chartType = 'Line';
        this.easing = 'Swing';
        this.animationMode = 'All';
    }
    //
    _setDataSource() {
        this.data = this.dataService.getData(this.flexChartPoints);
    }
    //
    resetChartData() {
        this._setDataSource();
    }
    //
    itemAdd(args: wjInput.Menu) {
        var idx = args.selectedIndex;
        if (idx > -1) {
            this.func('add', idx);
        }
    }

    itemRemove(args: wjInput.Menu) {
        var idx = args.selectedIndex;
        if (idx > -1) {
            this.func('remove', idx);
        }
    }

    func(oper: string, idx: number) {
        var str = '', funcName;
        if (idx === 1) {
            str = 'FirstPoint';
        } else if (idx === 2) {
            str = 'LastPoint';
        }
        funcName = oper + 'ChartSeries' + str;
        this[funcName]();
    }

    addChartSeriesFirstPoint = function () {
        this.data.insert(0, this.dataService.getRandomData('added' + this.dataService.getRandomValue(1000)));
    };

    addChartSeriesLastPoint = function () {
        this.data.push(this.dataService.getRandomData('added' + this.dataService.getRandomValue(1000)));
    };

    removeChartSeriesFirstPoint = function () {
        if (this.data.length) {
            this.data.removeAt(0);
        }
    };

    removeChartSeriesLastPoint = function () {
        if (this.data.length) {
            this.data.pop();
        }
    };

    valueChanged = (sender: wjInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.duration = sender.value;
    };

    addChartSeries = function () {
        var chart = this.flexChart,
            len = chart.series.length;

        if (len >= 5) {
            return;
        }
        var series = new wjChart.Series();
        series.binding = len ? 'y' + len : 'y';
        series.name = 'Y' + (chart.series.length + 1);
        chart.series.push(series);
       
    };

    removeChartSeries = function () {
        var chart = this.flexChart;

        if (chart.series.length <= 0) {
            return;
        }
        chart.series.pop();
    };

    animationModeChanged() {
        this.animation.animationMode = <any>this.animationMode;
        this.flexChart.refresh(true);
    }
}
//
@NgModule({
    imports: [FormsModule, WjInputModule, WjChartModule, WjChartAnimationModule, BrowserModule],
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

