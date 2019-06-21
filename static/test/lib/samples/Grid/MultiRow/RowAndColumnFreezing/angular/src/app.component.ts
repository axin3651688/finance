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
    @ViewChild('freezeMultirow') freezeMultirow: wjMultirow.MultiRow;
    orders: any
    layoutDefinition: any;
    textContent: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        let data = dataService.getData();
        this.orders = data.orders;
        this.layoutDefinition = data.ldTwoLines;
        this.textContent = 'Freeze';
    }
    //
    onFreezeClick() {
        this.freezeMultirow.frozenColumns = this.freezeMultirow.frozenColumns ? 0 : 2;
        this.freezeMultirow.frozenRows = this.freezeMultirow.frozenRows ? 0 : 2;
        this.textContent = this.freezeMultirow.frozenRows == 0 ? 'Freeze' : 'Unfreeze';
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
