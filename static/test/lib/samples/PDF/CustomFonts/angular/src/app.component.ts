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
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.registerFont({
            source: 'resources/fira/FiraSans-Regular.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'normal',
            sansSerif: true
        });
        //
        doc.registerFont({
            source: 'resources/fira/FiraSans-Bold.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'bold',
            sansSerif: true
        });
        //
        doc.drawText('Here is the standard Times font.');
        //
        let font = new pdf.PdfFont('fira');
        doc.drawText('Here is the FiraSans-Regular font.', null, null, { font: font });
        //
        font.weight = 'bold';
        doc.drawText('Here is the FiraSans-Bold font.', null, null, { font: font });
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