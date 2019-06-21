import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // default grid
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: getView()
    });
    //
    // create some random data
    function getView() {
        let data = getData();
        //
        // sort data by country
        data.sort((a, b) => {
            return a.country < b.country ? -1 :
                a.country > b.country ? +1 :
                    a.id - b.id;
        });
        //
        // create a CollectionView with a stable sort
        return new wijmo.CollectionView(data, { useStableSort: true });
    }
}
