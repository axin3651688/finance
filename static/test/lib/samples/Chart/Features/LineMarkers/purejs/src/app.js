import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new wjChart.FlexChart('#theChart', {
        chartType: 'Line',
        bindingX: 'date',
        axisY: { majorGrid: false },
        legend: { position: 'None' },
        tooltip: { content: '' },
        series: [
            { binding: 'value', name: 'Value' }
        ],
        itemsSource: getData()
    });
    //
    // add a LineMarker
    let lm = new wjChart.LineMarker(theChart, {
        isVisible: false,
        lines: 'Both',
        interaction: 'Move',
        content: (ht) => {
            return ht.item
                ? wjCore.format('The value on <b>{date:MMM d, yyyy}</b><br/>is <b>{value:c}</b>', ht.item)
                : 'No items here...';
        }
    });
    //
    // show the marker when the mouse is over the chart
    theChart.addEventListener(theChart.hostElement, 'mouseenter', () => {
        lm.isVisible = true;
    });
    theChart.addEventListener(theChart.hostElement, 'mouseleave', () => {
        lm.isVisible = false;
    });
    //
    // configure the LineMarker
    let lines = new wjInput.ComboBox('#lines', {
        itemsSource: 'None,Vertical,Horizontal,Both'.split(','),
        textChanged: (s) => lm.lines = s.text,
        text: 'Both'
    });
    //
    let interaction = new wjInput.ComboBox('#interaction', {
        itemsSource: 'None,Move,Drag'.split(','),
        textChanged: (s) => lm.interaction = s.text,
        text: 'Move'
    });
}
