import * as xmldom from 'xmldom';
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
(<any>self).DOMParser = xmldom.DOMParser;
//
gridPdf.PdfWebWorker.initExport((doc: pdf.PdfDocument, clientData: gridPdf.IClientData) => {
    gridPdf.PdfWebWorker.sendExportProgress(0);
    //
    doc.drawText(clientData['title'].content);
    doc.drawImage(clientData['flag'].content);
    doc.drawSvg(clientData['chart'].content);
    //
    // Suppose that text and images rendering takes 5% of the time.
    gridPdf.PdfWebWorker.sendExportProgress(0.05);
    //
    let gridData = clientData['grid'];
    gridData.settings.progress = (value: number) => {
        // Change progress from 6% to 90%. Left the final 10% for the document finalization, which will start after the doc.end() method is called.
        gridPdf.PdfWebWorker.sendExportProgress(map(value, 0, 1, 0.06, 0.9));
    };
    //
    doc.ended.addHandler(() => {
        // Document has been created, set progress to 100%.
        gridPdf.PdfWebWorker.sendExportProgress(1);
    });
    //
    gridPdf.FlexGridPdfConverter.draw(gridData.content, doc, null, null, gridData.settings);
    //
    doc.end();
});
//
function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    let k = (outMax - outMin) / (inMax - inMin);
    return (value - inMin) * k + outMin;
}