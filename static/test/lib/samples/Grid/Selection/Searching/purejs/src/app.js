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
    var grid = new wjGrid.FlexGrid('#theGrid', {
        autoSearch: true,
        isReadOnly: true,
        selectionMode: 'ListBox',
        autoGenerateColumns: false,
        columns: [
            { binding: 'name', header: 'Country', width: '2*' },
            { binding: 'pop', header: 'Population (mi)', format: 'n0,,', width: '*' },
            { binding: 'gdp', header: 'GDP (US$mi/yr)', format: 'n0', width: '*' },
            { binding: 'pci', header: 'Income (US$/yr/cap)', format: 'n0', width: '*' },
        ],
        itemsSource: getData()
    });
    //
}
