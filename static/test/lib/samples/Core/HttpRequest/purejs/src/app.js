import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // make the request
    wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Categories', {
        data: {
            '$format': 'json',
            '$select': 'CategoryID,CategoryName,Description'
        },
        success: (xhr) => {
            // show results in a grid
            let flexGrid = new grid.FlexGrid('#theGrid', {
                isReadOnly: true,
                itemsSource: JSON.parse(xhr.responseText).value,
                columns: [
                    { binding: 'CategoryID' },
                    { binding: 'CategoryName' },
                    { binding: 'Description', width: '*' } // make last column fill the grid
                ]
            });
        }
    });
}
