import 'bootstrap.css';
import './styles.css';
import * as pdf from '@grapecity/wijmo.pdf';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    document.querySelector('#btnExport').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
            header: {
                height: 0
            },
            footer: {
                height: 0
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'Document.pdf')
        });
        //
        let colWidth = 100, rowHeight = 18, data = getData(50), dataKeyMap = ['id', 'product', 'country'], y = 0;
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
    });
}
