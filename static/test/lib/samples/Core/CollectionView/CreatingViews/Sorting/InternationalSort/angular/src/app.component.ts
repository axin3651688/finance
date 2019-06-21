import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    array: string[];
    view: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.array = dataService.getData();
        this.view = new wijmo.CollectionView(dataService.getData());
        //
        this.sort(true);
    }
    //
    sort(ascending: boolean) {
        // sort JavaScript array
        this.array.sort();
        if (!ascending) {
            this.array.reverse();
        }
        //
        // sort CollectionView
        this.view.sortDescriptions.clear();
        this.view.sortDescriptions.push(new wijmo.SortDescription(null, ascending));
    }
 }
//
@NgModule({
    imports: [BrowserModule],
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

