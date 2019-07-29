import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create color pickers
    let clrStart = new input.InputColor('#clrStart', {
        value: 'purple',
        valueChanged: interpolate
    });
    let clrEnd = new input.InputColor('#clrEnd', {
        value: 'red',
        valueChanged: interpolate
    });
    interpolate();
    //
    // interpolate colors
    let animInt;
    function interpolate() {
        // remove old gradient
        let tr = document.querySelector('#theColorRow');
        while (tr.hasChildNodes()) {
            tr.removeChild(tr.lastChild);
        }
        //
        // calculate new gradient
        let c1 = new wijmo.Color(clrStart.value), c2 = new wijmo.Color(clrEnd.value);
        //
        for (let i = 0, cnt = 80; i < cnt; i++) {
            let td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.style.background = wijmo.Color.interpolate(c1, c2, i / cnt).toString();
            tr.appendChild(td);
        }
        //
        // animate the color
        let theColor = document.querySelector('#theColor');
        clearInterval(animInt);
        animInt = wijmo.animate((pct) => {
            theColor.style.background = wijmo.Color.interpolate(c1, c2, pct).toString();
        }, 2000);
    }
}
