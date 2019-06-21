import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let radThickness = 0.2;
    let linThickness = 0.4;
    //
    // create gauges
    let theRadialGauge = new gauge.RadialGauge('#theRadialGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false,
        step: 10,
        pointer: {
            thickness: radThickness,
            color: 'black'
        },
        ranges: [
            { name: 'low', min: 0, max: 25, color: 'rgba(255,0,0,.4)' },
            { name: 'med', min: 25, max: 50, color: 'rgba(255,255,0,.4)' },
            { name: 'high', min: 50, max: 75, color: 'rgba(255,125,0,.4)' },
            { name: 'top', min: 75, max: 100, color: 'rgba(0,255,0,.4)' },
        ],
        valueChanged: (s) => {
            theLinearGauge.value = s.value;
        }
    });
    //
    let theLinearGauge = new gauge.LinearGauge('#theLinearGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false,
        step: 10,
        pointer: {
            thickness: linThickness,
            color: 'black'
        },
        ranges: [
            { name: 'low', min: 0, max: 25, color: 'rgba(255,0,0,.4)' },
            { name: 'med', min: 25, max: 50, color: 'rgba(255,255,0,.4)' },
            { name: 'high', min: 50, max: 75, color: 'rgba(255,125,0,.4)' },
            { name: 'top', min: 75, max: 100, color: 'rgba(0,255,0,.4)' },
        ],
        valueChanged: (s) => {
            theRadialGauge.value = s.value;
        }
    });
    //
    document.getElementById('showRanges').addEventListener('click', (e) => {
        if (e.target.checked) {
            theRadialGauge.showRanges = theLinearGauge.showRanges = true;
            theRadialGauge.pointer.thickness = radThickness;
            theLinearGauge.pointer.thickness = linThickness;
        }
        else {
            theRadialGauge.showRanges = theLinearGauge.showRanges = false;
            theRadialGauge.pointer.thickness = 1;
            theLinearGauge.pointer.thickness = 1;
        }
    });
}
