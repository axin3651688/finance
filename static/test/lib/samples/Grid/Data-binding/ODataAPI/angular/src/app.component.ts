import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    customers: ODataCollectionView;
    itemCount: string;

    // DataSvc will be passed by derived classes
    constructor() {
        let url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.customers = new ODataCollectionView(url, 'Customers', {
            sortOnServer: true,
            filterOnServer: true
        });
    }

    flexInitialized(flexgrid: wjcGrid.FlexGrid) {
        flexgrid.loadedRows.addHandler(()=> {
            this.itemCount = flexgrid.rows.length + ' items';
        });
    }
}
//
@NgModule({
  imports: [WjGridModule, WjGridFilterModule,BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

