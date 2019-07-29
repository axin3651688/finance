import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wjInput from '@grapecity/wijmo.input';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // the ListBox
    let theListBox = new wjInput.ListBox('#theListBox', {
        itemsSource: getData()
    });
    //
    // add elements when the user scrolls to the bottom of the list
    theListBox.hostElement.addEventListener('scroll', e => {
        let el = e.target;
        //
        // near the bottom?
        if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
            //
            // add five elements to the list
            let arr = theListBox.itemsSource;
            for (let i = 0; i < 5; i++) {
                arr.push('item ' + arr.length);
            }
            //
            // refresh the list and keep the scroll top
            let top = el.scrollTop;
            theListBox.collectionView.refresh();
            el.scrollTop = top;
            //
            // show how many items we have
            let cnt = document.querySelector('#count');
            cnt.textContent = `The list now has ${arr.length} items.`;
        }
    });
}
