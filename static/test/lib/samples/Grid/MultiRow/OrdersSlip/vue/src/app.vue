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
    import * as wjPdf from '@grapecity/wijmo.pdf';
    import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
    import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
    import { generateOrdersSlipData,generateLayoutDef  } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: generateOrdersSlipData(),
                layoutDefinition: generateLayoutDef(),
                ordersSlip: null
            }
        },
        methods: {
            initSlip: function(ordersSlip){
                this.ordersSlip = ordersSlip;
            },
            _getData: function() {
                let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                    data = [];
                for (let i = 0; i < countries.length; i++) {
                    data.push({
                    country: countries[i],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                    });
                }
                return data;
            },
            onExportXlsxClick: function() {
                wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.ordersSlip, null, 'OrdersSlip.xlsx');
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
                        wjPdf.saveBlob(args.blob, 'OrdersSlip.pdf');
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

                wjGridPdf.FlexGridPdfConverter.draw(this.ordersSlip, doc, null, null, settings);
                doc.end();
            }
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
