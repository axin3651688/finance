import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('multirow') multirow: wjMultirow.MultiRow;
    orders: any;
    layoutDefs: any;
    layoutDescription: string;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        let appData = dataService.getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
    }
    //
    selectedIndexChanged() {
        let layoutDef = this.layoutDefs.currentItem;
        if (layoutDef) {
            this.multirow.layoutDefinition = layoutDef.def;
            this.layoutDescription = layoutDef.description;
        }
    }
    //
    ngAfterViewInit() {
        this.layoutDescription = this.layoutDefs.currentItem.description;
    }
}
//\\
@NgModule({
    imports: [WjGridMultirowModule, WjInputModule, BrowserModule],
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
