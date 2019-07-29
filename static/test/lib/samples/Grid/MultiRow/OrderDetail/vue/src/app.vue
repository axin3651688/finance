<template>
    <div class="container-fluid">
        <wj-multi-row
            id="orderDetail"
            :itemsSource="data"
            :layoutDefinition="layoutDefinition"
            :initialized="initialized"
        ></wj-multi-row>
        <div class="btn-group">
            <button class="btn btn-default" @click="onExportXlsxClick()">Export to Excel</button>
            <button class="btn btn-default" @click="onExportPdfClick()">Export to PDF</button>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid.multirow";

import { getOrderDetail, generateLayoutDef } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getOrderDetail(5),
            layoutDefinition: generateLayoutDef()
        };
    },
    methods: {
        onExportXlsxClick: function() {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(
                this.orderDetail,
                null,
                "OrderDetail.xlsx"
            );
        },

        onExportPdfClick: function() {
            let doc = new wjPdf.PdfDocument({
                    header: {
                        declarative: {
                            text: "\t&[Page]\\&[Pages]"
                        }
                    },
                    footer: {
                        declarative: {
                            text: "\t&[Page]\\&[Pages]"
                        }
                    },
                    ended: function(sender, args) {
                        wjPdf.saveBlob(args.blob, "OrderDetail.pdf");
                    }
                }),
                settings = {
                    styles: {
                        cellStyle: {
                            backgroundColor: "#ffffff",
                            borderColor: "#c6c6c6"
                        },
                        altCellStyle: {
                            backgroundColor: "#C0FFC0"
                        },
                        headerCellStyle: {
                            backgroundColor: "#eaeaea"
                        }
                    }
                };

            wjGridPdf.FlexGridPdfConverter.draw(
                this.orderDetail,
                doc,
                null,
                null,
                settings
            );
            doc.end();
        },
        initialized: function(orderDetail) {
            this.orderDetail = orderDetail;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}

#orderDetail .wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected){
  background-color: #C0FFC0;
}
</style>