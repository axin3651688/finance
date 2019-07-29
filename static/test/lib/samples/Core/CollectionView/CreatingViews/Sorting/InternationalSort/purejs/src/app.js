import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wijmo from '@grapecity/wijmo';
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // show ascending sort
    sort(true);
    //
    // handle buttons
    document.querySelector('#asc').addEventListener('click', () => sort(true));
    document.querySelector('#desc').addEventListener('click', () => sort(false));
    //
    // sort with JavaScript and with CollectionView
    function sort(ascending) {
        // sort JavaScript array
        let items = getData();
        items.sort();
        if (!ascending) {
            items.reverse();
        }
        //
        // show JavaScript sort
        let ol = document.querySelector('#ol-js');
        ol.innerHTML = '';
        items.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            ol.appendChild(li);
        });
        //
        // sort CollectionView
        let cv = new wijmo.CollectionView(getData(), {
            sortDescriptions: [new wijmo.SortDescription(null, ascending)]
        });
        //
        // show CollectionView sort
        ol = document.querySelector('#ol-cv');
        ol.innerHTML = '';
        cv.items.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            ol.appendChild(li);
        });
    }
}
