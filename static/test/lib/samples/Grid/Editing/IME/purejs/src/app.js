import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid and enable IME
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        imeEnabled: true,
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: '#', isReadOnly: true, width: 50 },
            { binding: 'en', header: 'English' },
            { binding: 'ja', header: 'Japanese' },
            { binding: 'pop', header: 'Pop (tho)', format: 'n0,' }
        ],
        itemsSource: getData(),
    });
}
