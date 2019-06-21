import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    // references FlexGrid named 'flex' in the view
    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    // DataSvc will be passed by derived classes
    constructor() {
    }

    ngAfterViewInit() {
        this._update();
    }

    private _update() {
        if (this.flex) {
            this.flex.allowResizing = wjcGrid.AllowResizing.Both;
            this.flex.allowDragging = wjcGrid.AllowDragging.Both;

            let r: number,
                c: number,
                i: number;
            // add 50 rows, 10 columns
            for (r = 0; r < 50; r++) {
                this.flex.rows.push(new wjcGrid.Row());
            }
            for (c = 0; c < 10; c++) {
                this.flex.columns.push(new wjcGrid.Column());
            }

            // populate the scrollable area
            for (r = 0; r < this.flex.rows.length; r++) {
                for (c = 0; c < this.flex.columns.length; c++) {
                    this.flex.setCellData(r, c, 'r' + r + ',c' + c);
                }
            }

            // add 3 rows to the column header and 3 columns to the row header panels
            for (i = 0; i < 3; i++) {
                this.flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
                this.flex.rowHeaders.columns.insert(0, new wjcGrid.Column());
            }

            // populate the fixed area
            let p = this.flex.columnHeaders;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'cHdr r' + r + ',c' + c);
                }
            }
            p = this.flex.rowHeaders;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'rHdr r' + r + ',c' + c);
                }
            }
            p = this.flex.topLeftCells;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, 'tl r' + r + ',c' + c);
                }
            }
        }
    }
}
//
@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

