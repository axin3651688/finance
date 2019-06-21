import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
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
        value: 50,
        showRanges: true,
        pointer: {
            thickness: 0.25
        },
        thumbSize: 20
    });
    //
    // customize
    document.getElementById('showRanges').addEventListener('click', (e) => {
        theGauge.showRanges = e.target.checked;
    });
    //
    let cmbRanges = new input.ComboBox('#ranges', {
        itemsSource: [0, 3, 4, 20, 50],
        selectedIndexChanged: (s, e) => {
            createRanges(theGauge, s.selectedItem);
        }
    });
    cmbRanges.selectedItem = 3;
    //
    // populate gauge with ranges
    function createRanges(g, cnt) {
        g.ranges.clear();
        //
        if (cnt) {
            let colorMin = new wijmo.Color('red'), colorMax = new wijmo.Color('green'), span = (g.max - g.min) / cnt;
            //
            for (let i = 0; i < cnt; i++) {
                let rng = new gauge.Range(), color = wijmo.Color.interpolate(colorMin, colorMax, cnt > 1 ? i / (cnt - 1) : 0);
                //
                rng.min = g.min + i * span;
                rng.max = rng.min + span;
                rng.color = color.toString();
                g.ranges.push(rng);
            }
        }
    }
}
