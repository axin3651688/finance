import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as gauge from '@grapecity/wijmo.gauge';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // render using window.print()
    document.querySelector('#btnPrintDirect').addEventListener('click', () => {
        window.print();
    });
    //
    // render using wijmo.PrintDocument class
    document.querySelector('#btnPrintDoc').addEventListener('click', () => {
        // create PrintDocument
        let doc = new wijmo.PrintDocument({
            title: 'PrintDocument Test'
        });
        //
        // add CSS explicitly (since we can't use copyCss in jsfiddle)
        doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">');
        //
        // add some simple text
        doc.append('<h1>Printing Example</h1>');
        doc.append('<p>This document was created using the <b>PrintDocument</b> class.</p>');
        //
        // add existing elements
        doc.append('<h2>Render Existing Elements</h2>');
        doc.append('<p>Check out these gauges:</p>');
        doc.append(document.querySelector('#tblGauge'));
        //
        // add a printer-friendly version of a FlexGrid to the document
        let flex = wijmo.Control.getControl('#theGrid');
        doc.append('<h2>Printer-Friendly FlexGrid</h2>');
        doc.append('<p>And here\'s a FlexGrid rendered as a table:</p>');
        let tbl = renderTable(flex);
        doc.append(tbl);
        //
        // print the document
        doc.print();
    });
    //
    // create some gauges
    let g1 = new gauge.RadialGauge('#theGauge1', {
        value: 20,
        isReadOnly: false
    });
    let g2 = new gauge.RadialGauge('#theGauge2', {
        value: 80,
        isReadOnly: false
    });
    //
    // show the data in a grid
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    //
    // custom grid rendering function: renders grid as a table
    function renderTable(flex) {
        // start table
        let tbl = '<table>';
        //
        // headers
        if (flex.headersVisibility & grid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        //
        // body
        tbl += '<tbody>';
        for (let r = 0; r < flex.rows.length; r++) {
            tbl += renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        //
        // done
        tbl += '</table>';
        return tbl;
    }
    //
    function renderRow(panel, r) {
        let tr = '', row = panel.rows[r];
        //
        if (row.renderSize > 0) {
            tr += '<tr>';
            //
            panel.columns.forEach((col, c) => {
                if (col.renderSize > 0) {
                    // get cell style, content
                    let style = `width:${col.renderSize}px; text-align:${col.getAlignment()}; padding-right: 6px`;
                    let content = panel.getCellData(r, c, true);
                    //
                    if (!row.isContentHtml && !col.isContentHtml) {
                        content = wijmo.escapeHtml(content);
                    }
                    //
                    // add cell to row
                    if (panel.cellType == grid.CellType.ColumnHeader) {
                        tr += `<th style="${style}">${content}</th>`;
                    }
                    else {
                        // show boolean values as checkboxes
                        let raw = panel.getCellData(r, c, false);
                        if (raw === true) {
                            content = '&#9745;';
                        }
                        else if (raw === false) {
                            content = '&#9744;';
                        }
                        //
                        tr += `<td style="${style}">${content}</td>`;
                    }
                }
            });
            //
            tr += '</tr>';
        }
        //
        return tr;
    }
}
