import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData());
    //
    // show the data in a grid
    let flex = new grid.FlexGrid('#theGrid', {
        itemsSource: view,
        showSort: true,
        allowSorting: false,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    //
    // change the sort
    document.addEventListener('change', e => {
        // remove the old sort
        view.sortDescriptions.clear();
        //
        // add the new sorts
        e.target.value.split(',').forEach(prop => {
            // Sort country in ascending order, other in descending order
            view.sortDescriptions.push(new wijmo.SortDescription(prop, prop === 'country'));
        });
    });
}
