<template>
    <div class="container-fluid">
        <wj-multi-row
            :itemsSource="items"
            :layoutDefinition="layoutDefinition"
            :initialized="initialized"
        ></wj-multi-row>

        <div class="pull-right btn-group">
            <button class="btn btn-default" @click="onGotoPageClick('first')" id="first">
                <span class="glyphicon glyphicon-fast-backward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('previous')" id="previous">
                <span class="glyphicon glyphicon-backward"></span>
            </button>
            <button
                id="current"
                type="button"
                class="btn"
                disabled
                style="width:100px"
                v-html="currentDescription"
            ></button>
            <button class="btn btn-default" @click="onGotoPageClick('next')" id="next">
                <span class="glyphicon glyphicon-forward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('last')" id="last">
                <span class="glyphicon glyphicon-fast-forward"></span>
            </button>
        </div>
        <div class="btn-group">
            <button class="btn btn-default" @click="onExportXlsxClick()">Export to Excel</button>
            <button class="btn btn-default" @click="onExportPdfClick()">Export to PDF</button>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import * as wjCore from "@grapecity/wijmo";
import * as wjPdf from "@grapecity/wijmo.pdf";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import * as wjGridXlsx from "@grapecity/wijmo.grid.xlsx";
import * as wjGridPdf from "@grapecity/wijmo.grid.pdf";

import Vue from "vue";
import "@grapecity/wijmo.vue2.grid.multirow";

import { getOrders, generateLayoutDef, Order, Line } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            items: null,
            cv: null,
            layoutDefinition: null,
            currentDescription: null
        };
    },
    methods: {
        onGotoPageClick(command) {
            let cv = this.cv;
            if (command === "first") {
                cv.moveToFirstPage();
            } else if (command === "previous") {
                cv.moveToPreviousPage();
            } else if (command === "next") {
                cv.moveToNextPage();
            } else if (command === "last") {
                cv.moveToLastPage();
            }
        },

        onExportXlsxClick: function() {
            wjGridXlsx.FlexGridXlsxConverter.saveAsync(
                this.orderManagement,
                null,
                "OrderManagemenr.xlsx"
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
                        wjPdf.saveBlob(args.blob, "OrderManagemenr.pdf");
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
                this.orderManagement,
                doc,
                null,
                null,
                settings
            );
            doc.end();
        },

        currentPageChanged: function() {
            let cv = this.cv;
            let curr = wjCore.format("{current:n0} / {count:n0}", {
                current: cv.pageIndex + 1,
                count: cv.pageCount
            });
            this.currentDescription = curr;
            if (cv.pageIndex === 0) {
                document
                    .querySelector("#first")
                    .setAttribute("disabled", "true");
                document
                    .querySelector("#previous")
                    .setAttribute("disabled", "true");
            } else {
                document.querySelector("#first").removeAttribute("disabled");
                document.querySelector("#previous").removeAttribute("disabled");
            }
            if (cv.pageIndex === cv.pageCount - 1) {
                document
                    .querySelector("#last")
                    .setAttribute("disabled", "true");
                document
                    .querySelector("#next")
                    .setAttribute("disabled", "true");
            } else {
                document.querySelector("#last").removeAttribute("disabled");
                document.querySelector("#next").removeAttribute("disabled");
            }
        },

        initialized: function(orderManagement) {
            this.orderManagement = orderManagement;
            this.cv = this.orderManagement.collectionView;
            this.currentPageChanged();
            this.cv.pageChanged.addHandler(() => {
                this.currentPageChanged();
            });
            this.cv.collectionChanged.addHandler((sender, e) => {
                let unitPrice, quantity;
                if (
                    e.action === wjCore.NotifyCollectionChangedAction.Change &&
                    !!e.item
                ) {
                    unitPrice = +e.item.unitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(unitPrice) && !isNaN(quantity)) {
                        e.item.amount = unitPrice * quantity;
                    }
                }
            });
        }
    },
    created: function() {
        this.items = new wjCore.CollectionView(getOrders(20));
        this.items.pageSize = 5;
        this.layoutDefinition = generateLayoutDef();
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}

#orderDetail
    .wj-alt:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
    background-color: #c0ffc0;
}
</style>