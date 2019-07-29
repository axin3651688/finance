import 'bootstrap.css';
import './styles.css';
//
import * as pdf from '@grapecity/wijmo.pdf';
//
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { getData } from './app.data';
//
@Component({
    selector: 'app-component',
    templateUrl: 'src/app.component.html'
})
export class AppComponent {
    export() {
        let doc = new pdf.PdfDocument({
            header: {
                height: 0
            },
            footer: {
                height: 0
            },
            ended: (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        let colWidth = 100,
            rowHeight = 18,
            data = getData(50),
            dataKeyMap = ['id', 'product', 'country'],
            y = 0;
        //
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < dataKeyMap.length; j++) {
                let x = j * colWidth;
                //
                doc.paths
                    .rect(x, y, colWidth, rowHeight)
                    .stroke();
                //
                doc.drawText(data[i][dataKeyMap[j]] + '', x + 2, y + 2, {
                    height: rowHeight,
                    width: colWidth
                });
            }
            //
            y += rowHeight;
            //
            if (y >= doc.height) {
                y = 0;
                doc.addPage();
            }
        }
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