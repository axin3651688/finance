import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theSSN = new input.InputMask('#theSSN', {
        mask: '000-00-0000',
        promptChar: '*'
    });
    //
    let theZip = new input.InputMask('#theZip', {
        mask: '00000',
        promptChar: '^'
    });
    //
    let theZip4 = new input.InputMask('#theZip4', {
        mask: '00000-0000',
        promptChar: '#'
    });
    //
    let thePhone = new input.InputMask('#thePhone', {
        mask: '(999) 000-0000',
        promptChar: ' '
    });
}
