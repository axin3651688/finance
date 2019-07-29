import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
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
    @ViewChild('workersGrid') workersGrid: wjGrid.FlexGrid;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
    }
    //
    ngAfterViewInit() {
        let workers = this.dataService.getWorkers();
        // add columns
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Name' }));
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Hours', dataType: 'Number', format: 'n2' }));
        this.workersGrid.columns.push(new wjGrid.Column({ header: 'Rate', dataType: 'Number', format: 'n2' }));
        //
        // add rows
        for (var w = 0; w < workers.length; w++) {
            //
            // add worker
            var worker = workers[w];
            var row = new wjGrid.GroupRow();
            row.dataItem = worker;
            row.isReadOnly = false;
            row.level = 0;
            this.workersGrid.rows.push(row);
            this.workersGrid.setCellData(row.index, 0, worker.name);
            for (var c = 0; c < worker.checks.length; c++) {
                //
                // add check
                var check = worker.checks[c];
                row = new wjGrid.GroupRow();
                row.dataItem = check;
                row.isReadOnly = false;
                row.level = 1;
                this.workersGrid.rows.push(row);
                this.workersGrid.setCellData(row.index, 0, check.name);
                for (var e = 0; e < check.earnings.length; e++) {
                    //
                    // add earning
                    var earning = check.earnings[e];
                    row = new wjGrid.GroupRow();
                    row.dataItem = earning;
                    row.isReadOnly = false;
                    row.level = 2;
                    this.workersGrid.rows.push(row);
                    this.workersGrid.setCellData(row.index, 0, earning.name);
                    this.workersGrid.setCellData(row.index, 1, earning.hours);
                    this.workersGrid.setCellData(row.index, 2, earning.rate);
                    //
                }
            }
        }
    }
    //
    onBeginningEdit(flexGird: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
        var value = e.panel.getCellData(e.row, e.col, true);
        if (value == null) {
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
