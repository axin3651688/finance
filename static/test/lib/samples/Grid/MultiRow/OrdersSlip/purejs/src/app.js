import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { generateOrdersSlipData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = generateOrdersSlipData();
    let ordersSlip = new wjMultiRow.MultiRow('#ordersSlip', {
        itemsSource: data,
        layoutDefinition: generateLayoutDef()
    });
    let cv = ordersSlip.collectionView;
    cv.collectionChanged.addHandler((sender, e) => {
        let unitPrice, quantity;
        if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
            unitPrice = +e.item.unitPrice;
            quantity = +e.item.quantity;
            if (!isNaN(unitPrice) && !isNaN(quantity)) {
                e.item.amount = unitPrice * quantity;
            }
        }
    });
    // Generate the layout definition for the MultiRow control.
    function generateLayoutDef() {
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 90 },
                    { binding: 'categoryId', header: 'Category ID', width: 90 },
                    { binding: 'categoryName', header: 'Category', width: 90 },
                    { binding: 'productName', header: 'Product Name', colspan: 3 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 140 },
                    { binding: 'packageUnit', header: 'Package Unit', width: 140 }
                ]
            },
            {
                cells: [
                    { binding: 'unitPrice', header: 'Unit Price', format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'amount', header: 'Amount', isReadOnly: true, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'shippingId', header: 'Shipping ID', width: 100 },
                    { binding: 'discontinued', header: 'Discontinued', width: 100 }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: 'Remarks', width: 280 },
                    { binding: 'description', header: 'Product Description', width: 280 }
                ]
            }
        ];
    }
    document.querySelector('#exportXlsx').addEventListener('click', () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(ordersSlip, null, 'OrdersSlip.xlsx');
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
                wjPdf.saveBlob(args.blob, 'OrdersSlip.pdf');
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
        wjGridPdf.FlexGridPdfConverter.draw(ordersSlip, doc, null, null, settings);
        doc.end();
    });
}
