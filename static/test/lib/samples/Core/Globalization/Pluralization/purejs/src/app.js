import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // build format string with pluralization
    let fmtPluralStr = JSON.stringify({
        count: 'count',
        when: {
            0: 'No items selected.',
            1: 'A single item is selected.',
            2: 'A pair is selected.',
            3: 'A trio is selected.',
            4: 'A quartet is selected.',
            'other': '{count:n0} items are selected.'
        }
    });
    //
    // let the user choose the number of items
    let theInputNumber = new input.InputNumber('#theInputNumber', {
        valueChanged: (sender) => {
            document.querySelector('#msg').textContent = wijmo.format(fmtPluralStr, {
                count: sender.value
            });
        },
        step: 1,
        value: 1
    });
}
