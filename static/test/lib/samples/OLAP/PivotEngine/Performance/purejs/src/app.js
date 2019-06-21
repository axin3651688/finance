import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjCore from '@grapecity/wijmo';
import { addData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize data sets
    var ds10 = addData([], 10e3), ds100 = [], ds500 = [], ds1M = [], result = document.getElementById('result'), start = 0;
    //
    // initialize pivot engine
    var ng = new wjOlap.PivotEngine({
        autoGenerateFields: false,
        fields: [
            { binding: 'date', header: 'Date', format: 'yyyy' },
            { binding: 'buyer', header: 'Person' },
            { binding: 'type', header: 'Category' },
            { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
        ],
        itemsSource: ds10,
        showRowTotals: 'Subtotals',
        valueFields: ['Amount'],
        rowFields: ['Person', 'Category'],
        //
        // benchmark
        updatingView: function () {
            if (start == 0) {
                start = Date.now();
            }
        },
        updatedView: function (s) {
            var fmt = 'Summarized <b>{cnt:n0}</b> items in <b>{tm:n0}</b>ms';
            result.innerHTML = wjCore.format(fmt, {
                cnt: s.itemsSource.length,
                tm: Date.now() - start
            });
            start = 0;
        }
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng
    });
    //
    // handle click events to apply different data sources
    document.getElementById('buttons').addEventListener('click', function (e) {
        switch (e.target.id) {
            case '10k':
                ng.itemsSource = ds10;
                break;
            case '100k':
                ng.itemsSource = ds100;
                break;
            case '500k':
                ng.itemsSource = ds500;
                break;
            case '1M':
                ng.itemsSource = ds1M;
                break;
        }
    });
    //
    // create large data asynchronously
    createDataAsync(100e3, function (result) {
        ds100 = result;
        enableButton('100k');
    });
    createDataAsync(500e3, function (result) {
        ds500 = result;
        enableButton('500k');
    });
    createDataAsync(1e6, function (result) {
        ds1M = result;
        enableButton('1M');
    });
    function enableButton(id) {
        document.getElementById(id).disabled = false;
    }
    //
    //
    // create data asynchronously
    function createDataAsync(cnt, callback) {
        var data = [];
        addDataAsync(data, cnt, function () {
            callback(data);
        });
    }
    function addDataAsync(data, cnt, callback) {
        setTimeout(function () {
            addData(data, Math.min(cnt - data.length, 1000));
            if (data.length == cnt) {
                callback(data);
            }
            else {
                addDataAsync(data, cnt, callback);
            }
        });
    }
}
