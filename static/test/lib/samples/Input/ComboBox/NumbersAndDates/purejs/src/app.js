import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Globalize } from '@grapecity/wijmo';
import { ComboBox } from '@grapecity/wijmo.input';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // select a number
    let theComboNumber = new ComboBox('#theComboNumber', {
        selectedIndexChanged: sender => {
            setText('theNumber', sender.selectedItem);
        },
        itemsSource: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71],
    });
    // select a date
    let theComboDate = new ComboBox('#theComboDate', {
        selectedIndexChanged: sender => {
            setText('theDate', Globalize.format(sender.selectedItem, 'd'));
        },
        itemsSource: [new Date(2019, 0, 1), new Date(2019, 1, 12), new Date(2019, 1, 22), new Date(2019, 4, 13), new Date(2019, 4, 24), new Date(2019, 8, 19)],
        formatItem: (sender, e) => {
            e.item.textContent = Globalize.format(e.data, 'd');
        },
    });
    // show text in an element on the page
    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }
}
