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
    // the input time control
    let theInputTime = new input.InputTime('#theInputTime', {
        format: 'h:mm tt',
        min: '9:00',
        max: '17:00',
        step: 30,
        isEditable: true,
        valueChanged: (sender) => setDateTime(sender.value)
    });
    //
    // show that we can edit dates without changing time
    let theInputDate = new input.InputDate('#theInputDate', {
        valueChanged: (sender) => setDateTime(sender.value)
    });
    //
    // initialize and update the date/time value
    let dt = new Date();
    dt.setHours(17, 30);
    setDateTime(dt);
    //
    function setDateTime(value) {
        let el = document.querySelector('#dateTime');
        el.textContent = wijmo.Globalize.format(value, 'F');
        //
        theInputDate.value = value;
        theInputTime.value = value;
    }
}
