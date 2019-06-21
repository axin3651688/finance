import 'bootstrap.css';
import './styles.css';
import * as pdf from '@grapecity/wijmo.pdf';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    document.querySelector('#btnExport').addEventListener('click', () => {
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
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
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
        doc.footer.drawText('Footer');
        //
        doc.end();
    });
}
