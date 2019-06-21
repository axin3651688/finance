import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as gridFilter from '@grapecity/wijmo.grid.filter';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView based on the raw data
    let view = new wijmo.CollectionView(getData());
    //
    // create a second CollectionView based on the first one
    let view2 = new wijmo.CollectionView(view.items, {
        collectionChanged: (sender) => {
            let cnt = document.querySelector('#cnt');
            cnt.textContent = wijmo.format('{length:n0}', sender.items);
        }
    });
    //
    // bind a grid to the second CollectionView
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: view2,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    //
    // add a filter to the grid (will act on the second CollectionView)
    var filter = new gridFilter.FlexGridFilter(theGrid);
    //
    // update the filter on the first CollectionView when the text changes
    document.querySelector('#theFilter').addEventListener('input', (e) => {
        // update first CollectionView's filter
        let filterText = e.target.value.toLowerCase();
        //
        view.filter = (item) => {
            return filterText
                ? item.country.toLowerCase().indexOf(filterText) > -1
                : true;
        };
        //
        // update second collection view's sourceCollection
        view2.sourceCollection = view.items;
    });
}
