import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { ODataCollectionView } from '@grapecity/wijmo.odata';
import { FlexGrid } from '@grapecity/wijmo.grid';
import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // get customer list from Northwind OData service
    var url = 'https://services.odata.org/Northwind/Northwind.svc';
    var customers = new ODataCollectionView(url, 'Customers', {
        sortOnServer: true,
        filterOnServer: true
    });
    // show the data on a grid
    var itemCountElement = document.getElementById('itemCount');
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: customers,
        isReadOnly: true,
        loadedRows: function () {
            itemCountElement.innerHTML = theGrid.rows.length + ' items';
        }
    });
    // add a filter to the grid
    var f = new FlexGridFilter(theGrid);
}
