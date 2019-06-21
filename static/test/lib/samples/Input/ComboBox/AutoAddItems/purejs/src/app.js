import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let countries = new wijmo.ObservableArray(['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece']);
    //
    new input.ComboBox('#theCombo', {
        itemsSource: countries,
        isEditable: true,
        lostFocus: lostFocus
    });
    //
    new input.AutoComplete('#theAutoComplete', {
        itemsSource: countries,
        lostFocus: lostFocus
    });
    //
    new input.ListBox('#theList', {
        itemsSource: countries
    });
    //
    // add item to the list when a control loses focus
    function lostFocus(sender) {
        let item = sender.text;
        if (item && countries.indexOf(item) < 0) {
            countries.push(item);
        }
    }
}
