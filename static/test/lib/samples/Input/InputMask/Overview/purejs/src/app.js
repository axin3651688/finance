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
    // edit date and time using an InputDateTime create some InputMask controls
    let theSSN = new input.InputMask('#theSSN', {
        mask: '000-00-0000'
    });
    //
    let theZip = new input.InputMask('#theZip', {
        mask: '00000'
    });
    //
    let theZip4 = new input.InputMask('#theZip4', {
        mask: '00000-0000'
    });
    //
    let thePhone = new input.InputMask('#thePhone', {
        mask: '(999) 000-0000'
    });
    //
    // enable overwrite mode on all input mask controls
    // https://stackoverflow.com/questions/2561110/javascript-to-make-input-field-in-edit-modeinsert-mode
    var overwrite = document.querySelector('#overwrite');
    document.body.addEventListener('keypress', e => {
        if (overwrite.checked) { // overwrite enabled
            let input = e.target;
            //
            if (input.tagName == 'INPUT') { // target is input element
                if (wijmo.closest(input, '.wj-inputmask')) { // contained in an InputMask control
                    let value = input.value, start = input.selectionStart;
                    //
                    input.value = value.substr(0, start) + value.substr(start + 1);
                    input.selectionEnd = start;
                }
            }
        }
    });
}
