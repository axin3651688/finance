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
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    initializeCustomGrid(flex: wjcGrid.FlexGrid) {
        flex.copying.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => { // // add headers to clip string
            let text = s.getClipString(),
                sel = s.selection,
                hdr = '';
            for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                if (hdr) {
                    hdr += '\t';
                } 
                hdr += s.columns[c].header;
            }
            text = hdr + '\r\n' + text;
            // put text with headers on the clipboard
            wjcCore.Clipboard.copy(text);
            // prevent the grid from overwriting our clipboard content
            e.cancel = true;
        });
        flex.pasting.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            e.cancel = true; // prevent pasting data with headers
        });
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','),
            data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
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

