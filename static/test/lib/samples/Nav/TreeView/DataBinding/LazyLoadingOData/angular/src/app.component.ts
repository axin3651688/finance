import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjData from '@grapecity/wijmo.odata';
import * as wjNav from '@grapecity/wijmo.nav';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  private _nwindService: string = 'https://services.odata.org/Northwind/Northwind.svc';
  items: any[] = [];
  lazyLoadODataItems: any[] = [];
  lazyLoadODataFunction: Function;
  //
  constructor() {
    var employees: wjData.ODataCollectionView;
    employees = new wjData.ODataCollectionView(this._nwindService, 'Employees', {
      fields: 'EmployeeID,FirstName,LastName'.split(','),
      loaded: () => {
        var items = employees.items.map((e) => {
          e.FullName = e.FirstName + ' ' + e.LastName;
          e.Orders = []; // lazy-load orders
          return e;
        });
        this.lazyLoadODataItems = items;
      }
    });

    // lazy loading function
    this.lazyLoadODataFunction = this._lazyLoadODataFunction.bind(this);
  }

  private _lazyLoadODataFunction(node: wjNav.TreeNode, callback: Function) {
    switch (node.level) {

      // load orders for an employee
      case 0:
        var url = 'Employees(' + node.dataItem.EmployeeID + ')/Orders';
        var orders = new wjData.ODataCollectionView(this._nwindService, url, {
          fields: 'OrderID,ShipName,ShipCountry'.split(','),
          loaded: () => {
            var items = orders.items.map(function (e) {
              e.Order_Details = []; // lazy-order details
              return e;
            });
            callback(items);
          }
        });
        break;

      // load extended details for an order
      case 1:
        var url = "Order_Details_Extendeds/?$filter=OrderID eq " + node.dataItem.OrderID;
        var details = new wjData.ODataCollectionView(this._nwindService, url, {
          fields: 'ProductName,ExtendedPrice'.split(','),
          loaded: () => {
            var items = details.items.map((e) => {
              e.Summary = wjCore.format('{ProductName}: {ExtendedPrice:c}', e);
              return e;
            });
            callback(items);
          }
        });
        break;

      // default
      default:
        callback(null);
    }
  }
}
//
@NgModule({
  imports: [WjNavModule, BrowserModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

