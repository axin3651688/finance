import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { CellRange } from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // initialize pivot engine
    let ng = new wjOlap.PivotEngine({
        itemsSource: getData(1000),
        valueFields: ['Amount'],
        rowFields: ['Buyer', 'Type'],
        showRowTotals: 'Subtotals',
        showColumnTotals: 'Subtotals',
    });
    //
    let amountField = ng.fields.getField('Amount');
    amountField.format = 'c0';
    //
    let dateField = ng.fields.getField('Date');
    dateField.format = 'yyyy'; // show dates as years
    //
    // show pivot panel
    let pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show pivot grid
    let pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // export the grid to CSV
    // NOTE: does not require any additional modules
    document.getElementById('csv').addEventListener('click', () => {
        let rng = new CellRange(0, 0, pivotGrid.rows.length - 1, pivotGrid.columns.length - 1), csv = pivotGrid.getClipString(rng, true, true, true); // save CSV with column and row headers
        exportFile(csv, 'PivotGrid.csv');
    });
    //
    // export the grid to XLSX
    // NOTE: requires jszip, wijmo.xlsx, and wijmo.grid.xlsx
    document.getElementById('xlsx').addEventListener('click', () => {
        // create book with current view
        let book = wjGridXlsx.FlexGridXlsxConverter.saveAsync(pivotGrid, {
            includeColumnHeaders: true,
            includeRowHeaders: true
        });
        book.sheets[0].name = 'PivotGrid';
        //
        // save the book
        book.saveAsync('PivotGrid.xlsx');
    });
    //
    // export grid to PDF
    // NOTE: requires wijmo.pdf and wijmo.grid.pdf
    document.getElementById('pdf').addEventListener('click', () => {
        wjGridPdf.FlexGridPdfConverter.export(pivotGrid, 'PivotGrid.pdf', {
            maxPages: 10,
            scaleMode: wjGridPdf.ScaleMode.PageWidth,
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
    });
    //
    // create a PDF document with the PivotGrid and some other content
    // NOTE: requires wijmo.pdf and wijmo.grid.pdf
    document.getElementById('pdfdoc').addEventListener('click', () => {
        // create the document
        let doc = new wjPdf.PdfDocument({
            compress: true,
            header: { declarative: { text: '\t&[Page]\\&[Pages]' } },
            ended: (sender, args) => {
                wjPdf.saveBlob(args.blob, 'PivotGridDoc.pdf');
            }
        });
        //
        // add some content
        doc.drawText('This is a PivotGrid control:');
        //
        // add the grid (400pt wide)
        wjGridPdf.FlexGridPdfConverter.draw(pivotGrid, doc, 400);
        //
        // finish document
        doc.end();
    });
}
function exportFile(csv, fileName) {
    var fileType = 'txt/csv;charset=utf-8';
    if (navigator.msSaveBlob) { // IE 
        navigator.msSaveBlob(new Blob([csv], {
            type: fileType
        }), fileName);
    }
    else {
        var e = document.createElement('a');
        e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(csv));
        e.setAttribute('download', fileName);
        e.style.display = 'none';
        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
    }
}
