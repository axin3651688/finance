import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as odata from '@grapecity/wijmo.odata';
//
import { getData } from './data';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView with 20 items per page
    let view = new wijmo.CollectionView(getData(), {
        pageSize: 6,
        pageChanged: updateCurrentPage
    });
    //
    // update pager status
    view.onPageChanged();
    function updateCurrentPage() {
        let curr = wijmo.format('Page {index:n0} of {cnt:n0}', {
            index: view.pageIndex + 1,
            cnt: view.pageCount
        });
        document.querySelector('#spanCurrent').textContent = curr;
    }
    //
    // implement pager
    document.querySelector('#pager').addEventListener('click', e => {
        let btn = wijmo.closest(e.target, 'button'), id = btn ? btn.id : '';
        //
        switch (id) {
            case 'btnFirst':
                view.moveToFirstPage();
                break;
            case 'btnPrev':
                view.moveToPreviousPage();
                break;
            case 'btnNext':
                view.moveToNextPage();
                break;
            case 'btnLast':
                view.moveToLastPage();
                break;
        }
    });
    //
    // show the data in a grid
    let flex = new grid.FlexGrid('#theGrid', {
        itemsSource: view,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    //
    // use ODataCollectionView to demonstrate server-based paging
    let odataView = new odata.ODataCollectionView('https://services.odata.org/Northwind/Northwind.svc', 'Customers', {
        pageSize: 6,
        pageOnServer: true,
        sortOnServer: true,
        pageChanged: updateCurrentPageOd,
        loaded: updateCurrentPageOd
    });
    //
    // update pager status
    odataView.onPageChanged();
    function updateCurrentPageOd() {
        let curr = wijmo.format('Page {index:n0} of {cnt:n0}', {
            index: odataView.pageIndex + 1,
            cnt: odataView.pageCount
        });
        document.querySelector('#spanCurrentOd').textContent = curr;
    }
    //
    // implement pager
    document.querySelector('#pagerOd').addEventListener('click', e => {
        let btn = wijmo.closest(e.target, 'button'), id = btn ? btn.id : '';
        //
        switch (id) {
            case 'btnFirstOd':
                odataView.moveToFirstPage();
                break;
            case 'btnPrevOd':
                odataView.moveToPreviousPage();
                break;
            case 'btnNextOd':
                odataView.moveToNextPage();
                break;
            case 'btnLastOd':
                odataView.moveToLastPage();
                break;
        }
    });
    //
    // show the OData in a grid
    let odataFlex = new grid.FlexGrid('#theGridOd', {
        itemsSource: odataView,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        isReadOnly: true // the Northwind sample service is read-only!
    });
}
