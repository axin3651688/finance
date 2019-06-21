import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as grid from '@grapecity/wijmo.grid';
import * as gauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a grid to use with GIF spinner
    let theGridGif = new grid.FlexGrid('#theGridGif');
    let theSpinnerGif = document.querySelector('#theSpinnerGif');
    //
    // load data into the grid
    document.querySelector('#btn-load-gif').addEventListener('click', () => {
        // prepare to load data
        theGridGif.isDisabled = true;
        theGridGif.itemsSource = null;
        theGridGif.hostElement.insertBefore(theSpinnerGif, theGridGif.hostElement.firstChild);
        //
        // load data with a delay
        getData((data) => {
            theGridGif.itemsSource = data;
            theGridGif.isDisabled = false;
            theSpinnerGif.parentElement.removeChild(theSpinnerGif);
        }, 3000);
    });
    //
    // create a grid to use with Gauge spinner
    let theGridGauge = new grid.FlexGrid('#theGridGauge');
    //
    // load data into the grid
    document.querySelector('#btn-load-gauge').addEventListener('click', () => {
        //
        // prepare to load data
        theGridGauge.itemsSource = null;
        setSpinner(theGridGauge, true);
        //
        // load data
        getData((data) => {
            theGridGauge.itemsSource = data;
            setSpinner(theGridGauge, false);
        }, 3000);
    });
    //
    // create a spinner Gauge
    let theSpinnerInterval;
    let theSpinnerGauge = new gauge.RadialGauge('#theSpinnerGauge', {
        isAnimated: false,
        showText: 'None',
        sweepAngle: 360,
        step: 5,
        showTicks: true,
        face: {
            color: 'transparent'
        }
    });
    //
    // add or remove a spinner to/from the grid
    function setSpinner(grid, on) {
        // stop spinner
        if (theSpinnerInterval) {
            clearInterval(theSpinnerInterval);
            theSpinnerInterval = null;
        }
        //
        // add/remove spinner
        let spinner = theSpinnerGauge.hostElement;
        if (on) {
            grid.isDisabled = true;
            grid.hostElement.insertBefore(spinner, grid.hostElement.firstChild);
            theSpinnerGauge.invalidate();
            theSpinnerGauge.value = 0;
            theSpinnerInterval = setInterval(() => {
                theSpinnerGauge.value = (theSpinnerGauge.value + 1) % 100;
            }, 50);
        }
        else {
            grid.isDisabled = false;
            spinner.parentElement.removeChild(spinner);
        }
    }
}
