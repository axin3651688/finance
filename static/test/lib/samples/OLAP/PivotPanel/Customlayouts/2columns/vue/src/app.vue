<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <p>
                    Here is the PivotPanel:
                </p>
                <wj-pivot-panel id="sample-panel" :items-source="ngPanel"></wj-pivot-panel>
            </div>
            <div class="col-xs-6">
                <p>
                    And here is the output view:
                </p>
                <wj-pivot-grid :items-source="ngPanel"></wj-pivot-grid>
            </div>
        </div>

        <div class="panel panel-warning">
            <div class="panel-heading">
                IE11 support for CSS Grid layouts is outdated and will
                not be updated, but you can use
                <a href="https://autoprefixer.github.io/">AutoPrefixer</a>
                to add the IE11 support to your CSS automatically.
            </div>
        </div>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';

// custom template for PivotPanel, which uses Grid-based layout for the PivotPanel
const customTemplate = `
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

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ngPanel: new wjcOlap.PivotEngine({
                itemsSource: getData(), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
    },
    created: function() {
        wjcOlap.PivotPanel.controlTemplate = customTemplate;
    },
    mounted: function() {
        this.ngPanel.fields.getField('Amount').format = 'c0';
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#sample-panel {
    background: #eee;
    max-width: 600px;
    min-height: 0;
    margin: 12px auto;
    display: block;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
#sample-panel .wj-flexgrid {
    min-height: 4em;
	background: inherit;
}

.wj-pivotpanel .root {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (50%)[2];
    grid-template-columns: repeat(2, 50%);
}

.wj-pivotpanel .field-list-label {
    display: none;
}
.wj-pivotpanel .drag-areas-label {
    display: none;
}
.wj-pivotpanel .filter-list {
    -ms-grid-column: 1;
    grid-column: 1;
    -ms-grid-row: 3;
    grid-row: 3;  
}
.wj-pivotpanel .row-list {
    -ms-grid-column: 2;
    grid-column: 2;
    -ms-grid-row: 1;
    grid-row: 1;  
}
.wj-pivotpanel .column-list {
    -ms-grid-column: 2;
    grid-column: 2;
    -ms-grid-row: 2;
    grid-row: 2;  
}
.wj-pivotpanel .values-list {
    -ms-grid-column: 2;
    grid-column: 2;
    -ms-grid-row: 3;
    grid-row: 3;  
}

.wj-pivotpanel .progress-bar {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1/span 2;
    -ms-grid-row: 4;
    grid-row: 4;
    width: 0px;
    height: 3px;
}

.wj-pivotpanel .control-area {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1/span 2;
    -ms-grid-row: 4;
    grid-row: 4;
    display: -ms-grid;
    display: grid;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: end;
    -ms-grid-columns: 1fr auto;
    grid-template-columns: 1fr auto;
}
.wj-pivotpanel .control-area button {
    -ms-grid-column: 2;
    grid-column: 2;
    align-self: end;
    -ms-grid-column-align: end;
}


.wj-pivotpanel .pad {
    padding: 6px;
}

body {
    margin-bottom: 24pt;
}
</style>