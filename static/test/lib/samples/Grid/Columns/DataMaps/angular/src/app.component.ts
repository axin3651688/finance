import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    customerMap: wjcGrid.DataMap;
    countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    customers = [
        { id: 0, name: 'Paul Perkins', address: '123 Main St' }, 
        { id: 1, name: 'Susan Smith', address: '456 Grand Ave' }, 
        { id: 2, name: 'Joan Jett', address: '789 Broad St' }, 
        { id: 3, name: 'Don Davis', address: '321 Shattuck Ave' }, 
    ];

    @ViewChild('mainGrid') mainGrid: wjcGrid.FlexGrid;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
        this.customerMap = new wjcGrid.DataMap(this.customers, 'id', 'name');
    }

    dataMapGridInitialized(flexgrid: wjcGrid.FlexGrid) {
        flexgrid.rowEditEnded.addHandler(() => {
            let column = this.mainGrid.getColumn('customer');
            if (column) {
                column.dataMap = new wjcGrid.DataMap(this.customers, 'id', 'name');
            }
            this.mainGrid.refresh(); // update customer names on the main grid
        });
    }

    private _getData() {
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                customer: this.customers[i % this.customers.length].id,
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
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

