import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('theGrid') theGrid: wjGrid.FlexGrid;
    data: any;
    rowCountText: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    ngAfterViewInit() {
        this.theGrid.collapseGroupsToLevel(0);
        this._updateRowCount(this.theGrid);
    }
    //
    onGroupCollapsedChanged(s: wjGrid.FlexGrid, e: wjGrid.CellRangeEventArgs) {
        var row = s.rows[e.row],
            item = row.dataItem;
        //
        // did we just expand a node with a dummy child?
        if (!row.isCollapsed &&
            item.children.length == 1 &&
            item.children[0].name == '') {
            //
            // can't lazy load while updating rows
            if (s.rows.isUpdating) {
                row.isCollapsed = true;
                return;
            }
            //
            // replace the dummy child with actual nodes
            item.children.length = 0;
            var cnt = Math.round(Math.random() * 5) + 1;
            for (var i = 0; i < cnt; i++) {
                var node = this.dataService.createNode();
                item.children.push(node);
            }
            //
            // refresh the view
            s.collectionView.refresh();
            //
            // collapse the new item's child items
            for (var i = <number>row.index + 1; i < s.rows.length; i++) {
                var childRow = s.rows[i];
                if (childRow.level <= row.level) {
                    break;
                }
                childRow.isCollapsed = true;
            }
            //
            // update row count
            this._updateRowCount(s);
        }
    }

    private _updateRowCount(grid: wjGrid.FlexGrid) {
        this.rowCountText = wjCore.Globalize.format(grid.rows.length, 'n0');
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
