import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    linesData: string[];
    interactionData: string[];
    lines: string;
    interaction: string;
    lmVisible: boolean;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.linesData = dataService.getLinesData();
        this.interactionData = dataService.getInteractionData();
        this.lines = 'Both';
        this.interaction = 'Move';
        this.lmVisible = false;
    }
    //
    markerContent(ht: wjChart.HitTestInfo) {
        return ht.item
            ? wjCore.format('The value on <b>{date:MMM d, yyyy}</b><br/>is <b>{value:c}</b>', ht.item)
            : 'No items here...';
    }
    //
    ngAfterViewInit() {
        // show the marker when the mouse is over the chart
        this.theChart.addEventListener(this.theChart.hostElement, 'mouseenter', () => {
            this.lmVisible = true;
        });
        this.theChart.addEventListener(this.theChart.hostElement, 'mouseleave', () => {
            this.lmVisible = false;
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule],
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

