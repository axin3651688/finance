import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
//
@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.itemsSourceChanged.addHandler(() => {
            flex.collectionView.canSort = false; // prevent sorting
        });
        flex.sortedColumn.addHandler(() => {
            flex.collectionView.canSort = false; // prevent sorting
            flex.collectionView.sourceCollection = flex.collectionView.items; // copy sorted values
        });
        flex.hostElement.addEventListener('mousedown', function(e) {
            if (flex.hitTest(e).panel == flex.columnHeaders) {
                flex.collectionView.canSort = true;
            }
        }, true);
    }

    private _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
//
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

