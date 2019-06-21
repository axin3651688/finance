import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import * as wjPdf from '@grapecity/wijmo.pdf';
import { getOrders } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let items = new wjCore.CollectionView(getOrders(20));
    items.pageSize = 5;
    let orderManagement = new wjMultiRow.MultiRow('#orderManagement', {
        itemsSource: items,
        layoutDefinition: generateLayoutDef()
    });
    let cv = orderManagement.collectionView;
    currentPageChanged();
    cv.pageChanged.addHandler(() => {
        currentPageChanged();
    });
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
        var warehouseDataMap = buildDataMap('Tokyo Warehouse, Kyoto Warehouse, Osaka Warehouse, Kyushu Warehouse'.split(','));
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'orderId', header: 'Order ID', width: 80 },
                    { binding: 'productId', header: 'Product ID', width: 80 },
                    { binding: 'productName', header: 'Product Name', width: 180 },
                    { binding: 'specialNote', header: 'Special Note', align: 'center', colspan: 3 }
                ]
            },
            {
                colspan: 3,
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 80 },
                    { binding: 'unitPrice', header: 'Unit Price', width: 80, format: 'c2' },
                    { binding: 'amount', header: 'Amount', isReadOnly: true, width: 80, format: 'c2' },
                    { binding: 'shippingWarehouse', header: 'Shipping Warehouse', dataMap: warehouseDataMap, align: 'center', colspan: 2 },
                    { binding: 'onHold', header: 'On Hold' },
                ]
            },
            {
                cells: [
                    { binding: 'orderDate', header: 'Order Date', format: 'yyyy/MM/dd' },
                    { binding: 'deliveryDate', header: 'Delivery Date', format: 'yyyy/MM/dd' }
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
    function currentPageChanged() {
        let cv = orderManagement.collectionView, curr = wjCore.format('{current:n0} / {count:n0}', {
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
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(orderManagement, null, 'OrderManagemenr.xlsx');
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
                wjPdf.saveBlob(args.blob, 'OrderManagemenr.pdf');
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
        wjGridPdf.FlexGridPdfConverter.draw(orderManagement, doc, null, null, settings);
        doc.end();
    });
}
