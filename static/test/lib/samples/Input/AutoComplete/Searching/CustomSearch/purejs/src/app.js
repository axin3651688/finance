import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // AutoComplete with default search
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        displayMemberPath: 'country',
        itemsSource: getData()
    });
    //  
    // AutoComplete with custom search
    let theAutoCompleteCustom = new input.AutoComplete('#theAutoCompleteCustom', {
        displayMemberPath: 'country',
        itemsSourceFunction: (query, max, callback) => {
            // empty query? no results
            if (!query) {
                callback(null);
                return;
            }
            //
            // find items that start with the user input
            let allItems = getData(), queryItems = [], rx = new RegExp('^' + query, 'i');
            //
            for (let i = 0; i < allItems.length && queryItems.length < max; i++) {
                if (rx.test(allItems[i].country)) {
                    queryItems.push(allItems[i]);
                }
            }
            callback(queryItems);
        }
    });
}
