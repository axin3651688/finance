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
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        displayMemberPath: 'country',
        itemsSource: getData()
    });
}
