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

// custom template for PivotPanel, which uses Grid-based layout for the PivotPanel
const customTemplate: string = `
<div class="root">    
<div class="field-list-label">    
  <label wj-part="g-flds"></label>    
</div>    
<div class="field-list pad">    
  <div wj-part="d-fields"></div>    
</div>    
<div class="drag-areas-label">    
  <label wj-part="g-drag"></label>    
</div>    
<div class="filter-list pad">    
  <label>    
    <span class="wj-glyph wj-glyph-filter"></span>     
    <span wj-part="g-flt"></span>    
  </label>    
  <div wj-part="d-filters"></div>    
</div>    
<div class="column-list pad bdr-left">    
  <label>    
    <span class="wj-glyph">⫴</span>     
    <span wj-part="g-cols"></span>    
  </label>    
  <div wj-part="d-cols"></div>    
</div>    
<div class="row-list pad bdr-top">    
  <label>    
    <span class="wj-glyph">≡</span>     
    <span wj-part="g-rows"></span>    
  </label>    
  <div wj-part="d-rows"></div>    
</div>    
<div class="values-list pad bdr-left bdr-top">    
  <label>    
    <span class="wj-glyph">Σ</span>     
    <span wj-part="g-vals"></span>    
  </label>    
  <div wj-part="d-vals"></div>    
</div>    
<div wj-part="d-prog" class="progress-bar"></div>    
<div class="control-area">    
  <label>    
    <input wj-part="chk-defer" type="checkbox">     
    <span wj-part="g-defer">Defer Updates</span>    
  </label>    
  <button wj-part="btn-update" class="wj-btn" type="button">    
    Update    
  </button>    
</div>    
</div> 
`;
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  ngPanel: wjOlap.PivotEngine;
  //
  constructor(@Inject(DataService) private dataService: DataService) {
    // apply custom template to PivotPanel
    wjOlap.PivotPanel.controlTemplate = customTemplate;
    this.ngPanel = new wjOlap.PivotEngine({
      itemsSource: dataService.getData(), // raw data
      valueFields: ['Amount'], // summarize amounts
      rowFields: ['Buyer', 'Type'] // summarize amounts
    });

    this.ngPanel.fields.getField('Amount').format = 'c0';
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

