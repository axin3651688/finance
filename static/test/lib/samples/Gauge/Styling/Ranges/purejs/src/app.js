import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauges
    let linear = new gauge.LinearGauge('#linear', {
        isReadOnly: false,
        hasShadow: false,
        value: 50,
        showRanges: true,
        ranges: [
            { min: 0, max: 33, color: 'red' },
            { min: 33, max: 66, color: 'yellow' },
            { min: 66, max: 100, color: 'green' }
        ],
        pointer: {
            thickness: 0.5
        }
    });
    //
    let radial = new gauge.RadialGauge('#radial', {
        isReadOnly: false,
        hasShadow: false,
        value: 50,
        showRanges: true,
        showText: 'Value',
        ranges: [
            { min: 0, max: 33, color: 'red' },
            { min: 33, max: 66, color: 'yellow' },
            { min: 66, max: 100, color: 'green' }
        ],
        pointer: {
            thickness: 0.5
        }
    });
}
