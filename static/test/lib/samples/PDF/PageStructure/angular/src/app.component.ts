import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as pdf from '@grapecity/wijmo.pdf';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    export() {
        let doc = new pdf.PdfDocument({
            pageSettings: {
                layout: pdf.PdfPageOrientation.Portrait,
                size: pdf.PdfPageSize.Letter,
                margins: {
                    left: 72,
                    top: 72,
                    right: 72,
                    bottom: 72
                }
            },
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        // stroke areas
        doc.header.paths
            .rect(0, 0, doc.header.width, doc.header.height)
            .stroke();
        //
        doc.paths
            .rect(0, 0, doc.width, doc.height)
            .stroke();
        //
        doc.footer.paths
            .rect(0, 0, doc.footer.width, doc.footer.height)
            .stroke();
        //
        // write descriptions
        doc.header.drawText('Header');
        doc.drawText('Body');
        doc.footer.drawText('Footer')
        //
        doc.end();
    }
}
//
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
//
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);