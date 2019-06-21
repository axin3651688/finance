import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
//
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create some random data
    let data = getData();
    //
    // show the data in a grid
    let hasHeaders = false;
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: data,
        copying: (sender, args) => {
            hasHeaders = false;
            let includeHeaders = document.getElementById('includeHeaders').checked;
            if (includeHeaders) {
                let text = sender.getClipString(), sel = sender.selection, hdr = '';
                //
                for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                    if (hdr)
                        hdr += '\t';
                    hdr += sender.columns[c].header;
                }
                text = hdr + '\r\n' + text;
                //
                // put text with headers on the clipboard
                wijmo.Clipboard.copy(text);
                hasHeaders = true;
                //
                // prevent the grid from overwriting our clipboard content
                args.cancel = true;
            }
        },
        pasting: (sender, args) => {
            if (hasHeaders) {
                args.cancel = true;
            }
        }
    });
}
