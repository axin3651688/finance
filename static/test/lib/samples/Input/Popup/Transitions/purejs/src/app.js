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
    let login = new input.Popup('#frmLogin', {
        fadeIn: false,
        shown: (sender) => {
            wijmo.toggleClass(sender.hostElement, 'custom-animation-visible', true);
        },
        hiding: (sender) => {
            wijmo.toggleClass(sender.hostElement, 'custom-animation-visible', false);
        }
    });
    //
    document.querySelector('#btnLogin').addEventListener('click', () => {
        login.show(true);
    });
}
