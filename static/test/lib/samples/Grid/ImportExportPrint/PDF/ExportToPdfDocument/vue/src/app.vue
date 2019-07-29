<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false selectionMode="ListBox" headersVisibility="All"
            :itemsSource="data" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import * as wijmo from '@grapecity/wijmo';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';

    new Vue({
        el: '#app',
        data: {
            data: getData(10)
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            exportPDF() {
                let doc = new pdf.PdfDocument({
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
                    ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
                });
                //
                let settings = {
                    styles: {
                        cellStyle: {
                            backgroundColor: '#ffffff',
                            borderColor: '#c6c6c6'
                        },
                        altCellStyle: {
                            backgroundColor: '#f9f9f9'
                        },
                        groupCellStyle: {
                            backgroundColor: '#dddddd'
                        },
                        headerCellStyle: {
                            backgroundColor: '#eaeaea'
                        }
                    }
                };
                //
                doc.drawText('This grid is scaled to fit the width of 200 and drawn using the draw method.', null, null, { width: 200 });
                doc.moveDown();
                gridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, 200, null, settings);
                //
                doc.drawText('This grid is drawn in its original size using the drawToPosition method.', 220, 0);
                doc.moveDown();
                gridPdf.FlexGridPdfConverter.drawToPosition(this.flexGrid, doc, new wijmo.Point(220, doc.y), null, null, settings);
                //
                doc.drawText('This grid is drawn in its original size using the draw method and is split into multiple pages.', 0, 400);
                doc.moveDown();
                gridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, null, null, settings);
                //
                doc.end();
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .grid {
        margin-top: 20px;
        height: 300px;
    }
</style>