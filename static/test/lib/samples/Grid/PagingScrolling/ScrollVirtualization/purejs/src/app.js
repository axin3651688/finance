import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // start with a small data set
    var data = getData(100);
    //
    // initialize the grid
    var rowCount = document.getElementById('rowCount');
    var cellCount = document.getElementById('cellCount');
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
        updatedView: function (s, e) {
            rowCount.textContent = s.rows.length;
            cellCount.textContent = s.hostElement.querySelectorAll('.wj-cell').length;
        },
        scrollPositionChanged: function (s, e) {
            //
            // if we're close to the bottom, add 20 items
            if (s.viewRange.bottomRow >= s.rows.length - 1) {
                addData(data, 20);
                s.collectionView.refresh();
            }
        }
    });
    //
    // add random data to an array
    function addData(data, cnt) {
        var more = getData(cnt, data.length);
        for (var i = 0; i < more.length; i++) {
            data.push(more[i]);
        }
    }
}
