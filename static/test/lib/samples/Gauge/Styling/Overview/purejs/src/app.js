import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGauge from '@grapecity/wijmo.gauge';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // color being edited
    let theColor = new wjCore.Color('grey'), thePanel = document.getElementById('thePanel'), updateColor = () => {
        thePanel.style.background = theColor.toString();
    };
    //
    updateColor();
    //
    // create the gauges
    let red = new wjGauge.LinearGauge('#red', {
        value: theColor.r,
        valueChanged: (s) => {
            theColor.r = s.value;
            updateColor();
        }
    });
    initGauge(red, 'red');
    //
    let green = new wjGauge.LinearGauge('#green', {
        value: theColor.g,
        valueChanged: (s) => {
            theColor.g = s.value;
            updateColor();
        }
    });
    initGauge(green, 'green');
    //
    let blue = new wjGauge.LinearGauge('#blue', {
        value: theColor.b,
        valueChanged: (s) => {
            theColor.b = s.value;
            updateColor();
        }
    });
    initGauge(blue, 'blue');
}
//
function initGauge(g, color) {
    g.isReadOnly = false;
    g.thumbSize = 10;
    g.hasShadow = false;
    g.min = 0;
    g.max = 255;
    g.step = 5;
    g.showTicks = true;
    g.tickSpacing = 25;
    g.face.thickness = 0.2;
    g.pointer.thickness = 0.3;
    g.pointer.color = color;
    g.hostElement.style.color = color;
}
