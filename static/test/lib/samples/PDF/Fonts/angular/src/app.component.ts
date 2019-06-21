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
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        doc.drawText('This text uses the default document font, Times 10.');
        //
        doc.drawText('This text uses Times Bold Oblique 20.', null, null, { font: new pdf.PdfFont('times', 20, 'oblique', 'bold') });
        //
        doc.setFont(new pdf.PdfFont('helvetica'));
        doc.drawText('This text uses Helvetica 10.');
        doc.drawText('This text also uses Helvetica 10.');
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