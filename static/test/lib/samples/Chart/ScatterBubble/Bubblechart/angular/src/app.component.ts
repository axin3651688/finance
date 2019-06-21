import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: TDataItem[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    customTooltip(ht: chart.HitTestInfo) {
        let item: TDataItem = ht.item;
        //
        return `<b>${item.country}</b>:<table class="chart-tip">` +
                `<tr><td>Sales</td><td>${wijmo.Globalize.format(item.sales, 'c0')}</td></tr>` +
                `<tr><td>Expenses</td><td>${wijmo.Globalize.format(item.expenses, 'c0')}</td></tr>` +
                `<tr><td>Downloads</td><td>${wijmo.Globalize.format(item.downloads, 'n0')}</td></tr>` +
                `</table>`;
    }
}
//
@NgModule({
    imports: [WjChartModule, BrowserModule],
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