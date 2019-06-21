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
    categories: TReportCategory[];
    filePath: string;
    reportName: string;
    //
    constructor() {
        let reports = getReports(),
            sr = reports.selectedReport;
        //
        this.categories = reports.categories;
        this.reportInfo = `${sr.categoryName}/${sr.reportName}.flxr*${sr.reportName}`;
    }
    //
    get reportInfo(): string {
        return `${this.filePath}*${this.reportName}`;
    }
    set reportInfo(value: string) {
        let info = value.split('*');
        this.filePath = info[0];
        this.reportName = info[1];
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