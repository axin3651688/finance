import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
import * as gauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create gauges
    let theRadialGauge = new gauge.RadialGauge('#theRadialGauge', {
        min: 0,
        max: 100,
        value: 75,
        showText: 'None',
        valueChanged: (s, e) => {
            valueCtl.value = s.value;
        }
    });
    let theLinearGauge = new gauge.LinearGauge('#theLinearGauge', {
        min: 0,
        max: 100,
        value: 75,
        showText: 'None',
        valueChanged: (s, e) => {
            valueCtl.value = s.value;
        }
    });
    let theBulletGraph = new gauge.BulletGraph('#theBulletGraph', {
        min: 0,
        max: 100,
        value: 75,
        target: 60,
        bad: 50,
        good: 70,
        showText: 'None',
        valueChanged: (s, e) => {
            valueCtl.value = s.value;
        }
    });
    function getGaugeProp(prop) {
        return theRadialGauge[prop];
    }
    function setGaugeProp(prop, value) {
        theRadialGauge[prop] = value;
        theLinearGauge[prop] = value;
        theBulletGraph[prop] = value;
    }
    //
    // create controls to change gauge properties
    let minCtl = new input.InputNumber('#min', {
        step: 10,
        value: getGaugeProp('min'),
        valueChanged: (s, e) => {
            setGaugeProp('min', s.value);
        }
    });
    let maxCtl = new input.InputNumber('#max', {
        step: 10,
        value: getGaugeProp('max'),
        valueChanged: (s, e) => {
            setGaugeProp('max', s.value);
        }
    });
    let valueCtl = new input.InputNumber('#value', {
        step: 10,
        value: getGaugeProp('value'),
        valueChanged: (s, e) => {
            setGaugeProp('value', s.value);
        }
    });
    let showTextCtl = new input.ComboBox('#showText', {
        itemsSource: 'None,Value,MinMax,All'.split(','),
        text: getGaugeProp('showText'),
        textChanged: (s, e) => {
            setGaugeProp('showText', s.text);
        }
    });
    document.getElementById('isReadOnly').addEventListener('click', (e) => {
        setGaugeProp('isReadOnly', e.target.checked);
    });
    let stepCtl = new input.InputNumber('#step', {
        min: 1,
        step: 1,
        value: getGaugeProp('step'),
        valueChanged: (s, e) => {
            setGaugeProp('step', s.value);
        }
    });
    document.getElementById('isAnimated').addEventListener('click', (e) => {
        setGaugeProp('isAnimated', e.target.checked);
    });
}
