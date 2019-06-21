import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // list that contains the items in the Combo (start with 10 items)
    let theList = loadItems([], 10);
    //
    // ComboBox to show the items
    let theCombo = new input.ComboBox('#theCombo', {
        itemsSource: theList
    });
    //
    // add items when user scrolls near the bottom of the list
    theCombo.dropDown.addEventListener('scroll', e => {
        // stop adding items when the list reaches 2,000 items
        if (theList.length < 2000) {
            let list = e.target;
            //
            // if the user scrolled near the bottom of the list
            if (list.scrollTop + list.clientHeight + 100 > list.scrollHeight) {
                // save scroll top, add items, refresh list, restore scroll top
                let top = list.scrollTop;
                loadItems(theList, 5);
                theCombo.collectionView.refresh();
                list.scrollTop = top;
            }
        }
    });
    // add some items to the list
    function loadItems(arr, cnt) {
        for (let i = 0; i < cnt; i++) {
            arr.push('item ' + (arr.length + 1));
        }
        return arr;
    }
}
