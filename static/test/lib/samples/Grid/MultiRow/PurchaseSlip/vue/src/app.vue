<template>
    <div class="container-fluid">
        <wj-multi-row :initialized="initSlip" :itemsSource="data" :layoutDefinition="layoutDefinition"></wj-multi-row>
        <div class="btn-group">
            <button class="btn btn-default" @click="onExportXlsxClick">
                Export to Excel
            </button>
            <button class="btn btn-default" @click="onExportPdfClick">
                Export to PDF
            </button>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid.multirow';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjGrid from '@grapecity/wijmo.grid';
    import * as wjPdf from '@grapecity/wijmo.pdf';
    import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
    import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
    import { getPurchaseSlip, generateLayoutDef } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: getPurchaseSlip(),
                layoutDefinition: generateLayoutDef(),
                purchaseSlip: null
            }
        },
        methods: {
            initSlip: function(purchaseSlip){
                this.purchaseSlip = purchaseSlip;
            },
            onExportXlsxClick: function() {
                wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.purchaseSlip, null, 'PurchaseSlip.xlsx');
            },
            onExportPdfClick: function() {
                let doc = new wjPdf.PdfDocument({
                    header: {
                        declarative: {
                            text: '\t&[Page]\\&[Pages]'
                        }
                    },
                    footer: {
                        declarative: {
                            text: '\t&[Page]\\&[Pages]'
                        }
                    },
                    ended: function (sender, args) {
                        wjPdf.saveBlob(args.blob, 'PurchaseSlip.pdf');
                    }
                }),
                    settings = {
                        styles: {
                            cellStyle: {
                                backgroundColor: '#ffffff',
                                borderColor: '#c6c6c6'
                            },
                            altCellStyle: {
                                backgroundColor: '#C0FFC0'
                            },
                            headerCellStyle: {
                                backgroundColor: '#eaeaea'
                            }
                        }
                    };

                wjGridPdf.FlexGridPdfConverter.draw(this.purchaseSlip, doc, null, null, settings);
                doc.end();
            },
            _updateSummary: function() {
                let qtySum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'quantity'),
                    costSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'cost'),
                    priceSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'price');

                this.purchaseSlip.columnFooters.setCellData(0, 4, qtySum);
                this.purchaseSlip.columnFooters.setCellData(0, 7, wjCore.Globalize.format(costSum, 'c2'));
                this.purchaseSlip.columnFooters.setCellData(0, 8, wjCore.Globalize.format(priceSum, 'c2'));
            }
        },
        mounted: function(){
            this.purchaseSlip.columnFooters.rows.push(new wjGrid.Row());
            this.purchaseSlip.columnFooters.setCellData(0, 3, 'Summary');
            this.purchaseSlip.columnFooters.setCellData(0, 6, 'Amount Summary');
            this.cv = this.purchaseSlip.collectionView;
            this._updateSummary();
            this.cv.collectionChanged.addHandler((sender, e) => {
                let quantity, unitCost;

                if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    quantity = +e.item.quantity;
                    unitCost = +e.item.unitCost;
                    if (!isNaN(quantity) && !isNaN(unitCost)) {
                        e.item.cost = quantity * unitCost;
                        e.item.price = e.item.cost * 1.35;
                        this._updateSummary();
                    }
                }
            });
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}
</style>
