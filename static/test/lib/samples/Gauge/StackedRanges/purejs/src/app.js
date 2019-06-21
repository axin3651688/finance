import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // show the effect of the stackRanges property
    document.getElementById('stackRanges').addEventListener('click', (e) => {
        theLinearGauge.stackRanges =
            theVerticalGauge.stackRanges =
                theRadialGauge.stackRanges = e.target.checked;
    });
    //
    // define ranges used by all gauges
    let ranges = [
        { max: 25, color: 'red' },
        { max: 50, color: 'purple' },
        { max: 75, color: 'orange' }
    ];
    //
    // create the gauges
    let theRadialGauge = new gauge.RadialGauge('#theRadialGauge', {
        value: 0,
        stackRanges: true,
        ranges: ranges
    });
    let theLinearGauge = new gauge.LinearGauge('#theLinearGauge', {
        value: 0,
        stackRanges: true,
        ranges: ranges
    });
    let theVerticalGauge = new gauge.LinearGauge('#theVerticalGauge', {
        value: 0,
        direction: 'Up',
        stackRanges: true,
        ranges: ranges
    });
    //
    // animate the ranges
    setInterval(() => {
        let i = Math.floor(Math.random() * theRadialGauge.ranges.length), value = theRadialGauge.ranges[i].max + (4 * Math.random() - 2);
        //
        value = Math.min(100, Math.max(0, value));
        theRadialGauge.ranges[i].max = value;
        theLinearGauge.ranges[i].max = value;
        theVerticalGauge.ranges[i].max = value;
        //
        theRadialGauge.value = value;
        theLinearGauge.value = value;
        theVerticalGauge.value = value;
    }, 100);
}
