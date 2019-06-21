<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-6">
                <wj-pivot-grid :items-source="ng"></wj-pivot-grid>
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
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'Subtotals',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    {
                        header: 'Range',
                        dataType: 'String',
                        aggregate: 'Cnt',
                        getValue: (item) => {
                            let sales = item.sales;
                            return sales <= 13 ? 'Low' : sales >= 17 ? 'High' : 'Medium';
                        }
                    },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'downloads', header: 'Downloads', format: 'n0' },
                    {
                        header: 'Conversion',
                        dataType: 'Number',
                        aggregate: 'Avg',
                        format: 'p0',
                        getValue: (item) => {
                            return item.downloads ? item.sales / item.downloads : 0;
                        }
                    }
                ],
                rowFields: ['Date', 'Range'],
                valueFields: ['Sales', 'Conversion']
            })
        };
    },
    mounted: function() {
        this.ngPanel.fields.getField('Amount').format = 'c0';
    },
    methods: {
        onSaveViewClick() {
            if (this.ngPanel.isViewDefined) {
                localStorage.viewDefinition = this.ngPanel.viewDefinition;
            }
        },

        onRestoreViewClick() {
            if (localStorage.viewDefinition) {
                this.ngPanel.viewDefinition = localStorage.viewDefinition;
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotgrid {
	max-height: 400px;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.wj-pivotgrid .wj-cell.spark {
	padding: 8px;
    overflow: visible;
}
	.wj-pivotgrid .wj-cell.spark svg {
        overflow: visible;
        stroke: currentColor;
        fill: currentColor;
    }
    .wj-pivotgrid .wj-cell.spark.spark-up svg {
        color: #009000; /* green for up */
    }
  	.wj-pivotgrid .wj-cell.spark.spark-down svg {
        color: #d00000; /* red for down */
    }

body {
  margin-bottom: 48pt;
}
</style>