import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theListBox = new input.ListBox('#theListBox', {
        formatItem: (sender, e) => {
            e.item.innerHTML = '<div class="wj-glyph">' +
                `<span class="wj-glyph-${e.data}"></span>` +
                `</div>${e.data}`;
        },
        selectedIndexChanged: (sender) => {
            document.querySelector('#selectedItem').innerHTML =
                `<span class="wj-glyph-${sender.selectedItem}"></span>`;
        },
        // Wijmo glyphs
        itemsSource: ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
            'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
            'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right']
    });
}
