import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    theList: any[];
    //
    constructor() {
        // list that contains the items in the Combo (start with 10 items)
        this.theList = this._loadItems([], 10);
    }
    //
    initialized(combo: input.ComboBox) {
        combo.dropDown.addEventListener('scroll', e => {
            // stop adding items when the list reaches 2,000 items
            if (this.theList.length < 2000) {
                let list = <Element>e.target;
                //
                // if the user scrolled near the bottom of the list
                if (list.scrollTop + list.clientHeight + 100 > list.scrollHeight) {
                    // save scroll top, add items, refresh list, restore scroll top
                    let top = list.scrollTop;
                    this._loadItems(this.theList, 5);
                    combo.collectionView.refresh();
                    list.scrollTop = top;
                }
            }
        });
    }
    //
    private _loadItems(arr: any[], cnt: number) {
        for (let i = 0; i < cnt; i++) {
            arr.push('item ' + (arr.length + 1));
        }
        return arr;
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

