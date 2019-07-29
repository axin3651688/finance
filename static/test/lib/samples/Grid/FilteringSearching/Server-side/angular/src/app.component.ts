import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjcOData from '@grapecity/wijmo.odata';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjcOData.ODataCollectionView;

    constructor() {
        let svcUrl = 'https://services.odata.org/Northwind/Northwind.svc';
        this.data = new wjcOData.ODataCollectionView(svcUrl, 'Customers', {
            filterOnServer: true,
            sortOnServer: true
        });
    }

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    ngAfterViewInit() {
        this.filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
    }
}

@NgModule({
  imports: [WjGridModule, WjGridFilterModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

