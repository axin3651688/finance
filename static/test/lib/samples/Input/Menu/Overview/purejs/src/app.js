import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create file and edit menus
    let menuFile = createMenu('menuFile');
    menuFile.itemClicked.addHandler(menuClick);
    //
    let menuEdit = createMenu('menuEdit');
    menuEdit.itemClicked.addHandler(menuClick);
    //
    // use the same event handler for both
    function menuClick(sender) {
        alert(`You selected option **${sender.selectedIndex}** from menu **${sender.header}**`);
    }
    //
    // create menu from markup
    function createMenu(elementId) {
        // get host element, header, items
        let host = document.getElementById(elementId), header = host.firstChild.textContent.trim(), items = host.querySelectorAll('div'), menuItems = [];
        //
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            menuItems.push(item.outerHTML);
        }
        //
        // clear host and instantiate menu
        host.innerHTML = '';
        let menu = new input.Menu(host, {
            header: header,
            itemsSource: menuItems
        });
        //
        // done, return menu
        return menu;
    }
}
