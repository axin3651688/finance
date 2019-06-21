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
        let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia.';
        let doc = new pdf.PdfDocument({
            header: {
                height: 0 // no header 
            },
            footer: {
                height: 0 // no footer
            },
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        let bold = new pdf.PdfFont();
        bold.weight = 'bold';
        //
        doc.drawText('This text is aligned to left (default):', null, null, { font: bold });
        doc.drawText(lorem);
        doc.moveDown();
        //
        doc.drawText('This text is aligned to right:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: pdf.PdfTextHorizontalAlign.Right });
        doc.moveDown();
        //
        doc.drawText('This text is centered:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: pdf.PdfTextHorizontalAlign.Center });
        doc.moveDown();
        //
        doc.drawText('This text is justified:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: pdf.PdfTextHorizontalAlign.Justify });
        doc.moveDown();
        //
        doc.drawText('This text is wrapped and clipped by a rectangle of dimensions 100x100:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { width: 100, height: 100 });
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