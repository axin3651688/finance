import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // current tax value
    let currentTax = new input.InputNumber('#currentTax', {
        format: 'p2',
        min: 0,
        max: 1,
        step: 0.025,
        value: 0.0825
    });
    //
    // create change tax menu
    let changeTax = createMenu('changeTax');
    //
    // set command object for the tax menu
    changeTax.command = {
        // execute the command
        executeCommand: (arg) => {
            arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
            if (wijmo.isNumber(arg)) {
                currentTax.value += arg;
            }
        },
        //
        // check if a command can be executed
        canExecuteCommand: (arg) => {
            arg = wijmo.changeType(arg, wijmo.DataType.Number, null);
            if (wijmo.isNumber(arg)) {
                let val = currentTax.value + arg;
                return val >= 0 && val <= 1;
            }
            return false;
        }
    };
    //
    function createMenu(elementId) {
        // get host element, header, items
        let host = document.getElementById(elementId), header = host.firstChild.textContent.trim(), items = host.querySelectorAll('div'), menuItems = [];
        //
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            menuItems.push({
                header: item.outerHTML,
                cmdParam: item.getAttribute('cmd-param')
            });
        }
        //
        // clear host and instantiate menu
        host.innerHTML = '';
        let menu = new input.Menu(host, {
            header: header,
            displayMemberPath: 'header',
            commandParameterPath: 'cmdParam',
            itemsSource: menuItems,
        });
        //
        // done, return menu
        return menu;
    }
}
