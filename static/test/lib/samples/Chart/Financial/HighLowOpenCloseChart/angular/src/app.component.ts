import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
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
    palette: any;
    lmVisible: boolean;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
        this.lmVisible = false;
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
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
          .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjChart.Palettes[palettes[rand]];
    } 
    //
    markerContent(ht: wjChart.HitTestInfo) {
        if(ht.item) {
            let s = `<b>Date</b>: ${wjCore.Globalize.formatDate(ht.item.date, 'yyyy-MM-dd')}`;
            for(let key in ht.item) {
                if(key !== 'date') {
                    s += `</br> ${key}: ${ht.item[key]}`;
                }
            }
            return s;
        } else {
            return 'No items here...';
        }
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

