import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create InputDate with a range restriction
    let curr = new Date(), firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay())), lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
    //
    var theInputDate = new input.InputDate('#theInputDate', {
        format: 'MMM dd, yyyy',
        min: firstDay,
        max: lastDay,
    });
}
