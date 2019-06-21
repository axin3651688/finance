import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var data = [];
    for (var i = 0; i < 50; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // support scrolling with the wheel
    theGrid.hostElement.addEventListener('wheel', function (e) {
        let root = theGrid.hostElement.querySelector('[wj-part="root"]');
        if (root) {
            root.scrollTop += 32 * (e.deltaY < 0 ? -1 : +1);
            e.preventDefault();
        }
    });
    //
}
