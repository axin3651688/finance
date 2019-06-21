<template>
    <div class="container-fluid">
        <div class="col-sm-6">
            <h4>ODataCollectionView</h4>
            <p>{{itemCount}}</p>
            <wj-flex-grid
                :itemsSource="orderDetails"
                :isReadOnly="true"
                :initialized="gridInitialized"
            ></wj-flex-grid>
        </div>
        <div class="col-sm-6">
            <h4>ODataVirtualCollectionView</h4>
            <p>{{totalItemCount}}</p>
            <wj-flex-grid
                :itemsSource="virtualOrderDetails"
                :isReadOnly="true"
                :initialized="virtualGridInitialized"
            ></wj-flex-grid>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjcOData from "@grapecity/wijmo.odata";
import * as wjcCore from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            table: "Order_Details_Extendeds",
            orderDetails: new wjcOData.ODataCollectionView(
                "https://services.odata.org/Northwind/Northwind.svc",
                "Order_Details_Extendeds"
            ),
            virtualOrderDetails: new wjcOData.ODataVirtualCollectionView(
                "https://services.odata.org/Northwind/Northwind.svc",
                "Order_Details_Extendeds",
                {
                    loaded: (sender, e) => {
                        this.totalItemCount = wjcCore.format(
                            "{totalItemCount:n0} items",
                            sender
                        );
                    }
                }
            ),
            itemCount: "",
            totalItemCount: ""
        };
    },
    methods: {
        gridInitialized: function(flexgrid) {
            this.flexgrid = flexgrid;
            flexgrid.formatItem.addHandler((s, e) => {
                // show row indices in row headers
                if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                    e.cell.textContent = (e.row + 1).toString();
                }
            });

            flexgrid.loadedRows.addHandler((sender, e) => {
                this.itemCount = wjcCore.format(
                    "{length:n0} items",
                    sender.rows
                );
            });
        },

        virtualGridInitialized: function(flexgrid) {
            this.flexgrid = flexgrid;
            flexgrid.formatItem.addHandler((s, e) => {
                // show row indices in row headers
                if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                    e.cell.textContent = (e.row + 1).toString();
                }
            });

            flexgrid.scrollPositionChanged.addHandler(() => {
                let rng = flexgrid.viewRange;
                this.virtualOrderDetails.setWindow(rng.row, rng.row2);
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    height: 350px;
}

.wj-cell {
    border-color: #e0e0e0;
}

.wj-cell.wj-has-notes:after {
    position: absolute;
    content: "";
    width: 0;
    right: 0;
    top: -10px;
    border: 10px solid transparent;
    border-right: 10px solid red;
    opacity: 0.5;
}

.wj-cell.wj-has-notes:hover:after {
    opacity: 1;
}

body {
    margin-bottom: 24pt;
}
</style>