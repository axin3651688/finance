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
import { DataService } from './app.data';
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
        document.addEventListener('change', e => {
            // remove the old sort
            this.view.sortDescriptions.clear();
            //
            // add the new sorts
            (<HTMLInputElement>e.target).value.split(',').forEach(prop => {
                // Sort country in ascending order, other in descending order
                this.view.sortDescriptions.push(new wijmo.SortDescription(prop, prop === 'country'));
            });
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

