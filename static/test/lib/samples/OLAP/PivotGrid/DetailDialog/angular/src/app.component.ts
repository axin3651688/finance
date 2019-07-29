import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';

//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('grid') pivotGrid: wjOlap.PivotGrid;
  ngFmt: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ngFmt = new wjOlap.PivotEngine({
      autoGenerateFields: false,
      itemsSource: dataService.getData(10000),
      showColumnTotals: 'GrandTotals',
      showRowTotals: 'None',
      fields: [
        { binding: 'product', header: 'Product' },
        { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
        { binding: 'sales', header: 'Sales', format: 'n0' },
        { binding: 'sales', header: 'Diff', format: 'p0', showAs: 'DiffRowPct' }
      ],
      rowFields: ['Date'],
      columnFields: ['Product'],
      valueFields: ['Sales', 'Diff']
    });
  }
  //
  ngAfterViewInit() {
    var detailDialog = this.pivotGrid.detailDialog,
      detailGridHost = detailDialog.hostElement.querySelector('.wj-flexgrid');
    var detailGrid: wjCore.Control = wjCore.Control.getControl(detailGridHost);
    var customDetails = document.getElementById('customDetails') as HTMLInputElement;

    // format cells in the detail grid
    (detailGrid as wjGrid.FlexGrid).formatItem.addHandler(function (s, e: wjGrid.FormatItemEventArgs) {
      if (e.panel == s.cells && customDetails.checked) {
        var large = false,
          small = false,
          val = s.getCellData(e.row, e.col, false);
        switch (s.columns[e.col].binding) {
          case 'sales':
            large = val > 18;
            small = val < 16;
            break;
          case 'downloads':
            large = val > 80;
            small = val < 60;
            break;
        }
        wjCore.toggleClass(e.cell, 'large-value', large);
        wjCore.toggleClass(e.cell, 'small-value', small);
      }
    });
    //
    // customize dialog content when showing it
    detailDialog.showing.addHandler(function (s:wjOlap.DetailDialog) {
      if (customDetails.checked) {
        //
        // customize summary info above the grid
        // the default format is this:
        // Row: <b>{rowHeader}</b></br>
        // Column: <b>{columnHeader}</b><br>
        // {cellHeader}: <b>{cellValue}</b>
        var summary = s.hostElement.querySelector('.wj-summary'),
          fmt = 'Details for <b>{columnHeader}</b> on ' +
            '<b>{rowHeader}</b>: <b>{cellHeader}</b> is ' +
            '<b>{cellValue}</b>';
        summary.innerHTML = wjCore.format(fmt, s);
        //
        // sort detail grid by date
        var sds = (detailGrid as wjGrid.FlexGrid).collectionView.sortDescriptions;
        sds.push(new wjCore.SortDescription('date', false));
      }
    });
  }

  //
  //
  formatItem(e: wjGrid.FormatItemEventArgs) {
    // we are interested in the cells panel
    if (e.panel == this.pivotGrid.cells) {
      //
      // remove color by default
      var color = '';
      //
      // format diff columns if custom formatting is on
      if (e.col % 2 == 1) {
        var value = this.pivotGrid.getCellData(e.row, e.col, false),
          glyph = 'circle',
          span = ' <span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
        color = '#d8b400';
        if (value != null) {
          if (value < 0) { // negative variation
            color = '#9f0000';
            glyph = 'down';
          } else if (value > 0.05) { // positive variation
            color = '#4c8f00';
            glyph = 'up';
          }
          e.cell.innerHTML += span.replace('{glyph}', glyph);
        }
      }
      //
      // apply cell color
      e.cell.style.color = color;
    }
  }
  //
  onShowDetailClick() {
    var sel = this.pivotGrid.selection;
    if (sel.isValid) {
      this.pivotGrid.showDetail(sel.row, sel.col);
    } else {
      alert('Please select a cell in the PivotGrid first.')
    }
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

