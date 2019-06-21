import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcOData from '@grapecity/wijmo.odata';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcGridDetail from '@grapecity/wijmo.grid.detail';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridDetailModule } from '@grapecity/wijmo.angular2.grid.detail';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    categories: wjcOData.ODataCollectionView;
    private _products: wjcOData.ODataCollectionView;

    // DataSvc will be passed by derived classes
    constructor() {
        // get OData categories and products
        let url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.categories = new wjcOData.ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description']
        })
        this._products = new wjcOData.ODataCollectionView(url, 'Products');
    }

    @ViewChild('htmlDetail') htmlDetail: wjcGrid.FlexGrid;
    @ViewChild('gridDetail') gridDetail: wjcGrid.FlexGrid;

    ngOnInit() {
        // html detail provider
	    new wjcGridDetail.FlexGridDetailProvider(this.htmlDetail, {

            // use animation when showing details
            isAnimated: true,

            // create detail cells for a given row
            createDetailCell: (row: wjcGrid.Row) => {
            
                // build detail content for the current category
                let cat = row.dataItem,
                    prods = this._getProducts(cat.CategoryID),
                    html = 'ID: <b>' + cat.CategoryID + '</b><br/>';
                html += 'Name: <b>' + cat.CategoryName + '</b><br/>';
                html += 'Description: <b>' + cat.Description + '</b><br/>';
                html += 'Products: <b>' + prods.length + ' items</b><br/>';
                html += '<ol>';
                prods.forEach((product: any) => {
                    html += '<li>' + product.ProductName + '</li>';
                });
                html += '</ol>';
            
                // create and return detail cell
                let cell = document.createElement('div');
                cell.innerHTML = html;
                return cell;
            }
        });

        // grid detail provider
	    new wjcGridDetail.FlexGridDetailProvider(this.gridDetail, {

            // use animation when showing details
            isAnimated: true,

            // limit height of detail rows
            maxHeight: 150,

            // create detail cells for a given row
            createDetailCell: (row: wjcGrid.Row) => {
                let cell = document.createElement('div')
                new wjcGrid.FlexGrid(cell, {
                    headersVisibility: wjcGrid.HeadersVisibility.Column,
                    isReadOnly: true,
                    autoGenerateColumns: false,
                    itemsSource: this._getProducts(row.dataItem.CategoryID),
                    columns: [
                        { header: 'ID', binding: 'ProductID' },
                        { header: 'Name', binding: 'ProductName' },
                        { header: 'Qty/Unit', binding: 'QuantityPerUnit' },
                        { header: 'Unit Price', binding: 'UnitPrice' },
                        { header: 'Discontinued', binding: 'Discontinued' }
                    ]
                });
                return cell;
            }
        });
    }

    private _getProducts(categoryID: string): any[] {
        let arr: any[] = [];
        this._products.items.forEach(function(product) {
            if (product.CategoryID == categoryID) {
                arr.push(product);
            }
        });
        return arr;
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

