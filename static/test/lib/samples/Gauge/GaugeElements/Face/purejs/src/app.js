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
    var theGauge = new gauge.RadialGauge('#theGauge', {
        isReadOnly: false,
        hasShadow: false,
        showText: 'All',
        startAngle: -30,
        sweepAngle: 240,
        value: 50,
        thumbSize: 20,
        face: {
            color: '#f5f5f5'
        },
        pointer: {
            thickness: 0.15
        }
    });
    //
    var theColor = new input.InputColor('#theColor', {
        value: theGauge.face.color,
        valueChanged: (s, e) => {
            theGauge.face.color = s.value;
        }
    });
    var theThickness = new input.InputNumber('#theThickness', {
        min: 0,
        max: 1,
        step: .1,
        format: 'n2',
        value: theGauge.face.thickness,
        valueChanged: (s, e) => {
            theGauge.face.thickness = s.value;
        }
    });
}
