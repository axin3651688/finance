import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a filtered CollectionView to use as a data source
    let view = new wijmo.CollectionView(getData(), {
        filter: theFilterFunction
    });
    showItemCount();
    //
    // create the AutoComplete using the CollectionView's items as a source
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        displayMemberPath: 'country',
        itemsSource: view.items
    });
    //
    // toggle our filter
    document.querySelector('#filter').addEventListener('click', e => {
        view.filter = e.target.checked ? theFilterFunction : null;
        theAutoComplete.itemsSource = view.items;
        showItemCount();
    });
    //
    // our filter function
    function theFilterFunction(item) {
        return item.popk > 50000;
    }
    //
    // show filtered item count
    function showItemCount() {
        let msg = wijmo.format('Source list contains <b>{length:n0}</b> countries.', view.items);
        document.querySelector('#itemCount').innerHTML = msg;
    }
}
