import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView based on the array
    let view = new wijmo.CollectionView(getData(), {
        sortDescriptions: ['country'] // sort by country
    });
    //
    // show the CollectionView
    let firstList = document.querySelector('#firstList');
    view.items.forEach(item => {
        let html = wijmo.format('<li><b>{country}</b> sales: {sales:n2} (id: {id})</li>', item);
        firstList.appendChild(wijmo.createElement(html));
    });
}
