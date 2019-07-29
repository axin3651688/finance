import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let flexGrid = new grid.FlexGrid('#flexGrid', {
        autoGenerateColumns: false,
        selectionMode: grid.SelectionMode.ListBox,
        headersVisibility: grid.HeadersVisibility.All,
        columns: [
            { header: 'ID', binding: 'id' },
            { header: 'Start Date', binding: 'start', format: 'd' },
            { header: 'End Date', binding: 'end', format: 'd' },
            { header: 'Country', binding: 'country' }
        ],
        itemsSource: getData(10)
    });
    //
    document.querySelector('#btnExport').addEventListener('click', () => {
        let doc = new pdf.PdfDocument({
            header: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]'
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]'
                }
            },
            ended: (sender, args) => pdf.saveBlob(args.blob, 'FlexGrid.pdf')
        });
        //
        let settings = {
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        };
        //
        doc.drawText('This grid is scaled to fit the width of 200 and drawn using the draw method.', null, null, { width: 200 });
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.draw(flexGrid, doc, 200, null, settings);
        //
        doc.drawText('This grid is drawn in its original size using the drawToPosition method.', 220, 0);
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.drawToPosition(flexGrid, doc, new wijmo.Point(220, doc.y), null, null, settings);
        //
        doc.drawText('This grid is drawn in its original size using the draw method and is split into multiple pages.', 0, 400);
        doc.moveDown();
        gridPdf.FlexGridPdfConverter.draw(flexGrid, doc, null, null, settings);
        //
        doc.end();
    });
}
