import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { getOrderDetail } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getOrderDetail(5);
    let orderDetail = new wjMultiRow.MultiRow('#orderDetail', {
        itemsSource: data,
        layoutDefinition: generateLayoutDef()
    });
    // Generate the layout definition for the MultiRow control.
    function generateLayoutDef() {
        return [
            {
                colspan: 6,
                cells: [
                    { binding: 'orderId', width: 90, header: 'Order ID' },
                    { binding: 'partId', width: 80, header: 'Part ID' },
                    { binding: 'handlingId', width: 100, header: 'Handling ID' },
                    { binding: 'processingStatus', width: 125, header: 'Processing Status' },
                    { binding: 'purchaseId', width: 100, header: 'Purchase ID' },
                    { binding: 'completed', width: 100, header: 'Completed' },
                    { binding: 'orderDate', width: 90, header: 'Order Date' },
                    { binding: 'partName', header: 'Part Name', colspan: 5, align: 'center' },
                    { binding: 'company', header: 'Company', colspan: 3, align: 'center' },
                    { binding: 'person', header: 'Person', colspan: 2, align: 'center' },
                    { binding: 'accepted', width: 100, header: 'Accepted' }
                ]
            },
            {
                cells: [
                    { binding: 'quantity1', width: 90, header: 'Quantity 1' },
                    { binding: 'quantity2', width: 90, header: 'Quantity 2' },
                    { binding: 'quantity3', width: 90, header: 'Quantity 3' },
                ]
            },
            {
                cells: [
                    { binding: 'unit', width: 60, header: 'Unit' },
                ]
            },
            {
                cells: [
                    { binding: 'deliveryDate', width: 120, header: 'Delivery Date', format: 'yyyy/MM/dd' },
                    { binding: 'processingDate', width: 120, header: 'Processing Date', format: 'yyyy/MM/dd' },
                    { binding: 'shippingDate', width: 120, header: 'Shipping Date', format: 'yyyy/MM/dd' }
                ]
            },
            {
                cells: [
                    { binding: 'packingRequest', header: 'Packing Request' }
                ]
            }
        ];
    }
    document.querySelector('#exportXlsx').addEventListener('click', () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(orderDetail, null, 'OrderDetail.xlsx');
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
                wjPdf.saveBlob(args.blob, 'OrderDetail.pdf');
            }
        }), settings = {
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
        wjGridPdf.FlexGridPdfConverter.draw(orderDetail, doc, null, null, settings);
        doc.end();
    });
}
