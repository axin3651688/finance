import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauge
    let theGauge = new gauge.RadialGauge('#theGauge', {
        isReadOnly: false,
        hasShadow: false,
        showText: 'All',
        startAngle: -30,
        sweepAngle: 240,
        value: 50,
        pointer: {
            thickness: 0.15,
            color: '#0085c7'
        },
        thumbSize: 20
    });
    //
    let theColor = new input.InputColor('#theColor', {
        value: theGauge.pointer.color,
        valueChanged: (s) => {
            theGauge.pointer.color = s.value;
        }
    });
    let theThumbSize = new input.InputNumber('#theThumbSize', {
        min: 0,
        max: 50,
        step: 5,
        format: 'n0',
        value: theGauge.thumbSize,
        valueChanged: (s) => {
            theGauge.thumbSize = s.value;
        }
    });
}
