import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as viewer from '@grapecity/wijmo.viewer';
//
import { Component, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjViewerModule } from '@grapecity/wijmo.angular2.viewer';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    @ViewChild('pdfViewer') pdfViewer: viewer.PdfViewer;
    //
    get continuousViewMode(): boolean {
        return this.pdfViewer.viewMode === viewer.ViewMode.Continuous;
    }
    set continuousViewMode(value: boolean) {
        this.pdfViewer.viewMode = value ? viewer.ViewMode.Continuous : viewer.ViewMode.Single;
    }
}
//
@NgModule({
    imports: [WjInputModule, WjViewerModule, BrowserModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);