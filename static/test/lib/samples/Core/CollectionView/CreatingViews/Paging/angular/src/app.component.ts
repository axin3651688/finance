import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as odata from '@grapecity/wijmo.odata';
//
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
    view: wijmo.CollectionView;
    odataView: odata.ODataCollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        // create a CollectionView with 20 items per page
        this.view = new wijmo.CollectionView(dataService.getData(), {
            pageSize: 6
        });
        //
        // use ODataCollectionView to demonstrate server-based paging
        this.odataView = new odata.ODataCollectionView('https://services.odata.org/Northwind/Northwind.svc', 'Customers', {
            pageSize: 6,
            pageOnServer: true,
            sortOnServer: true
        });
    }
    //
    updateViewPager(e: Event) {
        let btn = wijmo.closest(e.target, 'button'),
            id = btn ? (<any>btn).id : '';
        //
        switch (id) {
            case 'btnFirst':
                this.view.moveToFirstPage();
                break;
            case 'btnPrev':
                this.view.moveToPreviousPage();
                break;
            case 'btnNext':
                this.view.moveToNextPage();
                break;
            case 'btnLast':
                this.view.moveToLastPage();
                break;
        }
    }
    //
    updateOdataViewPager(e: Event) {
        let btn = wijmo.closest(e.target, 'button'),
            id = btn ? (<any>btn).id : '';
        //
        switch (id) {
            case 'btnFirstOd':
                this.odataView.moveToFirstPage();
                break;
            case 'btnPrevOd':
                this.odataView.moveToPreviousPage();
                break;
            case 'btnNextOd':
                this.odataView.moveToNextPage();
                break;
            case 'btnLastOd':
                this.odataView.moveToLastPage();
                break;
        }
    }
}
//
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

