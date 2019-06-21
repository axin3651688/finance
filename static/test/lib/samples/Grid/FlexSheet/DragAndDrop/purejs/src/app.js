import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let dragDropSheet = new wjFlexSheet.FlexSheet('#dragDropSheet');
    dragDropSheet.addUnboundSheet('unbound', 12, 8);
    dragDropSheet.deferUpdate(() => {
        let colIdx, rowIdx;
        for (colIdx = 0; colIdx < dragDropSheet.columns.length; colIdx++) {
            for (rowIdx = 0; rowIdx < dragDropSheet.rows.length; rowIdx++) {
                dragDropSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
            }
        }
        dragDropSheet.applyCellsStyle({ fontWeight: 'bold' }, [new wjGrid.CellRange(0, 0, 5, 0),
            new wjGrid.CellRange(6, 1, 11, 1)]);
        dragDropSheet.applyCellsStyle({ textDecoration: 'underline' }, [new wjGrid.CellRange(0, 2, 5, 2),
            new wjGrid.CellRange(6, 3, 11, 3)]);
        dragDropSheet.applyCellsStyle({ fontStyle: 'italic' }, [new wjGrid.CellRange(0, 4, 5, 4),
            new wjGrid.CellRange(6, 5, 11, 5)]);
        dragDropSheet.applyCellsStyle({ format: 'c2' }, [new wjGrid.CellRange(0, 0, 5, 7)]);
        dragDropSheet.applyCellsStyle({ backgroundColor: '#4488CC' }, [new wjGrid.CellRange(0, 0, 11, 0),
            new wjGrid.CellRange(0, 2, 11, 2), new wjGrid.CellRange(0, 4, 11, 4)]);
        dragDropSheet.applyCellsStyle({ color: '#CC8844' }, [new wjGrid.CellRange(0, 1, 11, 1),
            new wjGrid.CellRange(0, 3, 11, 3), new wjGrid.CellRange(0, 5, 11, 5)]);
        dragDropSheet.applyCellsStyle({ color: '#336699' }, [new wjGrid.CellRange(0, 6, 5, 7)]);
        dragDropSheet.applyCellsStyle({ backgroundColor: '#996633' }, [new wjGrid.CellRange(6, 6, 11, 7)]);
    });
}
