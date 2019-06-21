import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as interaction from '@grapecity/wijmo.chart.interaction';
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    palette: string[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)', 'rgba(83,179,235,1)', 'rgba(252,101,6,1)', 'rgba(212,35,35,1)', 'rgba(227,187,0,1)', 'rgba(204,204,204,1)', 'rgba(34,34,34,1)'];
    }
    //
    rangeChanged(sender: interaction.RangeSelector, chart: wjChart.FlexChart) {
        chart.axisX.min = sender.min;
        chart.axisX.max = sender.max;
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