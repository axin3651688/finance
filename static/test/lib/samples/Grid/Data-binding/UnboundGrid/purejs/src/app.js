import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // bind a grid to the raw data
    var theGrid = new wjGrid.FlexGrid('#theGrid');
    theGrid.allowResizing = wjGrid.AllowResizing.Both;
    theGrid.allowDragging = wjGrid.AllowDragging.Both;
    // add 50 rows, 10 columns
    for (var r = 0; r < 50; r++) {
        theGrid.rows.push(new wjGrid.Row());
    }
    for (var c = 0; c < 10; c++) {
        theGrid.columns.push(new wjGrid.Column());
    }
    // populate the scrollable area
    for (var r = 0; r < theGrid.rows.length; r++) {
        for (var c = 0; c < theGrid.columns.length; c++) {
            theGrid.setCellData(r, c, 'r' + r + ',c' + c);
        }
    }
    // add 3 rows to the column header and 3 columns to the row header panels
    for (var i = 0; i < 3; i++) {
        theGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
        theGrid.rowHeaders.columns.insert(0, new wjGrid.Column());
    }
    // populate the fixed area
    var p = theGrid.columnHeaders;
    for (var r = 0; r < p.rows.length; r++) {
        for (var c = 0; c < p.columns.length; c++) {
            p.setCellData(r, c, 'cHdr r' + r + ',c' + c);
        }
    }
    p = theGrid.rowHeaders;
    for (var r = 0; r < p.rows.length; r++) {
        for (var c = 0; c < p.columns.length; c++) {
            p.setCellData(r, c, 'rHdr r' + r + ',c' + c);
        }
    }
    p = theGrid.topLeftCells;
    for (var r = 0; r < p.rows.length; r++) {
        for (var c = 0; c < p.columns.length; c++) {
            p.setCellData(r, c, 'tl r' + r + ',c' + c);
        }
    }
}
