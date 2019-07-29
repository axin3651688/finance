import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjCore from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.input';
import { Component, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import * as wjGrid from '@grapecity/wijmo.grid';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

class DataItem {
    id: number;
    country: string;
    product: string;
    date: Date;
    sales: number;
    expenses: number;
}
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('countriesCombo') countriesCombo: wjInput.ComboBox;
    @ViewChild('theGridMaster') theGridMaster: wjGrid.FlexGrid;
    countries: string[];
    products: string[];
    data: DataItem[];
    detailView: wjCore.CollectionView;
    // DataSvc will be passed by derived classes
    constructor() {
        this.countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        this.products = 'Phones,Cars,Stereos,Watches,Computers'.split(',');
        this.data = this._getData();

    }

    ngAfterViewInit() {
        var self = this;
        self.detailView = new wjCore.CollectionView(this.data, {
            filter: function (item: DataItem) {
                return item.country === self.countriesCombo.text;
            }
        })
    }

    onCountriesSelectedIndexChanged() {
        this.detailView.refresh();
    }

    onSelectionChanged() {
        var item = this.theGridMaster.collectionView.currentItem;
        var bndCtls = document.querySelectorAll('.bnd-ctl');
        for (var i = 0; i < bndCtls.length; i++) {
            var host = bndCtls[i];
            var prop = host.id.substr(3).toLowerCase();
            var ctl = wjCore.Control.getControl(host);
            if (wjCore.isString(item[prop])) {
                ctl['text'] = item[prop];
            } else {
                ctl['value'] = item[prop];
            }
        }
    }

    setProperty(prop: string, val: any) {
        var v = <wjCore.CollectionView>this.theGridMaster.collectionView;
        v.editItem(v.currentItem);
        v.currentItem[prop] = val;
        v.commitEdit();
    }

    private _getData(): DataItem[] {
        var data = [];
        for (var i = 0; i < 50; i++) {
            data.push({
                id: i,
                country: this.countries[i % this.countries.length],
                product: this.products[i % this.products.length],
                date: wjCore.DateTime.addDays(new Date(), i),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
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

