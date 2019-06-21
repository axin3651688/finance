import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjInput from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }
    //
    // create the grid with custom editing behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        isReadOnly: true,
        selectionMode: 'Row',
        itemsSource: data,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', isRequired: true, dataMap: countries },
            { binding: 'sales', header: 'Sales', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', format: 'n2' }
        ]
    });
    //
    // add 'edit button' to row header cells
    theGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.rowHeaders && e.col == 0) {
            e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
        }
    });
    //
    // handle button clicks
    theGrid.addEventListener(theGrid.hostElement, 'click', function (e) {
        var ht = theGrid.hitTest(e);
        if (ht.panel == theGrid.rowHeaders) {
            //
            // prepare form
            var item = theGrid.rows[ht.row].dataItem;
            formControls.itemId.textContent = item.id;
            formControls.country.text = item.country;
            formControls.sales.value = item.sales;
            formControls.expenses.value = item.expenses;
            //
            // show the form
            formControls.popup.show(true, function (e) {
                if (e.dialogResult == 'wj-hide-ok') {
                    //
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
    var formControls = {
        popup: new wjInput.Popup('#popup'),
        itemId: document.getElementById('item-id'),
        country: new wjInput.ComboBox('#country', { itemsSource: countries }),
        sales: new wjInput.InputNumber('#sales', { format: 'n2', min: 0, step: 100 }),
        expenses: new wjInput.InputNumber('#expenses', { format: 'n2', min: 0, step: 100 }),
    };
}
