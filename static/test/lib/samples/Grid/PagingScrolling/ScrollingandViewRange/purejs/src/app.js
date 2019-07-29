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
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    //
    // auto-generated columns
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // scroll into view
    document.getElementById('scrollIntoView').addEventListener('click', function () {
        theGrid.scrollIntoView(100, -1);
    });
    //
    // set top cell
    document.getElementById('scrollToTop').addEventListener('click', function () {
        if (true) {
            //
            // get cell rect, adjust scrollPosition.y to bring it to the top
            var rc = theGrid.cells.getCellBoundingRect(100, 0, true);
            theGrid.scrollPosition = new wjCore.Point(theGrid.scrollPosition.x, -rc.top);
            //
        }
        else {
            //
            // simpler but less efficient (requires a timeOut)
            theGrid.scrollIntoView(theGrid.rows.length - 1, -1);
            setTimeout(function () {
                theGrid.scrollIntoView(100, -1);
            });
        }
    });
}
