import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // InputNumber with a restricted range
    let theInputNumber = new input.InputNumber('#theInputNumber', {
        format: 'n0',
        value: 1,
        min: 1,
        max: 5,
        step: 1
    });
}
