import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create form
    let cmbType = new input.ComboBox('#type', {
        textChanged: (sender) => {
            document.querySelector('#btnShow').textContent = 'Show ' + sender.text;
        },
        itemsSource: ['Alert', 'Prompt']
    }), header = new input.ComboBox('#header', { text: 'Header' }), body = new input.ComboBox('#body', { text: 'Dialog message.' }), ok = new input.ComboBox('#ok', { text: 'OK' }), cancel = new input.ComboBox('#cancel', { text: 'Cancel' }), clsDialog = new input.ComboBox('#clsDialog', { text: 'modal-dialog' }), clsHeader = new input.ComboBox('#clsHeader', { text: 'modal-header' }), clsBody = new input.ComboBox('#clsBody', { text: 'modal-body' }), clsInput = new input.ComboBox('#clsInput', { text: 'form-control' }), clsFooter = new input.ComboBox('#clsFooter', { text: 'modal-footer' }), clsOK = new input.ComboBox('#clsOK', { text: 'btn btn-primary' }), clsCancel = new input.ComboBox('#clsCancel', { text: 'btn btn-default' }), small = document.querySelector('#small');
    //
    // show the Alert/Prompt
    document.querySelector('#btnShow').addEventListener('click', () => {
        let options = getOptions();
        //
        if (cmbType.text == 'Alert') {
            alertPopup(options, result => alert('you entered: ' + result));
        }
        else {
            propmtPopup(options, result => alert('you entered: ' + result));
        }
    });
    //
    function getOptions() {
        return {
            header: header.text,
            body: body.text,
            small: small.checked,
            ok: ok.text || 'OK',
            cancel: cancel.text || 'Cancel',
            clsDialog: clsDialog.text || 'wj-dialog',
            clsHeader: clsHeader.text || 'wj-dialog-header',
            clsBody: clsBody.text || 'wj-dialog-body',
            clsInput: clsInput.text || 'wj-control',
            clsFooter: clsFooter.text || 'wj-dialog-footer',
            clsOK: clsOK.text || 'wj-btn',
            clsCancel: clsCancel.text || 'wj-btn'
        };
    }
    //
    // alert popup
    function alertPopup(options, callback) {
        let dialog = createDialog(options), popup = new input.Popup(dialog);
        //
        popup.show(true, (sender) => {
            if (callback) {
                callback(sender.dialogResult);
            }
        });
    }
    //
    // prompt popup
    function propmtPopup(options, callback) {
        let dialog = createDialog(options, true), popup = new input.Popup(dialog);
        //
        popup.show(true, (sender) => {
            if (callback) {
                let result = sender.dialogResult.indexOf('ok') > -1
                    ? dialog.querySelector('input').value
                    : null;
                callback(result);
            }
        });
    }
    //
    // create dialog to use as an alert or prompt
    function createDialog(options, input = false) {
        // create dialog
        let template = '<div class="{clsDialog}" role="dialog">' +
            '<div class="{clsHeader}">' +
            '<h4>{header}</h4>' +
            '</div>' +
            '<div class="{clsBody}">' +
            '<p>{body}</p>' +
            (input ? '<input class="{clsInput}">' : '') +
            '</div>' +
            '<div class="{clsFooter}">' +
            '<button class="{clsOK} wj-hide-ok">{ok}</button>' +
            '<button class="{clsCancel} wj-hide">{cancel}</button>' +
            '</div>' +
            '</div>';
        //
        let dialog = wijmo.createElement(wijmo.format(template, options));
        //
        // honor 'small' option
        dialog.style.width = options.small ? '20%' : '40%';
        //
        // dialog is ready
        return dialog;
    }
}
