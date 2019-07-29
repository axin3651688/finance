import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFilter from '@grapecity/wijmo.grid.filter';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjXlsx from '@grapecity/wijmo.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { generateSlipData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = generateSlipData(50);
    let debtorSum;
    let creditorSum;
    let balance;
    let items = new wjCore.CollectionView(data.items);
    items.pageSize = 5;
    document.querySelector('#slipNo').value = data.slipNo;
    document.querySelector('#settlement').value = data.settlement;
    let inputDate = new wjInput.InputDate('#inputDate');
    inputDate.format = 'd';
    inputDate.value = data.date;
    inputDate.min = new Date(data.date.getFullYear(), 0, 1);
    inputDate.max = new Date(data.date.getFullYear(), 11, 31);
    let transferSlip = new wjMultiRow.MultiRow('#transferSlip', {
        itemsSource: items,
        layoutDefinition: generateLayoutDef()
    });
    let filter = new wjFilter.FlexGridFilter(transferSlip);
    transferSlip.rowHeaders.columns.clear();
    let cv = transferSlip.collectionView;
    currentPageChanged();
    updateSummary(cv);
    transferSlip.cellEditEnded.addHandler(() => {
        updateSummary(cv);
    });
    cv.pageChanged.addHandler(() => {
        updateSummary(cv);
        currentPageChanged();
    });
    cv.collectionChanged.addHandler((sender, e) => {
        let debtorAmt, creditorAmt;
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
    document.querySelector('#first').addEventListener('click', () => {
        cv.moveToFirstPage();
    });
    document.querySelector('#previous').addEventListener('click', () => {
        cv.moveToPreviousPage();
    });
    document.querySelector('#next').addEventListener('click', () => {
        cv.moveToNextPage();
    });
    document.querySelector('#last').addEventListener('click', () => {
        cv.moveToLastPage();
    });
    // Generate the layout definition for the MultiRow control.
    function generateLayoutDef() {
        let debtorAccDataMap = buildDataMap('Saralies,Transport,Entertainment,Supplies,Fees'.split(',')), debtorTypeDataMap = buildDataMap(['(none)']), creditorAccDataMap = buildDataMap('Ordinary deposit,Deposits payable,Advance money,Accounts payable'.split(',')), creditorTypeDataMap = buildDataMap('Grape bank,Orange bank,Apple bank,Grape card'.split(','));
        return [
            {
                cells: [
                    { binding: 'debtorAcc', width: 125, header: 'Debtor Account', dataMap: debtorAccDataMap, align: 'center' },
                    { binding: 'debtorType', width: 125, header: 'Debtor Type', dataMap: debtorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorAmt', width: 125, format: 'c2', header: 'Debtor Amount', align: 'center' },
                    { binding: 'debtorTax', width: 125, format: 'c2', header: 'Debtor Tax', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAcc', width: 125, header: 'Creditor Account', dataMap: creditorAccDataMap, align: 'center' },
                    { binding: 'creditorType', width: 125, header: 'Creditor Type', dataMap: creditorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAmt', width: 125, format: 'c2', header: 'Creditor Amount', align: 'center' },
                    { binding: 'creditorTax', width: 125, format: 'c2', header: 'Creditor Tax', align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'brief', width: 210, header: 'Brief', align: 'center' },
                    { binding: 'note', width: 210, header: 'Note', align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorTaxCategrory', width: 230, header: 'Debtor Tax Category', align: 'center' },
                    { binding: 'creditorTaxCategory', width: 230, header: 'Creditor Tax Categoty', align: 'center' }
                ]
            }
        ];
    }
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    // Update summary info for the footer of the multirow control.
    function updateSummary(cv) {
        let debtor = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'debtorAmt'), creditor = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'creditorAmt');
        debtorSum = wjCore.Globalize.format(debtor, 'c');
        creditorSum = wjCore.Globalize.format(creditor, 'c');
        balance = wjCore.Globalize.format(debtor - creditor, 'c');
        document.querySelector('#debtorSum').innerHTML = debtorSum;
        document.querySelector('#creditorSum').innerHTML = creditorSum;
        document.querySelector('#balance').innerHTML = balance;
    }
    function currentPageChanged() {
        let cv = transferSlip.collectionView, curr = wjCore.format('{current:n0} / {count:n0}', {
            current: cv.pageIndex + 1,
            count: cv.pageCount
        });
        document.querySelector('#current').innerHTML = curr;
        if (cv.pageIndex === 0) {
            document.querySelector('#first').setAttribute('disabled', 'true');
            document.querySelector('#previous').setAttribute('disabled', 'true');
        }
        else {
            document.querySelector('#first').removeAttribute('disabled');
            document.querySelector('#previous').removeAttribute('disabled');
        }
        if (cv.pageIndex === cv.pageCount - 1) {
            document.querySelector('#last').setAttribute('disabled', 'true');
            document.querySelector('#next').setAttribute('disabled', 'true');
        }
        else {
            document.querySelector('#last').removeAttribute('disabled');
            document.querySelector('#next').removeAttribute('disabled');
        }
    }
    document.querySelector('#exportXlsx').addEventListener('click', () => {
        exportToExcel();
    });
    document.querySelector('#exportPdf').addEventListener('click', () => {
        exportToPDF();
    });
    // Export the records of current page to xlsx file.
    function exportToExcel() {
        let workbook = wjGridXlsx.FlexGridXlsxConverter.save(transferSlip);
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
        workbookCell.value = data.date;
        let dateCellStyle = new wjXlsx.WorkbookStyle();
        dateCellStyle.format = 'MM/dd/yyyy';
        workbookCell.style = dateCellStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Slip No';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = data.slipNo;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Settlement';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = data.settlement;
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
        workbookCell.value = debtorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Creditor Sum';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = creditorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = 'Balance';
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjXlsx.WorkbookCell();
        workbookCell.value = balance;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.push(workbookRow);
        workbook.saveAsync('TransferSlip.xlsx');
    }
    // Save the records of current page to PDF file.
    function exportToPDF() {
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
            ended: function (sender, args) {
                wjPdf.saveBlob(args.blob, 'TransferSlip.pdf');
            }
        }), settings = {
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
        doc.drawText(wjCore.Globalize.format(data.date, 'd'), 53.5, 5.5, drawTextSetting);
        doc.paths
            .rect(130.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('Slip No', 133.5, 5.5, drawTextSetting);
        doc.drawText(data.slipNo, 183.5, 5.5, drawTextSetting);
        doc.paths
            .rect(230.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText('Settlement', 233.5, 5.5, drawTextSetting);
        doc.drawText(data.settlement, 283.5, 5.5, drawTextSetting);
        doc.moveDown();
        // Draw the body of the transfer slip.
        wjGridPdf.FlexGridPdfConverter.draw(transferSlip, doc, null, null, settings);
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
        doc.drawText(debtorSum, 63.5, 279.5, drawTextSetting);
        doc.drawText('Creditor Sum', 123.5, 279.5, drawTextSetting);
        doc.drawText(creditorSum, 183.5, 279.5, drawTextSetting);
        doc.drawText('Balance', 243.5, 279.5, drawTextSetting);
        doc.drawText(balance, 323.5, 279.5, drawTextSetting);
        doc.end();
    }
}
