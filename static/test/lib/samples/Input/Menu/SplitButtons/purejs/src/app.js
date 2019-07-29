import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the split-button menu
    var theSplitButton = new input.Menu('#theSplitButton', {
        // item clicked fires when you select an option or click the header
        isButton: true,
        itemClicked: (sender) => {
            alert('Running ' + sender.selectedValue);
        },
        //
        // update header to show current selection
        selectedIndexChanged: (sender) => {
            if (sender.selectedIndex > -1) {
                sender.header = `Run: <b>${sender.selectedItem.header}</b>`;
            }
        },
        //
        // populate menu after hooking up the selectedIndexChanged event
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'Internet Explorer', value: 'IE' },
            { header: 'Chrome', value: 'CHR' },
            { header: 'Firefox', value: 'FFX' },
            { header: 'Safari', value: 'IOS' },
            { header: 'Opera', value: 'OPR' }
        ],
        selectedValue: 'FFX'
    });
}
