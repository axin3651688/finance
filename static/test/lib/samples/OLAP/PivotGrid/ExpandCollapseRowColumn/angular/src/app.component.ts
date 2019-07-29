import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  @ViewChild('grid') pivotGrid: wjOlap.PivotGrid;
  ng: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(1000), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer', 'Type'], // by buyer and Type
      showRowTotals: 'Subtotals',
      showColumnTotals: 'Subtotals',
    });

    this.ng.fields.getField('Amount').format = 'c0';
    this.ng.fields.getField('Date').format = 'yyyy';
  }
  //
  onTotalsBeforeDataClick(e: MouseEvent) {
    this.pivotGrid.engine.totalsBeforeData = (e.target as HTMLInputElement).checked;
  }
  //
  onCollapsibleSubtotalsClick(e: MouseEvent) {
    this.pivotGrid.collapsibleSubtotals = (e.target as HTMLInputElement).checked;
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

