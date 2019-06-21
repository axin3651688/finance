import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
import { getData, getCountries, getProducts } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let excelIOSheet = new wjFlexSheet.FlexSheet('#excelIOSheet');
    excelIOSheet.addBoundSheet('Country', getData(50));
    excelIOSheet.addUnboundSheet('Unbound', 20, 8);
    excelIOSheet.deferUpdate(() => {
        let sheetIdx, sheetName, colIdx, rowIdx;
        for (sheetIdx = excelIOSheet.sheets.length - 1; sheetIdx >= 0; sheetIdx--) {
            excelIOSheet.selectedSheetIndex = sheetIdx;
            sheetName = excelIOSheet.selectedSheet.name;
            if (sheetName === 'Country') {
                // initialize the dataMap for the bound sheet.
                initDataMapForBindingSheet(excelIOSheet);
            }
            else {
                for (colIdx = 0; colIdx < excelIOSheet.columns.length; colIdx++) {
                    for (rowIdx = 0; rowIdx < excelIOSheet.rows.length; rowIdx++) {
                        excelIOSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                    }
                }
            }
        }
    });
    onClick('loadXlsx', () => {
        let fileInput = document.querySelector('#importFile');
        if (fileInput.files[0]) {
            excelIOSheet.loadAsync(fileInput.files[0]);
        }
    });
    onClick('saveXlsx', () => {
        let fileName = document.querySelector('#fileName').value;
        if (fileName == null || fileName === '') {
            fileName = 'FlexSheet.xlsx';
        }
        excelIOSheet.saveAsync(fileName);
    });
    // initialize the dataMap for the bound sheet.
    function initDataMapForBindingSheet(flexSheet) {
        let column;
        if (flexSheet) {
            column = flexSheet.columns.getColumn('countryId');
            if (column && !column.dataMap) {
                column.dataMap = buildDataMap(getCountries());
            }
            column = flexSheet.columns.getColumn('productId');
            if (column && !column.dataMap) {
                column.dataMap = buildDataMap(getProducts());
            }
            column = flexSheet.columns.getColumn('amount');
            if (column) {
                column.format = 'c2';
            }
        }
    }
    // build a data map from a string array using the indices as keys
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
