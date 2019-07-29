import 'bootstrap.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
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
    private readonly A = 100; // sample area's size.
    private readonly C1 = new wijmo.Color('#3173c0');
    private readonly C2 = new wijmo.Color('#e69500');
    //
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
        this.sample1(doc);
        this.sample2(doc);
        this.sample3(doc);
        this.sample4(doc);
        this.sample5(doc);
        //
        doc.end();
    }
    //
    private sample1(doc: pdf.PdfDocument) {
        doc.drawText('Draw a series of lines with different styles: ');
        //
        let y = doc.y + doc.lineHeight();
        //
        // default document's pen (black color)
        doc.paths
            .moveTo(0, y)
            .lineTo(this.A, y)
            .stroke();
        //
        // color
        doc.paths
            .moveTo(0, y + 20)
            .lineTo(this.A, y + 20)
            .stroke(this.C1);
        //
        // color, line width = 3
        doc.paths
            .moveTo(0, y + 40)
            .lineTo(this.A, y + 40)
            .stroke(new pdf.PdfPen(this.C1, 3));
        //
        // opacity color, line width = 3
        doc.paths
            .moveTo(0, y + 60)
            .lineTo(this.A, y + 60)
            .stroke(new pdf.PdfPen(wijmo.Color.fromRgba(this.C1.r, this.C1.g, this.C1.b, 0.2), 3));
        //
        // color, dash pattern, line width = 3
        doc.paths
            .moveTo(0, y + 80)
            .lineTo(this.A, y + 80)
            .stroke(new pdf.PdfPen(this.C1, 3, new pdf.PdfDashPattern(5)));
        //
        doc.y = y + this.A + doc.lineHeight();
    }
    //
    private sample2(doc: pdf.PdfDocument) {
        doc.drawText('Draw a rectangle covered with a filled curved path:');
        //
        let y = doc.y + doc.lineHeight();
        //
        doc.paths
            .rect(0, y, this.A, this.A)
            .stroke(this.C1);
        //
        doc.paths
            .moveTo(0, y)
            .bezierCurveTo(this.A / 2, y, this.A / 2, this.A + y, this.A, this.A + y)
            .lineTo(0, this.A + y)
            .lineTo(0, y)
            .fill(this.C2);
        //
        doc.y = y + this.A + doc.lineHeight();
    }
    //
    private sample3(doc: pdf.PdfDocument) {
        doc.drawText('Draw a rectangle, inscribe a circle into it, fill the circle with an opaque color and stroke it using a dashed line:');
        //
        let y = doc.y + doc.lineHeight();
        //
        doc.paths
            .rect(0, y, this.A, this.A)
            .fill(this.C1);
        //
        doc.paths
            .circle(this.A / 2, y + this.A / 2, this.A / 2)
            .fillAndStroke(wijmo.Color.fromRgba(this.C2.r, this.C2.g, this.C2.b, 0.3), new pdf.PdfPen(this.C2, 2, new pdf.PdfDashPattern(5)));
        //
        doc.y = y + this.A + doc.lineHeight();
    }
    //
    private sample4(doc: pdf.PdfDocument) {
        doc.drawText('Draw a simple pattern clipped by a circular clipping path:');
        //
        let y = doc.y + doc.lineHeight(),
            a0 = 10;
        //
        doc.saveState();
        //
        // clipping path
        doc.paths
            .circle(this.A / 2, y + this.A / 2, this.A / 2)
            .clip();
        //
        // draw pattern
        for (let i = 0; i < 10; i++) {
            doc.paths
                .rect(0, y + i * a0, this.A, a0)
                .fill(i % 2 ? this.C1 : this.C2);
        }
        //
        doc.restoreState();
        //
        doc.y = y + this.A + doc.lineHeight();
    }
    //
    private sample5(doc: pdf.PdfDocument) {
        doc.drawText('Draw a series of rectangles and rotate every rectangle by 15 degrees to the previous:');
        //
        let y = doc.y + doc.lineHeight(),
            a = this.A,
            sqrt2 = Math.sqrt(2),
            degrees = 15,
            samples = 90 / degrees;
        //
        doc.saveState();
        //
        for (let i = 0; i < samples; i++) {
            doc
                .rotate(degrees, new wijmo.Point(a / 2, y + a / 2))
                .paths
                // draw rectangle as if it is inscribed into a circle with the radius of a/ 2
                .rect((a - a / sqrt2) / 2, y + ((a - a / sqrt2) / 2), a / sqrt2, a / sqrt2)
                .fill(wijmo.Color.interpolate(this.C1, this.C2, i * (1 / (samples - 1))));
        }
        //
        doc.restoreState();
        //
        doc.y = y + a + doc.lineHeight();
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

