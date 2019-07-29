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
    @ViewChild('theGrid') theGrid: wjGrid.FlexGrid;
    data: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    onAlternatingRowStepClick(e: MouseEvent) {
        this.theGrid.alternatingRowStep = (e.target as HTMLInputElement).checked ? 1 : 0;
    }
    //
    onloadedRows(grid: wjGrid.FlexGrid) {
        for (var i = 0; i < grid.rows.length; i++) {
            var row = grid.rows[i];
            var item = row.dataItem;
            if (item.sales > 6000) {
                row.cssClass = 'high-value';
            } else if (item.sales < 1000) {
                row.cssClass = 'low-value';
            }
        }
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
