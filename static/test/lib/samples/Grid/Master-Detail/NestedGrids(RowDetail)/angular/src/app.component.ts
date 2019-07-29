import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridDetail from '@grapecity/wijmo.grid.detail';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridDetailModule } from '@grapecity/wijmo.angular2.grid.detail';
//

const url = 'https://services.odata.org/Northwind/Northwind.svc';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    categories: wjOdata.ODataCollectionView;
    products: wjOdata.ODataCollectionView;

    // DataSvc will be passed by derived classes
    constructor() {
        this.categories = this._getCategories();
        this.products = this._getProducts();
    }

    getProducts(categoryID: string) {
        var arr: any[] = [];
        this.products.items.forEach(function (product) {
            if (product.CategoryID == categoryID) {
                arr.push(product);
            }
        });
        return arr;
    }

    private _getCategories() {
        return new wjOdata.ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description']
        });
    }

    private _getProducts() {
        return new wjOdata.ODataCollectionView(url, 'Products');
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGridDetailModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

