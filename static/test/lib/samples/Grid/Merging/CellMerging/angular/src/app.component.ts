import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

class DataItem {
    id: number;
    country: string;
    active: boolean;
    downloads: number;
    sales: number;
    expenses: number;
}
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {

    data: wjCore.CollectionView;
    // DataSvc will be passed by derived classes
    constructor() {
        this.data = new wjCore.CollectionView(this._getData(), {
            sortDescriptions: ['country', 'active']
        });
    }

    private _getData(): DataItem[] {
        var countries = 'US,Germany,UK,Japan'.split(',');
        var data = [];
        for (var i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });

        }
        return data;
    }

}
//\\
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
