import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
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
    workers: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.workers = dataService.getWorkers();
    }
    //
    onLoadedRows(flexGird: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        flexGird.rows.forEach(function (row: wjGrid.Row) {
            row.isReadOnly = false;
        })
    }
    //
    onBeginningEdit(flexGird: wjGrid.FlexGrid, e: wjGrid.CellEditEndingEventArgs) {
        var item = flexGird.rows[e.row].dataItem,
            binding = flexGird.columns[e.col].binding;
        if (!(binding in item)) { // property not on this item?
            e.cancel = true; // can't edit!
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
