import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { CellRange } from '@grapecity/wijmo.grid';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('grid') pivotGrid: wjOlap.PivotGrid;
    ng: wjOlap.PivotEngine;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.ng = new wjOlap.PivotEngine({
            itemsSource: dataService.getData(1000), // raw data
            valueFields: ['Amount'], // summarize amounts
            rowFields: ['Buyer', 'Type'], // by buyer and Type
            showRowTotals: 'Subtotals',
            showColumnTotals: 'Subtotals',
        });
        this.ng.fields.getField('Amount').format = 'c0';
        this.ng.fields.getField('Date').format = 'yyyy';
    }
    //
    export(docType: string) {
        if (docType === 'csv') {
            let grid = this.pivotGrid,
                rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1),
                csv = grid.getClipString(rng, true, true, true); // save CSV with column and row headers
            this.exportFile(csv, 'PivotGrid.csv');
        } else if (docType === 'xlsx') {
            //
            // create book with current view
            let book = wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.pivotGrid, {
                includeColumnHeaders: true,
                includeRowHeaders: true
            });
            book.sheets[0].name = 'PivotGrid';
            //
            // save the book
            book.saveAsync('PivotGrid.xlsx');
        } else if (docType === 'pdf') {
            wjGridPdf.FlexGridPdfConverter.export(this.pivotGrid, 'PivotGrid.pdf', {
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
        } else if (docType === 'pdfdoc') {
            // create the document
            let doc = new wjPdf.PdfDocument({
                compress: true,
                header: { declarative: { text: '\t&[Page]\\&[Pages]' } },
                ended: function (sender: wjPdf.PdfDocument, args: wjPdf.PdfDocumentEndedEventArgs) {
                    wjPdf.saveBlob(args.blob, 'PivotGridDoc.pdf');
                }
            });
            //
            // add some content
            doc.drawText('This is a PivotGrid control:');
            //
            // add the grid (400pt wide)
            wjGridPdf.FlexGridPdfConverter.draw(this.pivotGrid, doc, 400);
            //
            // finish document
            doc.end();
        }
    }
    exportFile(content: string, fileName: string) {
        var fileType = 'txt/csv;charset=utf-8';
        if (navigator.msSaveBlob) { // IE 
            navigator.msSaveBlob(new Blob([content], {
                type: fileType
            }), fileName);
        } else {
            var e = document.createElement('a');
            e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(content));
            e.setAttribute('download', fileName);
            e.style.display = 'none';
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        }
    }
}
//
@NgModule({
    imports: [WjOlapModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);