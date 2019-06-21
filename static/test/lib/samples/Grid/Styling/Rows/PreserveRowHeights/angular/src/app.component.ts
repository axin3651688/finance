import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService, DataItem } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('theGrid') theGrid: wjGrid.FlexGrid;
    data: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    ngAfterViewInit() {
        const grid = this.theGrid;
        var heightMap: Map<DataItem, number> = null;
        grid.loadingRows.addHandler(function () { // save
            heightMap = new Map();
            grid.rows.forEach(function (row: wjGrid.Row) {
                heightMap.set(row.dataItem, row.height);
            });
            console.log('saved');
        });
        grid.loadedRows.addHandler(function () { // restore
            grid.rows.forEach(function (row: wjGrid.Row) {
                var height = heightMap.get(row.dataItem);
                if (height != null) {
                    row.height = height;
                }
            });
            console.log('restored');
        });
    }
    //
    onReload() {
        this.theGrid.collectionView.refresh();
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
