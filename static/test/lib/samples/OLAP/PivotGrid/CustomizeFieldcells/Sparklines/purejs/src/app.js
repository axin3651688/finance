import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as olap from '@grapecity/wijmo.olap';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let a = scaleY(1, 0, 100);
    let b = scaleY(10, 0, 100);
    let c = scaleY(10, 0, 50);
    let d = scaleY(20, 0, 50);
    let e = scaleY(30, 0, 50);
    let f = scaleY(40, 0, 50);
    let g = scaleY(45, 0, 50);
    let h = scaleY(49, 0, 50);
    // create a PivotEngine with a custom view
    let ng = new olap.PivotEngine({
        autoGenerateFields: false,
        itemsSource: getData(1000),
        showColumnTotals: 'Subtotals',
        showRowTotals: 'Subtotals',
        fields: [
            { binding: 'product', header: 'Product', width: 100 },
            { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q', width: 100 },
            { binding: 'sales', header: 'Sales', format: 'n0', width: 100 },
            { binding: 'sales', header: 'Sparklines', width: 100 },
            { binding: 'sales', header: 'Sparkbars', width: 100 }
        ],
        rowFields: ['Date'],
        columnFields: ['Product'],
        valueFields: ['Sales', 'Sparklines', 'Sparkbars']
    });
    //
    // show panel
    let pivotPanel = new olap.PivotPanel('#pivotPanel', {
        itemsSource: ng
    });
    //
    // show summary
    let pivotGrid = new olap.PivotGrid('#pivotGrid', {
        isReadOnly: true,
        itemsSource: ng,
        formatItem: formatItem // customize the grid cells
    });
    //
    // use formatItem to add sparklines and/or sparkbars
    let maxSparkLength = 25;
    function formatItem(s, e) {
        // we want the cells panel
        if (e.panel == s.cells) {
            // we want the 'Sparklines' and 'Sparkbars' value fields
            let ng = s.engine, field = ng.valueFields[e.col % ng.valueFields.length], item = s.rows[e.row].dataItem, binding = s.columns[e.col].binding, spark = field.header == 'Sparklines' || field.header == 'Sparkbars';
            //
            // add/remove spark class
            wijmo.toggleClass(e.cell, 'spark', spark);
            //
            // add sparklines
            if (spark) {
                // if we have the data, show it
                if (item.sparkData) {
                    let data = item.sparkData, delta = data[data.length - 1] - data[0];
                    //
                    e.cell.innerHTML = field.header == 'Sparklines' ? getSparklines(item.sparkData) : getSparkbars(item.sparkData);
                    wijmo.toggleClass(e.cell, 'spark-up', delta > 0);
                    wijmo.toggleClass(e.cell, 'spark-down', delta < 0);
                }
                //
                // we dont have the data yet, so go get it
                if (!item.sparkData) {
                    e.cell.innerHTML = '';
                    setTimeout(function () {
                        let detail = s.engine.getDetail(item, binding), len = detail.length;
                        //
                        if (len > maxSparkLength) {
                            detail = detail.slice(len - maxSparkLength);
                        }
                        //
                        item.sparkData = detail.map(dataItem => dataItem.sales);
                        //
                        s.invalidate(); // invalidate to show the sparlines
                    });
                }
            }
        }
    }
    //
    // generate sparklines as SVG
    function getSparklines(data) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">', min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), x1 = 0, y1 = scaleY(data[0], min, max);
        //
        for (let i = 1; i < data.length; i++) {
            let x2 = Math.round((i) / (data.length - 1) * 100), y2 = scaleY(data[i], min, max);
            //
            svg += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" />`;
            x1 = x2;
            y1 = y2;
        }
        //
        svg += '</svg>';
        return svg;
    }
    //
    function getSparkbars(data) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">', min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), base = Math.min(max, Math.max(min, 0)), basey = scaleY(base, min, max), w = Math.round(100 / data.length) - 2;
        //
        for (let i = 0; i < data.length; i++) {
            let x = i * Math.round(100 / data.length) + 1, y = scaleY(data[i], min, max);
            svg += `<rect x="${x}%" width="${w}%" y="${Math.min(y, basey)}%" height="${Math.abs(y - basey)}%" />`;
        }
        //
        svg += `<rect x="0%" width="100%" height="1" y="${basey}%" opacity="0.5" />`;
        svg += '</svg>';
        return svg;
    }
    //
    // min <= value <= max
    function scaleY(value, min, max) {
        if (min === max) {
            return 0;
        }
        //
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
}
