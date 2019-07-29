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


@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  @ViewChild('pivotChart') pivotChart: wjOlap.PivotChart;
  ngChart: wjOlap.PivotEngine;
  chartTypes: string[];
  showLegendOptions: string[];
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ngChart = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer', 'Type'], // by buyer and type
    });

    this.ngChart.fields.getField('Amount').format = 'c0';
    //
    this.chartTypes = 'Column,Bar,Line,Area,Pie'.split(',');
    this.showLegendOptions = 'Auto,Always,Never'.split(',');
  }
  //
  onShowTitleClick(e: MouseEvent) {
    this.pivotChart.showTitle = (e.target as HTMLInputElement).checked;
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

