import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, enableProdMode, NgModule, Inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService, TCity, TCountry } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    countries: wijmo.CollectionView;
    cities: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        this.countries = new wijmo.CollectionView(dataService.getCountries(), {
            currentChanged: (sender: wijmo.CollectionView) => {
                this.cities.refresh(); // apply filter to cities collection
            }
        });
        this.cities = new wijmo.CollectionView(dataService.getCities(), {
            filter: (city: any) => {
                return city.country == this.countries.currentItem.id;
            }
        });
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

