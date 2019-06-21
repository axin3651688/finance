import 'bootstrap.css';
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
            header: {
                declarative: {
                    text: '\tTitle\t&[Page]',
                    font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]',
                    brush: '#3173c0',
                    font: new pdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Lorem ipsum');
        //
        doc.addPage();
        doc.drawText('Lorem ipsum');
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