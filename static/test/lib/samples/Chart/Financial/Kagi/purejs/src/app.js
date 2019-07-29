import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as core from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as finance from '@grapecity/wijmo.chart.finance';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the chart
    let data = getData();
    let theChart = new finance.FinancialChart('#theChart', {
        itemsSource: data,
        bindingX: 'date',
        chartType: 'Kagi',
        series: [
            {
                binding: 'high,low,open,close',
                style: {
                    stroke: 'rgb(136, 189, 230)'
                },
                altStyle: {
                    stroke: 'rgb(136, 189, 230)'
                },
                name: 'Facebook'
            }
        ],
        options: {
            kagi: {
                reversalAmount: 1,
                rangeMode: 'Fixed',
                fields: 'Close'
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
    //
    let revAmount = new input.InputNumber('#inputRevAmount', {
        step: 1,
        min: 0,
        value: 1,
        format: 'n0',
        valueChanged: function (sender) {
            if (sender == null || sender.value < sender.min) {
                return;
            }
            theChart.options.kagi.reversalAmount = sender.value;
            theChart.invalidate();
        }
    });
    //
    let rangeMode = new input.Menu('#selRangeMode', {
        selectedValue: 'Fixed',
        itemClicked: function (sender) {
            theChart.options.kagi.rangeMode = sender.selectedValue;
            var reversalInput = revAmount;
            if (sender.selectedValue === 'Percentage') {
                reversalInput.format = 'p0';
                reversalInput.min = 0;
                reversalInput.max = 1;
                reversalInput.value = core.clamp(reversalInput.value, 0, .05);
                reversalInput.step = 0.05;
            }
            else if (sender.selectedValue === 'ATR') {
                reversalInput.format = 'n0';
                reversalInput.min = 2;
                reversalInput.max = data.length - 2;
                reversalInput.value = core.clamp(reversalInput.value, 14, data.length - 2);
                reversalInput.step = 1;
            }
            else {
                reversalInput.format = 'n0';
                reversalInput.min = 1;
                reversalInput.max = null;
                reversalInput.value = 1;
                reversalInput.step = 1;
            }
            updateMenuHeader(rangeMode, 'Range Mode');
            theChart.invalidate();
        }
    });
    updateMenuHeader(rangeMode, 'Range Mode');
    //
    let dataFields = new input.Menu('#selDataFields', {
        selectedValue: 'Close',
        itemClicked: function (sender) {
            theChart.options.kagi.fields = sender.selectedValue;
            updateMenuHeader(dataFields, 'Data Fields');
            theChart.invalidate();
        }
    });
    updateMenuHeader(dataFields, 'Data Fields');
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
    let altStroke = new input.InputColor('#inputAltStroke', {
        value: 'rgb(136, 189, 230)',
        valueChanged: function (sender) {
            let color = sender.value;
            series.altStyle.stroke = color;
            theChart.invalidate();
        }
    });
}
// show menu header and current value
function updateMenuHeader(menu, header) {
    menu.header = header
        ? header + ': <b>' + menu.text + '</b>'
        : menu.text;
}
