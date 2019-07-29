import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService, DataItem } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  ng: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      autoGenerateFields: false,
      itemsSource: dataService.getData(10000),
      showColumnTotals: 'GrandTotals',
      showRowTotals: 'Subtotals',
      fields: [
        { binding: 'product', header: 'Product' },
        { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
        {
          header: 'Range',
          dataType: 'String',
          aggregate: 'Cnt',
          getValue: function (item: DataItem) {
            var sales = item.sales;
            return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
          }
        },
        { binding: 'sales', header: 'Sales', format: 'n0' },
        { binding: 'downloads', header: 'Downloads', format: 'n0' },
        {
          header: 'Conversion',
          dataType: 'Number',
          aggregate: 'Avg',
          format: 'p0',
          getValue: function (item: DataItem) {
            return item.downloads ? item.sales / item.downloads : 0;
          }
        }
      ],
      rowFields: ['Date', 'Range'],
      valueFields: ['Sales', 'Conversion']
    });
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

