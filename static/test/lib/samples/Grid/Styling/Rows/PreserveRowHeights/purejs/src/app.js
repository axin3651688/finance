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
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(),
        allowResizing: 'Both'
    });
    //
    // preserve row heights when refreshing the data
    var heightMap = null;
    theGrid.loadingRows.addHandler(function (s, e) {
        heightMap = new Map();
        theGrid.rows.forEach(function (row) {
            heightMap.set(row.dataItem, row.height);
        });
        console.log('saved');
    });
    theGrid.loadedRows.addHandler(function (s, e) {
        theGrid.rows.forEach(function (row) {
            var height = heightMap.get(row.dataItem);
            if (height != null) {
                row.height = height;
            }
        });
        console.log('restored');
    });
    //
    // force a data reload
    document.getElementById('reload').addEventListener('click', function () {
        theGrid.collectionView.refresh();
    });
}
