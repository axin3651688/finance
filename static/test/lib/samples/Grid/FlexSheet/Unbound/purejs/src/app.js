import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let unboundSheet = new wjFlexSheet.FlexSheet('#unboundSheet');
    unboundSheet.addUnboundSheet('unbound', 20, 10);
    unboundSheet.deferUpdate(() => {
        for (let row = 0; row < unboundSheet.rows.length; row++) {
            for (let col = 0; col < unboundSheet.columns.length; col++) {
                unboundSheet.setCellData(row, col, row + col);
            }
        }
    });
}
