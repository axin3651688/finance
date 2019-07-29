import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    rowCount: string;
    cellCount: string;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData(100);
    }

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        this.rowCount = flexgrid.rows.length.toString();	
        this.cellCount = flexgrid.hostElement.querySelectorAll('.wj-cell').length.toString();    
        flexgrid.updatedView.addHandler((s, e) => {
            this.rowCount = s.rows.length.toString();
            this.cellCount = s.hostElement.querySelectorAll('.wj-cell').length.toString();  
        });
        flexgrid.scrollPositionChanged.addHandler((s, e) => {
            // if we're close to the bottom, add 20 items
            if (s.viewRange.bottomRow >= s.rows.length - 1) {
                this._addData(this.data, 20);
                s.collectionView.refresh();
            }
        });
    }

    private _getData(cnt: number, start?: number) {
      let data = [];
      let countries = 'USA,Germany,UK,Japan,Italy,Greece'.split(',');
      if (start == null) {
        start = 0;
      }
      for (let i = 0; i < cnt; i++) {
        data.push({
          id: i + start,
          country: countries[i % countries.length],
          date: new Date(2014, i % 12, i % 28),
          amount: Math.random() * 10000,
          active: i % 4 === 0
        });
      }
      return data;
    }
  
    // add random data to an array
    private _addData(data: any, cnt: number) {
      let more = this._getData(cnt, data.length);
      for (let i = 0; i < more.length; i++) {
        data.push(more[i])
      }
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

