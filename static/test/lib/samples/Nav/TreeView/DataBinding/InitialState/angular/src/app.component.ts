import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjNavModule, WjTreeView } from '@grapecity/wijmo.angular2.nav';
import { DataService, TreeItem } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    data: TreeItem[];
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.data = dataService.getData();
    }
    onTreeSelectedLoadedItems(s: WjTreeView) {
        s.selectedItem = this.findItem(s.itemsSource as TreeItem[], 'Solar Panel');
    }
    onTreeCollapsedLoadedItems(s: WjTreeView) {
        s.collapseToLevel(0);
    }
    onTreeExpandedLoadedItems(s: WjTreeView) {
        s.collapseToLevel(10);
    }
    // finds an item in a hierarchical array
    findItem(arr: TreeItem[], text: string): TreeItem | null {
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i].header.indexOf(text) > -1) {
                return arr[i];
            }
            //
            let item = this.findItem(arr[i].items, text);
            if (item) {
                return item;
            }
        }
        return null;
    }
}
//
@NgModule({
    imports: [WjNavModule, BrowserModule],
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