import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';

import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService, PurchaseSlip, Line } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('purchaseSlip') purchaseSlip: wjMultirow.MultiRow;
    data: PurchaseSlip[];
    layoutDefinition: Line[];
    cv: wjCore.CollectionView;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getPurchaseSlip();
        this.layoutDefinition = dataService.generateLayoutDef();
    }
    //
    ngAfterViewInit() {
        this.purchaseSlip.columnFooters.rows.push(new wjGrid.Row());
        this.purchaseSlip.columnFooters.setCellData(0, 3, 'Summary');
        this.purchaseSlip.columnFooters.setCellData(0, 6, 'Amount Summary');
        this.cv = <wjCore.CollectionView>this.purchaseSlip.collectionView;
        this._updateSummary();
        this.cv.collectionChanged.addHandler((sender: any, e: wjCore.NotifyCollectionChangedEventArgs) => {
            let quantity: number,
                unitCost: number;

            if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                quantity = +e.item.quantity;
                unitCost = +e.item.unitCost;
                if (!isNaN(quantity) && !isNaN(unitCost)) {
                    e.item.cost = quantity * unitCost;
                    e.item.price = e.item.cost * 1.35;
                    this._updateSummary();
                }
            }
        });
    }
    //
    onExportXlsxClick() {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(this.purchaseSlip, null, 'PurchaseSlip.xlsx');
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
                wjPdf.saveBlob(args.blob, 'PurchaseSlip.pdf');
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

        wjGridPdf.FlexGridPdfConverter.draw(this.purchaseSlip, doc, null, null, settings);
        doc.end();
    }
    //
    private _updateSummary() {
        let qtySum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'quantity'),
            costSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'cost'),
            priceSum = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'price');

        this.purchaseSlip.columnFooters.setCellData(0, 4, qtySum);
        this.purchaseSlip.columnFooters.setCellData(0, 7, wjCore.Globalize.format(costSum, 'c2'));
        this.purchaseSlip.columnFooters.setCellData(0, 8, wjCore.Globalize.format(priceSum, 'c2'));
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
