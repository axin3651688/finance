import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService, DataItem } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: DataItem[];
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    onInitialized(grid: wjGrid.FlexGrid) {
        // create extra header row
        var extraRow = new wjGrid.Row();
        extraRow.allowMerging = true;
        //
        // add extra header row to the grid
        var panel = grid.columnHeaders;
        panel.rows.splice(0, 0, extraRow);
        //
        // populate the extra header row
        for (let colIndex = 1; colIndex <= 2; colIndex++) {
            panel.setCellData(0, colIndex, 'Amounts');
        }
        //
        // merge "Country" and "Active" headers vertically
        ['country', 'active'].forEach(function (binding) {
            let col = grid.getColumn(binding);
            col.allowMerging = true;
            panel.setCellData(0, col.index, col.header);
        });
        //
        // center-align merged header cells
        grid.formatItem.addHandler(function (s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
            if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
                var html = e.cell.innerHTML;
                e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
            }
        });
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
