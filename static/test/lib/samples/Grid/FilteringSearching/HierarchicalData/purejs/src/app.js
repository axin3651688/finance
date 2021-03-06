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
    // create tree-style grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        childItemsPath: 'cities',
        headersVisibility: 'Column',
        itemsSource: getData(),
    });
    //
    // update filter
    document.getElementById('filter').addEventListener('input', function (e) {
        var filter = e.target.value.toLowerCase();
        applyHierarchicalFilter(theGrid, filter);
    });
    //
    // update row visibility
    function applyHierarchicalFilter(grid, filter) {
        var rows = grid.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i], state = row.dataItem, rng = row.getCellRange();
            //
            // handle states (level 0)
            if (row.level == 0) {
                //
                // check if the state name matches the filter
                var stateVisible = state.name.toLowerCase().indexOf(filter) >= 0;
                if (stateVisible) {
                    //
                    // it does, so show the state and all its cities
                    for (var j = rng.topRow; j <= rng.bottomRow; j++) {
                        rows[j].visible = true;
                    }
                    //
                }
                else {
                    //
                    // it does not, so check the cities
                    for (var j = rng.topRow + 1; j <= rng.bottomRow; j++) {
                        var city = rows[j].dataItem, cityVisible = city.name.toLowerCase().indexOf(filter) >= 0;
                        rows[j].visible = cityVisible;
                        stateVisible = stateVisible || cityVisible;
                    }
                    //
                    // if at least one city is visible, the state is visible
                    rows[i].visible = stateVisible;
                }
                //
                // move on to the next group
                i = rng.bottomRow;
            }
        }
    }
}
