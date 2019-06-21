import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFilter from '@grapecity/wijmo.grid.filter';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';

import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, SlipData, Line } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('transferSlip') transferSlip: wjMultirow.MultiRow;
    data: SlipData;
    items: wjCore.CollectionView;
    layoutDefinition: Line[];
    cv: wjCore.CollectionView;
    debtorSum: string;
    creditorSum: string;
    balance: string;
    minDate:Date;
    maxDate:Date;
    //
    currentDescription: string;
    slipNo: string;
    settlement: string;

    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = this.dataService.generateSlipData(50);
        this.items = new wjCore.CollectionView(this.data.items);
        this.layoutDefinition = dataService.generateLayoutDef();
        this.minDate = new Date(this.data.date.getFullYear(), 0, 1);
        this.maxDate = new Date(this.data.date.getFullYear(), 11, 31);
    }
    //
    ngAfterViewInit() {
        this.items.pageSize = 5;
        this.slipNo = this.data.slipNo;
        this.settlement = this.data.settlement;

        let filter = new wjFilter.FlexGridFilter(this.transferSlip);
        this.transferSlip.rowHeaders.columns.clear();
        this.cv = <wjCore.CollectionView>this.transferSlip.collectionView;
        this._currentPageChanged();
        this._updateSummary();
        this.transferSlip.cellEditEnded.addHandler(() => {
            this._updateSummary();
        });
        this.cv.pageChanged.addHandler(() => {
            this._updateSummary();
            this._currentPageChanged();
        });
        this.cv.collectionChanged.addHandler((sender: any, e: wjCore.NotifyCollectionChangedEventArgs) => {
            let debtorAmt: number,
                creditorAmt: number;

            if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
                debtorAmt = +e.item.debtorAmt;
                creditorAmt = +e.item.creditorAmt;
                if (!isNaN(debtorAmt)) {
                    e.item.debtorTax = e.item.debtorAmt * 0.09;
                }
                if (!isNaN(creditorAmt)) {
                    e.item.creditorTax = e.item.creditorAmt * 0.09;
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
        let workbook = wjGridXlsx.FlexGridXlsxConverter.save(this.transferSlip);
        let workbookRow = new wjXlsx.WorkbookRow();
        let workbookFill = new wjXlsx.WorkbookFill();
        workbookFill.color = '#8080FF';
        let workbookFont = new wjXlsx.WorkbookFont();
        workbookFont.bold = true;
        let workbookStyle = new wjXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.font = workbookFont;
        workbookStyle.hAlign = wjXlsx.HAlign.Center;
        let workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Date';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.data.date;
        let dateCellStyle = new wjXlsx.WorkbookStyle();
        dateCellStyle.format = 'MM/dd/yyyy';
        workbookCell.style = dateCellStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Slip No'
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.data.slipNo;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Settlement';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.data.settlement;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.splice(0, 0, workbookRow);
        workbook.sheets[0].frozenPane.rows = 3;

        workbookRow = new wjXlsx.WorkbookRow();
        workbookFill = new wjXlsx.WorkbookFill();
        workbookFill.color = '#99B4D1';
        workbookStyle = new wjXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.hAlign = wjXlsx.HAlign.Center;
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Debtor Sum';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.debtorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Creditor Sum';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.creditorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Balance';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = this.balance;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.push(workbookRow);
        workbook.saveAsync('TransferSlip.xlsx');
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
                wjPdf.saveBlob(args.blob, 'TransferSlip.pdf')
            }
        }),
            settings = {
                styles: {
                    cellStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#c6c6c6'
                    },
                    altCellStyle: {
                        backgroundColor: '#f9f9f9'
                    },
                    headerCellStyle: {
                        backgroundColor: '#eaeaea'
                    }
                }
            }, font, drawTextSetting, thinPen = new wjPdf.PdfPen('#000000', 0.5);

        // Draw header of the transfer slip.
        doc.paths
            .rect(0.5, 0.5, 50, 21)
            .fill('#8080FF')
            .moveTo(0, 0).lineTo(334, 0)
            .moveTo(334, 0).lineTo(334, 22)
            .moveTo(0, 22).lineTo(334, 22)
            .moveTo(0, 0).lineTo(0, 22).stroke(thinPen);
        doc.drawText('Date', 3.5, 5.5, drawTextSetting);
        doc.drawText(wjCore.Globalize.format(this.data.date, 'd'), 53.5, 5.5, drawTextSetting);
        doc.paths
            .rect(130.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('Slip No', 133.5, 5.5, drawTextSetting);
        doc.drawText(this.data.slipNo, 183.5, 5.5, drawTextSetting);
        doc.paths
            .rect(230.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('Settlement', 233.5, 5.5, drawTextSetting);
        doc.drawText(this.data.settlement, 283.5, 5.5, drawTextSetting);
        doc.moveDown();

        // Draw the body of the transfer slip.
        wjGridPdf.FlexGridPdfConverter.draw(this.transferSlip, doc, null, null, settings);

        // Draw the footer of the transfer slip.
        doc.paths
            .rect(0.5, 274.5, 380, 21)
            .fill('#99B4D1')
            .moveTo(0, 274).lineTo(381, 274)
            .moveTo(381, 274).lineTo(381, 296)
            .moveTo(0, 296).lineTo(381, 296)
            .moveTo(0, 274).lineTo(0, 296)
            .moveTo(60, 274).lineTo(60, 296)
            .moveTo(120, 274).lineTo(120, 296)
            .moveTo(180, 274).lineTo(180, 296)
            .moveTo(240, 274).lineTo(240, 296)
            .moveTo(320, 274).lineTo(320, 296).stroke(thinPen);
        doc.drawText('Debtor Sum', 3.5, 279.5, drawTextSetting);
        doc.drawText(this.debtorSum, 63.5, 279.5, drawTextSetting);
        doc.drawText('Creditor Sum', 123.5, 279.5, drawTextSetting);
        doc.drawText(this.creditorSum, 183.5, 279.5, drawTextSetting);
        doc.drawText('Balance', 243.5, 279.5, drawTextSetting);
        doc.drawText(this.balance, 323.5, 279.5, drawTextSetting);

        doc.end();
    }
    //
    private _updateSummary() {
        let debtor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'debtorAmt'),
            creditor = wjCore.getAggregate(wjCore.Aggregate.Sum, this.cv.items, 'creditorAmt');
        this.debtorSum = wjCore.Globalize.format(debtor, 'c');
        this.creditorSum = wjCore.Globalize.format(creditor, 'c');
        this.balance = wjCore.Globalize.format(debtor - creditor, 'c');
    }
    //
    private _currentPageChanged() {
        let curr = wjCore.format('{current:n0} / {count:n0}', {
            current: this.cv.pageIndex + 1,
            count: this.cv.pageCount
        });
        this.currentDescription = curr;
        if (this.cv.pageIndex === 0) {
            document.querySelector('#first').setAttribute('disabled', 'true');
            document.querySelector('#previous').setAttribute('disabled', 'true');
        } else {
            document.querySelector('#first').removeAttribute('disabled');
            document.querySelector('#previous').removeAttribute('disabled');
        }
        if (this.cv.pageIndex === this.cv.pageCount - 1) {
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
    imports: [WjGridMultirowModule, WjInputModule, BrowserModule],
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
