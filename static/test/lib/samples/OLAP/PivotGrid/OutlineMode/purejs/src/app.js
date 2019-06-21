import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { PivotEngine, PivotPanel, PivotGrid } from '@grapecity/wijmo.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { toggleClass } from '@grapecity/wijmo';
import { getData } from './data';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create the olap components
    var theEngine = new PivotEngine({
        itemsSource: getData(1000),
        showRowTotals: 'Subtotals',
        showColumnTotals: 'None',
        totalsBeforeData: true,
        rowFields: ['Country', 'Product', 'Color'],
        valueFields: ['Sales', 'Expenses', 'Downloads']
    });
    var thePanel = new PivotPanel('#thePanel', {
        engine: theEngine,
    });
    var theGrid = new PivotGrid('#theGrid', {
        itemsSource: theEngine,
        outlineMode: true,
        loadedRows: (s) => {
            var totalIndex = theEngine.totalsBeforeData ? 0 : s.rows.length - 1;
            s.rows[totalIndex].visible = false;
        }
    });
    // customize the olap components
    document.getElementById('outline').addEventListener('click', e => {
        theGrid.outlineMode = e.target.checked;
        if (theGrid.outlineMode) {
            let before = document.getElementById('before');
            theEngine.totalsBeforeData = before.checked = true;
        }
        else {
            let before = document.getElementById('style');
            before.checked = false;
            toggleClass(theGrid.hostElement, 'outline', false);
        }
    });
    document.getElementById('style').addEventListener('click', e => {
        let customStyle = e.target.checked;
        toggleClass(theGrid.hostElement, 'outline', customStyle);
    });
    document.getElementById('before').addEventListener('click', e => {
        theEngine.totalsBeforeData = e.target.checked;
    });
    document.getElementById('headers').addEventListener('click', e => {
        theGrid.showRowFieldHeaders = e.target.checked;
    });
    // export to CSV
    document.getElementById('csv').addEventListener('click', e => {
        var rng = new CellRange(0, 0, theGrid.rows.length - 1, theGrid.columns.length - 1), csv = theGrid.getClipString(rng, true, true, true);
        exportFile(csv, 'FlexGrid.csv');
    });
    function exportFile(csv, fileName) {
        var fileType = 'txt/csv;charset=utf-8';
        if (navigator.msSaveBlob) { // IE 
            navigator.msSaveBlob(new Blob([csv], {
                type: fileType
            }), fileName);
        }
        else {
            var e = document.createElement('a');
            e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(csv));
            e.setAttribute('download', fileName);
            e.style.display = 'none';
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        }
    }
}
