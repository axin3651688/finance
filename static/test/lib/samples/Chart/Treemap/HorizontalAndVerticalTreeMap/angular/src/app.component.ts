import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartHierarchicalModule } from '@grapecity/wijmo.angular2.chart.hierarchical';
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    palette: any;
    bindingName: string[];
    type: any;
    selectedValue: string;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
        this.palette = this.getRandomPalette();
        this.bindingName = ['category', 'subCategory'];
        this.type = 0;
    }
    //
    // change chart type
    menuItemClicked(menu: input.Menu) {
        this.type = parseInt(menu.selectedValue);
    }
    //
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(chart.Palettes)
          .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return chart.Palettes[palettes[rand]];
    }
}
//
@NgModule({
    imports: [WjInputModule, WjChartHierarchicalModule, BrowserModule],
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

