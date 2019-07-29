import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
export class CustomMergeManager extends wjGrid.MergeManager {
    constructor(flexGrid) {
        super(flexGrid);
    }
    getMergedRange(panel, r, c, clip = true) {
        // create basic cell range
        var rg = new wjGrid.CellRange(r, c);
        // expand left/right
        for (var i = rg.col; i < panel.columns.length - 1; i++) {
            if (panel.getCellData(rg.row, i, true) != panel.getCellData(rg.row, i + 1, true))
                break;
            rg.col2 = i + 1;
        }
        for (var i = rg.col; i > 0; i--) {
            if (panel.getCellData(rg.row, i, true) != panel.getCellData(rg.row, i - 1, true))
                break;
            rg.col = i - 1;
        }
        // expand up/down
        for (var i = rg.row; i < panel.rows.length - 1; i++) {
            if (panel.getCellData(i, rg.col, true) != panel.getCellData(i + 1, rg.col, true))
                break;
            rg.row2 = i + 1;
        }
        for (var i = rg.row; i > 0; i--) {
            if (panel.getCellData(i, rg.col, true) != panel.getCellData(i - 1, rg.col, true))
                break;
            rg.row = i - 1;
        }
        // done
        return rg;
    }
}
function setData(p, r, cells) {
    if (p.cellType == wjGrid.CellType.Cell) {
        p.grid.rowHeaders.setCellData(r, 0, cells[0]);
    }
    for (var i = 1; i < cells.length; i++) {
        p.setCellData(r, i - 1, cells[i]);
    }
}
function centerCell(s, e) {
    if (e.cell.children.length == 0) {
        e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
        wjCore.setCss(e.cell, {
            display: 'table',
            tableLayout: 'fixed'
        });
        wjCore.setCss(e.cell.children[0], {
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle'
        });
    }
}
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create an unbound grid with 5 rows and 7 columns
    var theGrid = new wjGrid.FlexGrid('#theGrid');
    while (theGrid.columns.length < 7) {
        theGrid.columns.push(new wjGrid.Column());
    }
    while (theGrid.rows.length < 5) {
        theGrid.rows.push(new wjGrid.Row());
    }
    // configure the grid
    theGrid.mergeManager = new CustomMergeManager(theGrid);
    theGrid.formatItem.addHandler(centerCell);
    theGrid.rowHeaders.columns[0].width = 80;
    theGrid.rows.defaultSize = 40;
    theGrid.alternatingRowStep = 0;
    theGrid.isReadOnly = true;
    // populate the grid
    setData(theGrid.columnHeaders, 0, ',Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'.split(','));
    setData(theGrid.cells, 0, '12:00,Walker,Morning Show,Morning Show,Sport,Weather,N/A,N/A'.split(','));
    setData(theGrid.cells, 1, '13:00,Today Show,Today Show,Sesame Street,Football,Market Watch,N/A,N/A'.split(','));
    setData(theGrid.cells, 2, '14:00,Today Show,Today Show,Kid Zone,Football,Soap Opera,N/A,N/A'.split(','));
    setData(theGrid.cells, 3, '15:00,News,News,News,News,News,N/A,N/A'.split(','));
    setData(theGrid.cells, 4, '16:00,News,News,News,News,News,N/A,N/A'.split(','));
}
