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
class FormatItem {
  name: string;
  value: string;
}
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  ng: wjOlap.PivotEngine;
  fld: wjOlap.PivotField;
  formats: FormatItem[];
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      autoGenerateFields: false, // turn off auto-generation
      fields: [ // specify the fields we want (no date)
        { binding: 'date', header: 'Year', format: 'yyyy' },
        { binding: 'date', header: 'Period', format: '"Q"q' },
        { binding: 'buyer', header: 'Person' },
        { binding: 'type', header: 'Category' },
        { binding: 'amount', header: 'Total', format: 'c0', aggregate: 'Sum' },
        { binding: 'amount', header: 'Average', format: 'c0', aggregate: 'Avg' },
      ],
      itemsSource: dataService.getData(1000), // raw data
      showRowTotals: 'Subtotals',
      valueFields: ['Total', 'Average'], // show amount spent
      rowFields: ['Year', 'Period'] // by Year and Quarter
    });
    this.fld = this.ng.fields.getField('Period');
    //
    this.formats = [
      { name: 'Quarter ("Q"q)', value: '"Q"q' },
      { name: 'Fiscal Quarter ("FQ"u)', value: '"FQ"u' },
      { name: 'Long Month (MMMM)', value: 'MMMM' },
      { name: 'Short Month (MMM)', value: 'MMM' },
      { name: 'Month Number (M )', value: 'M ' },
    ];
  }
  //
  onTextChanged(combox: wjInput.ComboBox) {
    this.fld.format = combox.selectedValue;
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

