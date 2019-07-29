import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjGrid from '@grapecity/wijmo.grid';
import { Component, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('familyGrid') familyGrid: wjGrid.FlexGrid;
    family: any;
    workers: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        this.family = dataService.getFamilies();
        this.workers = dataService.getWorkers();
    }
    //
    ngAfterViewInit() {
        this.familyGrid.columns[0].with = "*";
    }
    //
    onAsTreeClick(e:MouseEvent) {
        this.familyGrid.childItemsPath = (<HTMLInputElement>e.target).checked ? 'children' : '';
    }
}
//\\
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
