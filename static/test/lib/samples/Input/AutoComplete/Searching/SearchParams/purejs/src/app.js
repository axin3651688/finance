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
    // autoComplete
    let theAutoComplete = new input.AutoComplete('#theAutoComplete', {
        displayMemberPath: 'country',
        searchMemberPath: 'country,continent',
        itemsSource: getData()
    });
    //
    // autoComplete configuration
    //
    let theDelay = new input.InputNumber('#theDelay', {
        value: theAutoComplete.delay,
        min: 0,
        max: 1500,
        step: 100,
        valueChanged: (sender) => {
            theAutoComplete.delay = sender.value;
        }
    });
    //
    let theMinLength = new input.InputNumber('#theMinLength', {
        value: theAutoComplete.minLength,
        min: 1,
        max: 100,
        step: 1,
        valueChanged: (sender) => {
            theAutoComplete.minLength = sender.value;
        }
    });
    //
    let theMaxItems = new input.InputNumber('#theMaxItems', {
        value: theAutoComplete.maxItems,
        min: 1,
        max: 12,
        step: 1,
        valueChanged: (sender) => {
            theAutoComplete.maxItems = sender.value;
        }
    });
}
