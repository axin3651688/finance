import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';

@Component({
  selector: 'app-component',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any[];

    // DataSvc will be passed by derived classes
    constructor() {
        this.data = this._getData();
    }

    @ViewChild('popup') popup: wjcInput.Popup;

    initializeGrid(flex: wjcGrid.FlexGrid) {
        flex.hostElement.addEventListener('keydown', (e: KeyboardEvent) => {
            let view = <wjcCore.CollectionView>flex.collectionView;
            // looking for ctrl+Delete
            if (e.ctrlKey && e.keyCode == wjcCore.Key.Delete && view.currentItem) {
                // prevent the grid from getting the key
                e.preventDefault();
                // confirm row deletion
                this.popup.show(true, (sender: wjcInput.Popup) => {
                    // delete the row
                    if (sender.dialogResult == 'wj-hide-ok') {
                        view.remove(view.currentItem);
                    }
                    // return focus to the grid
                    flex.focus();
                });
            }
        }, true);
    }

    private _getData() {
        // create some random data
        let countries = 'US,Canada,Mexico,Germany,UK,France,Italy,Greece,Holland,Japan,Korea,China'.split(','),
            data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                active: i % 3 == 0
            });
        }

        return data;
    }
}

@NgModule({
  imports: [WjGridModule, WjInputModule, BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

