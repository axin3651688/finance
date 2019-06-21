import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { countries, getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData(), {
        sortDescriptions: ['country'],
        getError: (item, propName) => {
            switch (propName) {
                case 'country':
                    return countries.indexOf(item.country) < 0 ? 'Invalid Country' : '';
                case 'downloads':
                case 'sales':
                case 'expenses':
                    return item[propName] < 0 ? 'Negative values not allowed!' : '';
                case 'active':
                    return item.active && item.country.match(/^(US|UK)$/)
                        ? 'Active items not allowed in the US or UK!'
                        : '';
            }
            //
            return null;
        }
    });
    //
    // create grid for editing with validation
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: view
    });
    //
    // use getError to provide form validation
    let theItem = {};
    //
    document.getElementById('theForm').addEventListener('input', e => {
        let input = e.target;
        let propName = input.id;
        //
        theItem[propName] = input.value;
        input.setCustomValidity(view.getError(theItem, propName));
    });
    //
    document.getElementById('theForm').addEventListener('submit', e => e.preventDefault());
}
