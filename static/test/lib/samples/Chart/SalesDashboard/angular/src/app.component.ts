import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    chartData: any[];
    pieData: any[];
    bulletsData: any[];
    pieHeader: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getSales();
        this.chartData = this.data.month;
        this.pieData = this.data.category;
        this.bulletsData = this.data.category;
        this.pieHeader = "2018 Product Sales";
    }
    //
    pieLabel(ht: any) {
        let sum = ht.chart.itemsSource.map( (c:any) => c.actual).reduce((sum:number, cur:number) => sum + cur);
        return wjCore.Globalize.format(ht.value / sum, 'p0');
    }
    //
    chartSelectionChanged(chart: wjChart.FlexChart) {
        var selIndex = chart._selectionIndex;
        let data = this.data;
        //
        if(selIndex == null || selIndex == -1) {
            this.pieData = data.category;
            this.pieHeader = '2018 Product Sales';
            this.bulletsData = data.category;
        } else {
            let d = data.month[selIndex];
            this.pieData = d.items;
            this.pieHeader = d.month + ' Product Sales';
            this.bulletsData = d.items;
        }
    }
}
//
@NgModule({
    imports: [WjChartModule, WjGaugeModule, BrowserModule],
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

