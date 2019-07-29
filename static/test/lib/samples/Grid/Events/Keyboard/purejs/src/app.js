import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(),
        allowAddNew: true
    });
    //
    // use ctrl+Delete to delete the current row
    var theDialog = new wjInput.Popup('#theDialog');
    theGrid.hostElement.addEventListener('keydown', function (e) {
        var view = theGrid.collectionView;
        //
        // looking for ctrl+Delete
        if (e.ctrlKey && e.keyCode == wjCore.Key.Delete && view.currentItem) {
            //
            // prevent the grid from getting the key
            e.preventDefault();
            //
            // confirm row deletion
            theDialog.show(true, function (sender) {
                //
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
