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

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = new wjcCore.CollectionView(this._getData(), {
            groupDescriptions: [ 'country' ] // group data by country
        });
    }

    formatFlexGrid(s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) {  // add 'button' to country cells
        if (e.panel == s.cells) {
            if (s.columns[e.col].binding == 'country') {
                let html = '<span class="my-button">&#x2b24;</span> ' + e.cell.innerHTML;
                e.cell.innerHTML = html;
            }
        }
    }

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        flexgrid.addEventListener(flexgrid.hostElement, 'mousemove', (e: MouseEvent) => {
            let ht = flexgrid.hitTest(e);
            let logText = wjcCore.format('panel <b>{cellType}</b> row <b>{row}</b> col <b>{col}</b>', {
                cellType: wjcGrid.CellType[ht.cellType],
                row: ht.row,
                col: ht.col
            });
            if ((<HTMLElement>e.target).classList.contains('my-button')) {
                logText += ' (fake button!)';
            } else if ((<HTMLElement>e.target).tagName == 'INPUT' && (<HTMLInputElement>e.target).type == 'checkbox') {
                logText += ' (checkbox!)';
            } else if (ht.panel == flexgrid.cells) {
                if (flexgrid.rows[ht.row] instanceof wjcGrid.GroupRow) {
                    logText += ' (group row)';
                } else {
                    logText += ' (value: <b>' + flexgrid.cells.getCellData(ht.row, ht.col, true) + '</b>)';
                }
            }
            document.querySelector('#log').innerHTML = logText
        });
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

