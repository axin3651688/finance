import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
import { getData, getCountries, getProducts } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let sortSheet = new wjFlexSheet.FlexSheet('#sortSheet');
    sortSheet.addBoundSheet('Country', getData(50));
    sortSheet.deferUpdate(() => {
        let column = sortSheet.columns.getColumn('countryId');
        if (column && !column.dataMap) {
            column.dataMap = buildDataMap(getCountries());
        }
        column = sortSheet.columns.getColumn('productId');
        if (column && !column.dataMap) {
            column.dataMap = buildDataMap(getProducts());
        }
        column = sortSheet.columns.getColumn('amount');
        if (column) {
            column.format = 'c2';
        }
    });
    let sortManager = sortSheet.sortManager;
    updateSortTable();
    onClick('addLevel', addSortLevel);
    onClick('delLevel', deleteSortLevel);
    onClick('copyLevel', copySortLevel);
    onClick('moveup', () => {
        moveSortLevel(-1);
    });
    onClick('movedown', () => {
        moveSortLevel(1);
    });
    onClick('commitSort', commitSort);
    onClick('cancelSort', cancelSort);
    sortSheet.selectedSheetChanged.addHandler(() => {
        updateSortTable();
    });
    sortManager.sortDescriptions.collectionChanged.addHandler(() => {
        updateSortTable();
    });
    sortManager.sortDescriptions.currentChanged.addHandler(() => {
        updateSortTable();
    });
    function updateSortTable() {
        let sortTableBody = document.querySelector('#sortTable tbody'), tRows = '', columns = getColumns(), sortItem;
        for (let index = 0; index < sortManager.sortDescriptions.itemCount; index++) {
            sortItem = sortManager.sortDescriptions.items[index];
            tRows += '<tr class="' + (sortManager.sortDescriptions.currentPosition === index ? 'success"' : '"') + '><td>' + updateColumnSelect(columns, sortItem) + '</td>';
            tRows += '<td><select class="form-control" onchange=""><option value="0"' + ((!sortItem || sortItem.ascending) ? ' selected="selected">' : '>') + 'Ascending</option>' +
                '<option value="1"' + ((sortItem && !sortItem.ascending) ? ' selected="selected">' : '>') + 'Descending</option></select></td></tr>';
        }
        sortTableBody.innerHTML = tRows;
        let sortRows = sortTableBody.querySelectorAll('tr');
        for (let rowIndex = 0; rowIndex < sortRows.length; rowIndex++) {
            sortRows[rowIndex].addEventListener('click', () => {
                sortManager.sortDescriptions.moveCurrentToPosition(rowIndex);
                updateActiveRow();
            });
        }
        let columnSelects = sortTableBody.querySelectorAll('tr td:first-child select'), ascendingSelects = sortTableBody.querySelectorAll('tr td:last-child select');
        for (let sortIndex = 0; sortIndex < columnSelects.length; sortIndex++) {
            sortItem = sortManager.sortDescriptions.items[sortIndex];
            columnSelects[sortIndex].addEventListener('change', (e) => {
                sortItem.columnIndex = e.target.selectedIndex - 1;
            });
            ascendingSelects[sortIndex].addEventListener('change', (e) => {
                sortItem.ascending = e.target.selectedIndex === 0;
            });
        }
        updateMoveButtonState();
    }
    function updateActiveRow() {
        let sortTableBody = document.querySelector('#sortTable tbody'), sortRows = sortTableBody.querySelectorAll('tr');
        removeSuccessClass(sortRows);
        wjCore.addClass(sortRows[sortManager.sortDescriptions.currentPosition], 'success');
    }
    function removeSuccessClass(sortRows) {
        for (let rowIndex = 0; rowIndex < sortRows.length; rowIndex++) {
            wjCore.removeClass(sortRows[rowIndex], 'success');
        }
    }
    function updateColumnSelect(columns, sortItem) {
        let colSelect = '<select class="form-control"><option value=-1></option>';
        for (let index = 0; index < columns.length; index++) {
            colSelect += '<option ' + ((sortItem && sortItem.columnIndex === index) ? 'selected="selected" ' : '') + ' value="' + index + '">' + columns[index] + '</option>';
        }
        colSelect += '</select>';
        return colSelect;
    }
    function updateMoveButtonState() {
        let moveupBtn = document.querySelector('#moveup'), movedownBtn = document.querySelector('#movedown');
        if (sortManager.sortDescriptions.currentPosition === 0) {
            moveupBtn.setAttribute('disabled', 'true');
        }
        else {
            moveupBtn.removeAttribute('disabled');
        }
        if (sortManager.sortDescriptions.currentPosition === sortManager.sortDescriptions.itemCount - 1) {
            movedownBtn.setAttribute('disabled', 'true');
        }
        else {
            movedownBtn.removeAttribute('disabled');
        }
    }
    // get the columns with the column header text for the column selection for sort setting.
    function getColumns() {
        var columns = [], i = 0;
        if (sortSheet) {
            for (; i < sortSheet.columns.length; i++) {
                columns.push('Column ' + wjFlexSheet.FlexSheet.convertNumberToAlpha(i));
            }
        }
        return columns;
    }
    // commit the sorts
    function commitSort() {
        sortManager.commitSort();
    }
    // cancel the sorts
    function cancelSort() {
        sortManager.cancelSort();
        updateActiveRow();
    }
    // add new sort level
    function addSortLevel() {
        sortManager.addSortLevel();
        updateActiveRow();
    }
    // delete current sort level
    function deleteSortLevel() {
        sortManager.deleteSortLevel();
        updateActiveRow();
    }
    // copy a new sort level by current sort level setting.
    function copySortLevel() {
        sortManager.copySortLevel();
        updateActiveRow();
    }
    // move the sort level
    function moveSortLevel(offset) {
        sortManager.moveSortLevel(offset);
        updateActiveRow();
    }
    // build a data map from a string array using the indices as keys
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    ;
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
