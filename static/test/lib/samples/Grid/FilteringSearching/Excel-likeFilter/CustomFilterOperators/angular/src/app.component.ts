import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
        this._customizeFilterConditions();
    }

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    ngAfterViewInit() {
        this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
    }

    private _customizeFilterConditions() {
        // customize the FlexGridFilter conditions
	    let filter = wjcCore.culture.FlexGridFilter,
            Operator = wjcGridFilter.Operator;
        filter.stringOperators = [
            { name: '(doesn\'t matter)', op: null },
            { name: 'Is', op: Operator.EQ },
            { name: 'Is not', op: Operator.NE },
            { name: 'Is bigger than', op: Operator.GT }, // added
            { name: 'Is smaller than', op: Operator.LT } // added
        ];
        filter.numberOperators = [
            { name: '(doesn\'t matter)', op: null },
            { name: 'Is', op: Operator.EQ },
            { name: 'Is not', op: Operator.NE },
            { name: 'Is bigger than', op: Operator.GT },
            { name: 'Is smaller than', op: Operator.LT }
        ];
        filter.dateOperators = [
            { name: '(doesn\'t matter)', op: null },
            { name: 'Is', op: Operator.EQ },
            { name: 'Is earlier than', op: Operator.LT },
            { name: 'Is later than', op: Operator.GT }
        ];
        filter.booleanOperators = [
            { name: '(not set)', op: null },
            { name: 'Is', op: Operator.EQ },
            { name: 'Is not', op: Operator.NE }
        ];
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
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

