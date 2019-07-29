import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('flexGrid') theGrid: wjGrid.FlexGrid;
    data: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    onLoadedRows(grid: wjGrid.FlexGrid) {
        this.autoSizeRowsAsync(grid);
    }
    //
    onCellEditEnded(grid: wjGrid.FlexGrid, e: wjGrid.CellEditEndingEventArgs) {
        if (grid.columns[e.col].wordWrap) {
            this.autoSizeRowsAsync(grid, e.row);
        }
    }
    //
    onScrollPositionChanged(grid: wjGrid.FlexGrid, e: wjGrid.CellRangeEventArgs) {
        var vr = grid.viewRange;
        for (var r = vr.topRow; r <= vr.bottomRow; r++) {
            if (grid.rows[r].height == null) {
                grid.autoSizeRows(r, r);
                //console.log('autosized row ' + r)
            }
        }
    }
    //
    onResizedColumn(grid: wjGrid.FlexGrid, e: wjGrid.CellRangeEventArgs) {
        if (grid.columns[e.col].wordWrap) {
            this.autoSizeRowsAsync(grid);
        }
    }
    //
    onAsSyncClick() {
        var start = Date.now();
        this.theGrid.autoSizeRows();
        alert('AutoSized all rows in ' + (Date.now() - start) + 'ms');
    }
    //
    autoSizeRowsAsync(grid: wjGrid.FlexGrid, rowIndex?: number) {
        if (rowIndex != null) {
            grid.rows[rowIndex].height = null;
        } else {
            grid.rows.forEach(function (row) {
                row.height = null;
            });
        }
        setTimeout(function () {
            grid.onScrollPositionChanged();
        })
    }
}
//\\
@NgModule({
    imports: [WjGridModule, BrowserModule],
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
