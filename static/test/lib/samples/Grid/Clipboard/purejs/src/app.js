import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    //
    // default clipboard behavior
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        itemsSource: data,
    });
    //
    // custom clipboard behavior
    var theCustomGrid = new wjGrid.FlexGrid('#theCustomGrid', {
        alternatingRowStep: 0,
        itemsSource: data,
        copying: function (s, e) {
            var text = s.getClipString();
            var sel = s.selection;
            var hdr = '';
            for (var c = sel.leftCol; c <= sel.rightCol; c++) {
                if (hdr)
                    hdr += '\t';
                hdr += s.columns[c].header;
            }
            text = hdr + '\r\n' + text;
            //
            // put text with headers on the clipboard
            wjCore.Clipboard.copy(text);
            //
            // prevent the grid from overwriting our clipboard content
            e.cancel = true;
        },
        pasting: function (s, e) {
            e.cancel = true; // prevent pasting data with headers
        }
    });
}
