<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
                <wj-pivot-grid :items-source="ng" :initialized="initializePivotGrid"></wj-pivot-grid>
            </div>
        </div>
        <p>
            Export grid to
            <button id="xlsx" class="btn btn-primary" @click="exportGrid('csv')">
                CSV
            </button>
            <button id="xlsx" class="btn btn-primary" @click="exportGrid('xlsx')">
                XLSX
            </button>
            <button id="pdf" class="btn btn-primary" @click="exportGrid('pdf')">
                PDF
            </button>
            <button id="pdfdoc" class="btn btn-primary" @click="exportGrid('pdfdoc')">
                PDF Document
            </button>
        </p>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.olap';
    import * as wjcOlap from '@grapecity/wijmo.olap';
    import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
    import * as wjcGridPdf from '@grapecity/wijmo.grid.pdf';
    import * as wjcPdf from '@grapecity/wijmo.pdf';
    import { CellRange } from '@grapecity/wijmo.grid';
    import { getData } from './data'

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                ng: new wjcOlap.PivotEngine({
                    itemsSource: getData(1000), // raw data
                    valueFields: ['Amount'], // summarize amounts
                    rowFields: ['Buyer', 'Type'], // by buyer and Type
                    showRowTotals: 'Subtotals',
                    showColumnTotals: 'Subtotals',
                })
            };
        },
        mounted: function() {
            this.ng.fields.getField('Amount').format = 'c0';
            this.ng.fields.getField('Date').format = 'yyyy';
        },
        methods: {
            initializePivotGrid(pivotGrid) {
                this.pivotGrid = pivotGrid;
            },

            exportGrid(docType) {
                if (docType === 'csv') {
                    let grid = this.pivotGrid,
                        rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1),
                    csv = grid.getClipString(rng, true, true, true); // save CSV with column and row headers
                    this.exportFile(csv, 'PivotGrid.csv');
                } else if (docType === 'xlsx') {
                    // create book with current view
                    let book = wjcGridXlsx.FlexGridXlsxConverter.saveAsync(this.pivotGrid, {
                        includeColumnHeaders: true,
                        includeRowHeaders: true
                    });
                    book.sheets[0].name = 'PivotGrid';
                    // save the book
                    book.saveAsync('PivotGrid.xlsx');
                } else if (docType === 'pdf') {
                    wjcGridPdf.FlexGridPdfConverter.export(this.pivotGrid, 'PivotGrid.pdf', {
                        maxPages: 10,
                        scaleMode: wjcGridPdf.ScaleMode.PageWidth,
                        documentOptions: {
                            compress: true,
                            header: { declarative: { text: '\t&[Page] of &[Pages]' } },
                            footer: { declarative: { text: '\t&[Page] of &[Pages]' } },
                            info: { author: 'GrapeCity', title: 'PivotGrid' }
                        },
                        styles: {
                            cellStyle: { backgroundColor: '#ffffff', borderColor: '#c6c6c6' },
                            altCellStyle: { backgroundColor: '#f9f9f9' },
                            groupCellStyle: { backgroundColor: '#dddddd' },
                            headerCellStyle: { backgroundColor: '#eaeaea' }
                        }
                    });
                } else if (docType === 'pdfdoc') {
                    // create the document
                    let doc = new wjcPdf.PdfDocument({
                        compress: true,
                        header: { declarative: { text: '\t&[Page]\\&[Pages]' } },
                        ended: (sender, args) => {
                            wjcPdf.saveBlob(args.blob, 'PivotGridDoc.pdf');
                        }
                    });
                    // add some content
                    doc.drawText('This is a PivotGrid control:');
                    // add the grid (400pt wide)
                    wjcGridPdf.FlexGridPdfConverter.draw(this.pivotGrid, doc, 400);
                    // finish document
                    doc.end();
                }
            },

            exportFile(content, fileName) {
                let fileType = 'txt/csv;charset=utf-8';
                if (navigator.msSaveBlob) { // IE 
                    navigator.msSaveBlob(new Blob([content], {
                        type: fileType
                    }), fileName);
                } else {
                    let e = document.createElement('a');
                    e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(content));
                    e.setAttribute('download', fileName);
                    e.style.display = 'none';
                    document.body.appendChild(e);
                    e.click();
                    document.body.removeChild(e);
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

    body {
        margin-bottom: 48pt;
    }
</style>