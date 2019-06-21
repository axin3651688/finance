import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { CollectionView } from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    private view: CollectionView;
    view2: CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new CollectionView(dataService.getData());
        this.view2 = new CollectionView(this.view.items);
    }
    //
    updateFilter(value: string) {
        // update first CollectionView's filter
        this.view.filter = (item: TDataItem) => {
            return value
                ? item.country.toLowerCase().indexOf(value) > -1
                : true;
        }
        //
        // update second collection view's sourceCollection
        this.view2.sourceCollection = this.view.items;
    }
}
//
@NgModule({
    imports: [WjGridModule, WjGridFilterModule, BrowserModule],
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

