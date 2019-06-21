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
import { DataService, Order, Line } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('orderManagement') orderManagement: wjMultirow.MultiRow;
    items: wjCore.CollectionView;
    cv: wjCore.CollectionView;
    layoutDefinition: Line[];
    currentDescription: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.items = new wjCore.CollectionView(dataService.getOrders(20));
        this.items.pageSize = 5;
        this.layoutDefinition = dataService.generateLayoutDef();
    }
    //
    ngAfterViewInit() {
        this.cv = <wjCore.CollectionView>this.orderManagement.collectionView;
        this._currentPageChanged();
        this.cv.pageChanged.addHandler(() => {
            this._currentPageChanged();
        })
        this.cv.collectionChanged.addHandler((sender: any, e: wjCore.NotifyCollectionChangedEventArgs) => {
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
    onGotoPageClick(command: string) {
        let cv = this.cv;
        if (command === 'first') {
            cv.moveToFirstPage();
        } else if (command === 'previous') {
            cv.moveToPreviousPage();
        } else if (command === 'next') {
            cv.moveToNextPage();
        } else if (command === 'last') {
            cv.moveToLastPage();
        }
    }
    //
    onExportXlsxClick() {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.orderManagement, null, 'OrderManagemenr.xlsx');
    }
    //
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
                wjPdf.saveBlob(args.blob, 'OrderManagemenr.pdf');
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

        wjGridPdf.FlexGridPdfConverter.draw(this.orderManagement, doc, null, null, settings);
        doc.end();
    }
    //
    private _currentPageChanged() {
        let cv = this.cv;
        let curr = wjCore.format('{current:n0} / {count:n0}', {
            current: cv.pageIndex + 1,
            count: cv.pageCount
        });
        this.currentDescription = curr;
        if (cv.pageIndex === 0) {
            document.querySelector('#first').setAttribute('disabled', 'true');
            document.querySelector('#previous').setAttribute('disabled', 'true');
        } else {
            document.querySelector('#first').removeAttribute('disabled');
            document.querySelector('#previous').removeAttribute('disabled');
        }
        if (cv.pageIndex === cv.pageCount - 1) {
            document.querySelector('#last').setAttribute('disabled', 'true');
            document.querySelector('#next').setAttribute('disabled', 'true');
        } else {
            document.querySelector('#last').removeAttribute('disabled');
            document.querySelector('#next').removeAttribute('disabled');
        }
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
