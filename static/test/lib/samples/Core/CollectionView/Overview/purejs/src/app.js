import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import { getData } from './data';
import { TableView } from './table-view';
import { CollectionViewPager } from './collection-view-pager';
import { CollectionViewNavigator } from './collection-view-navigator';
import { ItemEditor } from './item-editor';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData(500), {
        pageSize: 10,
        newItemCreator: () => {
            let newItem = getData(1)[0];
            newItem.id = -1;
            return newItem;
        }
    });
    //
    new TableView('#tableView', view, { amount: 'n2' });
    new CollectionViewNavigator("#navigator", view);
    new CollectionViewPager("#pager", view);
    new ItemEditor('#editor', view);
    //
    let menu = new input.Menu("#pageSizeMenu", {
        itemsSource: [
            { value: 0, text: 'No Paging' },
            { value: 10, text: '10' },
            { value: 15, text: '15' },
            { value: 30, text: '30' },
            { value: 50, text: '50' }
        ],
        displayMemberPath: 'text',
        selectedValuePath: 'value',
        selectedValue: view.pageSize,
        selectedIndexChanged: (sender) => {
            if (sender.selectedIndex >= 0) {
                updateMenuHeader(sender);
                view.pageSize = sender.selectedValue;
            }
        }
    });
    updateMenuHeader(menu);
    //
    function updateMenuHeader(menu) {
        if (menu.selectedIndex >= 0) {
            menu.header = `Page Size: <b>${menu.selectedItem.text}</b>`;
        }
    }
}
