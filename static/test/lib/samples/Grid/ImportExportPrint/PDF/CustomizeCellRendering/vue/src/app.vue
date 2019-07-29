<template>
    <div class="container-fluid">
        <!-- Export button -->
        <button class="btn btn-default" v-on:click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false selectionMode="ListBox" headersVisibility="All"
            :itemsSource="data" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Color" binding="color" :isReadOnly="true"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';
    import * as grid from '@grapecity/wijmo.grid';

    new Vue({
        el: '#app',
        data: {
            data: getData(5)
        },
        methods:{
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            exportPDF() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
                    maxPages: 10,
                    documentOptions: {
                        header: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        },
                        footer: {
                            declarative: {
                                text: '\t&[Page]\\&[Pages]'
                            }
                        }
                    },
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
                    },
                    formatItem: (args) => {
                        if (args.panel.cellType === grid.CellType.RowHeader) {
                            args.data = (args.row + 1).toString();
                        } else {
                            if (args.panel.cellType === grid.CellType.Cell && args.panel.columns[args.col].binding === 'color') {
                                args.style.backgroundColor = args.data;
                            }
                        }
                    }
                });
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
        height: 200px;
    }
</style>