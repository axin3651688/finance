import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('groupMultirow') groupMultirow: wjMultirow.MultiRow;
    groupedOrders: any;
    threeLines: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        let appData = dataService.getData();
        this.groupedOrders = appData.groupedOrders;
        this.threeLines = appData.ldThreeLines;
    }
    //
    onShowGroupClick(e: MouseEvent) {
        this.groupMultirow.showGroups = (<HTMLInputElement>e.target).checked;
    }
    //
    onCollapseClick() {
        this.groupMultirow.collapseGroupsToLevel(0);
    }
    //
    onExpandClick() {
        this.groupMultirow.collapseGroupsToLevel(10);
    }
}

//\\
@NgModule({
    imports: [WjGridMultirowModule, BrowserModule],
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
