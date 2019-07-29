import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
import { getTableData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let tableSheet = new wjFlexSheet.FlexSheet('#tableSheet');
    tableSheet.addUnboundSheet('Table', 20, 7);
    let selectedTable = null;
    let tableStyleNames = [], i;
    for (i = 1; i <= 21; i++) {
        tableStyleNames.push('TableStyleLight' + i);
    }
    for (i = 1; i <= 28; i++) {
        tableStyleNames.push('TableStyleMedium' + i);
    }
    for (i = 1; i <= 11; i++) {
        tableStyleNames.push('TableStyleDark' + i);
    }
    let cboTableStyles = new wjInput.ComboBox('#tableStyles', {
        itemsSource: tableStyleNames,
        isEditable: false
    });
    cboTableStyles.selectedIndexChanged.addHandler(() => {
        // apply the table style for the selected table.
        if (selectedTable) {
            let tableStyle = tableSheet.getBuiltInTableStyle(cboTableStyles.selectedValue);
            selectedTable.style = tableStyle;
        }
    });
    let tableStyle = tableSheet.getBuiltInTableStyle('TableStyleDark9');
    tableSheet.selectedSheet.addTableFromArray(2, 1, getTableData(10), null, 'Table1', tableStyle, { showTotalRow: true });
    onClick('showHeaderRow', (e) => {
        if (selectedTable) {
            selectedTable.showHeaderRow = e.target.checked;
        }
    });
    onClick('showTotalRow', (e) => {
        if (selectedTable) {
            selectedTable.showTotalRow = e.target.checked;
        }
    });
    onClick('showBandedRows', (e) => {
        if (selectedTable) {
            selectedTable.showBandedRows = e.target.checked;
        }
    });
    onClick('showBandedColumns', (e) => {
        if (selectedTable) {
            selectedTable.showBandedColumns = e.target.checked;
        }
    });
    onClick('alterFirstColumn', (e) => {
        if (selectedTable) {
            selectedTable.alterFirstColumn = e.target.checked;
        }
    });
    onClick('alterLastColumn', (e) => {
        if (selectedTable) {
            selectedTable.alterLastColumn = e.target.checked;
        }
    });
    tableSheet.selectionChanged.addHandler((sender, args) => {
        let selection = args.range;
        if (selection.isValid) {
            getSelectedTable(selection, tableSheet);
        }
        else {
            selectedTable = null;
        }
    });
    tableSheet.updatedLayout.addHandler(() => {
        if (tableSheet.selection && tableSheet.selection.isValid) {
            getSelectedTable(tableSheet.selection, tableSheet);
        }
        else {
            selectedTable = null;
        }
    });
    // Get selected table in FlexSheet.
    function getSelectedTable(seletion, flexSheet) {
        if (flexSheet) {
            selectedTable = flexSheet.selectedSheet.findTable(seletion.row, seletion.col);
            let tableSettings = document.querySelector('#tableSettings');
            if (selectedTable) {
                tableSettings.style.display = '';
                let tableStyle = flexSheet.getBuiltInTableStyle(selectedTable.style.name);
                if (tableStyle) {
                    cboTableStyles.selectedValue = tableStyle.name;
                }
                getTableSettings();
            }
            else {
                tableSettings.style.display = 'none';
            }
        }
    }
    function getTableSettings() {
        let showHeaderRow = document.querySelector('#showHeaderRow'), showTotalRow = document.querySelector('#showTotalRow'), showBandedRows = document.querySelector('#showBandedRows'), showBandedColumns = document.querySelector('#showBandedColumns'), alterFirstColumn = document.querySelector('#alterFirstColumn'), alterLastColumn = document.querySelector('#alterLastColumn');
        if (selectedTable) {
            showHeaderRow.checked = selectedTable.showHeaderRow;
            showTotalRow.checked = selectedTable.showTotalRow;
            showBandedRows.checked = selectedTable.showBandedRows;
            showBandedColumns.checked = selectedTable.showBandedColumns;
            alterFirstColumn.checked = selectedTable.alterFirstColumn;
            alterLastColumn.checked = selectedTable.alterLastColumn;
        }
    }
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
