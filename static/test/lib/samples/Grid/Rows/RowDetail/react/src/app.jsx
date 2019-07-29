import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from "@grapecity/wijmo.grid";
import * as wjcGridDetail from "@grapecity/wijmo.grid.detail";
import * as wjcOData from "@grapecity/wijmo.odata";
class App extends React.Component {
    constructor(props) {
        super(props);
        let url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.state = {
            categoryColumns: [
                { binding: 'CategoryName', header: 'Category Name', width: '*' },
                { binding: 'Description', header: 'Description', width: '2*' }
            ],
            categories: new wjcOData.ODataCollectionView(url, 'Categories', {
                fields: ['CategoryID', 'CategoryName', 'Description']
            }),
            products: new wjcOData.ODataCollectionView(url, 'Products'),
            htmlDetail: null,
            gridDetail: null
        };
    }
    componentDidMount() {
        var htmlDetail = new wjGrid.FlexGrid('#htmlDetail', {
            autoGenerateColumns: false,
            columns: this.state.categoryColumns,
            itemsSource: this.state.categories,
            isReadOnly: true
        });
        new wjcGridDetail.FlexGridDetailProvider(htmlDetail, {
            // use animation when showing details
            isAnimated: true,
            // create detail cells for a given row
            createDetailCell: (row) => {
                // build detail content for the current category
                let cat = row.dataItem, prods = this.getProducts(cat.CategoryID), html = 'ID: <b>' + cat.CategoryID + '</b><br/>';
                html += 'Name: <b>' + cat.CategoryName + '</b><br/>';
                html += 'Description: <b>' + cat.Description + '</b><br/>';
                html += 'Products: <b>' + prods.length + ' items</b><br/>';
                html += '<ol>';
                prods.forEach((product) => {
                    html += '<li>' + product.ProductName + '</li>';
                });
                html += '</ol>';
                // create and return detail cell
                let cell = document.createElement('div');
                cell.innerHTML = html;
                return cell;
            }
        });
        var gridDetail = new wjGrid.FlexGrid('#gridDetail', {
            autoGenerateColumns: false,
            columns: this.state.categoryColumns,
            itemsSource: this.state.categories,
            isReadOnly: true
        });
        // grid detail provider
        new wjcGridDetail.FlexGridDetailProvider(gridDetail, {
            // use animation when showing details
            isAnimated: true,
            // limit height of detail rows
            maxHeight: 150,
            // create detail cells for a given row
            createDetailCell: (row) => {
                let cell = document.createElement('div');
                new wjGrid.FlexGrid(cell, {
                    headersVisibility: wjGrid.HeadersVisibility.Column,
                    isReadOnly: true,
                    autoGenerateColumns: false,
                    itemsSource: this.getProducts(row.dataItem.CategoryID),
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
    }
    render() {
        return <div className="container-fluid">
            <h3>HTML in Row Details</h3>
            <p>
                This grid shows product categories on each row. Expanding
                the rows shows an HTML element with information about
            the products in that category:</p>
            <div id="htmlDetail"></div>
            <h3>Grids in Row Details</h3>
            <p>
                You can add anything you want to the detail rows,
                including other grids. This example shows the same
                categories, but the detail row uses another grid
            to show the products:</p>
            <div id="gridDetail"></div>
        </div>;
    }
    getProducts(categoryID) {
        let arr = [];
        this.state.products.items.forEach(function (product) {
            if (product.CategoryID == categoryID) {
                arr.push(product);
            }
        });
        return arr;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
