import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let valuePicker = new input.Menu('#valuePicker', {
        // update header to show current selection
        selectedIndexChanged: (sender) => {
            if (sender.selectedIndex > -1) {
                sender.header = `Tax: <b>${sender.selectedItem.header}</b>`;
            }
        },
        //
        // populate menu after hooking up the selectedIndexChanged event
        displayMemberPath: 'header',
        selectedValuePath: 'value',
        itemsSource: [
            { header: 'Exempt', value: 0 },
            { header: '1%', value: 0.01 },
            { header: '5%', value: 0.05 },
            { header: '8.5%', value: 0.085 },
            { header: '10%', value: 0.10 },
            { header: '20%', value: 0.20 }
        ],
        selectedValue: 0.085
    });
}
