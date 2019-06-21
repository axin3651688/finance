import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as chart from '@grapecity/wijmo.chart';
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
    palette: any;
    rotated: boolean;
    showMeanLine: boolean;
    showMeanMarker: boolean;
    showInnerPoints: boolean;
    showOutliers: boolean;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.rotated = false;
        this.palette = this._getRandomPalette();
        this.showMeanLine = false;
        this.showMeanMarker = false;
        this.showInnerPoints = false;
        this.showOutliers = false;
    }

    randomizeData() {
        this.data = this.dataService.getData();
    }
    //
    private _getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(chart.Palettes)
          .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return chart.Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjChartModule, WjChartAnalyticsModule, BrowserModule, FormsModule],
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

