import 'bootstrap.css';
import './styles.css';
import * as pdf from '@grapecity/wijmo.pdf';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    document.querySelector('#btnExport').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
            header: {
                height: 0 // no header 
            },
            footer: {
                height: 0 // no footer
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        let image = 'resources/wijmo1.png';
        //
        doc.drawText('This image is rendered in its original size:');
        doc.drawImage(image);
        doc.moveDown();
        //
        doc.drawText('This image is scaled to fit the width of 100:');
        doc.drawImage(image, null, null, { width: 100 });
        doc.moveDown();
        //
        doc.drawText('This image is scaled to fit the height of 25:');
        doc.drawImage(image, null, null, { height: 25 });
        doc.moveDown();
        //
        doc.drawText('This image is stretched to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25
        });
        doc.moveDown();
        //
        doc.drawText('This image is centered and stretched proportionally to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25,
            stretchProportionally: true,
            align: pdf.PdfImageHorizontalAlign.Center
        });
        //
        doc.end();
    });
}
