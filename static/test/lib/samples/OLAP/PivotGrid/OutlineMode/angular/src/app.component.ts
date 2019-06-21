import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';

import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';

import { PivotEngine, PivotGrid } from '@grapecity/wijmo.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { DataService } from './app.data';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  ng: PivotEngine;
  outlineMode = true;
  customStyle = true;
  showRowFieldHeaders = true;

  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new PivotEngine({
      itemsSource: dataService.getData(1000), // raw data
      showRowTotals: 'Subtotals',
      showColumnTotals: 'None',
      totalsBeforeData: true,
      rowFields: ['Country', 'Product', 'Color'],
      valueFields: ['Sales', 'Expenses', 'Downloads']
    });
  }

  outlineModeChanged() {
    if (this.outlineMode) {
        this.ng.totalsBeforeData = true;
    } else {
        this.customStyle = false;
    }
  }

  exportToCsv(grid: PivotGrid) {
    var rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1),
        csv = grid.getClipString(rng, true, true, true);
    this.exportFile(csv, 'FlexGrid.csv');
  }

  exportFile(csv: string, fileName: string) {
    var fileType = 'txt/csv;charset=utf-8';
    if (navigator.msSaveBlob) { // IE 
      navigator.msSaveBlob(new Blob([csv], {
        type: fileType
      }), fileName);
    } else {
      var e = document.createElement('a');
      e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(csv));
      e.setAttribute('download', fileName);
      e.style.display = 'none';
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
    }
  }

}

@NgModule({
  imports: [WjOlapModule, BrowserModule, FormsModule],
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

