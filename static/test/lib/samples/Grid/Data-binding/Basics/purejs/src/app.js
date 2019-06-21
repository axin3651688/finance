import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import { SortDescription, format } from '@grapecity/wijmo';
import { FlexGrid } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var data = [];
    for (var i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    // bind a grid to the raw data
    var theGrid = new FlexGrid('#theGrid', {
        allowSorting: false,
        showSort: false,
        autoGenerateColumns: false,
        columns: [
            { binding: 'country', header: 'Country', width: '2*' },
            { binding: 'sales', header: 'Sales', width: '*', format: 'n2' },
            { binding: 'expenses', header: 'Expenses', width: '*', format: 'n2' }
        ],
        itemsSource: data
    });
    // show the current item
    var selItemElement = document.getElementById('selectedItem');
    function updateCurrentInfo() {
        selItemElement.innerHTML = format('Country: <b>{country}</b>, Sales: <b>{sales:c0}</b> Expenses: <b>{expenses:c0}</b>', theGrid.collectionView.currentItem);
    }
    // update current item now and when the grid selection changes
    updateCurrentInfo();
    theGrid.collectionView.currentChanged.addHandler(updateCurrentInfo);
    // sort the data by country
    var sd = new SortDescription('country', true);
    theGrid.collectionView.sortDescriptions.push(sd);
}
