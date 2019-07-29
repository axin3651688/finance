import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, ViewChild, enableProdMode, NgModule, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { DataService } from './app.data';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjChart from '@grapecity/wijmo.chart';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    data: any[];
    palette: any;
    @ViewChild('theChart') theChart: wjChart.FlexChart;
    @ViewChild('theSeriesPicker') theSeriesPicker: wjInput.ListBox;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
    }
    //
    ngAfterViewInit() {
        // auto-generate series
        let item = this.data[0];
        for (let k in item) {
            if (wjCore.isNumber(item[k])) {
                let series = new wjChart.Series();
                series.binding = k;
                series.name = wjCore.toHeaderCase(k);
                series['visible'] = true; // add 'visible' property for binding
                this.theChart.series.push(series);
            }
        }
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
    pickerClick(e: Event) {
        wjCore.showPopup(this.theSeriesPicker.hostElement, e.target, false, true, false);
        this.theSeriesPicker.focus();
        e.preventDefault();
    }
    //
    lostFocus() {
        wjCore.hidePopup(this.theSeriesPicker.hostElement);
    }
    //
    checkedItemsChanged(s: wjInput.ListBox) {
        // map extra 'visible' property to 'Series.visibility' values
        this.theChart.series.forEach((series: wjChart.Series) => {
            series.visibility = s.checkedItems.indexOf(series) > -1
                ? wjChart.SeriesVisibility.Visible
                : wjChart.SeriesVisibility.Hidden;
        });
    }
}
//
@NgModule({
    imports: [FormsModule, WjInputModule, WjChartModule, BrowserModule],
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

