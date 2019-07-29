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
        bindingX: 'country',
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
            { binding: 'downloads', name: 'Downloads' }
        ]
    });
    //
    // connect sort buttons
    sortOnClick('btnNone', null);
    sortOnClick('btnCountry', 'country');
    sortOnClick('btnSales', 'sales');
    sortOnClick('btnExpenses', 'expenses');
    sortOnClick('btnDownloads', 'downloads');
    //
    function sortOnClick(id, prop) {
        document.getElementById(id).addEventListener('click', () => {
            let sd = theChart.collectionView.sortDescriptions;
            //
            sd.clear();
            sd.push(new wjCore.SortDescription(prop, true));
        });
    }
}
