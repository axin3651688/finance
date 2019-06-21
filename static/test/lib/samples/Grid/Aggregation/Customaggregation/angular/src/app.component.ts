import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjcCore.CollectionView;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = new wjcCore.CollectionView(this._getData(), {
            groupDescriptions: [
                new wjcCore.PropertyGroupDescription('Grand Total', 
                    () => {
                        return '';
                    }),
                'country'
            ]
        });
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // start collapsed
        flex.collapseGroupsToLevel(1);
        // custom cell calculation
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            // cells and column footer panels only
            if (e.panel == s.cells) {
                // get row, column, and data item (or group description)
                let r = s.rows[e.row],
                    c = s.columns[e.col],
                    item = s.rows[e.row].dataItem,
                    group = r instanceof wjcGrid.GroupRow ? item : null,
                    negative = false; // assume value is not negative
                // calculate profit
                if (c.binding == 'profit') {
                    let profit = group
                        ? group.getAggregate('Sum', 'sales') - group.getAggregate('Sum', 'expenses')
                        : item.sales - item.expenses;
                    e.cell.textContent = wjcCore.Globalize.format(profit, c.format);
                    negative = profit < 0;
                }
                // update 'negative' class on cell
                wjcCore.toggleClass(e.cell, 'negative', negative);
            }
        });
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            products = 'Phones,Computers,Cameras,Stereos'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
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

