import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjChart from '@grapecity/wijmo.chart';
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
            { binding: 'downloads', name: 'Downloads', chartType: 'Line' }
        ],
        itemFormatter: (engine, hitTestInfo, defaultFormat) => {
            let ht = hitTestInfo, binding = 'downloads';
            //
            // check that this is the right series/element
            if (ht.series.binding == binding && ht.pointIndex > 0 &&
                ht.chartElement == wjChart.ChartElement.SeriesSymbol) {
                //
                // get current and previous values
                let chart = ht.series.chart, items = chart.collectionView.items, valNow = items[ht.pointIndex][binding], valPrev = items[ht.pointIndex - 1][binding];
                //
                // add line if value is increasing
                if (valNow > valPrev) {
                    let pt1 = chart.dataToPoint(ht.pointIndex, valNow), pt2 = chart.dataToPoint(ht.pointIndex - 1, valPrev);
                    //
                    engine.drawLine(pt1.x, pt1.y, pt2.x, pt2.y, null, {
                        stroke: 'gold',
                        strokeWidth: 6
                    });
                }
            }
            //
            // render element as usual
            defaultFormat();
        }
    });
}
