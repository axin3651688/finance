import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';

import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService, OrderDetails, Line } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('orderDetail') orderDetail: wjMultirow.MultiRow;
    data: OrderDetails[];
    layoutDefinition: Line[];
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getOrderDetail(5)
        this.layoutDefinition = dataService.generateLayoutDef();
    }
    onExportXlsxClick() {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.orderDetail, null, 'OrderDetail.xlsx');
    }

    onExportPdfClick() {
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
            ended: function (sender: wjPdf.PdfDocument, args: wjPdf.PdfDocumentEndedEventArgs) {
                wjPdf.saveBlob(args.blob, 'OrderDetail.pdf');
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

        wjGridPdf.FlexGridPdfConverter.draw(this.orderDetail, doc, null, null, settings);
        doc.end();
    }
}
//\\
@NgModule({
    imports: [WjGridMultirowModule, BrowserModule],
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
