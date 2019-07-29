import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjMultiRow from '@grapecity/wijmo.grid.multirow';
import { generateAppData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let appData = generateAppData();
    let pagedOrders = appData.pagedOrders;
    let pagingMultirow = new wjMultiRow.MultiRow('#pageMultirow', {
        itemsSource: pagedOrders,
        layoutDefinition: appData.ldThreeLines
    });
    // paging buttons
    document.getElementById('firstBtn').addEventListener('click', function (e) {
        pagedOrders.moveToFirstPage();
    });
    document.getElementById('previousBtn').addEventListener('click', function (e) {
        pagedOrders.moveToPreviousPage();
    });
    document.getElementById('nextBtn').addEventListener('click', function (e) {
        pagedOrders.moveToNextPage();
    });
    document.getElementById('lastBtn').addEventListener('click', function (e) {
        pagedOrders.moveToLastPage();
    });
    // update page text now and when the current page changes
    updatePageText();
    pagedOrders.collectionChanged.addHandler(function () {
        updatePageText();
    });
    pagedOrders.pageChanged.addHandler(function () {
        updatePageText();
    });
    function updatePageText() {
        var text = wjCore.format('{index:n0} / {count:n0}', {
            index: pagedOrders.pageIndex + 1,
            count: pagedOrders.pageCount
        });
        wjCore.setText(document.querySelector('#numBtn'), text);
    }
}
