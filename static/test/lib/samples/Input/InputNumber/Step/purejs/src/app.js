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
    // create several InputNumber controls and assign them formats
    let parent = document.getElementById('inputNumbers'), template = '<div class="form-group">' +
        '<label for={id}>Step {step}: </label>' +
        '<input id={id}>' +
        '</div>';
    //
    ['n0', 'n2', 'c0', 'c2', 'p0', 'p2'].forEach((fmt, i) => {
        let id = 'theInputNumberF' + fmt, step = fmt[0] == 'p' ? 0.1 : (i + 1), html = wijmo.format(template, {
            fmt: fmt,
            id: id,
            step: step
        });
        //
        parent.appendChild(wijmo.createElement(html));
        let theNumber = new input.InputNumber('#' + id, {
            format: fmt,
            step: step
        });
    });
}
