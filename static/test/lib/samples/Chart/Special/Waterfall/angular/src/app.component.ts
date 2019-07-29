import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from '@grapecity/wijmo.angular2.chart.analytics';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    connectorLines = false;
    showTotal = false;
    styles = {
        start: { fill: 'blue', stroke: 'blue' },
        total: { fill: 'yellow', stroke: 'yellow' },
        falling: { fill: 'red', stroke: 'red' },
        rising: { fill: 'green', stroke: 'green' },
        connectorLines: { stroke: 'blue', 'stroke-dasharray': '3, 1' }
    };
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    randomizeData() {
        this.data = this.dataService.getData();
    }
}
//
@NgModule({
    imports: [FormsModule, WjChartModule, WjChartAnalyticsModule, BrowserModule],
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

