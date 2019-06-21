import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjPdf from '@grapecity/wijmo.pdf';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import * as wjGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as wjGridPdf from '@grapecity/wijmo.grid.pdf';
import { getPurchaseSlip } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let data = getPurchaseSlip();
    let purchaseSlip = new wjMultiRow.MultiRow('#purchaseSlip', {
        itemsSource: data,
        layoutDefinition: generateLayoutDef()
    });
    purchaseSlip.columnFooters.rows.push(new wjGrid.Row());
    purchaseSlip.columnFooters.setCellData(0, 3, 'Summary');
    purchaseSlip.columnFooters.setCellData(0, 6, 'Amount Summary');
    let cv = purchaseSlip.collectionView;
    updateSummary(cv);
    cv.collectionChanged.addHandler((sender, e) => {
        let quantity, unitCost;
        if (e.action === wjCore.NotifyCollectionChangedAction.Change && !!e.item) {
            quantity = +e.item.quantity;
            unitCost = +e.item.unitCost;
            if (!isNaN(quantity) && !isNaN(unitCost)) {
                e.item.cost = quantity * unitCost;
                e.item.price = e.item.cost * 1.35;
                updateSummary(cv);
            }
        }
    });
    // Generate the layout definition for the MultiRow control.
    function generateLayoutDef() {
        let caseDataMap = buildDataMap('small,medium,large'.split(','));
        return [
            {
                cells: [
                    { binding: 'productName', header: 'Product Name', align: 'center', width: 200 }
                ]
            },
            {
                cells: [
                    { binding: 'productId', header: 'Product ID', width: 90 }
                ]
            },
            {
                cells: [
                    { binding: 'color', header: 'Color', align: 'center' },
                    { binding: 'packageUnit', header: 'Package Unit', align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'size', header: 'Size', width: 80 },
                    { binding: 'case', header: 'Case', dataMap: caseDataMap, width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: 'Quantity', width: 65 }
                ]
            },
            {
                cells: [
                    { binding: 'deal', header: 'Deal', width: 60 },
                    { binding: 'id', header: 'ID', width: 60 }
                ]
            },
            {
                cells: [
                    { binding: 'unitCost', header: 'Unit Cost', width: 130, format: 'c2' }
                ]
            },
            {
                cells: [
                    { binding: 'cost', header: 'Cost', width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'price', header: 'Price', width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: 'Remarks', align: 'center' }
                ]
            }
        ];
    }
    ;
    // Update the summary info for the MultiRow control.
    function updateSummary(cv) {
        let qtySum = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'quantity'), costSum = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'cost'), priceSum = wjCore.getAggregate(wjCore.Aggregate.Sum, cv.items, 'price');
        purchaseSlip.columnFooters.setCellData(0, 4, qtySum);
        purchaseSlip.columnFooters.setCellData(0, 7, wjCore.Globalize.format(costSum, 'c2'));
        purchaseSlip.columnFooters.setCellData(0, 8, wjCore.Globalize.format(priceSum, 'c2'));
    }
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    document.querySelector('#exportXlsx').addEventListener('click', () => {
        wjGridXlsx.FlexGridXlsxConverter.saveAsync(purchaseSlip, null, 'PurchaseSlip.xlsx');
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
                wjPdf.saveBlob(args.blob, 'PurchaseSlip.pdf');
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
        wjGridPdf.FlexGridPdfConverter.draw(purchaseSlip, doc, null, null, settings);
        doc.end();
    });
}
