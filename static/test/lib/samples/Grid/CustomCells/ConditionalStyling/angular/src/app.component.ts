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
    data: any[];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // insert extra column header row
        let ch = flex.columnHeaders,
            hr = new wjcGrid.Row();
        ch.rows.insert(0, hr);

        // fill out headings in extra header row
        for (let i = 0; i < flex.columns.length; i++) {
            let hdr = ch.getCellData(1, i, false);
            if (hdr == 'Diff') {
                hdr = ch.getCellData(1, i - 1, false);
            }
            ch.setCellData(0, i, hdr);
        }

        // allow merging across and down extra header row
        flex.allowMerging = wjcGrid.AllowMerging.ColumnHeaders;
        hr.allowMerging = true;      
        flex.columns[0].allowMerging = true;
        flex.columns[1].allowMerging = true;

        // custom rendering for headers and "Diff" columns
        flex.formatItem.addHandler((s: any, e: wjcGrid.FormatItemEventArgs) => {

            // center-align column headers
            if (e.panel == s.columnHeaders) {
                e.cell.innerHTML = '<div class="v-center">' +
                e.cell.innerHTML + '</div>';
            }

            // custom rendering for "Diff" columns
            if (e.panel == s.cells) {
                let col = s.columns[e.col];
                if (e.row > 0 && (col.binding == 'salesDiff' || col.binding == 'expensesDiff')) {
                    let vnow = s.getCellData(e.row, e.col - 1),
                        vprev = s.getCellData(e.row - 1, e.col - 1),
                    diff = (vnow / vprev) - 1;
                    
                    // format the cell
                    let html = '<div class="diff-{cls}">' +
                        '<span style="font-size:75%">{val}</span> ' +
                        '<span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                    html = html.replace('{val}', wjcCore.Globalize.format(diff, col.format));
                    if (diff < 0.01) {
                        html = html.replace('{cls}', 'down').replace('{glyph}', 'down');
                    } else if (diff > 0.01) {
                        html = html.replace('{cls}', 'up').replace('{glyph}', 'up');
                    } else {
                        html = html.replace('{cls}', 'none').replace('{glyph}', 'circle');
                    }
                    e.cell.innerHTML = html;
                }
            }
        });
    }

    private _getData() {
        // generate some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
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

