import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjNav from '@grapecity/wijmo.nav';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // initialize editor element
    let editor = document.querySelector('#editor');
    execCommand('styleWithCSS', true);
    //
    if (localStorage.editorContent) {
        editor.innerHTML = localStorage.editorContent;
    }
    //
    // create ribbon
    let ribbon = new wjNav.TabPanel('#ribbon');
    addTooltips(ribbon);
    //
    // toggle ribbon content visibility on double-clicks, restore on clicks
    document.querySelector('.wj-tabheaders').addEventListener('dblclick', e => {
        if (!wjCore.hasClass(e.target, 'wj-tabheader')) {
            wjCore.toggleClass(ribbon.hostElement, 'hide-content');
        }
    });
    document.querySelector('.wj-tabheaders').addEventListener('click', e => {
        if (wjCore.hasClass(e.target, 'wj-tabheader')) {
            wjCore.toggleClass(ribbon.hostElement, 'hide-content', false);
        }
    });
    //
    // populate combos
    let fontFace = new wjInput.ComboBox('#font-face', {
        itemsSource: ['Arial', 'Courier New', 'Garamond', 'Tahoma', 'Times', 'Verdana', 'WingDings'],
        textChanged: (sender) => execCommand('fontName', sender.text)
    });
    let fontSize = new wjInput.ComboBox('#font-size', {
        itemsSource: ['Very Small', 'Smaller', 'Small', 'Medium', 'Large', 'Larger', 'Very Large'],
        selectedIndex: 3,
        textChanged: (sender) => execCommand('fontSize', sender.selectedIndex + 1)
    });
    //
    // set up color pickers
    let clrBack = createColorPicker(sender => execCommand('backColor', sender.value));
    document.querySelector('#background').addEventListener('click', e => {
        wjCore.showPopup(clrBack.hostElement, e.target, false, true, false);
        clrBack.focus();
    });
    //
    let clrFore = createColorPicker(sender => execCommand('foreColor', sender.value));
    document.querySelector('#color').addEventListener('click', e => {
        wjCore.showPopup(clrFore.hostElement, e.target, false, true, false);
        clrFore.focus();
    });
    //
    // execute commands
    ribbon.hostElement.addEventListener('click', e => {
        switch (e.target.id) {
            // format group
            case 'save':
                localStorage.editorContent = editor.innerHTML;
                alert('Document Saved to Local Storage.');
                break;
            case 'undo':
            case 'redo':
            case 'preview':
            case 'removeFormat':
            case 'cut':
            case 'copy':
            case 'paste':
            case 'selectAll':
                execCommand(e.target.id);
                break;
            //
            // font group
            case 'bold':
            case 'italic':
            case 'underline':
            case 'strikethrough':
            case 'subscript':
            case 'superscript':
                execCommand(e.target.id);
                break;
            //
            case 'click-me':
                alert('Wijmo Ribbon Sample');
        }
    });
    //
    // execute editor commands
    function execCommand(cmd, parm) {
        editor.focus();
        document.execCommand(cmd, false, parm);
    }
    //
    // save/restore editor selection on focus changes
    let selection = null;
    editor.addEventListener('keyup', () => selection = saveSelection());
    editor.addEventListener('mouseup', () => selection = saveSelection());
    editor.addEventListener('focus', () => restoreSelection(selection));
    //
    function saveSelection() {
        let sel = window.getSelection();
        return sel && sel.rangeCount ? sel.getRangeAt(0) : null;
    }
    //
    function restoreSelection(range) {
        if (range) {
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //
    // add tooltips based on the element's aria-label attribute
    function addTooltips(ctl) {
        let tt = new wjCore.Tooltip();
        let els = ctl.hostElement.querySelectorAll('[aria-label]');
        for (let i = 0; i < els.length; i++) {
            tt.setTooltip(els[i], els[i].getAttribute('aria-label'));
        }
    }
    //
    // create an auto-hiding color picker control
    function createColorPicker(valueChanged) {
        // create color picker
        let host = wjCore.createElement('<div class="wj-dropdown-panel"></div>');
        let picker = new wjInput.ColorPicker(host, {
            lostFocus: function (s) {
                wjCore.hidePopup(s.hostElement);
            }
        });
        //
        // apply color and close picker on clicks
        host.addEventListener('click', function () {
            wjCore.hidePopup(host);
            valueChanged(picker);
        });
        //
        // done
        return picker;
    }
}
