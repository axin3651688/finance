import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    ngAfterViewInit() {
        // ratings are values from 0 to 5
        let filterRating = this.filter.getColumnFilter('rating');
        filterRating.valueFilter.uniqueValues = [0, 1, 2, 3, 4, 5];
        // limit number of values shown in sales filter
        let filterSales = this.filter.getColumnFilter('sales');
        filterSales.valueFilter.maxValues = 20;
        // filter expenses only by condition
        let filterExpenses = this.filter.getColumnFilter('expenses');
        filterExpenses.filterType = wjcGridFilter.FilterType.Condition;
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                rating: Math.round(Math.random() * 5),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}

@NgModule({
  imports: [WjGridModule, WjGridFilterModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

