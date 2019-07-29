import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjGrid from '@grapecity/wijmo.grid';
//
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule } from '@grapecity/wijmo.angular2.olap';
import { DataService, DataItem } from './app.data';

const maxSparkLength = 25;
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('grid') pivotGrid: wjOlap.PivotGrid;
    ng: wjOlap.PivotEngine;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.ng = new wjOlap.PivotEngine({
            autoGenerateFields: false,
            itemsSource: dataService.getData(1000),
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
    }
    //
    formatItem(e: wjGrid.FormatItemEventArgs) {
        // we want the cells panel
        let g = this.pivotGrid;
        if (e.panel == this.pivotGrid.cells) {
            // we want the 'Sparklines' and 'Sparkbars' value fields
            let ng = g.engine,
                field = ng.valueFields[e.col % ng.valueFields.length],
                item = g.rows[e.row].dataItem,
                binding = g.columns[e.col].binding,
                spark = field.header == 'Sparklines' || field.header == 'Sparkbars';
            //
            // add/remove spark class
            wjCore.toggleClass(e.cell, 'spark', spark);
            //
            // add sparklines
            if (spark) {
                //
                // if we have the data, show it
                if (item.sparkData) {
                    let data = item.sparkData,
                        delta = data[data.length - 1] - data[0];
                    //
                    e.cell.innerHTML = field.header == 'Sparklines'
                        ? this._getSparklines(item.sparkData)
                        : this._getSparkbars(item.sparkData);
                    wjCore.toggleClass(e.cell, 'spark-up', delta > 0);
                    wjCore.toggleClass(e.cell, 'spark-down', delta < 0);
                }
                //
                // we dont have the data yet, so go get it
                if (!item.sparkData) {
                    e.cell.innerHTML = '';
                    setTimeout(function () {
                        let detail: DataItem[] = g.engine.getDetail(item, binding),
                            len = detail.length;
                        //
                        if (len > maxSparkLength) {
                            detail = detail.slice(len - maxSparkLength);
                        }
                        item.sparkData = detail.map(dataItem => dataItem.sales);
                        g.invalidate(); // invalidate to show the sparlines
                    });
                }

            }
        }
    }
    //
    // generate sparklines as SVG
    private _getSparklines(data: number[]) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">',
            min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            x1 = 0,
            y1 = this._scaleY(data[0], min, max);
        //
        for (let i = 1; i < data.length; i++) {
            let x2 = Math.round((i) / (data.length - 1) * 100),
                y2 = this._scaleY(data[i], min, max);
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
    private _getSparkbars(data: number[]) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">',
            min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            base = Math.min(max, Math.max(min, 0)),
            basey = this._scaleY(base, min, max),
            w = Math.round(100 / data.length) - 2;
        //
        for (let i = 0; i < data.length; i++) {
            let x = i * Math.round(100 / data.length) + 1,
                y = this._scaleY(data[i], min, max);
            svg += `<rect x="${x}%" width="${w}%" y="${Math.min(y, basey)}%" height="${Math.abs(y - basey)}%" />`;
        }
        //
        svg += `<rect x="0%" width="100%" height="1" y="${basey}%" opacity="0.5" />`;
        svg += '</svg>';
        return svg;
    }
    //
    private _scaleY(value: number, min: number, max: number) {
        if (min === max) {
            return 0;
        }
        //
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
}
//
@NgModule({
    imports: [WjOlapModule, BrowserModule],
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

