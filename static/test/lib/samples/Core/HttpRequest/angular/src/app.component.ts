import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any = null;
    //
    constructor() {
        // make the request
        wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
            data: {
                '$format': 'json',
                '$select': 'CategoryID,CategoryName,Description'
            },
            success: (xhr: XMLHttpRequest) => {
                this.data = JSON.parse(xhr.responseText).value;
            }
        })
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

