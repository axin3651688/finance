import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService, DataItem } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
  ng: wjOlap.PivotEngine;
  ds10: DataItem[];
  ds100: DataItem[];
  ds500: DataItem[];
  ds1M: DataItem[];
  start: number = 0;
  enable100K: boolean = true;
  enable500K: boolean = true;
  enable1M: boolean = true;
  result: string;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    var self = this;
    self.ds10 = dataService.addData([], 10e3);
    self.ng = new wjOlap.PivotEngine({
      autoGenerateFields: false,
      fields: [ // specify the fields we want
        { binding: 'date', header: 'Date', format: 'yyyy' },
        { binding: 'buyer', header: 'Person' },
        { binding: 'type', header: 'Category' },
        { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
      ],
      itemsSource: self.ds10,
      showRowTotals: 'Subtotals',
      valueFields: ['Amount'],
      rowFields: ['Person', 'Category'],
      updatingView: function () {
        if (self.start == 0) {
          self.start = Date.now();
        }
      },
      updatedView: function (s: wjOlap.PivotEngine) {
        var fmt = 'Summarized <b>{cnt:n0}</b> items in <b>{tm:n0}</b>ms';
        self.result = wjCore.format(fmt, {
          cnt: s.itemsSource.length,
          tm: Date.now() - self.start
        });
        self.start = 0;
      }
    });
  }
  //
  ngAfterViewInit() {
    var self = this;
    self._createDataAsync(100e3, function (result: DataItem[]) {
      self.ds100 = result;
      self.enable100K = false;
    });
    self._createDataAsync(500e3, function (result: DataItem[]) {
      self.ds500 = result;
      self.enable500K = false;
    });
    self._createDataAsync(1e6, function (result: DataItem[]) {
      self.ds1M = result;
      self.enable1M = false;
    });
  }
  //
  onButtonClick(e: MouseEvent) {
    switch ((e.target as HTMLElement).id) {
      case '10k':
        this.ng.itemsSource = this.ds10;
        break;
      case '100k':
        this.ng.itemsSource = this.ds100;
        break;
      case '500k':
        this.ng.itemsSource = this.ds500;
        break;
      case '1M':
        this.ng.itemsSource = this.ds1M;
        break;
    }
  }
  //
  _createDataAsync(cnt: number, callback: (result: DataItem[]) => void) {
    var data: DataItem[] = [];
    this._addDataAsync(data, cnt, function () {
      callback(data);
    });
  }

  _addDataAsync(data: DataItem[], cnt: number, callback: (result: DataItem[]) => void) {
    var self = this;
    setTimeout(function () {
      self.dataService.addData(data, Math.min(cnt - data.length, 1000));
      if (data.length == cnt) {
        callback(data);
      } else {
        self._addDataAsync(data, cnt, callback);
      }
    });
  }

  _enableButton(id: string) {
    (document.getElementById(id) as HTMLButtonElement).disabled = false;
  }
}
//
@NgModule({
  imports: [WjOlapModule, BrowserModule],
  declarations: [AppComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

