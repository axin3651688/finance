import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('adMultirow') adMultirow: wjMultirow.MultiRow;
    newOrders: any;
    threeLines: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        let appData = dataService.getData();
        this.newOrders = appData.addNewOrders;
        this.threeLines = appData.ldThreeLines;
    }
    onAllNewClick(e: MouseEvent) {
        this.adMultirow.allowAddNew = (<HTMLInputElement>e.target).checked;
    }

    onAllDeleteClick(e: MouseEvent) {
        this.adMultirow.allowDelete = (<HTMLInputElement>e.target).checked;
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
