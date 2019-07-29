import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let multiHeadersSheet = new wjFlexSheet.FlexSheet('#multiHeadersSheet');
    multiHeadersSheet.addUnboundSheet('unbound', 20, 10);
    multiHeadersSheet.deferUpdate(() => {
        for (let row = 0; row < multiHeadersSheet.rows.length; row++) {
            for (let col = 0; col < multiHeadersSheet.columns.length; col++) {
                multiHeadersSheet.setCellData(row, col, row + col);
            }
        }
    });
    onClick('addRowHeader', () => {
        multiHeadersSheet.rowHeaders.columns.push(new wjGrid.Column());
    });
    onClick('removeRowHeader', () => {
        let colCnt = multiHeadersSheet.rowHeaders.columns.length;
        if (colCnt > 0) {
            multiHeadersSheet.rowHeaders.columns.removeAt(colCnt - 1);
        }
    });
    onClick('addColumnHeader', () => {
        multiHeadersSheet.columnHeaders.rows.push(new wjGrid.Row());
    });
    onClick('removeColumnHeader', () => {
        let rowCnt = multiHeadersSheet.columnHeaders.rows.length;
        if (rowCnt > 0) {
            multiHeadersSheet.columnHeaders.rows.removeAt(rowCnt - 1);
        }
    });
    function onClick(id, fn) {
        document.querySelector('#' + id).addEventListener('click', fn);
    }
}
