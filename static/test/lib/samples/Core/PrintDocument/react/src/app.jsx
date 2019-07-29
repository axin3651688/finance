import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.printDoc = () => {
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
            doc.append("<h1>Printing Example</h1>");
            doc.append("<p>This document was created using the <b>PrintDocument</b> class.</p>");
            //
            // add existing elements
            doc.append("<h2>Render Existing Elements</h2>");
            doc.append("<p>Check out these gauges:</p>");
            doc.append(document.querySelector("#tblGauge"));
            //
            // add a printer-friendly version of a FlexGrid to the document
            doc.append("<h2>Printer-Friendly FlexGrid</h2>");
            doc.append("<p>And here's a FlexGrid rendered as a table:</p>");
            let tbl = this._renderTable(this.state.control);
            doc.append(tbl);
            //
            // print the document
            doc.print();
        };
        this.printDirect = () => {
            window.print();
        };
        this._renderTable = (flex) => {
            // start table
            let tbl = "<table>";
            //
            // headers
            if (flex.headersVisibility & grid.HeadersVisibility.Column) {
                tbl += "<thead>";
                for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                    tbl += this._renderRow(flex.columnHeaders, r);
                }
                tbl += "</thead>";
            }
            //
            // body
            tbl += "<tbody>";
            for (let r = 0; r < flex.rows.length; r++) {
                tbl += this._renderRow(flex.cells, r);
            }
            tbl += "</tbody>";
            //
            // done
            tbl += "</table>";
            return tbl;
        };
        this._renderRow = (panel, r) => {
            let tr = "", row = panel.rows[r];
            //
            if (row.renderSize > 0) {
                tr += "<tr>";
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
                                content = "&#9745;";
                            }
                            else if (raw === false) {
                                content = "&#9744;";
                            }
                            //
                            tr += `<td style="${style}">${content}</td>`;
                        }
                    }
                });
                //
                tr += "</tr>";
            }
            //
            return tr;
        };
        this.initialized = (control) => {
            this.setState({ control: control });
        };
        this.state = {
            data: getData(),
            control: {}
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <p>
                <button className="btn btn-default" onClick={this.printDoc}>Print with PrintDocument</button>
                <button className="btn btn-default" onClick={this.printDirect}>Print directly</button>
            </p>

            <p>Radial gauges:</p>
            <table id="tblGauge">
                <tr>
                    <td>
                        <wjGauge.RadialGauge value={20} isReadOnly={false}>
                        </wjGauge.RadialGauge>
                    </td>
                    <td>
                        <wjGauge.RadialGauge value={80} isReadOnly={false}>
                        </wjGauge.RadialGauge>
                    </td>
                </tr>
            </table>

            <p>FlexGrid:</p>
            <wjGrid.FlexGrid initialized={this.initialized} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
