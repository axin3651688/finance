import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauge
    let theGauge = new gauge.RadialGauge('#theGauge', {
        isReadOnly: false,
        min: 0,
        max: 100,
        step: 5,
        value: 75,
        valueChanged: (s) => {
            value.value = s.value;
        },
        showRanges: false,
        ranges: [
            { min: 0, max: 33, color: 'red' },
            { min: 33, max: 66, color: 'yellow' },
            { min: 66, max: 100, color: 'green' },
        ]
    });
    //
    // change properties
    let value = new input.InputNumber('#value', {
        min: theGauge.min,
        max: theGauge.max,
        step: theGauge.step,
        value: theGauge.value,
        valueChanged: (s) => {
            theGauge.value = s.value;
        }
    });
    let startAngle = new input.InputNumber('#startAngle', {
        step: 10,
        min: -360,
        max: 360,
        value: theGauge.startAngle,
        valueChanged: (s) => {
            theGauge.startAngle = s.value;
        }
    });
    let sweepAngle = new input.InputNumber('#sweepAngle', {
        step: 10,
        min: -360,
        max: 360,
        value: theGauge.sweepAngle,
        valueChanged: (s) => {
            theGauge.sweepAngle = s.value;
        }
    });
    document.getElementById('autoScale').addEventListener('click', (e) => {
        theGauge.autoScale = e.target.checked;
    });
}
