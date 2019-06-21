import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
import * as chart from '@grapecity/wijmo.chart';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create the menu
    let menu = new input.Menu(document.createElement('div'), {
        displayMemberPath: 'header',
        selectedValuePath: 'cmd',
        dropDownCssClass: 'ctx-menu',
        itemsSource: [
            { header: '<span class="glyphicon glyphicon-asterisk"></span>&nbsp;&nbsp;New', cmd: 'cmdNew' },
            { header: '<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Open', cmd: 'cmdOpen' },
            { header: '<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save', cmd: 'cmdSave' },
            { header: '<span class="wj-separator"></span>' },
            { header: '<span class="glyphicon glyphicon-remove"></span>&nbsp;&nbsp;Exit', cmd: 'cmdExit' }
        ],
        itemClicked: () => {
            alert('Executing **' + menu.selectedValue + '** for element **' + menu.owner.id + '**');
        }
    });
    //
    // use it as a context menu for one or more elements
    let els = document.querySelectorAll('.has-ctx-menu');
    for (let i = 0; i < els.length; i++) {
        els[i].addEventListener('contextmenu', e => {
            menu.owner = wijmo.closest(e.target, '.has-ctx-menu');
            if (menu.owner) {
                e.preventDefault();
                menu.show(e);
            }
        }, true);
    }
    //
    // create FlexChart and FlexGrid
    let theChart = new chart.FlexChart('#theChart', {
        itemsSource: getData(),
        bindingX: 'country',
        series: [
            { binding: 'sales', name: 'Sales' },
            { binding: 'expenses', name: 'Expenses' },
        ]
    });
    //
    let theGrid = new grid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
}
