import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjGauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel');
    //
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    //
    var theChart = new wjChart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads' }
        ]
    });
    //
    var theRadialGauge = new wjGauge.RadialGauge('#theRadialGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false
    });
    //
    var theLinearGauge = new wjGauge.LinearGauge('#theLinearGauge', {
        min: 0,
        max: 100,
        value: 75,
        isReadOnly: false
    });
}
