import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
import '@grapecity/wijmo.chart.render';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';


@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  @ViewChild('pivotChart') pivotChart: wjOlap.PivotChart;
  ngChart: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    this.ngChart = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer', 'Type'], // by buyer and type
    });

    this.ngChart.fields.getField('Amount').format = 'c0';
  }
  //
  onChartTitleClick(e: MouseEvent) {
    this.pivotChart.showTitle = (e.target as HTMLInputElement).checked;
  }
  //
  onExportClick(e: MouseEvent) {
    if (e.target instanceof HTMLButtonElement) {
      this.pivotChart.saveImageToFile('FlexChart.' + e.target.textContent.trim());
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

