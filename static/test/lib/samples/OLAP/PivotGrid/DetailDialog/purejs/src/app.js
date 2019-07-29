import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create a PivotEngine with a custom view
    var ngFmt = new wjOlap.PivotEngine({
        autoGenerateFields: false,
        itemsSource: getData(10000),
        showColumnTotals: 'GrandTotals',
        showRowTotals: 'None',
        fields: [
            { binding: 'product', header: 'Product' },
            { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
            { binding: 'sales', header: 'Sales', format: 'n0' },
            { binding: 'sales', header: 'Diff', format: 'p0', showAs: 'DiffRowPct' }
        ],
        rowFields: ['Date'],
        columnFields: ['Product'],
        valueFields: ['Sales', 'Diff']
    });
    //
    // toggle detail customization
    var customDetails = document.getElementById('customDetails');
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        isReadOnly: true,
        itemsSource: ngFmt,
        formatItem: formatItem // customize the grid cells
    });
    //
    // show detail dialog on click
    document.getElementById('showDetail').addEventListener('click', function () {
        var sel = pivotGrid.selection;
        if (sel.isValid) {
            pivotGrid.showDetail(sel.row, sel.col);
        }
        else {
            alert('Please select a cell in the PivotGrid first.');
        }
    });
    //
    // customize detail dialog
    var detailDialog = pivotGrid.detailDialog, detailGridHost = detailDialog.hostElement.querySelector('.wj-flexgrid');
    var detailGrid = wjCore.Control.getControl(detailGridHost);
    //
    // format cells in the detail grid
    detailGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells && customDetails.checked) {
            var large = false, small = false, val = s.getCellData(e.row, e.col, false);
            switch (s.columns[e.col].binding) {
                case 'sales':
                    large = val > 18;
                    small = val < 16;
                    break;
                case 'downloads':
                    large = val > 80;
                    small = val < 60;
                    break;
            }
            wjCore.toggleClass(e.cell, 'large-value', large);
            wjCore.toggleClass(e.cell, 'small-value', small);
        }
    });
    //
    // customize dialog content when showing it
    detailDialog.showing.addHandler(function (s, e) {
        if (customDetails.checked) {
            //
            // customize summary info above the grid
            // the default format is this:
            // Row: <b>{rowHeader}</b></br>
            // Column: <b>{columnHeader}</b><br>
            // {cellHeader}: <b>{cellValue}</b>
            var summary = s.hostElement.querySelector('.wj-summary'), fmt = 'Details for <b>{columnHeader}</b> on ' +
                '<b>{rowHeader}</b>: <b>{cellHeader}</b> is ' +
                '<b>{cellValue}</b>';
            summary.innerHTML = wjCore.format(fmt, s);
            //
            // sort detail grid by date
            var sds = detailGrid.collectionView.sortDescriptions;
            sds.push(new wjCore.SortDescription('date', false));
        }
    });
    //
    // item formatter for the grid
    function formatItem(s, e) {
        //
        // we are interested in the cells panel
        if (e.panel == s.cells) {
            //
            // remove color by default
            var color = '';
            //
            // format diff columns if custom formatting is on
            if (e.col % 2 == 1) {
                var value = s.getCellData(e.row, e.col), glyph = 'circle', span = ' <span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                color = '#d8b400';
                if (value != null) {
                    if (value < 0) { // negative variation
                        color = '#9f0000';
                        glyph = 'down';
                    }
                    else if (value > 0.05) { // positive variation
                        color = '#4c8f00';
                        glyph = 'up';
                    }
                    e.cell.innerHTML += span.replace('{glyph}', glyph);
                }
            }
            //
            // apply cell color
            e.cell.style.color = color;
        }
    }
}
