declare function postMessage(message: any, transfer?: Transferable[]): void;
//
import * as pdf from '@grapecity/wijmo.pdf';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
//
addEventListener('message', (e) => {
    let json = e.data.grid,
        settings = JSON.parse(e.data.settings);
    //
    settings.documentOptions = settings.documentOptions || {};
    //
    settings.documentOptions.ended = (sender: pdf.PdfDocument, args: pdf.PdfDocumentEndedEventArgs) => {
        postProgress(1); // 100%
        //
        // Convert Blob to a transferable object...
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            let buffer = (<any>e.target).result;
            // ...and send it to client.
            postMessage({ data: buffer }, [buffer]);
        };
        fileReader.readAsArrayBuffer(args.blob);
    };
    //
    settings.progress = (value: number) => {
        postProgress(value * 0.9); // 0% to 90%
    };
    //
    let doc = new pdf.PdfDocument(settings.documentOptions),
        grid = gridPdf.PdfWebWorker.deserializeGrid(json, settings);
    //
    gridPdf.FlexGridPdfConverter.draw(grid, doc, null, null, settings);
    //
    doc.end();
});
//
function postProgress(value: number) {
    postMessage({ type: 'progress', value: value });
}