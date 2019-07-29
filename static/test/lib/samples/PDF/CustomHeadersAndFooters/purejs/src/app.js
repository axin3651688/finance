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
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        doc.drawText('Lorem ipsum');
        //
        doc.addPage();
        doc.drawText('Lorem ipsum');
        //
        doc.end();
    });
}
