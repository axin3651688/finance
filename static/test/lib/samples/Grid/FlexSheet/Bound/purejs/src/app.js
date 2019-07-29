import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
import { getData, getCountries, getProducts } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let boundSheet = new wjFlexSheet.FlexSheet('#boundSheet');
    boundSheet.addBoundSheet('Country', getData(50));
    boundSheet.deferUpdate(() => {
        let column = boundSheet.columns.getColumn('countryId');
        if (column && !column.dataMap) {
            column.dataMap = buildDataMap(getCountries());
        }
        column = boundSheet.columns.getColumn('productId');
        if (column && !column.dataMap) {
            column.dataMap = buildDataMap(getProducts());
        }
        column = boundSheet.columns.getColumn('amount');
        if (column) {
            column.format = 'c2';
        }
    });
    // build a data map from a string array using the indices as keys
    function buildDataMap(items) {
        let map = [];
        for (let i = 0; i < items.length; i++) {
            map.push({ key: i, value: items[i] });
        }
        return new wjGrid.DataMap(map, 'key', 'value');
    }
    ;
}
