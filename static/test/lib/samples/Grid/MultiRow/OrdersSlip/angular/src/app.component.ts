import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';

import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService, OrdersSlipData, Line } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('ordersSlip') ordersSlip: wjMultirow.MultiRow;
    data: OrdersSlipData[];
    layoutDefinition: Line[];
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.generateOrdersSlipData();
        this.layoutDefinition = dataService.generateLayoutDef();
    }
    //
    ngAfterViewInit() {
        let cv = <wjCore.CollectionView>this.ordersSlip.collectionView;
        cv.collectionChanged.addHandler((sender: any, e: wjCore.NotifyCollectionChangedEventArgs) => {
            let unitPrice: number,
                quantity: number;
            if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                unitPrice = +e.item.unitPrice;
                quantity = +e.item.quantity;
                if (!isNaN(unitPrice) && !isNaN(quantity)) {
                    e.item.amount = unitPrice * quantity;
                }
            }
        });
    }
    //
    onExportXlsxClick() {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.ordersSlip, null, 'OrdersSlip.xlsx');
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
                wjPdf.saveBlob(args.blob, 'OrdersSlip.pdf');
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

        wjGridPdf.FlexGridPdfConverter.draw(this.ordersSlip, doc, null, null, settings);
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
