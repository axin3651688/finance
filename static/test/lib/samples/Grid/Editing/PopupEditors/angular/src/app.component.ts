import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];
    countries = ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'];
    editingItem: any;

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    @ViewChild('popup') popup: wjcInput.Popup;
    @ViewChild('cboCountry') cboCountry: wjcInput.ComboBox;
    @ViewChild('numberSales') numberSales: wjcInput.InputNumber;
    @ViewChild('numberExpenses') numberExpenses: wjcInput.InputNumber;

    initializeGrid(flex: wjcGrid.FlexGrid) {
        // add 'edit button' to row header cells
        flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
            if (e.panel == s.rowHeaders && e.col == 0) {
                e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
            }
        });

        // handle button clicks
        flex.addEventListener(flex.hostElement, 'click', (e: MouseEvent) => {
            let ht = flex.hitTest(e);
            if (ht.panel == flex.rowHeaders) {
                // prepare form
                this.editingItem = flex.rows[ht.row].dataItem;
                this.cboCountry.selectedItem = this.editingItem.country;
                this.numberSales.value = this.editingItem.sales;
                this.numberExpenses.value = this.editingItem.expenses;
                // show the form
                this.popup.show(true, (s: wjcInput.Popup) => {
                    if (s.dialogResult == 'wj-hide-ok') {
                        // commit changes if the user pressed the OK button
                        (<wjcCore.CollectionView>flex.collectionView).editItem(this.editingItem);
                        this.editingItem.country = this.cboCountry.selectedValue;
                        this.editingItem.sales = this.numberSales.value;
                        this.editingItem.expenses = this.numberExpenses.value;
                        (<wjcCore.CollectionView>flex.collectionView).commitEdit();
                    }
                    // return focus to the grid
                    flex.focus();
                });
            }
        });
    }

    private _getData() {
        // create some random data
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }

        return data;
    }
}

@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

