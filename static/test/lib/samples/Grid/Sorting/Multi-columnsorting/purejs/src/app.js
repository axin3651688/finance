import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(200)
    });
    //
    // listen for clicks on column headers
    theGrid.sortingColumn.addHandler(function (s, e) {
        var view = s.collectionView, sds = view.sortDescriptions;
        //
        // prevent default behavior
        e.cancel = true;
        //
        // if the control key is pressed, clear all sorts
        if (e.data.ctrlKey) {
            sds.clear();
            return;
        }
        //
        // flip direction or add new sort
        var prop = s.columns[e.col].binding, index = -1;
        for (var i = 0; i < sds.length && index < 0; i++) {
            if (sds[i].property == prop) {
                index = i;
            }
        }
        if (index < 0) { // not found, add now
            var sd = new wjCore.SortDescription(prop, true);
            sds.push(sd);
        }
        else { // found, flip its direction
            var sd = new wjCore.SortDescription(prop, !sds[index].ascending);
            sds.splice(index, 1, sd);
        }
    });
}
