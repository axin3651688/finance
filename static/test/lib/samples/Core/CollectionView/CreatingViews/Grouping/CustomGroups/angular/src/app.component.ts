import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
//
import { Component, Inject, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    showGroups = true;
    view: wijmo.CollectionView;
    //
    constructor(@Inject(DataService) private dataService: DataService) {
        // create GroupDescription to group by initial
        let gdInitial = new wijmo.GroupDescription();
        gdInitial.groupNameFromItem = item => item[0];
        //
        // get grouped CollectionView
        this.view = new wijmo.CollectionView(dataService.getData(), {
            sortDescriptions: [''],
            groupDescriptions: [gdInitial],
            currentItem: null
        });
    }
}
//
@NgModule({
    imports: [WjInputModule, FormsModule, BrowserModule],
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

