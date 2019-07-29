import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcOData from '@grapecity/wijmo.odata';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjcOData.ODataCollectionView;

    constructor() {
        let url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.data = new wjcOData.ODataCollectionView(url, 'Customers', {
        pageSize: 6,
            pageOnServer: true,
            sortOnServer: true,
        });
    }
}
//
@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

