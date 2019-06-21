import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('theAutoComplete') theAutoComplete: input.AutoComplete;
    view: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new wijmo.CollectionView(dataService.getData(), {
            filter: this._filterFunction
        });
    }
    //
    private _filter = true;
    get filter() {
        return this._filter;
    }
    set filter(value: boolean) {
        if (this._filter !== value) {
            this.view.filter = value ? this._filterFunction : null;
            this.theAutoComplete.itemsSource = this.view.items;
            this._filter = value;
        }
    }
    //
    private _filterFunction(item: TDataItem) {
        return item.popk > 50000;
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

