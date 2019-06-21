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
  @ViewChild('slicer') slicer: wjOlap.Slicer;
  ng: wjOlap.PivotEngine;
  fldAmount: wjOlap.PivotField;
  fldDate: wjOlap.PivotField;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(1000), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer'], // by buyer
      filterFields: ['Date'] // filter
    });

    this.fldAmount = this.ng.fields.getField('Amount'),
      this.fldDate = this.ng.fields.getField('Date');
    this.fldAmount.format = 'c0';
    this.fldDate.format = 'MMMM yyyy';
  }
  //
  onShowHeaderClick(e: MouseEvent) {
    this.slicer.showHeader = (e.target as HTMLInputElement).checked;
  }
  //
  onShowCheckboxesClick(e: MouseEvent) {
    this.slicer.showCheckboxes = (e.target as HTMLInputElement).checked;
  }
  //
  onEditFieldClick(e: MouseEvent) {
    this.ng.editField(this.slicer.field);
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

