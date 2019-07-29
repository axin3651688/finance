import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create some random data
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    var products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
    var data = [];
    for (var i = 0; i < 10000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    // create a CollectionView with 20 items per page
    var view = new wjCore.CollectionView(data, {
        pageSize: 6,
        pageChanged: updateCurrentPage
    });
    //
    // update pager status
    view.onPageChanged();
    function updateCurrentPage() {
        var curr = wjCore.format('Page {index:n0} of {cnt:n0}', {
            index: view.pageIndex + 1,
            cnt: view.pageCount
        });
        document.getElementById('spanCurrent').value = curr;
    }
    //
    // implement pager
    document.getElementById('pager').addEventListener('click', function (e) {
        var btn = wjCore.closest(e.target, 'button');
        var id = btn ? btn.id : '';
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
    var flex = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: view,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
}
