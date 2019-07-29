import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create a grid with a filter
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    var theFilter = new wjGridFilter.FlexGridFilter(theGrid);
    //
    // save/restore grid state
    document.getElementById('btnSave').addEventListener('click', function () {
        var state = {
            columns: theGrid.columnLayout,
            filterDefinition: theFilter.filterDefinition,
            sortDescriptions: theGrid.collectionView.sortDescriptions.map(function (sortDesc) {
                return { property: sortDesc.property, ascending: sortDesc.ascending };
            })
        };
        localStorage['gridState'] = JSON.stringify(state);
    });
    document.getElementById('btnRestore').addEventListener('click', function () {
        var json = localStorage['gridState'];
        if (json) {
            var state = JSON.parse(json);
            //
            // restore column layout (order/width)
            theGrid.columnLayout = state.columns;
            //
            // restore filter definitions
            theFilter.filterDefinition = state.filterDefinition;
            //
            // restore sort state
            var view = theGrid.collectionView;
            view.deferUpdate(function () {
                view.sortDescriptions.clear();
                for (var i = 0; i < state.sortDescriptions.length; i++) {
                    var sortDesc = state.sortDescriptions[i];
                    view.sortDescriptions.push(new wjCore.SortDescription(sortDesc.property, sortDesc.ascending));
                }
            });
        }
    });
}
