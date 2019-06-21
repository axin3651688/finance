import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjInput from '@grapecity/wijmo.input';
import * as wjMultirow from '@grapecity/wijmo.grid.multirow';
import { Component, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { DataService } from './app.data';

//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('chMultirow') chMultirow: wjMultirow.MultiRow;
    @ViewChild('cbCollapsedHeaders') cbCollapsedHeaders: wjInput.ComboBox;
    orders: any;
    threeLines: any;
    cbCollapsedHeadersSource: any;
    // DataSvc will be passed by derived classes
    constructor(@Inject(DataService) private dataService: DataService) {
        let appData = dataService.getData();
        this.orders = appData.orders;
        this.threeLines = appData.ldThreeLines;
        this.cbCollapsedHeadersSource = [
            { name: 'true', value: true },
            { name: 'false', value: false },
            { name: 'null', value: null }
        ];
    }
    //
    collapsedHeadersChanged() {
        this.cbCollapsedHeaders.selectedValue = this.chMultirow.collapsedHeaders;
    }
    //
    selectedIndexChanged() {
        this.chMultirow.collapsedHeaders = this.cbCollapsedHeaders.selectedValue;
    }
    //
    onShowHeaderCollapseButton(e: MouseEvent) {
        this.chMultirow.showHeaderCollapseButton = (<HTMLInputElement>e.target).checked;
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
