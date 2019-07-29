import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    scrollIntoView() {
        this.flex.scrollIntoView(100, -1);
    }

    scrollToTop() {
        // get cell rect, adjust scrollPosition.y to bring it to the top
        let rc = this.flex.cells.getCellBoundingRect(100, 0, true);
        this.flex.scrollPosition = new wjcCore.Point(this.flex.scrollPosition.x, -rc.top);
    }

    private _getData() {
        let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
            id: i,
            country: countries[i % countries.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

