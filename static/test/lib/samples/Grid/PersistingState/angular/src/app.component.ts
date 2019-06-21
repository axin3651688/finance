import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
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
    @ViewChild('flexGrid') flexGrid: wjGrid.FlexGrid;
    data: any;
    gridFilter: wjGridFilter.FlexGridFilter;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    ngAfterViewInit() {
        this.gridFilter = new wjGridFilter.FlexGridFilter(this.flexGrid);
    }
    //
    onSaveStateClick() {
        var state = {
            columns: this.flexGrid.columnLayout,
            filterDefinition: this.gridFilter.filterDefinition,
            sortDescriptions: this.flexGrid.collectionView.sortDescriptions.map(function (sortDesc) {
                return { property: sortDesc.property, ascending: sortDesc.ascending };
            })
        }
        localStorage['gridState'] = JSON.stringify(state);
    }
    //
    onRestoreClick() {
        var json = localStorage['gridState'];
        if (json) {
            var state = JSON.parse(json);
            //
            // restore column layout (order/width)
            this.flexGrid.columnLayout = state.columns;
            //
            // restore filter definitions
            this.gridFilter.filterDefinition = state.filterDefinition;
            //
            // restore sort state
            var view = this.flexGrid.collectionView;
            view.deferUpdate(function () {
                view.sortDescriptions.clear();
                for (var i = 0; i < state.sortDescriptions.length; i++) {
                    var sortDesc = state.sortDescriptions[i];
                    view.sortDescriptions.push(
                        new wjCore.SortDescription(sortDesc.property, sortDesc.ascending)
                    );
                }
            });
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
