import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  @ViewChild('theGrid') pivotGrid: wjOlap.PivotGrid;
  @ViewChild('sortSales') sortSales: wjInput.ComboBox;
  @ViewChild('sortExpenses') sortExpenses: wjInput.ComboBox;
  ng: wjOlap.PivotEngine;
  sortOptions: string[];
  sortOptions2: string[];

  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(100),
      rowFields: ['Country', 'Product'],
      valueFields: ['Sales', 'Expenses']
    });
    //
    this.sortOptions = 'Ascending,Descending'.split(',');
    this.sortOptions2 = 'None,Ascending,Descending'.split(',');
  }

  onSelectedIndexChanged(s: wjInput.ComboBox, field: string) {
    this.ng.fields.getField(field).descending = s.selectedIndex == 1;
  }

  onSubtotalsClick(e: MouseEvent) {
    this.ng.showRowTotals = (e.target as HTMLInputElement).checked ? wjOlap.ShowTotals.Subtotals : wjOlap.ShowTotals.GrandTotals;
  }

  updateMeasureSort() {
    var sd = this.ng.pivotView.sortDescriptions;
    sd.clear();
    this._addMeasureSort('Sales', this.sortSales.text);
    this._addMeasureSort('Expenses', this.sortExpenses.text);
  }

  _addMeasureSort(fieldName: string, sortDirection: string) {
    if (sortDirection != 'None') {
      var sd = this.ng.pivotView.sortDescriptions,
        cols = this.pivotGrid.columns;
      for (var c = 0; c < cols.length; c++) {
        var binding = cols[c].binding;
        if (binding.indexOf(fieldName) == 0) {
          sd.push(new wjCore.SortDescription(binding, sortDirection == 'Ascending'));
        }
      }
    }
  }
}
//
@NgModule({
  imports: [WjOlapModule, WjInputModule, BrowserModule],
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

