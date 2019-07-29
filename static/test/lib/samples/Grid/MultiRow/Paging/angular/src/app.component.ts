import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';

import { Component, Inject, enableProdMode, NgModule, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    pagedOrders: wjCore.CollectionView;
    layoutDefinition: any;
    pageText: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        const data = dataService.getData();
        this.pagedOrders = data.pagedOrders;
        this.layoutDefinition = data.ldThreeLines;
    }
    //
    ngAfterViewInit() {
        this._updatePageText();
        this.pagedOrders.collectionChanged.addHandler(() => {
            this._updatePageText();
        });
        this.pagedOrders.pageChanged.addHandler(() => {
            this._updatePageText();
        });
    }
    //
    onGotoPageClick(command: string) {
        if (command === 'first') {
            this.pagedOrders.moveToFirstPage();
        } else if (command === 'previous') {
            this.pagedOrders.moveToPreviousPage();
        } else if (command === 'next') {
            this.pagedOrders.moveToNextPage();
        } else if (command === 'last') {
            this.pagedOrders.moveToLastPage();
        }
    }
    //
    private _updatePageText() {
        this.pageText = wjCore.format('{index:n0} / {count:n0}', {
            index: this.pagedOrders.pageIndex + 1,
            count: this.pagedOrders.pageCount
        });

    }
}
//\\
@NgModule({
    imports: [WjGridMultirowModule, BrowserModule],
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
