import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create some random data
    let data = getData();
    //
    // show the data in a grid
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // animate grid when user clicks the button
    document.querySelector('#btnAnimate').addEventListener('click', () => {
        wijmo.animate((pct) => {
            //
            // calculate transform for given percent (zero to one)
            let xform = '';
            if (pct < 1) {
                if (pct > 0.5)
                    pct = pct - 1;
                xform = 'rotateY( ' + (pct * 180) + 'deg)';
            }
            //
            // apply the transform to the grid element
            theGrid.hostElement.style.transform = xform;
        }, 2000); // animate for two seconds
    });
}
