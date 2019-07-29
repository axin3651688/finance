import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: wjcCore.CollectionView;
    hideColsGridData: wjcCore.CollectionView;
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];
    products = ['Phones', 'Computers', 'Cameras', 'Stereos'];

    // DataSvc will be passed by derived classes
    constructor() {
        let dataSource = this._getData();
        this.data = new wjcCore.CollectionView(dataSource, {
            sortDescriptions: [ 'country', 'product' ],
    	    groupDescriptions: [ 'country', 'product' ]
        });
        this.hideColsGridData = new wjcCore.CollectionView(dataSource, {
            sortDescriptions: [ 'country', 'product' ],
    	    groupDescriptions: [ 'country', 'product' ]
        });
    }

    initializeGrid(grid: wjcGrid.FlexGrid) {
        grid.select(new wjcGrid.CellRange(0,0), true);
    }

    initializeHideColsGrid(hideColsGrid: wjcGrid.FlexGrid) {
        setTimeout(() => {
            hideColsGrid.select(new wjcGrid.CellRange(0,2), true);
        });
    }

    private _getData() {
        // generate some random data
        let data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: this.countries[i % this.countries.length],
                product: this.products[i % this.products.length],
                downloads: Math.round(100 + Math.random() * 10000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }

        return data;
    }
}

@NgModule({
  imports: [WjGridModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

