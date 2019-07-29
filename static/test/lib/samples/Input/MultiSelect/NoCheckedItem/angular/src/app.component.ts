import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: any;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        // create a data source with items and an extra checkable member
        this.data = dataService.getData().map(item => ({ item: item, checked: false }));
    }
    //
    getCheckedItems(ctrl: input.MultiSelect): string {
        let items = ctrl.checkedItems.map(checkableItem => checkableItem.item);
        return JSON.stringify(items);
    }
}
//
@NgModule({
    imports: [WjInputModule, BrowserModule],
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

