import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
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
  ng: wjOlap.PivotEngine;
  fld: wjOlap.PivotField;
  showAsOptions: string[];
  showAsText: string;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      autoGenerateFields: false, // turn off auto-generation
      fields: [ // specify the fields we want (no date)
        { binding: 'date', header: 'Year', format: 'yyyy' },
        { binding: 'date', header: 'Period', format: 'MMM' },
        { binding: 'buyer', header: 'Person' },
        { binding: 'type', header: 'Category' },
        { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' },
        { binding: 'amount', header: 'Show As', format: 'c0', aggregate: 'Sum' },
      ],
      itemsSource: dataService.getData(1000), // raw data
      showRowTotals: 'Subtotals',
      valueFields: ['Amount', 'Show As'], // show amount spent
      rowFields: ['Year', 'Period'] // by Year and Quarter
    });
    this.fld = this.ng.fields.getField('Show As');
    this.showAsText = wjOlap.ShowAs[this.fld.showAs];
    //
    this.showAsOptions = 'NoCalculation,DiffRow,DiffRowPct,DiffCol,DiffColPct,PctGrand,PctRow,PctCol,RunTot,RunTotPct'.split(',');
  }
  //
  onTextChanged(combox: wjInput.ComboBox) {
    this.fld.showAs = wjOlap.ShowAs[combox.text];
    this.fld.format = combox.text.indexOf('Pct') > -1 ? 'p0' : 'c0';
  }
  //
  onPeriodInColumns(e: MouseEvent) {
    let list = (e.target as HTMLInputElement).checked ? this.ng.columnFields : this.ng.rowFields;
    list.push('Period');
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

