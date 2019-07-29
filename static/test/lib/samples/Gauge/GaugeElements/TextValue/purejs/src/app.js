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
        startAngle: -30,
        sweepAngle: 240,
        value: 80,
        showRanges: false,
        ranges: [
            { min: 0, max: 25, color: 'red' },
            { min: 25, max: 50, color: 'orange' },
            { min: 50, max: 100, color: 'green' },
        ]
    });
    theGauge.pointer.thickness = .15;
    theGauge.thumbSize = 20;
    //
    // customize text properties
    let showText = new input.ComboBox('#showText', {
        textChanged: (s, e) => {
            theGauge.showText = s.text;
        },
        itemsSource: 'None,Value,MinMax,All'.split(','),
        text: 'All'
    });
    let format = new input.ComboBox('#format', {
        textChanged: (s, e) => {
            theGauge.format = s.text;
        },
        itemsSource: 'n0,n2,c0,c2'.split(','),
        text: 'n0'
    });
    document.getElementById('getText').addEventListener('click', (e) => {
        theGauge.getText = e.target.checked ? getTextCallback : null;
    });
    //
    // getText callback function
    function getTextCallback(gauge, part, value, text) {
        switch (part) {
            case 'value':
                if (value <= 10)
                    return 'Empty!';
                if (value <= 25)
                    return 'Low...';
                if (value <= 95)
                    return 'Good';
                return 'Full';
            case 'min':
                return 'empty';
            case 'max':
                return 'full';
        }
        return text;
    }
}
