import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

class RestrictedMergeManager extends wjGrid.MergeManager {
    constructor(flexGrid: wjGrid.FlexGrid) {
        super(flexGrid);
    }

    getMergedRange(p: wjGrid.GridPanel, r: number, c: number, clip: boolean = true) {
        // create basic cell range
        var rng = null;
        // start with single cell
        rng = new wjGrid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        // get reference values to use for merging
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        // expand up
        while (rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval) {
            rng.row--;
        }
        // expand down
        while (rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval) {
            rng.row2++;
        }
        // don't bother with single-cell ranges
        if (rng.isSingleCell) {
            rng = null;
        }
        // done
        return rng;
    }
}

class DataItem {
    customer: string;
    country: string;
    downloads: number;
    sales: number;
    expenses: number;
}

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjCore.CollectionView;
    constructor() {
        this.data = new wjCore.CollectionView(this._getData(), {
            sortDescriptions: ['customer', 'country']
        });
    }

    onInitialized(flexGrid: wjGrid.FlexGrid) {
        flexGrid.mergeManager = new RestrictedMergeManager(flexGrid);

    }

    private _getData(): DataItem[] {
        // create some random data
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            customers = 'Paul Smith,Susan Johnson'.split(',');
        let data = [];
        for (var i = 0; i < 12; i++) {
            data.push({
                customer: customers[i % customers.length],
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 5000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
//\\
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
