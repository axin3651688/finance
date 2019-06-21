import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create forms
    let frmLogin = new input.Popup('#frmLogin', {
        isDraggable: true
    });
    //
    // show forms
    document.querySelector('#btnLogin').addEventListener('click', () => {
        frmLogin.show(true);
    });
}
