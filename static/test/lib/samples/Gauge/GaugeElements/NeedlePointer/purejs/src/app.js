import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the gauge
    // regular gauges
    new gauge.RadialGauge('#theGauge1', {
        min: 0, max: 100, value: 25,
        isReadOnly: false
    });
    new gauge.RadialGauge('#theGauge2', {
        min: 0, max: 100, value: 25,
        startAngle: -45,
        sweepAngle: 270,
        isReadOnly: false
    });
    new gauge.RadialGauge('#theGauge3', {
        min: 0, max: 500, value: 100,
        startAngle: -45,
        sweepAngle: -270,
        isReadOnly: false
    });
    //
    // rounded needle pointer
    new gauge.RadialGauge('#theGaugeR1', {
        min: 0, max: 100, value: 25,
        showTicks: true,
        tickSpacing: 10,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedleRounded,
        valueChanged: updateNeedleRounded
    });
    new gauge.RadialGauge('#theGaugeR2', {
        min: 0, max: 100, value: 25,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        tickSpacing: 10,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedleRounded,
        valueChanged: updateNeedleRounded
    });
    new gauge.RadialGauge('#theGaugeR3', {
        min: 0, max: 500, value: 100,
        startAngle: -45,
        sweepAngle: -270,
        showTicks: true,
        tickSpacing: 25,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedleRounded,
        valueChanged: updateNeedleRounded
    });
    //
    // pointed needle pointer
    new gauge.RadialGauge('#theGaugeP1', {
        min: 0, max: 100, value: 25,
        showTicks: true,
        tickSpacing: 10,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedlePointed,
        valueChanged: updateNeedlePointed
    });
    new gauge.RadialGauge('#theGaugeP2', {
        min: 0, max: 100, value: 25,
        startAngle: -45,
        sweepAngle: 270,
        showTicks: true,
        tickSpacing: 10,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedlePointed,
        valueChanged: updateNeedlePointed
    });
    new gauge.RadialGauge('#theGaugeP3', {
        min: 0, max: 500, value: 100,
        startAngle: -45,
        sweepAngle: -270,
        showTicks: true,
        tickSpacing: 25,
        thickness: 0.1,
        showText: 'MinMax',
        isReadOnly: false,
        refreshed: updateNeedlePointed,
        valueChanged: updateNeedlePointed
    });
    //
    // update needle element when gauge size or value change
    // pointed (diamond-shaped) needle
    function updateNeedlePointed(g) {
        // add needle element if necessary
        let needle = g.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = g.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = getArgs(g);
        needle.setAttribute('d', wijmo.format('M {lft} {y} L {x} {bot} L {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    //
    // update needle element when gauge size or value change
    // rounded (drop-shaped) needle
    function updateNeedleRounded(g) {
        // add needle element if necessary
        let needle = g.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = g.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = getArgs(g);
        needle.setAttribute('d', wijmo.format('M {lft} {y} A {wid} {wid} 0 0 0 {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    //
    // utilities
    function getArgs(g) {
        let rc = g.clientSize, cx = rc.width / 2, cy = rc.height / 2, r = Math.min(rc.width, rc.height) / 2, wid = r / 10, pct = (g.max > g.min) ? (g.value - g.min) / (g.max - g.min) : 0, angle = g.startAngle + g.sweepAngle * wijmo.clamp(pct, 0, 1) - 90;
        //
        return {
            angle: angle,
            x: cx.toFixed(4),
            y: cy.toFixed(4),
            wid: wid.toFixed(4),
            lft: (cx - wid).toFixed(4),
            rgt: (cx + wid).toFixed(4),
            top: (cy - r).toFixed(4),
            bot: (cy + wid).toFixed(4)
        };
    }
}
