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
        hasShadow: false,
        showText: 'All',
        startAngle: -30,
        sweepAngle: 240,
        value: 50,
        pointer: {
            color: '#000000'
        }
    });
    //
    let theColor = new input.InputColor('#theColor', {
        value: theGauge.pointer.color,
        valueChanged: (s, e) => {
            theGauge.pointer.color = s.value;
        }
    });
    let theThickness = new input.InputNumber('#theThickness', {
        min: 0,
        max: 1,
        step: .1,
        format: 'n2',
        value: theGauge.pointer.thickness,
        valueChanged: (s, e) => {
            theGauge.pointer.thickness = s.value;
        }
    });
}
