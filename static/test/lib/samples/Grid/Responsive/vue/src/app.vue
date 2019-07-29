<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :headersVisibility="'Column'"
            :initialized="initializeGrid"
        >
            <wj-flex-grid-column
                :header="'Company'"
                :visible="false"
                :width="'*'"
                :isReadOnly="true"
                :allowDragging="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'CompanyName'" :header="'Company Name'" :width="'20*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'ContactName'" :header="'Contact Name'" :width="'15*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'ContactTitle'" :header="'Contact Title'" :width="'20*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'Address'" :header="'Address'" :width="'20*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'City'" :header="'City'" :width="'10*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'Country'" :header="'Country'" :width="'15*'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            flex: null,
            _defaultRowHeight: 0
        };
    },
    methods: {
        initializeGrid: function(flex) {
            flex.formatItem.addHandler((s, e) => {
                // show company summary on narrow layout
                if (e.panel == s.cells && e.col == 0) {
                    let html = wijmo.format(
                        '<div class="item-header">{CompanyName}</div>' +
                            '<div class="item-detail">{ContactName}, {ContactTitle}</div>' +
                            '<div class="item-detail">{Address}, {City}, {Country}</div>',
                        s.rows[e.row].dataItem
                    );
                    e.cell.innerHTML = html;
                }
            });
            this.flex = flex;
        },
        _updateGridLayout: function() {
            // show/hide columns
            let narrow = this.flex.hostElement.clientWidth < 600;
            this.flex.columns.forEach(col => {
                col.visible = col.index == 0 ? narrow : !narrow;
            });
            // make rows taller on phone layout
            this.flex.rows.defaultSize =
                this._defaultRowHeight * (narrow ? 3 : 1);
            // hide column headers on narrow layouts
            this.flex.headersVisibility = narrow
                ? wjcGrid.HeadersVisibility.None
                : wjcGrid.HeadersVisibility.Column;
        }
    },
    mounted: function() {
        // get some data
        wijmo.httpRequest(
            "https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json",
            {
                success: xhr => {
                    let response = JSON.parse(xhr.responseText);
                    this.flex.itemsSource = response.value;
                    this._updateGridLayout();
                }
            }
        );
        this._defaultRowHeight = this.flex.rows.defaultSize;
        this.flex.addEventListener(
            window,
            "resize",
            this._updateGridLayout.bind(this)
        );
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
/* set grid height */
.wj-flexgrid {
    height: 350px;
    -moz-user-select: none;
}
/* disable alternating rows */
.wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
    background: #fff;
}
/* format detail cells */
.item-header {
    font-weight: bold;
    font-size: 150%;
}
.item-detail {
    margin-left: 12px;
}
</style>
