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
    // default grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(),
        beginningEdit: function (s, e) {
            if (e.data.type == 'keypress' &&
                !document.getElementById('quickEdit').checked) {
                e.cancel = true;
            }
        }
    });
}
