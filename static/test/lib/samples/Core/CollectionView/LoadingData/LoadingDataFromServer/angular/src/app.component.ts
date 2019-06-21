import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view: wijmo.CollectionView;
    //
    constructor() {
        // create an empty CollectionView
        this.view = new wijmo.CollectionView();
        //
        // populate it with data from a server
        wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
            data: {
                $format: 'json',
                $select: 'CategoryID,CategoryName,Description'
            },
            success: (xhr: XMLHttpRequest) => {
                // got the data, assign it to the CollectionView
                let response = JSON.parse(xhr.response);
                let data = response.d ? response.d.results : response.value;
                //
                // use the result as the sourceCollection
                this.view.sourceCollection = data;
            }
        });
    }
}
//
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

