import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
//
import { countries, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the grid with custom editing behavior
    var theGrid = new grid.FlexGrid('#theGrid', {
        isReadOnly: true,
        selectionMode: 'Row',
        itemsSource: getData(),
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' }
        ]
    });
    //
    // add 'edit button' to row header cells
    theGrid.formatItem.addHandler((sender, e) => {
        if (e.panel == sender.rowHeaders && e.col == 0) {
            e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
        }
    });
    //
    // handle button clicks
    theGrid.hostElement.addEventListener('click', e => {
        let ht = theGrid.hitTest(e);
        //
        if (ht.panel == theGrid.rowHeaders) {
            // prepare form
            let item = theGrid.rows[ht.row].dataItem;
            //
            formControls.itemId.textContent = item.id.toString();
            formControls.country.text = item.country;
            formControls.sales.value = item.sales;
            formControls.expenses.value = item.expenses;
            //
            // show the form
            formControls.popup.show(true, (sender) => {
                if (sender.dialogResult == 'wj-hide-ok') {
                    // commit changes if the user pressed the OK button
                    theGrid.collectionView.editItem(item);
                    item.country = formControls.country.text;
                    item.sales = formControls.sales.value;
                    item.expenses = formControls.expenses.value;
                    theGrid.collectionView.commitEdit();
                }
                //
                // return focus to the grid
                theGrid.focus();
            });
        }
    });
    //
    // attach controls to input form
    let formControls = {
        popup: new input.Popup('#popup'),
        itemId: document.getElementById('item-id'),
        country: new input.ComboBox('#country', { itemsSource: countries }),
        sales: new input.InputNumber('#sales', { format: 'n2', min: 0, step: 100 }),
        expenses: new input.InputNumber('#expenses', { format: 'n2', min: 0, step: 100 }),
    };
}
