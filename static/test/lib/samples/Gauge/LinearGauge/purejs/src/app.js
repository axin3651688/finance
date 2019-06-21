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
    let theGauge = new gauge.LinearGauge('#theGauge', {
        isReadOnly: false,
        min: 0,
        max: 100,
        step: 5,
        value: 75,
        valueChanged: (s, e) => value.value = s.value,
        showRanges: false,
        ranges: [
            { min: 0, max: 33, color: 'red' },
            { min: 33, max: 66, color: 'yellow' },
            { min: 66, max: 100, color: 'green' },
        ]
    });
    setDirection('Right');
    //
    // change properties
    let value = new input.InputNumber('#value', {
        min: theGauge.min,
        max: theGauge.max,
        step: theGauge.step,
        value: theGauge.value,
        valueChanged: (s, e) => theGauge.value = s.value
    });
    let direction = new input.ComboBox('#direction', {
        itemsSource: 'Left,Right,Up,Down'.split(','),
        text: 'Right',
        textChanged: (s, e) => setDirection(s.text)
    });
    //
    function setDirection(dir) {
        let g = theGauge.hostElement.style;
        //
        theGauge.direction = dir;
        //
        switch (dir) {
            case 'Left':
            case 'Right':
                g.height = '2em';
                g.width = '100%';
                break;
            case 'Up':
            case 'Down':
                g.height = '100%';
                g.width = '2em';
                break;
        }
    }
}
