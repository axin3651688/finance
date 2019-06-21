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
    // column properties
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        columns: [
            { binding: 'id', header: 'ID', width: 50 },
            { binding: 'country', header: 'Country', },
            { binding: 'product', header: 'Product', },
            { binding: 'sales', header: 'Sales', format: 'c0' },
            { binding: 'expenses', header: 'Expenses', format: 'c0' },
            { binding: 'active', header: 'Active' }
        ],
        itemsSource: getData(),
        //
        // use formatItem to apply flex display to the cells
        // NOTE we could use a CSS rule for this, but we need
        // formatItem to justify horizontally anyway
        formatItem: function (s, e) {
            var style = e.cell.style;
            style.display = 'flex';
            style.alignItems = 'center'; // vertical alignment
            switch (style.textAlign) { // horizontal alighment
                case 'right':
                    style.justifyContent = 'flex-end';
                    break;
                case 'center':
                    style.justifyContent = 'center';
                    break;
                default:
                    style.justifyContent = '';
                    break;
            }
        }
    });
    //
    // make rows taller to show the vertical alignment
    theGrid.rows.defaultSize = 45;
    theGrid.columnHeaders.rows.defaultSize = 65;
    theGrid.allowResizing = wjGrid.AllowResizing.Both;
    theGrid.deferResizing = true;
}
