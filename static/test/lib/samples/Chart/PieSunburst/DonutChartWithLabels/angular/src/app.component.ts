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
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private _sum: number;
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this._sum = this.data.map(c => c.sales).reduce((sum, cur) => sum + cur);
    }
    //
    getLabelContent = (ht: chart.HitTestInfo) => {
        return wijmo.format('{name} {val:p1}', { name: ht.name, val: ht.value / this._sum });
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnimationModule, BrowserModule],
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