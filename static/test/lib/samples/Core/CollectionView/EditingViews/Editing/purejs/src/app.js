import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData(), {
        sortDescriptions: ['country']
    });
    //
    // create grid for editing
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: view
    });
}
