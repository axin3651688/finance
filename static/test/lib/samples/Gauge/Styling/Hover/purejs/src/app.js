import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauges
    let linear = new gauge.LinearGauge('#linear', {
        isReadOnly: false,
        hasShadow: false,
        thumbSize: 12,
        value: 50,
        face: {
            thickness: 0.25
        },
        pointer: {
            thickness: 0.25
        }
    });
    //
    let radial = new gauge.RadialGauge('#radial', {
        isReadOnly: false,
        hasShadow: false,
        showText: 'Value',
        thumbSize: 6,
        value: 50,
        face: {
            thickness: 0.05
        },
        pointer: {
            thickness: 0.05
        }
    });
}
