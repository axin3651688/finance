import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Globalize } from '@grapecity/wijmo';
import { FlexGrid, Row, AllowMerging } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    // show data in a grid
    var theGrid = new FlexGrid('#theGrid', {
        isReadOnly: true,
        allowResizing: 'None',
        allowDragging: 'None',
        allowSorting: false,
        selectionMode: 'RowRange',
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country' },
            { binding: 'sales', header: 'Sales', width: 80, format: 'n0' },
            { binding: 'salesDiff', header: 'Diff', dataType: 'Number', width: 80, format: 'p0' },
            { binding: 'expenses', header: 'Expenses', width: 80, format: 'n0' },
            { binding: 'expensesDiff', header: 'Diff', dataType: 'Number', width: 80, format: 'p0' }
        ],
        itemsSource: data,
    });
    // insert extra column header row
    var ch = theGrid.columnHeaders, hr = new Row();
    ch.rows.insert(0, hr);
    // fill out headings in extra header row
    for (var i = 0; i < theGrid.columns.length; i++) {
        var hdr = ch.getCellData(1, i, false);
        if (hdr == 'Diff')
            hdr = ch.getCellData(1, i - 1, false);
        ch.setCellData(0, i, hdr);
    }
    // allow merging across and down extra header row
    theGrid.allowMerging = AllowMerging.ColumnHeaders;
    hr.allowMerging = true;
    theGrid.columns[0].allowMerging = true;
    theGrid.columns[1].allowMerging = true;
    // custom rendering for headers and "Diff" columns
    theGrid.formatItem.addHandler(function (s, e) {
        // center-align column headers
        if (e.panel == s.columnHeaders) {
            e.cell.innerHTML = '<div class="v-center">' +
                e.cell.innerHTML + '</div>';
        }
        // custom rendering for "Diff" columns
        if (e.panel == s.cells) {
            var col = s.columns[e.col];
            if (e.row > 0 && (col.binding == 'salesDiff' || col.binding == 'expensesDiff')) {
                var vnow = s.getCellData(e.row, e.col - 1), vprev = s.getCellData(e.row - 1, e.col - 1), diff = (vnow / vprev) - 1;
                // format the cell
                var html = '<div class="diff-{cls}">' +
                    '<span style="font-size:75%">{val}</span> ' +
                    '<span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                html = html.replace('{val}', Globalize.format(diff, col.format));
                if (diff < 0.01) {
                    html = html.replace('{cls}', 'down').replace('{glyph}', 'down');
                }
                else if (diff > 0.01) {
                    html = html.replace('{cls}', 'up').replace('{glyph}', 'up');
                }
                else {
                    html = html.replace('{cls}', 'none').replace('{glyph}', 'circle');
                }
                e.cell.innerHTML = html;
            }
        }
    });
}
