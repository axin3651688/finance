import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridDetail from '@grapecity/wijmo.grid.detail';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // get OData categories and products
    var url = 'https://services.odata.org/Northwind/Northwind.svc';
    var categories = new wjOdata.ODataCollectionView(url, 'Categories', {
        fields: ['CategoryID', 'CategoryName', 'Description']
    });
    var products = new wjOdata.ODataCollectionView(url, 'Products');
    //
    // shared column definitions
    var categoryColumns = [
        { binding: 'CategoryName', header: 'Category Name', width: '*' },
        { binding: 'Description', header: 'Description', width: '2*' }
    ];
    //
    // get products for a given category
    function getProducts(categoryID) {
        var arr = [];
        products.items.forEach(function (product) {
            if (product.CategoryID == categoryID) {
                arr.push(product);
            }
        });
        return arr;
    }
    //
    // grid with HTML detail
    var htmlDetail = new wjGrid.FlexGrid('#htmlDetail', {
        autoGenerateColumns: false,
        columns: categoryColumns,
        itemsSource: categories,
        isReadOnly: true
    });
    //
    // html detail provider
    var dpHtml = new wjGridDetail.FlexGridDetailProvider(htmlDetail, {
        //
        // use animation when showing details
        isAnimated: true,
        //
        // create detail cells for a given row
        createDetailCell: function (row) {
            //
            // build detail content for the current category
            var cat = row.dataItem;
            var prods = getProducts(cat.CategoryID);
            var html = 'ID: <b>' + cat.CategoryID + '</b><br/>';
            html += 'Name: <b>' + cat.CategoryName + '</b><br/>';
            html += 'Description: <b>' + cat.Description + '</b><br/>';
            html += 'Products: <b>' + prods.length + ' items</b><br/>';
            html += '<ol>';
            prods.forEach(function (product) {
                html += '<li>' + product.ProductName + '</li>';
            });
            html += '</ol>';
            //
            // create and return detail cell
            var cell = document.createElement('div');
            cell.innerHTML = html;
            return cell;
        }
    });
    //
    // grid with grid detail
    var gridDetail = new wjGrid.FlexGrid('#gridDetail', {
        autoGenerateColumns: false,
        columns: categoryColumns,
        itemsSource: categories,
        isReadOnly: true
    });
    //
    // grid detail provider
    var dpGrid = new wjGridDetail.FlexGridDetailProvider(gridDetail, {
        //
        // use animation when showing details
        isAnimated: true,
        //
        // limit height of detail rows
        maxHeight: 150,
        //
        // create detail cells for a given row
        createDetailCell: function (row) {
            var cell = document.createElement('div');
            var detailGrid = new wjGrid.FlexGrid(cell, {
                headersVisibility: wjGrid.HeadersVisibility.Column,
                isReadOnly: true,
                autoGenerateColumns: false,
                itemsSource: getProducts(row.dataItem.CategoryID),
                columns: [
                    { header: 'ID', binding: 'ProductID' },
                    { header: 'Name', binding: 'ProductName' },
                    { header: 'Qty/Unit', binding: 'QuantityPerUnit' },
                    { header: 'Unit Price', binding: 'UnitPrice' },
                    { header: 'Discontinued', binding: 'Discontinued' }
                ]
            });
            return cell;
        }
    });
    //
}
