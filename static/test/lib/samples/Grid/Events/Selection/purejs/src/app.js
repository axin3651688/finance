import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan'.split(',');
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: i % 4 == 0
        });
    }
    //
    // bind a grid to the data
    var elLog = document.getElementById('log');
    var placeholder = elLog.innerHTML;
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: new wjCore.CollectionView(data, {
            groupDescriptions: ['country'] // group data by country
        }),
        selectionChanged: function (s, e) {
            var html = placeholder;
            if (!theGrid.selection.isSingleCell) {
                var stats = getSelectionStats(theGrid);
                var fmt = stats.sum != null
                    ? 'Avg: <b>{avg:n2}</b>, Count: <b>{cnt:n0}</b>, Sum: <b>{sum:n2}</b>'
                    : 'Count: {cnt:n2}';
                html = wjCore.format(fmt, stats);
            }
            elLog.innerHTML = html;
        }
    });
    //
    // get statistics for the current selection
    function getSelectionStats(grid) {
        var sel = grid.selection, cnt = 0, ncnt = 0, sum = 0;
        for (var r = sel.topRow; r <= sel.bottomRow; r++) {
            for (var c = sel.leftCol; c <= sel.rightCol; c++) {
                var val = grid.cells.getCellData(r, c, false);
                if (val != null) {
                    cnt++;
                    if (wjCore.isNumber(val)) {
                        ncnt++;
                        sum += val;
                    }
                }
            }
        }
        return {
            cnt: cnt,
            sum: ncnt > 0 ? sum : null,
            avg: ncnt > 0 ? sum / ncnt : null
        };
    }
    //
}
