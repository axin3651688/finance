import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjcChart from '@grapecity/wijmo.chart';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnnotationModule } from '@grapecity/wijmo.angular2.chart.annotation';
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
    customTooltip(ht: wjcChart.HitTestInfo) {
        let item: TDataItem = ht.item;
        return `<b>Movie:</b> ${item.movie} </br><b>Grossing:</b> ${item.gross}</br><b>rating:</b> ${item.rating}`;
    }
    //
    customDataLabel(ht: wjcChart.HitTestInfo) {
        return (<TDataItem>ht.item).movie;
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnnotationModule, BrowserModule],
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