import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
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
  ngPanel: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ngPanel = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(1000), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer', 'Type'] // summarize amounts
    });

    this.ngPanel.fields.getField('Amount').format = 'c0';
    // 
    var yearField = this.ngPanel.fields.getField('Date');
    yearField.header = 'Year';
    yearField.format = 'yyyy';
    //
    var quarterField = new wjOlap.PivotField(this.ngPanel, 'date', 'Quarter');
    quarterField.format = '"Q"q';
    this.ngPanel.fields.splice(1, 0, quarterField);
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

