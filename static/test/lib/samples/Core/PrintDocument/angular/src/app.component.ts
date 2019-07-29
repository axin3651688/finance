import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
//
import { Component, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('theGrid')
    private theGrid: grid.FlexGrid;
    //
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    // render using wijmo.PrintDocument class
    printDoc() {
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
        let flex = wijmo.Control.getControl('#theGrid') as grid.FlexGrid;
        doc.append('<h2>Printer-Friendly FlexGrid</h2>');
        doc.append('<p>And here\'s a FlexGrid rendered as a table:</p>');
        let tbl = this._renderTable(this.theGrid);
        doc.append(tbl);
        //
        // print the document
        doc.print();
    }
    //
    // render using window.print()
    printDirect() {
        window.print();
    }

    //
    // custom grid rendering function: renders grid as a table
    private _renderTable(flex: grid.FlexGrid) {
        // start table
        let tbl = '<table>';
        //
        // headers
        if (flex.headersVisibility & grid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += this._renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        //
        // body
        tbl += '<tbody>';
        for (let r = 0; r < flex.rows.length; r++) {
            tbl += this._renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        //
        // done
        tbl += '</table>';
        return tbl;
    }
    //
    private _renderRow(panel: grid.GridPanel, r: number) {
        let tr = '',
            row = panel.rows[r];
        //
        if (row.renderSize > 0) {
            tr += '<tr>';
            //
            panel.columns.forEach((col: grid.Column, c: number) => {
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
                    } else {
                        // show boolean values as checkboxes
                        let raw = panel.getCellData(r, c, false);
                        if (raw === true) {
                            content = '&#9745;';
                        } else if (raw === false) {
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
//
@NgModule({
    imports: [WjGridModule, WjGaugeModule, BrowserModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

