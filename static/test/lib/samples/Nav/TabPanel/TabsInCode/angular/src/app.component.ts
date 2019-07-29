import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import wjOdata from '@grapecity/wijmo.odata';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
  tabsInfo: any[];
  //
  constructor() {
    this._initTabsInfo();
  }
  private _initTabsInfo() {
    let headers = 'Employees,Categories,Products,Customers'.split(','),
      url = 'https://services.odata.org/Northwind/Northwind.svc/';
    this.tabsInfo = [];
    headers.forEach((header) => {
      this.tabsInfo.push({
        header: header,
        data: new wjOdata.ODataCollectionView(url, header),
      });
    })
  }
}
//
@NgModule({
  imports: [WjNavModule, WjGridModule, BrowserModule],
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

