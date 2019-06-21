<template>
    <div class="container-fluid">
        <wj-multi-row :initialized="initSlip" :itemsSource="items" :layoutDefinition="layoutDefinition"></wj-multi-row>

        <div class="pull-right btn-group">
            <button class="btn btn-default" @click="onGotoPageClick('first')" id="first">
                <span class="glyphicon glyphicon-fast-backward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('previous')" id="previous">
                <span class="glyphicon glyphicon-backward"></span>
            </button>
            <button id="current" type="button" class="btn" disabled style="width:100px" v-html="currentDescription">
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('next')" id="next">
                <span class="glyphicon glyphicon-forward"></span>
            </button>
            <button class="btn btn-default" @click="onGotoPageClick('last')" id="last">
                <span class="glyphicon glyphicon-fast-forward"></span>
            </button>
        </div>
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
    import * as wjPdf from '@grapecity/wijmo.pdf';
    import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
    import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
    import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
    import { getSalesSlip, generateLayoutDef } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                items: new wjCore.CollectionView(getSalesSlip(20),{pageSize: 5}),
                layoutDefinition: generateLayoutDef(),
                cv: null,
                salesSlip: null,
                currentDescription: null
            }
        },
        methods: {
            initSlip: function(slip){
                this.salesSlip = slip;
            },
            onGotoPageClick: function(command){
                let cv = this.cv;
                if (command === 'first') {
                    cv.moveToFirstPage();
                } else if (command === 'previous') {
                    cv.moveToPreviousPage();
                } else if (command === 'next') {
                    cv.moveToNextPage();
                } else if (command === 'last') {
                    cv.moveToLastPage();
                }
            },
            //
            onExportXlsxClick: function(){
                wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.salesSlip, null, 'SalesSlip.xlsx');
            },
            //
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
                        wjPdf.saveBlob(args.blob, 'SalesSlip.pdf');
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

                wjGridPdf.FlexGridPdfConverter.draw(this.salesSlip, doc, null, null, settings);
                doc.end();
            },
            _currentPageChanged: function() {
                let cv = this.cv;
                let curr = wjCore.format('{current:n0} / {count:n0}', {
                    current: cv.pageIndex + 1,
                    count: cv.pageCount
                });
                this.currentDescription = curr;
                if (cv.pageIndex === 0) {
                    document.querySelector('#first').setAttribute('disabled', 'true');
                    document.querySelector('#previous').setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#first').removeAttribute('disabled');
                    document.querySelector('#previous').removeAttribute('disabled');
                }
                if (cv.pageIndex === cv.pageCount - 1) {
                    document.querySelector('#last').setAttribute('disabled', 'true');
                    document.querySelector('#next').setAttribute('disabled', 'true');
                } else {
                    document.querySelector('#last').removeAttribute('disabled');
                    document.querySelector('#next').removeAttribute('disabled');
                }
            }
        },
        mounted: function(){
            let filter = new wjGridFilter.FlexGridFilter(this.salesSlip);
            this.cv = this.salesSlip.collectionView;
            this._currentPageChanged();
            this.cv.pageChanged.addHandler(() => {
                this._currentPageChanged();
            })
            this.cv.collectionChanged.addHandler((sender, e) => {
                let unitPrice, profitUnitPrice, quantity;
                if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    unitPrice = +e.item.unitPrice;
                    profitUnitPrice = +e.item.profitUnitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(quantity)) {
                        if (!isNaN(unitPrice)) {
                            e.item.salesAmount = unitPrice * quantity;
                        }
                        if (!isNaN(profitUnitPrice)) {
                            e.item.totalProfit = profitUnitPrice * quantity;
                        }
                        if (!isNaN(unitPrice) && !isNaN(profitUnitPrice)) {
                            e.item.profitRate = e.item.totalProfit / e.item.salesAmount;
                        }
                    }
                } else if (e.action === wjCore.NotifyCollectionChangedAction.Reset) {
                    this._currentPageChanged();
                }
            });
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
  max-height: 400px;
  margin: 6px 0;
}

.profit-cell{
  background-color: #FFFFC0 !important;
  color: red;
}
</style>
