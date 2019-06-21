import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let theRadialGauge = new gauge.RadialGauge('#theRadialGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false,
        step: 10
    });
    //
    let theLinearGauge = new gauge.LinearGauge('#theLinearGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false,
        step: 10,
        showText: 'MinMax'
    });
    //
    let theBulletGraph = new gauge.BulletGraph('#theBulletGraph', {
        min: 0,
        max: 100,
        value: 75,
        target: 60,
        bad: 50,
        good: 70,
        showText: 'MinMax'
    });
}
