<template>
    <div class="container-fluid">
        <h3>HTML in Row Details</h3>
        <p>
            This grid shows product categories on each row. Expanding
            the rows shows an HTML element with information about
            the products in that category:</p>
        <wj-flex-grid
            id="htmlDetail"
            :initialized="initDetail"
            :isReadOnly="true"
            :itemsSource="categories">
            <wj-flex-grid-column :binding="'CategoryName'" :header="'Category Name'"  :width="'*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'Description'" :header="'Description'"  :width="'2*'"></wj-flex-grid-column>
        </wj-flex-grid>

        <h3>Grids in Row Details</h3>
        <p>
            You can add anything you want to the detail rows,
            including other grids. This example shows the same
            categories, but the detail row uses another grid
            to show the products:</p>
        <wj-flex-grid
            id="gridDetail"
            :initialized="initDetail"
            :isReadOnly="true"
            :itemsSource="categories">
            <wj-flex-grid-column :binding="'CategoryName'" :header="'Category Name'"  :width="'*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'Description'" :header="'Description'"  :width="'2*'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjcOData from '@grapecity/wijmo.odata';
    import * as wjcGrid from '@grapecity/wijmo.grid';
    import * as wjcGridDetail from '@grapecity/wijmo.grid.detail';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let url = 'https://services.odata.org/Northwind/Northwind.svc';
            return {
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
            }
        },
        methods: {
            initDetail: function(g){
                this[g.hostElement.id] = g;
            },
            getProducts: function(categoryID){
                let arr = [];
                this.products.items.forEach(function(product) {
                    if (product.CategoryID == categoryID) {
                        arr.push(product);
                    }
                });
                return arr;
            }
        },
        mounted: function(){
            new wjcGridDetail.FlexGridDetailProvider(this.htmlDetail, {

                // use animation when showing details
                isAnimated: true,

                // create detail cells for a given row
                createDetailCell: (row) => {

                    // build detail content for the current category
                    let cat = row.dataItem,
                        prods = this.getProducts(cat.CategoryID),
                        html = 'ID: <b>' + cat.CategoryID + '</b><br/>';
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

            // grid detail provider
            new wjcGridDetail.FlexGridDetailProvider(this.gridDetail, {

                // use animation when showing details
                isAnimated: true,

                // limit height of detail rows
                maxHeight: 150,

                // create detail cells for a given row
                createDetailCell: (row) => {
                    let cell = document.createElement('div')
                    new wjcGrid.FlexGrid(cell, {
                        headersVisibility: wjcGrid.HeadersVisibility.Column,
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
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
    max-height: 350px;
}
body {
    margin-bottom: 20pt;
}
</style>
