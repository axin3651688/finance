import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let mergeSheet = new wjFlexSheet.FlexSheet('#mergeSheet');
    mergeSheet.addUnboundSheet('unbound', 20, 8);
    mergeSheet.deferUpdate(() => {
        let colIdx, rowIdx;
        for (colIdx = 0; colIdx < mergeSheet.columns.length; colIdx++) {
            for (rowIdx = 0; rowIdx < mergeSheet.rows.length; rowIdx++) {
                mergeSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
            }
        }
    });
    updateMergeButtonState(mergeSheet.getSelectionFormatState().isMergedCell);
    mergeSheet.selectionChanged.addHandler(() => {
        updateMergeButtonState(mergeSheet.getSelectionFormatState().isMergedCell);
    });
    document.querySelector('#mergeButton').addEventListener('click', () => {
        mergeSheet.mergeRange();
        updateMergeButtonState(mergeSheet.getSelectionFormatState().isMergedCell);
    });
    function updateMergeButtonState(isMergeCell) {
        let mergeButton = document.querySelector('#mergeButton');
        if (isMergeCell) {
            mergeButton.textContent = 'UnMerge';
        }
        else {
            mergeButton.textContent = 'Merge';
        }
    }
}
