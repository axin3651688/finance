<template>
    <div class="container-fluid">
        <p>
            This sample demonstrates the "Simple single grid export" scenario and shows how to export FlexGrid in
            a background thread.
        </p>
        <button class="btn btn-default" :disabled="ctx1.preparing" @click="export1(ctx1)">{{ctx1.exporting ? 'Cancel' :
            'Export'}}</button>&nbsp;
        <span>{{ (ctx1.progress * 100).toFixed(1) + "%" }}</span>
        <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="Column" allowMerging="All"
            :itemsSource="data" :isDisabled="ctx1.preparing" :initialized="initializeGrid">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Amount" binding="amount" format="c"></wj-flex-grid-column>
            <wj-flex-grid-column header="Color" binding="color"></wj-flex-grid-column>
            <wj-flex-grid-column header="Pending" binding="amount2" format="c2"></wj-flex-grid-column>
            <wj-flex-grid-column header="Discount" binding="discount" format="p1"></wj-flex-grid-column>
            <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
        </wj-flex-grid>

        <hr />

        <p>
            This sample demonstrates the "Custom document generation" scenario and shows how to export FlexPie
            (as a SVG image), FlexGrid and PNG image to a PDF in a background thread.
        </p>
        <p>
            The <a href="https://www.npmjs.com/package/xmldom">xmldom</a> library is used here to bring DOM
            support to the server to be able to draw SVG.
        </p>
        <button class="btn btn-default" :disabled="ctx2.preparing" @click="export2(ctx2)">{{ctx2.exporting ? 'Cancel' :
            'Export'}}</button>&nbsp;
        <span>{{ (ctx2.progress * 100).toFixed(1) + "%" }}</span>
        <p></p>
        <div class="row">
            <div class="col-md-6">
                <wj-flex-pie :itemsSource="totals" binding="value" bindingName="name" :innerRadius="0.75" :initialized="initializePie">
                    <wj-flex-pie-data-label content="{value:c1}" position="Inside"></wj-flex-pie-data-label>
                </wj-flex-pie>
            </div>
            <div class="col-md-6">
                <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="Column" allowMerging="All"
                    :itemsSource="data" :isDisabled="ctx2.preparing" :initialized="initializeGrid2">
                    <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
                    <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Amount" binding="amount" format="c"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Color" binding="color"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Pending" binding="amount2" format="c2"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Discount" binding="discount" format="p1"></wj-flex-grid-column>
                    <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
                </wj-flex-grid>
            </div>
        </div>

        <hr />

        <p>
            This sample demonstrates the "Low-level usage of Web Workers API" scenario and shows how to export
            FlexGrid to a PDF in a background thread a background thread using Web Workers API.
        </p>
        <button class="btn btn-default" :disabled="ctx3.preparing" @click="export3(ctx3)">{{ctx3.exporting ? 'Cancel' :
            'Export'}}</button>&nbsp;
        <span>{{ (ctx3.progress * 100).toFixed(1) + "%" }}</span>
        <wj-flex-grid class="grid" :autoGenerateColumns=false headersVisibility="Column" allowMerging="All"
            :itemsSource="data" :isDisabled="ctx3.preparing" :initialized="initializeGrid3">
            <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
            <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
            <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
            <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
            <wj-flex-grid-column header="Amount" binding="amount" format="c"></wj-flex-grid-column>
            <wj-flex-grid-column header="Color" binding="color"></wj-flex-grid-column>
            <wj-flex-grid-column header="Pending" binding="amount2" format="c2"></wj-flex-grid-column>
            <wj-flex-grid-column header="Discount" binding="discount" format="p1"></wj-flex-grid-column>
            <wj-flex-grid-column header="Active" binding="active"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.chart.render';
    import * as pdf from '@grapecity/wijmo.pdf';
    import * as gridPdf from '@grapecity/wijmo.grid.pdf';
    import { getExpenses, getData } from './data';
    import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
    import { WjChartModule } from '@grapecity/wijmo.vue2.chart';

    new Vue({
        el: '#app',
        data: {
            docName: 'FlexGrid.pdf',
            gridExportSettings: {
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
            },
            data: getData(1500),
            totals: ((totals) => [
                { name: 'Hotel', value: totals.hotel },
                { name: 'Transport', value: totals.transport },
                { name: 'Meal', value: totals.meal },
                { name: 'Fuel', value: totals.fuel },
                { name: 'Misc', value: totals.Misc }
            ])(getExpenses().totals),
            ctx1: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            },
            ctx2: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            },
            ctx3: {
                exporting: false,
                progress: 0,
                preparing: false,
                worker: null
            }
        },
        methods: {
            initializeGrid(ctl) {
                this.flexGrid = ctl;
            },
            initializeGrid2(ctl) {
                this.flexGrid2 = ctl;
            },
            initializeGrid3(ctl) {
                this.flexGrid3 = ctl;
            },
            initializePie(ctl) {
                this.flexPie = ctl;
            },
            export1(ctx) {
                if (!ctx.exporting) {
                    this.start(ctx, './export-grid.js', () => {
                        gridPdf.PdfWebWorkerClient.exportGrid(ctx.worker, this.flexGrid, this.docName, this.gridExportSettings, null, (progress) => {
                            this.progress(ctx, progress);
                        });
                    });
                } else {
                    this.cancel(ctx);
                }
            },
            export2(ctx) {
                if (!ctx.exporting) {
                    this.start(ctx, './export.js', () => {
                        gridPdf.PdfWebWorkerClient.addString(ctx.worker, 'Title', 'title');
                        gridPdf.PdfWebWorkerClient.addImage(ctx.worker, 'resources/canada.png', 'flag', null);
                        this.flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, (url) => {
                            gridPdf.PdfWebWorkerClient.addImage(ctx.worker, url, 'chart', null);
                        });
                        gridPdf.PdfWebWorkerClient.addGrid(ctx.worker, this.flexGrid2, 'grid', this.gridExportSettings);
                        //
                        gridPdf.PdfWebWorkerClient.export(ctx.worker, null,
                            (data) => pdf.saveBlob(data.blob, this.docName),
                            (progress) => this.progress(ctx, progress)
                        );
                    });
                } else {
                    this.cancel(ctx);
                }
            },
            export3(ctx) {
                if (!ctx.exporting) {
                    this.start(ctx, './api.js', () => {
                        ctx.worker.addEventListener('message', (e) => {
                            if (e.data.type === 'progress') {
                                this.progress(ctx, e.data.value);
                            } else {
                                pdf.saveBlob(new Blob([new Uint8Array(e.data.data)], { type: 'application/pdf' }), this.docName);
                            }
                        });
                        //
                        var gridData = gridPdf.PdfWebWorkerClient.serializeGrid(this.flexGrid3, this.gridExportSettings);
                        // Send gridData as a tranferable object
                        ctx.worker.postMessage({ grid: gridData, settings: JSON.stringify(this.gridExportSettings) }, [gridData]);
                    });
                } else {
                    this.cancel(ctx);
                }
            },
            loadWorker(url, ready) {
                let worker = new Worker('src/workers/worker-loader.js');
                //
                worker.addEventListener('message', (e) => {
                    if (e.data === '#ready#') {
                        ready();
                    }
                });
                //
                worker.postMessage({ url: url });
                //
                return worker;
            },
            start(ctx, url, ready) {
                ctx.preparing = true;
                ctx.progress = 0;
                ctx.worker = this.loadWorker(url, () => ready());
            },
            progress(ctx, progress) {
                if (progress === 0 || progress === 1) {
                    ctx.preparing = false;
                    ctx.exporting = progress === 0;
                }
                ctx.progress = progress;
            },
            cancel(ctx) {
                ctx.worker.terminate();
                ctx.exporting = false;
                ctx.progress = 0;
                ctx.worker = null;
            }
        },
        destroyed: function() {
            if (this.ctx1.worker) {
                this.ctx1.worker.terminate();
                this.ctx1.worker = null;
            }
            if (this.ctx2.worker) {
                this.ctx2.worker.terminate();
                this.ctx2.worker = null;
            }
            if (this.ctx3.worker) {
                this.ctx3.worker.terminate();
                this.ctx3.worker = null;
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