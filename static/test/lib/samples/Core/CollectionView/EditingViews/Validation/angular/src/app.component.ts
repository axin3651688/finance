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
import { DataService, countries, TDataItem } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    view: wijmo.CollectionView;
    theItem: TDataItem = <any>{};
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.view = new wijmo.CollectionView(dataService.getData(), {
            sortDescriptions: ['country'],
            getError: (item: TDataItem, propName: string) => {
                switch (propName) {
                    case 'country':
                        return countries.indexOf(item.country) < 0 ? 'Invalid Country' : '';
                    case 'downloads':
                    case 'sales':
                    case 'expenses':
                        return item[propName] < 0 ? 'Negative values not allowed!' : '';
                    case 'active':
                        return item.active && item.country.match(/^(US|UK)$/)
                            ? 'Active items not allowed in the US or UK!'
                            : '';
                }
                //
                return null;
            }
        });
    }
    //
    validateForm(input: HTMLInputElement) {
        let propName = input.id;
        //
        this.theItem[propName] = input.value;
        input.setCustomValidity(this.view.getError(this.theItem, propName));
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