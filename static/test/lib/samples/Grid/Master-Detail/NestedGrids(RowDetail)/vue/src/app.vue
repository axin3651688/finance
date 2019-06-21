<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjGridDetail from '@grapecity/wijmo.grid.detail';
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.grid.detail";

let App = Vue.extend({
    name: "app",
    template: `<div class="container-fluid">
        <h3>
            HTML in Row Details</h3>
        <p>
            This grid shows product categories on each row. Expanding
            the rows shows an HTML element with information about
            the products in that category:</p>
        <wj-flex-grid :itemsSource="categories" :isReadOnly=true>
            <wj-flex-grid-column header="Name" binding="CategoryName"></wj-flex-grid-column>
            <wj-flex-grid-column header="Description" binding="Description" width="*"></wj-flex-grid-column>
            <wj-flex-grid-detail :initialized="initializeCategory" :isAnimated=true>
                <template slot-scope="props">
                    ID: <b>{{props.item.CategoryID}}</b><br />
                    Name: <b>{{props.item.CategoryName}}</b><br />
                    Description: <b>{{props.item.Description}}</b><br />
                    Products: <b>{{getProducts(props.item.CategoryID).length}} items</b><br />
                    <ol>
                        <li v-for="p in getProducts(props.item.CategoryID)" v-bind:key="p">{{p.ProductName}}</li>
                    </ol>
                </template>
            </wj-flex-grid-detail>
        </wj-flex-grid>
        <h3>
            Grids in Row Details</h3>
        <p>
            You can add anything you want to the detail rows,
            including other grids. This example shows the same
            categories, but the detail row uses another grid
            to show the products:</p>
        <wj-flex-grid :autoGenerateColumns=false :itemsSource="categories" :isReadOnly=true>
            <wj-flex-grid-column header="Category Name" binding="CategoryName" width="*"></wj-flex-grid-column>
            <wj-flex-grid-column header="Description" binding="Description" width="2*"></wj-flex-grid-column>
            <wj-flex-grid-detail :maxHeight=250>
                 <template slot-scope="props">
                    <wj-flex-grid :itemsSource="getProducts(props.item.CategoryID)" :isReadOnly="true"
                        headersVisibility="Column">
                        <wj-flex-grid-column header="ID" binding="ProductID"></wj-flex-grid-column>
                        <wj-flex-grid-column header="Name" binding="ProductName"></wj-flex-grid-column>
                        <wj-flex-grid-column header="Qty/Unit" binding="QuantityPerUnit"></wj-flex-grid-column>
                        <wj-flex-grid-column header="Unit Price" binding="UnitPrice"></wj-flex-grid-column>
                        <wj-flex-grid-column header="Discontinued" binding="Discontinued"></wj-flex-grid-column>
                    </wj-flex-grid>
                </template>
            </wj-flex-grid-detail>
        </wj-flex-grid>
    </div>`,
    data: function() {
        return {
            categories : null,
            products : null
        };
    },
    methods: {
        initializeCategory: function(ctl){
            this.wjFlexGridDetail = ctl;
        },
        getProducts(categoryID) {
            var arr = [];
            this.products.items.forEach(function (product) {
                if (product.CategoryID == categoryID) {
                    arr.push(product);
                }
            });
            return arr;
        }
    },
    mounted: function() {
        var url = 'https://services.odata.org/Northwind/Northwind.svc';
        this.categories = new wjOdata.ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description']
        });
        this.products = new wjOdata.ODataCollectionView(url, 'Products');
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 350px; 
    }
    body {
        margin-bottom: 20pt;
    }
</style>