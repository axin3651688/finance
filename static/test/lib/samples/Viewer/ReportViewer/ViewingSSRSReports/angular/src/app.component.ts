import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjViewerModule } from '@grapecity/wijmo.angular2.viewer';
import { getReports, TReportCategory } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    categories: TReportCategory[];
    filePath: string;
    //
    constructor() {
        let reports = getReports();
        //
        this.categories = reports.categories;
        this.filePath = `c1ssrs/${reports.selectedReport.categoryName}/${reports.selectedReport.reportName}`;
    }
}
//
@NgModule({
    imports: [WjViewerModule, BrowserModule, FormsModule, HttpClientModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);