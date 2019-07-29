import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as grid from '@grapecity/wijmo.grid';
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
//
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the grid
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: getData(),
        allowAddNew: true
    });
    //
    // use ctrl+Delete to delete the current row
    let theDialog = new input.Popup('#theDialog');
    //
    theGrid.hostElement.addEventListener('keydown', e => {
        let view = theGrid.collectionView;
        //
        // looking for ctrl+Delete
        if (e.ctrlKey && e.keyCode == wijmo.Key.Delete && view.currentItem) {
            // prevent the grid from getting the key
            e.preventDefault();
            //
            // confirm row deletion
            theDialog.show(true, (sender) => {
                // delete the row
                if (sender.dialogResult == 'wj-hide-ok') {
                    view.remove(view.currentItem);
                }
                //
                // return focus to the grid
                theGrid.focus();
            });
        }
    }, true);
}
