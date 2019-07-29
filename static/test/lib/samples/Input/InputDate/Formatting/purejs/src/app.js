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
    // create several InputDate controls and assign them formats
    let parent = document.getElementById('inputDates'), template = '<div class="form-group">' +
        '<label for={id}>{fmt}:</label>' +
        '<input id={id}>' +
        '</div>';
    //
    ['d', 'D', 'M', 'd/M/yy', 'MMMM dd, yyyy'].forEach((fmt, i) => {
        let id = 'theInputDateF' + i, html = wijmo.format(template, {
            fmt: fmt,
            id: id
        });
        //
        parent.appendChild(wijmo.createElement(html));
        let theDate = new input.InputDate('#' + id, {
            format: fmt
        });
    });
}
