import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjOdata from '@grapecity/wijmo.odata';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // use ODataCollectionView to demonstrate server-based paging
    var url = 'https://services.odata.org/Northwind/Northwind.svc';
    var viewOd = new wjOdata.ODataCollectionView(url, 'Customers', {
        pageSize: 6,
        pageOnServer: true,
        sortOnServer: true,
        pageChanged: updateCurrentPageOd,
        loaded: updateCurrentPageOd
    });
    //
    // update pager status
    viewOd.onPageChanged();
    function updateCurrentPageOd() {
        var curr = wjCore.format('Page {index:n0} of {cnt:n0}', {
            index: viewOd.pageIndex + 1,
            cnt: viewOd.pageCount
        });
        document.getElementById('spanCurrent').value = curr;
    }
    //
    // implement pager
    document.getElementById('pagerOd').addEventListener('click', function (e) {
        var btn = wjCore.closest(e.target, 'button');
        var id = btn ? btn.id : '';
        switch (id) {
            case 'btnFirstOd':
                viewOd.moveToFirstPage();
                break;
            case 'btnPrevOd':
                viewOd.moveToPreviousPage();
                break;
            case 'btnNextOd':
                viewOd.moveToNextPage();
                break;
            case 'btnLastOd':
                viewOd.moveToLastPage();
                break;
        }
    });
    //
    // show the OData in a grid
    var flexOd = new wjGrid.FlexGrid('#theGridOd', {
        itemsSource: viewOd,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        isReadOnly: true // the Northwind sample service is read-only!
    });
}
