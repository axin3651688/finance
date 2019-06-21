import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { getSalesSlip } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let items = new wjCore.CollectionView(getSalesSlip(20));
    items.pageSize = 5;
    let salesSlip = new wjMultiRow.MultiRow('#salesSlip', {
        itemsSource: items,
        layoutDefinition: generateLayoutDef()
    });
    let filter = new wjGridFilter.FlexGridFilter(salesSlip);
    let cv = salesSlip.collectionView;
    currentPageChanged();
    cv.pageChanged.addHandler(() => {
        currentPageChanged();
    });
    cv.collectionChanged.addHandler((sender, e) => {
        let unitPrice, profitUnitPrice, quantity;
        if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
            unitPrice = +e.item.unitPrice;
            profitUnitPrice = +e.item.profitUnitPrice;
            quantity = +e.item.quantity;
            if (!isNaN(quantity)) {
                if (!isNaN(unitPrice)) {
                    e.item.salesAmount = unitPrice * quantity;
                }
                if (!isNaN(profitUnitPrice)) {
                    e.item.totalProfit = profitUnitPrice * quantity;
                }
                if (!isNaN(unitPrice) && !isNaN(profitUnitPrice)) {
                    e.item.profitRate = e.item.totalProfit / e.item.salesAmount;
                }
            }
        }
        else if (e.action === wjCore.NotifyCollectionChangedAction.Reset) {
            currentPageChanged();
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
        return [
            {
                cells: [
                    { binding: 'id', header: 'No.', width: 60 }
                ]
            },
            {
                colspan: 5,
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 80 },
                    { binding: 'productName', header: 'Product Name', colspan: 3 },
                    { binding: 'marker', header: 'Marker', align: 'center' },
                    { binding: 'quantity', header: 'Quantity', width: 80, align: 'right' },
                    { binding: 'unit', header: 'Unit' },
                    { binding: 'unitPrice', header: 'Unit Price', format: 'c2', colspan: 2 },
                    { binding: 'salesAmount', header: 'Sales Amount', format: 'c2', isReadOnly: true },
                    { binding: 'profitUnitPrice', header: 'Profit Unit Price', format: 'c2', colspan: 2 },
                    { binding: 'totalProfit', header: 'Total Profit', format: 'c2', colspan: 2, isReadOnly: true, cssClass: 'profit-cell' },
                    { binding: 'profitRate', header: 'Profit Rate', format: 'p2', isReadOnly: true, cssClass: 'profit-cell' }
                ]
            }
        ];
    }
    function currentPageChanged() {
        let cv = salesSlip.collectionView, curr = wjCore.format('{current:n0} / {count:n0}', {
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
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(salesSlip, null, 'SalesSlip.xlsx');
    });
    document.querySelector('#exportPdf').addEventListener('click', () => {
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
                wjPdf.saveBlob(args.blob, 'SalesSlip.pdf');
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
        };
        wjGridPdf.FlexGridPdfConverter.draw(salesSlip, doc, null, null, settings);
        doc.end();
    });
}
