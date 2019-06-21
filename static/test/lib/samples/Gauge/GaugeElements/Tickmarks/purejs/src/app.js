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
        showTicks: true,
        tickSpacing: 10,
        startAngle: -30,
        sweepAngle: 240,
        value: 50,
        pointer: {
            thickness: 0.5
        }
    });
    //
    // customize tickmarks
    document.getElementById('showTicks').addEventListener('click', (e) => {
        theGauge.showTicks = e.target.checked;
    });
    let tickSpacing = new input.InputNumber('#tickSpacing', {
        min: 0,
        max: 100,
        step: 5,
        format: 'n0',
        value: theGauge.tickSpacing,
        valueChanged: (s, e) => {
            theGauge.tickSpacing = s.value;
        }
    });
    let tickColor = new input.InputColor('#tickColor', {
        value: 'white',
        valueChanged: (s, e) => {
            let style = theGauge.hostElement.querySelector('.wj-ticks').style;
            style.stroke = s.value;
        }
    });
    let tickWidth = new input.InputNumber('#tickWidth', {
        min: 0,
        max: 5,
        step: .25,
        format: 'n1',
        value: 2,
        valueChanged: (s, e) => {
            let style = theGauge.hostElement.querySelector('.wj-ticks').style;
            style.strokeWidth = s.value.toString();
        }
    });
}
