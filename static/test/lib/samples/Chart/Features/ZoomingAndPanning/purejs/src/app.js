import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'date',
        chartType: 'Candlestick',
        series: [
            { binding: 'high,low,open,close', name: 'Alphabet Inc' }
        ],
        legend: {
            position: 'None'
        }
    });
    //
    // zoom logic
    let zoom = {
        chart: theChart,
        ptStart: null,
        ptEnd: null,
        box: null
    };
    let host = zoom.chart.hostElement;
    //
    host.addEventListener('mousedown', e => zoom.ptStart = e);
    //
    host.addEventListener('mousemove', e => {
        if (zoom.ptStart) {
            zoom.ptEnd = e;
            updateZoomBox();
        }
    });
    //
    host.addEventListener('mouseup', e => {
        applyZoom();
        zoom.ptStart = zoom.ptEnd = null;
        updateZoomBox();
    });
    //
    function updateZoomBox() {
        if (!zoom.box) {
            zoom.box = wjCore.createElement('<div class="zoom-box"></div>', document.body);
        }
        if (!zoom.ptStart) {
            wjCore.setCss(zoom.box, {
                display: 'none'
            });
        }
        else {
            let x = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX), y = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY), w = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - x, h = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - y;
            //
            wjCore.setCss(zoom.box, {
                display: 'block',
                left: x,
                top: y,
                width: w,
                height: h
            });
        }
    }
    //
    function applyZoom() {
        let xmin = null, ymin = null, xmax = null, ymax = null;
        //
        // calculate custom zoom
        if (zoom.ptStart && zoom.ptEnd) {
            // get mouse position in control coordinates
            let rc = zoom.chart.hostElement.getBoundingClientRect();
            xmin = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymin = Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top,
                xmax = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - rc.left,
                ymax = Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - rc.top;
            //
            // convert to chart coordinates
            let pMin = zoom.chart.pointToData(xmin, ymin), pMax = zoom.chart.pointToData(xmax, ymax);
            //
            xmin = Math.min(pMin.x, pMax.x);
            ymin = Math.min(pMin.y, pMax.y);
            xmax = Math.max(pMin.x, pMax.x);
            ymax = Math.max(pMin.y, pMax.y);
        }
        //
        // apply new ranges to the chart axes
        zoom.chart.deferUpdate(() => {
            zoom.chart.axisX.min = xmin;
            zoom.chart.axisY.min = ymin;
            zoom.chart.axisX.max = xmax;
            zoom.chart.axisY.max = ymax;
        });
    }
    //
    // reset chart zoom
    document.querySelector('#btnReset').addEventListener('click', () => {
        zoom.ptStart = zoom.ptEnd = null;
        updateZoomBox();
        applyZoom();
    });
}
