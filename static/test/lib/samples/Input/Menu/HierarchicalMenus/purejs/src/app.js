import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
import { getMenuTree } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let menuTree = getMenuTree();
    //
    // element used to show menu commands
    let target = document.querySelector('#menuTarget'), targetStyle = target.style, computedStyle = getComputedStyle(target);
    //
    // create File menu (uses itemClicked event)
    let menuFile = new input.Menu('#menu-file', {
        header: 'File',
        displayMemberPath: 'header',
        subItemsPath: 'items',
        openOnHover: true,
        isAnimated: true,
        itemsSource: menuTree.fileMenu,
        itemClicked: (sender) => {
            target.innerHTML = `Thank you for clicking <b><i>${sender.text}</i></b>!`;
        }
    });
    //
    // create Edit menu (uses itemClicked event)
    let menuEdit = new input.Menu('#menu-edit', {
        header: 'Edit',
        displayMemberPath: 'header',
        subItemsPath: 'items',
        openOnHover: true,
        isAnimated: true,
        itemsSource: menuTree.editMenu,
        itemClicked: (sender) => {
            target.innerHTML = `Thank you for clicking <b><i>${sender.text}</i></b>!`;
        }
    });
    //
    // create Format menu (uses command property)
    let menuFormat = new input.Menu('#menu-format', {
        header: 'Format',
        displayMemberPath: 'header',
        subItemsPath: 'items',
        openOnHover: true,
        isAnimated: true,
        itemsSource: menuTree.formatMenu,
        command: getFormatMenuCommand()
    });
    //
    // toggle animations
    document.querySelector('#isAnimated').addEventListener('click', e => {
        [menuFile, menuEdit, menuFormat].forEach(menu => {
            menu.isAnimated = e.target.checked;
        });
    });
    //
    // toggle open on hover
    document.querySelector('#openOnHover').addEventListener('click', e => {
        [menuFile, menuEdit, menuFormat].forEach(menu => {
            menu.openOnHover = e.target.checked;
        });
    });
    //
    // show right-to-left menus
    document.querySelector('#rtl').addEventListener('click', e => {
        let menubar = document.querySelector('.menubar');
        menubar.setAttribute('dir', e.target.checked ? 'rtl' : 'ltr');
        wijmo.Control.refreshAll(menubar);
    });
    //
    // format menu command
    function getFormatMenuCommand() {
        return {
            executeCommand: (param) => {
                switch (param.prop) {
                    case 'face':
                        targetStyle.fontFamily = param.header;
                        break;
                    case 'font':
                        switch (param.header) {
                            case 'Bold':
                                targetStyle.fontWeight = targetStyle.fontWeight ? '' : 'bold';
                                break;
                            case 'Italic':
                                targetStyle.fontStyle = targetStyle.fontStyle ? '' : 'italic';
                                break;
                            case 'Underline':
                                targetStyle.textDecoration = targetStyle.textDecoration ? '' : 'underline';
                                break;
                            case 'Larger':
                                targetStyle.fontSize = (parseFloat(computedStyle.fontSize) * 1.2) + 'px';
                                break;
                            case 'Smaller':
                                targetStyle.fontSize = (parseFloat(computedStyle.fontSize) * .8) + 'px';
                                break;
                        }
                        break;
                    case 'color':
                        targetStyle.color = param.header.toLowerCase();
                        break;
                    case 'background':
                        targetStyle.background = param.header.toLowerCase();
                        break;
                }
            },
            canExecuteCommand: (param) => {
                switch (param.prop) {
                    case 'face':
                        return targetStyle.fontFamily != param.header;
                    case 'font':
                        switch (param.header) {
                            case 'Larger':
                                return parseFloat(computedStyle.fontSize) < 24;
                            case 'Smaller':
                                return parseFloat(computedStyle.fontSize) > 8;
                        }
                        break;
                    case 'color':
                    case 'background':
                        let color = param.header.toLowerCase();
                        return targetStyle.color != color && targetStyle.background != color;
                }
                return true;
            }
        };
    }
}
