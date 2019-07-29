import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    @ViewChild('flexGrid') flexGrid: grid.FlexGrid;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData(10);
    }
    //
    export() {
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
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
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
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
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