import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
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
    data: any[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    //
    itemsSourceFunction = (query: string, max: number, callback: Function) => {
        // empty query? no results
        if (!query) {
            callback(null);
            return;
        }
        //
        // find items that start with the user input
        let allItems = this.dataService.getData(),
            queryItems = [],
            rx = new RegExp('^' + query, 'i');
        //
        for (let i = 0; i < allItems.length && queryItems.length < max; i++) {
            if (rx.test(allItems[i].country)) {
                queryItems.push(allItems[i]);
            }
        }
        callback(queryItems);
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

