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
    // create forms
    let frmLogin = new input.Popup('#frmLogin'), frmCreateAccount = new input.Popup('#frmCreateAccount'), frmEditAccount = new input.Popup('#frmEditAccount');
    //
    // show forms
    document.querySelector('#btnLogin').addEventListener('click', () => {
        frmLogin.show(true, (sender) => {
            switch (sender.dialogResult) {
                case 'submit':
                    alert('form submitted');
                    break;
                case 'wj-hide-create':
                    document.getElementById('btnCreateAccount').click(); // open the Create Account form
                    break;
            }
        });
    });
    //
    document.querySelector('#btnCreateAccount').addEventListener('click', () => {
        frmCreateAccount.show(true, (sender) => {
            if (sender.dialogResult == 'submit') {
                alert('form submitted');
            }
        });
    });
    //
    document.querySelector('#btnEditAccount').addEventListener('click', () => {
        frmEditAccount.show(true, (sender) => {
            if (sender.dialogResult == 'submit') {
                alert('form submitted');
            }
        });
    });
    //
    // validate the form but don't submit
    document.body.addEventListener('submit', e => {
        e.preventDefault(); // don't submit
        //
        if (e.target.checkValidity()) {
            let dlg = wijmo.Control.getControl(e.target);
            dlg.hide('submit'); // close the dialog passing a dialogResult
        }
    });
    //
    // validate password/new password confirmation
    ensureSameValue('password', 'confirm'); // create account
    ensureSameValue('new-password', 'confirm-password'); // edit account
    //
    function ensureSameValue(f1, f2) {
        let inputs = [document.getElementById(f1), document.getElementById(f2)];
        //
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                let err = inputs[0].value != inputs[1].value ? 'Passwords don\'t match.' : '';
                inputs[1].setCustomValidity(err);
            });
        });
    }
}
