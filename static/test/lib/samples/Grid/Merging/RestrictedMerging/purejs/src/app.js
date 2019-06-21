import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
export class RestrictedMergeManager extends wjGrid.MergeManager {
    constructor(flexGrid) {
        super(flexGrid);
    }
    getMergedRange(p, r, c, clip = true) {
        // create basic cell range
        var rng = null;
        // start with single cell
        rng = new wjGrid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        // get reference values to use for merging
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        // expand up
        while (rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval) {
            rng.row--;
        }
        // expand down
        while (rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval) {
            rng.row2++;
        }
        // don't bother with single-cell ranges
        if (rng.isSingleCell) {
            rng = null;
        }
        // done
        return rng;
    }
}
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), customers = 'Paul Smith,Susan Johnson'.split(',');
    let data = [];
    for (var i = 0; i < 12; i++) {
        data.push({
            customer: customers[i % customers.length],
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 5000,
            expenses: Math.random() * 5000
        });
    }
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        allowMerging: 'Cells',
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        columns: [
            { binding: 'country', header: 'Country', allowMerging: true },
            { binding: 'customer', header: 'Customer', allowMerging: true },
            { binding: 'downloads', header: 'Downloads' },
            { binding: 'sales', header: 'Sales' },
            { binding: 'expenses', header: 'Expenses' }
        ]
    });
    // apply the custom merge manager
    theGrid.mergeManager = new RestrictedMergeManager(theGrid);
    theGrid.itemsSource = new wjCore.CollectionView(data, {
        sortDescriptions: ['customer', 'country']
    });
}
