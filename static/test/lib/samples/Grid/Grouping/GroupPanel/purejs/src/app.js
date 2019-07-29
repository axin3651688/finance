import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridGrouppanel from '@grapecity/wijmo.grid.grouppanel';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // generate some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cameras,Stereos'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            downloads: Math.round(100 + Math.random() * 10000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    //
    // create group panel grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: data
    });
    //
    // create the group panel
    var theGroupPanel = new wjGridGrouppanel.GroupPanel('#theGroupPanel', {
        placeholder: 'Drag columns here to create groups',
        grid: theGrid
    });
}
