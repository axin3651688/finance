import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    printDoc() {
        // create PrintDocument
        let doc = new wjcCore.PrintDocument({
            title: 'PrintDocument Test',
            copyCss: false // prevent cross-origin issues in jsfiddle 
        });
        // add CSS explicitly (since we can't use copyCss in jsfiddle)
        doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="http://cdn.wijmo.com/5.latest/styles/wijmo.min.css" rel="stylesheet">');
        // add some simple text
        doc.append('<h1>Printing Example</h1>');
        doc.append('<p>This document was created using the <b>PrintDocument</b> class.</p>');
        // add a printer-friendly version of a FlexGrid to the document
        doc.append('<p>Here\'s a FlexGrid rendered as a table:</p>');
        let tbl = this._renderTable(this.flex);
        doc.append(tbl);
        // print the document
        doc.print();
    }

    // renders grid as a table
    private _renderTable(flex: wjcGrid.FlexGrid) {
        // start table
        let tbl = '<table>';
        // headers
        if (flex.headersVisibility & wjcGrid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += this._renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        // body
        tbl += '<tbody>';
        for (let r = 0; r < flex.rows.length; r++) {
            tbl += this._renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        // done
        tbl += '</table>';
        return tbl;
    }
    
    private _renderRow(panel: wjcGrid.GridPanel, r: number) {
        let tr = '',
        row = panel.rows[r];
        if (row.renderSize > 0) {
            tr += '<tr>';
            for (let c = 0; c < panel.columns.length; c++) {
                let col = panel.columns[c];
                if (col.renderSize > 0) {
                    // get cell style, content
                    let style = 'width:' + col.renderSize + 'px;' +
                        'text-align:' + col.getAlignment() + ';' +
                        'padding-right: 6px';
                    let content = panel.getCellData(r, c, true);
                    if (!row.isContentHtml && !col.isContentHtml) {
                        content = wjcCore.escapeHtml(content);
                    }
                    // add cell to row
                    if (panel.cellType == wjcGrid.CellType.ColumnHeader) {
                        tr += '<th style="' + style + '">' + content + '</th>';
                    } else {
                        // show boolean values as checkboxes
                        let raw = panel.getCellData(r, c, false);
                        if (raw === true) {
                            content = '&#9745;';
                        } else if (raw === false) {
                            content = '&#9744;';
                        }
                        tr += '<td style="' + style + '">' + content + '</td>';
                    }
                }
            }
            tr += '</tr>';
        }
        return tr;
    }

    private _getData() {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

