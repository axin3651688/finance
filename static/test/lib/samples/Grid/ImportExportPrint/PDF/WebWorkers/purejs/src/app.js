import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as chart from '@grapecity/wijmo.chart';
import '@grapecity/wijmo.chart.render';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import { getData, getExpenses } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
const docName = 'FlexGrid.pdf';
//
function init() {
    const exportSettings = {
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
    const data = getData(1500);
    //
    initExportGridSample(exportSettings, data);
    initExportSample(exportSettings, data);
    initApiSample(exportSettings, data);
}
//
//
function initExportGridSample(exportSettings, data) {
    let flexGrid = new grid.FlexGrid('#flexGrid1', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Amount', binding: 'amount', format: 'c' },
            { header: 'Color', binding: 'color' },
            { header: 'Pending', binding: 'amount2', format: 'c2' },
            { header: 'Discount', binding: 'discount', format: 'p1' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: data
    });
    //
    let ctx = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null,
        grid: flexGrid,
        button: document.querySelector('#btnExport1'),
        progressEl: document.querySelector('#txtProgress1')
    };
    //
    ctx.button.addEventListener('click', () => {
        if (!ctx.exporting) {
            start(ctx, './export-grid', () => {
                gridPdf.PdfWebWorkerClient.exportGrid(ctx.worker, flexGrid, docName, exportSettings, null, (prgVal) => {
                    progress(ctx, prgVal);
                });
            });
        }
        else {
            cancel(ctx);
        }
    });
    //
    window.addEventListener('unload', () => {
        if (ctx.worker) {
            ctx.worker.terminate();
            ctx.worker = null;
        }
    });
}
//
//
function initExportSample(exportSettings, data) {
    let flexPie = new chart.FlexPie('#flexPie', {
        itemsSource: ((totals) => [
            { name: 'Hotel', value: totals.hotel },
            { name: 'Transport', value: totals.transport },
            { name: 'Meal', value: totals.meal },
            { name: 'Fuel', value: totals.fuel },
            { name: 'Misc', value: totals.Misc }
        ])(getExpenses().totals),
        binding: 'value',
        bindingName: 'name',
        innerRadius: 0.75,
        dataLabel: {
            content: '{value:c1}',
            position: chart.PieLabelPosition.Inside
        }
    });
    //
    let flexGrid = new grid.FlexGrid('#flexGrid2', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Amount', binding: 'amount', format: 'c' },
            { header: 'Color', binding: 'color' },
            { header: 'Pending', binding: 'amount2', format: 'c2' },
            { header: 'Discount', binding: 'discount', format: 'p1' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: data
    });
    //
    let ctx = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null,
        grid: flexGrid,
        button: document.querySelector('#btnExport2'),
        progressEl: document.querySelector('#txtProgress2')
    };
    //
    ctx.button.addEventListener('click', () => {
        if (!ctx.exporting) {
            start(ctx, './export', () => {
                gridPdf.PdfWebWorkerClient.addString(ctx.worker, 'Title', 'title');
                gridPdf.PdfWebWorkerClient.addImage(ctx.worker, 'resources/canada.png', 'flag', null);
                flexPie.saveImageToDataUrl(chart.ImageFormat.Svg, (url) => {
                    gridPdf.PdfWebWorkerClient.addImage(ctx.worker, url, 'chart', null);
                });
                gridPdf.PdfWebWorkerClient.addGrid(ctx.worker, flexGrid, 'grid', exportSettings);
                //
                gridPdf.PdfWebWorkerClient.export(ctx.worker, null, (data) => pdf.saveBlob(data.blob, docName), (prgVal) => progress(ctx, prgVal));
            });
        }
        else {
            cancel(ctx);
        }
    });
    //
    window.addEventListener('unload', () => {
        if (ctx.worker) {
            ctx.worker.terminate();
            ctx.worker = null;
        }
    });
}
//
//
function initApiSample(exportSettings, data) {
    let flexGrid = new grid.FlexGrid('#flexGrid3', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' },
            { header: 'Product', binding: 'product' },
            { header: 'Amount', binding: 'amount', format: 'c' },
            { header: 'Color', binding: 'color' },
            { header: 'Pending', binding: 'amount2', format: 'c2' },
            { header: 'Discount', binding: 'discount', format: 'p1' },
            { header: 'Active', binding: 'active' }
        ],
        itemsSource: data
    });
    //
    let ctx = {
        exporting: false,
        progress: 0,
        preparing: false,
        worker: null,
        grid: flexGrid,
        button: document.querySelector('#btnExport3'),
        progressEl: document.querySelector('#txtProgress3')
    };
    //
    ctx.button.addEventListener('click', () => {
        if (!ctx.exporting) {
            start(ctx, './api', () => {
                ctx.worker.addEventListener('message', (e) => {
                    if (e.data.type === 'progress') {
                        progress(ctx, e.data.value);
                    }
                    else {
                        pdf.saveBlob(new Blob([new Uint8Array(e.data.data)], { type: 'application/pdf' }), docName);
                    }
                });
                //
                var gridData = gridPdf.PdfWebWorkerClient.serializeGrid(flexGrid, exportSettings);
                // Send gridData as a tranferable object
                ctx.worker.postMessage({ grid: gridData, settings: JSON.stringify(exportSettings) }, [gridData]);
            });
        }
        else {
            cancel(ctx);
        }
    });
    //
    window.addEventListener('unload', () => {
        if (ctx.worker) {
            ctx.worker.terminate();
            ctx.worker = null;
        }
    });
}
//
function start(ctx, url, ready) {
    ctx.preparing = true;
    ctx.progress = 0;
    updateUI(ctx);
    //
    ctx.worker = loadWorker(url, () => ready());
}
//
function progress(ctx, progress) {
    if (progress === 0 || progress === 1) {
        ctx.preparing = false;
        ctx.exporting = progress === 0;
    }
    ctx.progress = progress;
    //
    updateUI(ctx);
}
//
function cancel(ctx) {
    ctx.worker.terminate();
    ctx.worker = null;
    ctx.exporting = false;
    ctx.progress = 0;
    //
    updateUI(ctx);
}
//
/**
 * Creates web worker that executes the module from the specified URL.
 * @param url The module URL, relative to the src/workers directory.
 * @param ready
 */
function loadWorker(url, ready) {
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
}
//
function updateUI(ctx) {
    ctx.grid.isDisabled = ctx.preparing;
    wijmo.enable(ctx.button, !ctx.preparing);
    ctx.button.textContent = ctx.exporting ? 'Cancel' : 'Export';
    ctx.progressEl.textContent = (ctx.progress * 100).toFixed(1) + '%';
}
