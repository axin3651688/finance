import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';
import { CustomGridEditor } from './app.customEditor';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];
    products = [
        { id: 0, name: 'Widget', unitPrice: 23.43 },
        { id: 1, name: 'Gadget', unitPrice: 12.33 }, 
        { id: 2, name: 'Doohickey', unitPrice: 53.07 }
    ];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // add custom editors to the grid
        new CustomGridEditor(flex, 'date', wjcInput.InputDate, {
            format: 'd'
        });
        new CustomGridEditor(flex, 'time', wjcInput.InputTime, {
            format: 't',
            min: new Date(2000, 1, 1, 7, 0),
            max: new Date(2000, 1, 1, 22, 0),
            step: 30
        });
        new CustomGridEditor(flex, 'country', wjcInput.ComboBox, {
            itemsSource: this.countries
        });
        new CustomGridEditor(flex, 'amount', wjcInput.InputNumber, {
            format: 'n2',
            step: 10
        });
        // create an editor based on a ComboBox
        let multiColumnEditor = new CustomGridEditor(flex, 'product', wjcInput.ComboBox, {
            headerPath: 'name',
            displayMemberPath: 'name',
            itemsSource: this.products
        });
        // customize the ComboBox to show multiple columns
        let combo = <wjcInput.ComboBox>multiColumnEditor.control;
        combo.listBox.formatItem.addHandler((s: wjcInput.ListBox, e: wjcInput.FormatItemEventArgs) => {
            e.item.innerHTML = '<table><tr>' +
            '<td style="width:30px;text-align:right;padding-right:6px">' + e.data.id + '</td>' +
            '<td style="width:100px;padding-right:6px"><b>' + e.data.name + '</b></td>' +
            '<td style="width:80px;text-align:right;padding-right:6px">' +
            wjcCore.Globalize.format(e.data.unitPrice, 'c') +
            '</td>' +
            '</tr></table>';
        });
    }

    private _getData() {
        // create some random data
        let data = [];
        let dt = new Date();
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                date: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                time: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                country: this.countries[Math.floor(Math.random() * this.countries.length)],
                product: this.products[Math.floor(Math.random() * this.products.length)].name,
                amount: Math.random() * 10000 - 5000,
                discount: Math.random() / 4
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

