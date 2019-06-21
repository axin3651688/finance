import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let frozenSheet = new wjFlexSheet.FlexSheet('#frozenSheet');
    frozenSheet.addUnboundSheet('unbound', 30, 12);
    frozenSheet.deferUpdate(() => {
        let colIdx, rowIdx;
        for (colIdx = 0; colIdx < frozenSheet.columns.length; colIdx++) {
            for (rowIdx = 0; rowIdx < frozenSheet.rows.length; rowIdx++) {
                frozenSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
            }
        }
    });
    document.querySelector('#freezeButton').addEventListener('click', (e) => {
        frozenSheet.freezeAtCursor();
        if (frozenSheet.frozenColumns > 0 || frozenSheet.frozenRows > 0) {
            e.target.textContent = 'UnFreeze';
        }
        else {
            e.target.textContent = 'Freeze';
        }
    });
}
