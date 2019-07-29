import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // add Grid-based layout for the PivotPanel
    wjOlap.PivotPanel.controlTemplate = `<div class="root">  
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
</div>`;
    //
    // initialize pivot engine
    var ngPanel = new wjOlap.PivotEngine({
        itemsSource: getData(),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'] // summarize amounts
    });
    ngPanel.fields.getField('Amount').format = 'c0'; // customize field
    //
    // show pivot panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ngPanel
    });
    //
    // show summary
    var pivotPanelGrid = new wjOlap.PivotGrid('#pivotPanelGrid', {
        itemsSource: ngPanel
    });
    //
}
