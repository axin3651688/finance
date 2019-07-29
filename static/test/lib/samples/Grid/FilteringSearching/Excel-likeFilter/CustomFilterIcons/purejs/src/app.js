import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create two grids with filters
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(),
    });
    new wjGridFilter.FlexGridFilter(theGrid);
    var theOtherGrid = new wjGrid.FlexGrid('#theOtherGrid', {
        itemsSource: getData(),
    });
    new wjGridFilter.FlexGridFilter(theOtherGrid);
}
