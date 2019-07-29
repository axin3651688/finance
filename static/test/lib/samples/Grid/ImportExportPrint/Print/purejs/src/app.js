import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // render using wijmo.PrintDocument class
    document.getElementById('btnPrintDoc').addEventListener('click', function (e) {
        //
        // create PrintDocument
        var doc = new wjCore.PrintDocument({
            title: 'PrintDocument Test',
            copyCss: false // prevent cross-origin issues in jsfiddle 
        });
        //
        // add CSS explicitly (since we can't use copyCss in jsfiddle)
        doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="http://cdn.wijmo.com/5.latest/styles/wijmo.min.css" rel="stylesheet">');
        //
        // add some simple text
        doc.append('<h1>Printing Example</h1>');
        doc.append('<p>This document was created using the <b>PrintDocument</b> class.</p>');
        //
        // add a printer-friendly version of a FlexGrid to the document
        var flex = wjCore.Control.getControl('#theGrid');
        doc.append('<p>Here\'s a FlexGrid rendered as a table:</p>');
        var tbl = renderTable(flex);
        doc.append(tbl);
        //
        // print the document
        doc.print();
    });
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // show the data in a grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data,
    });
    //
    // custom grid rendering function: 
    // renders grid as a table
    function renderTable(flex) {
        //
        // start table
        var tbl = '<table>';
        //
        // headers
        if (flex.headersVisibility & wjGrid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (var r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        //
        // body
        tbl += '<tbody>';
        for (var r = 0; r < flex.rows.length; r++) {
            tbl += renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        //
        // done
        tbl += '</table>';
        return tbl;
    }
    function renderRow(panel, r) {
        var tr = '', row = panel.rows[r];
        if (row.renderSize > 0) {
            tr += '<tr>';
            for (var c = 0; c < panel.columns.length; c++) {
                var col = panel.columns[c];
                if (col.renderSize > 0) {
                    //
                    // get cell style, content
                    var style = 'width:' + col.renderSize + 'px;' +
                        'text-align:' + col.getAlignment() + ';' +
                        'padding-right: 6px';
                    var content = panel.getCellData(r, c, true);
                    if (!row.isContentHtml && !col.isContentHtml) {
                        content = wjCore.escapeHtml(content);
                    }
                    //
                    // add cell to row
                    if (panel.cellType == wjGrid.CellType.ColumnHeader) {
                        tr += '<th style="' + style + '">' + content + '</th>';
                    }
                    else {
                        //
                        // show boolean values as checkboxes
                        var raw = panel.getCellData(r, c, false);
                        if (raw === true) {
                            content = '&#9745;';
                        }
                        else if (raw === false) {
                            content = '&#9744;';
                        }
                        //
                        tr += '<td style="' + style + '">' + content + '</td>';
                    }
                }
            }
            tr += '</tr>';
        }
        return tr;
    }
}
