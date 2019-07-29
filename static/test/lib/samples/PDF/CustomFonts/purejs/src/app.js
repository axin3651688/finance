import 'bootstrap.css';
import './styles.css';
import * as pdf from '@grapecity/wijmo.pdf';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    document.querySelector('#btnExport').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
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
    });
}
