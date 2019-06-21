import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    getItemBySearch(query: string, max: number, callback: Function) {
        if (!query) {
            callback(null);
            return;
        }
        //
        wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Products', {
            data: {
                $format: 'json',
                $select: 'ProductID,ProductName',
                $filter: 'indexof(ProductName, \'' + query + '\') gt -1'
            },
            success: (xhr: XMLHttpRequest) => {
                let response = JSON.parse(xhr.response);
                callback(response.d ? response.d.results : response.value);
            }
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

