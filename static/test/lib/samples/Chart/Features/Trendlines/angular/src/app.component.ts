import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from '@grapecity/wijmo.angular2.chart.analytics';
import { DataService } from './app.data';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjChartAnalytics from '@grapecity/wijmo.chart.analytics';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    cbData: string[];
    order: number;
    @ViewChild('eqEle') eqEle: HTMLInputElement;
    @ViewChild('orderIpt') orderIpt: wjInput.InputNumber;
    @ViewChild('trendline') trendLine: wjChartAnalytics.TrendLine;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.cbData = dataService.getComboData();
        this.order = 2;
    }
    //
    showEquation() {
        if(this.eqEle) {
            this.eqEle.innerHTML = '';
            setTimeout(() => this.eqEle.innerHTML = this.trendLine.getEquation(), 100);
        }
    }
    //
    randomData() {
        this.data = this.dataService.getData();
        this.showEquation();
    }
    //
    textChanged(s: wjInput.ComboBox) {
        let trendLine = this.trendLine;
        if(!trendLine) {
            return;
        }
        trendLine.name = s.text;
        if (s.text) { // show trendline
            trendLine.fitType = <any>s.text;
            trendLine.visibility = wjChart.SeriesVisibility.Visible;
        } else { // hide trendline
            trendLine.visibility = wjChart.SeriesVisibility.Hidden;
        }
        switch (s.text) { // enable/disable order input
            case 'Polynomial':
            case 'Fourier':
                this.orderIpt.isDisabled = false;
                break;
            default:
                this.orderIpt.isDisabled = true;
                break;
        }
        this.showEquation();
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartAnalyticsModule, BrowserModule],
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

