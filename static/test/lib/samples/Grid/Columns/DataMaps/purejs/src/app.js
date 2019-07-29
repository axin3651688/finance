import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import '@grapecity/wijmo.input';
import { FlexGrid, DataMap } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create some random data
    var countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(',');
    var customers = [
        { id: 0, name: 'Paul Perkins', address: '123 Main St' },
        { id: 1, name: 'Susan Smith', address: '456 Grand Ave' },
        { id: 2, name: 'Joan Jett', address: '789 Broad St' },
        { id: 3, name: 'Don Davis', address: '321 Shattuck Ave' },
    ];
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            customer: customers[i % customers.length].id,
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    // create customer data map
    var customerMap = new DataMap(customers, 'id', 'name');
    // show the data in a grid
    var theGrid = new FlexGrid('#theGrid', {
        alternatingRowStep: 0,
        autoGenerateColumns: false,
        columns: [
            { binding: 'customer', header: 'Customer', width: '1.5*', dataMap: customerMap },
            { binding: 'country', header: 'Country', width: '*', dataMap: countries },
            { binding: 'downloads', header: 'Downloads', width: '*', format: 'n0' },
            { binding: 'sales', header: 'Sales', width: '*', format: 'n0' },
            { binding: 'expenses', header: 'Expenses', width: '*', format: 'n0' }
        ],
        itemsSource: data,
    });
    // show customers as well
    var theGridCustomers = new FlexGrid('#theGridCustomers', {
        itemsSource: customers,
        rowEditEnded: function () {
            let column = theGrid.getColumn('customer');
            if (column) {
                column.dataMap = new DataMap(customers, 'id', 'name');
            }
            theGrid.refresh(); // update customer names on the main grid
        }
    });
}
