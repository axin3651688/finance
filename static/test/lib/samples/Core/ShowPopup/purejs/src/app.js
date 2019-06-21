import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
//
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the grid
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: getData(),
        formatItem: (sender, e) => {
            if (e.panel == sender.topLeftCells) {
                e.cell.innerHTML = '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
            }
        }
    });
    //
    // create the column picker
    let theColumnPicker = new input.ListBox('#theColumnPicker', {
        itemsSource: theGrid.columns,
        checkedMemberPath: 'visible',
        displayMemberPath: 'header',
        lostFocus: () => wijmo.hidePopup(theColumnPicker.hostElement)
    });
    //
    // show the column picker when the user clicks the top-left cell
    let ref = theGrid.hostElement.querySelector('.wj-topleft');
    ref.addEventListener('mousedown', e => {
        if (wijmo.hasClass(e.target, 'column-picker-icon')) {
            wijmo.showPopup(theColumnPicker.hostElement, ref, false, true, false);
            theColumnPicker.focus();
            e.preventDefault();
        }
    });
    //
    // save/restore layout buttons
    document.querySelector('#btnSave').addEventListener('click', () => {
        localStorage.setItem('myLayout', theGrid.columnLayout);
    });
    //
    document.querySelector('#btnRestore').addEventListener('click', () => {
        let layout = localStorage.getItem('myLayout');
        if (layout) {
            theGrid.columnLayout = layout;
        }
    });
}
