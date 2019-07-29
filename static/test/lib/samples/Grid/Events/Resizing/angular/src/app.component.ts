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
    countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
    private _tt: wjcCore.Tooltip;

    constructor() {
        this.data = this._getData();
        this._tt = new wjcCore.Tooltip();
    }

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        flexgrid.resizingColumn.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.CellRangeEventArgs) => {
            let tip = wjcCore.format('Column <b>{col}</b>, width <b>{wid:n0}px</b>', {
                col: s.columns[e.col].header,
                wid: s.columns[e.col].width
            });
            this._tt.show(flexgrid.hostElement, tip);
        });
        flexgrid.resizedColumn.addHandler(() => {
            this._tt.hide();
        });
    }

    private _getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: (i + 1) % 4 == 0
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

