import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
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
    public categories: TReportCategory[];
    public filePath: string;
    //
    constructor() {
        let reports = getReports();
        //
        this.categories = reports.categories;
        // Get the selected report's filePath property.
        this.filePath = reports
            .categories.find(cat => cat.name === reports.selectedReport.categoryName)
            .reports.find(rep => rep.reportName === reports.selectedReport.reportName)
            .filePath;
    }
}
//
@NgModule({
    imports: [WjViewerModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);