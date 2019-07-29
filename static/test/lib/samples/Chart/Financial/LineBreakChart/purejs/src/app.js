import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as finance from '@grapecity/wijmo.chart.finance';
import { getSymbols, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let theChart = new finance.FinancialChart('#theChart', {
        itemsSource: getData('box'),
        bindingX: 'date',
        chartType: 'LineBreak',
        series: [
            {
                binding: 'high,low,open,close',
                style: {
                    stroke: 'rgb(136, 189, 230)',
                    fill: 'rgba(136, 189, 230, 0.701961)'
                },
                altStyle: {
                    stroke: 'rgb(136, 189, 230)',
                    fill: 'transparent'
                },
                name: 'Box Inc'
            }
        ],
        options: {
            lineBreak: {
                newLineBreaks: 3
            }
        },
        legend: {
            position: 'None'
        },
        tooltip: {
            content: function (ht) {
                var date = ht.item && ht.item.date ? ht.item.date : null, content = '';
                if (core.isDate(date)) {
                    date = core.Globalize.formatDate(date, 'MM/dd/yy');
                }
                if (ht && ht.item) {
                    content =
                        '<b>' + ht.name + '</b><br/>' +
                            'Date: ' + date + '<br/>' +
                            'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                            'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                            'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                            'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                            'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
                }
                return content;
            }
        }
    });
    let symbols = new input.ComboBox('#comboSymbols', {
        itemsSource: getSymbols(),
        displayMemberPath: 'name',
        selectedValuePath: 'symbol',
        selectedValue: 'box',
        selectedIndexChanged: function (sender) {
            theChart.itemsSource = getData(sender.selectedValue);
        }
    });
    //
    let lineBreak = new input.InputNumber('#inputLineBreaks', {
        step: 1,
        min: 1,
        max: 5,
        value: 3,
        valueChanged: function (sender) {
            if (sender == null || sender.value < sender.min) {
                return;
            }
            theChart.options.lineBreak.newLineBreaks = sender.value;
            theChart.invalidate();
        }
    });
    //
    let series = theChart.series[0];
    let stroke = new input.InputColor('#inputStroke', {
        value: 'rgb(136, 189, 230)',
        valueChanged: function (sender) {
            let color = sender.value;
            series.style.stroke = color;
            theChart.invalidate();
        }
    });
    let fill = new input.InputColor('#inputFill', {
        value: 'rgba(136, 189, 230, 0.701961)',
        valueChanged: function (sender) {
            let color = sender.value;
            series.style.fill = color;
            theChart.invalidate();
        }
    });
    let altStroke = new input.InputColor('#inputAltStroke', {
        value: 'rgb(136, 189, 230)',
        valueChanged: function (sender) {
            let color = sender.value;
            series.altStyle.stroke = color;
            theChart.invalidate();
        }
    });
    let altFill = new input.InputColor('#inputAltFill', {
        value: 'transparent',
        valueChanged: function (sender) {
            let color = sender.value;
            series.altStyle.fill = color;
            theChart.invalidate();
        }
    });
}
