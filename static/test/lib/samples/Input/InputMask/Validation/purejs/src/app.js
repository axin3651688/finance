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
    let theSSN = new input.InputMask('#theSSN', {
        mask: '000-00-0000',
        placeholder: 'SSN',
        isRequired: false,
        value: '',
        valueChanged: validateMask,
        lostFocus: lostFocus
    });
    //
    let theZip = new input.InputMask('#theZip', {
        mask: '00000',
        placeholder: 'Zip Code',
        isRequired: false,
        value: '',
        valueChanged: validateMask,
        lostFocus: lostFocus
    });
    //
    let theZip4 = new input.InputMask('#theZip4', {
        mask: '00000-0000',
        placeholder: 'Zip Code + 4',
        isRequired: false,
        value: '',
        valueChanged: validateMask,
        lostFocus: lostFocus
    });
    //
    let thePhone = new input.InputMask('#thePhone', {
        mask: '(999) 000-0000',
        placeholder: 'Phone Number',
        isRequired: false,
        value: '',
        valueChanged: validateMask,
        lostFocus: lostFocus
    });
    //
    // update 'state-invalid' class
    function validateMask(sender) {
        wijmo.toggleClass(sender.hostElement, 'state-invalid', !sender.maskFull);
    }
    //
    // clear masks that are not filled when losing focus
    var clearIncomplete = document.querySelector('#clearIncomplete');
    function lostFocus(sender) {
        if (!sender.maskFull && !sender.isRequired && clearIncomplete.checked) {
            sender.value = '';
        }
    }
}
