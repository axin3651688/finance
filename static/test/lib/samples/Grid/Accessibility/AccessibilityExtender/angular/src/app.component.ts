import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { AccessibilityExtender } from './app.accessibility-extender';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    private _acX: AccessibilityExtender;
    private _toSearch: number;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData(100);
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    ngAfterViewInit() {
        this._acX = new AccessibilityExtender(this.flex);
        document.querySelector('#filter').addEventListener('input', (e: any) => {
            clearTimeout(this._toSearch);
            this._toSearch = setTimeout(() => {
                let search = (<HTMLInputElement>e.target).value,
                    rx = new RegExp(search, 'i');
                this.flex.collectionView.filter = (item: any) => {
                    return !search || JSON.stringify(item).match(rx) != null;
                }
        
                // notify users that a filter was applied
                setTimeout(() => {
                    let msg = search
                        ? 'grid filtered on ' + search
                        : 'filter removed';
                    msg += ': ' + this.flex.rows.length + ' items displayed';
                    this._acX.alert(msg);
                }, 200);
            }, 900);
          });
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // notify users when columns are sorted
        flex.sortedColumn.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let col = s.columns[e.col];
            this._acX.alert('column ' + col.header +
                ' sorted in ' + (col.currentSort == '+' ? 'ascending' : 'descending') + ' order');
        });
    }

    private _getData(count: number) {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            products = 'Tents,Boots,Knives,Bows,Arrows,Sleeping Bags,Lamps'.split(','),
            data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

