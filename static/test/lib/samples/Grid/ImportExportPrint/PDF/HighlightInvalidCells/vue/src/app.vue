<template>
    <div class="container-fluid">
        <!-- FlexGrid settings -->
        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        FlexGrid Settings
                    </h4>
                </div>
                <div class="panel-body">
                    <div class="form-check">
                        <label for="cbShowErrors" class="form-check-label">Show Errors</label>
                        <input id="cbShowErrors" type="checkbox" v-model="showErrors" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Export button -->
        <button class="btn btn-default" @click="exportPDF">Export</button>

        <!-- FlexGrid -->
        <wj-flex-grid class="grid" :autoGenerateColumns=false selectionMode="ListBox" headersVisibility="All"
            :showErrors="showErrors" :itemsSource="data" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Amount" binding="amount" format="c"></wj-flex-grid-column>
            <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import { getData } from './data';
    import * as wijmo from '@grapecity/wijmo';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';

    new Vue({
        el: '#app',
        data: {
            data: getData(10),
            showErrors: true
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            exportPDF() {
                gridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
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
                        },
                        errorCellStyle: {
                            backgroundColor: 'rgba(255, 0, 0, 0.3)'
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
        height: 300px;
    }
</style>