import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGauge from '@grapecity/wijmo.gauge';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauge
    let radial = new wjGauge.RadialGauge('#radial', {
        isReadOnly: false,
        hasShadow: false,
        showText: 'All',
        startAngle: -30,
        sweepAngle: 240,
        value: 50,
        showRanges: true,
        showTicks: true,
        tickSpacing: 10,
        ranges: [
            { min: 0, max: 30, color: 'red', thickness: .5 },
            { min: 30, max: 50, color: 'orange', thickness: .5 },
            { min: 50, max: 70, color: 'gold', thickness: .5 },
            { min: 70, max: 100, color: 'green', thickness: .5 }
        ],
        pointer: {
            thickness: .15
        },
        thumbSize: 20
    });
    //
    // add some tooltips
    let tt = new wjCore.Tooltip(), host = radial.hostElement;
    //
    tt.setTooltip(host.querySelector('.wj-face'), 'Face');
    tt.setTooltip(host.querySelector('.wj-pointer'), 'Pointer');
    tt.setTooltip(host.querySelector('.wj-thumb'), 'Thumb');
    tt.setTooltip(host.querySelector('.wj-ranges'), 'Ranges');
    tt.setTooltip(host.querySelector('.wj-ticks'), 'Tickmarks');
    tt.setTooltip(host.querySelector('.wj-value'), 'Text: Value');
    tt.setTooltip(host.querySelector('.wj-min'), 'Text: Min');
    tt.setTooltip(host.querySelector('.wj-max'), 'Text: Max');
}
