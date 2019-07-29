import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new wijmo.CollectionView(dataService.getData());
        //
        // change the filter
        document.addEventListener('change', e => {
            let filterType = (<HTMLInputElement>e.target).value;
            //
            this.view.filter = (item: TDataItem) => {
                switch (filterType) {
                    case 'country':
                        return item.country == 'US';
                    case 'sales':
                        return item.sales > 9000;
                    case 'downloads':
                        return item.downloads > 19000;
                    default:
                        return true;
                }
            }
        });
    }
}
//
@NgModule({
    imports: [WjGridModule, BrowserModule],
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

