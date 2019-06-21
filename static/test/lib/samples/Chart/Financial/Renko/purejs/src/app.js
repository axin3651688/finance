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
        chartType: 'Renko',
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
                name: 'Facebook'
            }
        ],
        options: {
            renko: {
                boxSize: 2,
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
    let boxSize = new input.InputNumber('#inputBoxSize', {
        step: 1,
        min: 0,
        value: 2,
        format: 'n0',
        valueChanged: function (sender) {
            if (sender == null || sender.value < sender.min) {
                return;
            }
            theChart.options.renko.boxSize = sender.value;
            theChart.invalidate();
        }
    });
    //
    let rangeMode = new input.Menu('#selRangeMode', {
        selectedValue: 'Fixed',
        itemClicked: function (sender) {
            theChart.options.renko.rangeMode = sender.selectedValue;
            if (sender.selectedValue === 'ATR') {
                boxSize.min = 2;
                boxSize.max = data.length - 2;
                let size = core.clamp(boxSize.value, 14, data.length - 2);
                boxSize.value = size;
                theChart.options.renko.boxSize = size;
            }
            else {
                boxSize.min = 1;
                boxSize.max = null;
            }
            updateMenuHeader(rangeMode, 'Range Mode');
            theChart.invalidate();
        }
    });
    updateMenuHeader(rangeMode, 'Range Mode');
    let dataFields = new input.Menu('#selDataFields', {
        selectedValue: 'Close',
        itemClicked: function (sender) {
            theChart.options.renko.fields = sender.selectedValue;
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
// show menu header and current value
function updateMenuHeader(menu, header) {
    menu.header = header
        ? header + ': <b>' + menu.text + '</b>'
        : menu.text;
}
