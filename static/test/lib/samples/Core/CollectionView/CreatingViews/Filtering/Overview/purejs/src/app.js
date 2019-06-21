import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData());
    //
    // show filtered item count
    view.collectionChanged.addHandler(() => {
        let cnt = document.getElementById('cnt');
        cnt.textContent = wijmo.format('{length:n0}', view.items);
    });
    //
    // initialize item count display
    view.onCollectionChanged();
    //
    // show the data in a grid
    let flex = new grid.FlexGrid('#theGrid', {
        itemsSource: view,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    //
    // change the filter
    document.addEventListener('change', e => {
        let filterType = e.target.value;
        //
        view.filter = (item) => {
            switch (filterType) {
                case 'country':
                    return item.country == 'US';
                case 'sales':
                    return item.sales > 9000;
                case 'downloads':
                    return item.downloads > 19000;
                default:
                    return true;
            }
        };
    });
}
