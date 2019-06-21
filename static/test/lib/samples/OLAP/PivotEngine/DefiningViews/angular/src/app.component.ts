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
  ng: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ng = new wjOlap.PivotEngine({
      autoGenerateFields: false, // turn off auto-generation
      fields: [ // specify the fields we want
        { binding: 'date', header: 'Date', format: 'yyyy' },
        { binding: 'date', header: 'Quarter', format: '"Q"q' },
        { binding: 'buyer', header: 'Person' },
        { binding: 'type', header: 'Category' },
        { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
      ],
      itemsSource: dataService.getData(10000),
      showRowTotals: 'Subtotals',
      valueFields: ['Amount'],
      rowFields: ['Person']
    });
  }
  //
  onSaveClick() {
    localStorage.viewDefinition = this.ng.viewDefinition;
  }
  //
  onLoadClick() {
    if (localStorage.viewDefinition) {
      this.ng.viewDefinition = localStorage.viewDefinition;
    }
  }
  //
  onButtonClick(e: MouseEvent) {
    var ng = this.ng;
    switch ((e.target as HTMLElement).id) {
      //
      case 'who':
        ng.rowFields.clear();
        ng.rowFields.push('Person');
        break;
      //
      case 'what':
        ng.rowFields.clear();
        ng.rowFields.push('Category');
        break;
      //
      case 'who-what':
        ng.rowFields.clear();
        ng.rowFields.push('Person', 'Category');
        break;
      //
      case 'when':
        ng.rowFields.clear();
        ng.rowFields.push('Date');
        ng.rowFields.push('Quarter');
        break;
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

