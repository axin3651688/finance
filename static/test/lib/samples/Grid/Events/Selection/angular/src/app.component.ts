import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
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
    data: wjcCore.CollectionView;
    logText: string = 'please select a range on the grid';

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = new wjcCore.CollectionView(this._getData(), {
            groupDescriptions: [ 'country' ] // group data by country
        });
    }

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        flexgrid.selectionChanged.addHandler(() => {
            if (!flexgrid.selection.isSingleCell) {
                let stats = this._getSelectionStats(flexgrid);
                let fmt = stats.sum != null
                    ? 'Avg: <b>{avg:n2}</b>, Count: <b>{cnt:n0}</b>, Sum: <b>{sum:n2}</b>'
                    : 'Count: {cnt:n2}';
                this.logText = wjcCore.format(fmt, stats);
          } else {
            this.logText = 'please select a range on the grid';
          }
        });
    }

    // get statistics for the current selection
    private _getSelectionStats(grid: wjcGrid.FlexGrid) {
        let sel = grid.selection,
            cnt = 0,
            ncnt = 0,
            sum = 0;
        for (let r = sel.topRow; r <= sel.bottomRow; r++) {
            for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                let val = grid.cells.getCellData(r, c, false);
                if (val != null) {
                    cnt++;
                    if (wjcCore.isNumber(val)) {
                        ncnt++;
                        sum += val;
                    }
                }
            }
        }
        return {
            cnt: cnt,
            sum: ncnt > 0 ? sum: null,
            avg: ncnt > 0 ? sum/ncnt: null
        }
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan'.split(',');
        let data = [];
        for (let i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
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

