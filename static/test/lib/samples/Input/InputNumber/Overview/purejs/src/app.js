import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // a regular input number
    let theNumber = new input.InputNumber('#theNumber', {
        valueChanged: (sender) => {
            document.querySelector('#theNumberOutput').textContent = sender.value.toString();
        }
    });
    //
    // you can clear this one
    let theNumberNotRequired = new input.InputNumber('#theNumberNotRequired', {
        isRequired: false,
        value: null,
        min: 0,
        max: 100,
        placeholder: 'Your age (optional)'
    });
}
