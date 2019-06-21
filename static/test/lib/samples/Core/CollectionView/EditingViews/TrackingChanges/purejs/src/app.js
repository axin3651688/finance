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
    let view = new wijmo.CollectionView(getData(), {
        sortDescriptions: ['country'],
        trackChanges: true
    });
    //
    // create grid for editing
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: view,
        allowAddNew: true,
        allowDelete: true
    });
    //
    // create grids to show changes
    let edited = new grid.FlexGrid('#edited', {
        itemsSource: view.itemsEdited,
        isReadOnly: true
    });
    let added = new grid.FlexGrid('#added', {
        itemsSource: view.itemsAdded,
        isReadOnly: true
    });
    let removed = new grid.FlexGrid('#removed', {
        itemsSource: view.itemsRemoved,
        isReadOnly: true
    });
}
