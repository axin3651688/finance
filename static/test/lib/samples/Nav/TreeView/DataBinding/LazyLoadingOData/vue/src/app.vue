<template>
 <div class="container-fluid">
    <wj-tree-view :itemsSource="lazyLoadODataItems" :displayMemberPath="['FullName', 'ShipName', 'Summary' ]"
        :childItemsPath="['Orders', 'Order_Details']" :lazyLoadFunction="lazyLoadODataFunction">
    </wj-tree-view>
</div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.nav";
import * as wjCore from "@grapecity/wijmo";
import * as wjData from '@grapecity/wijmo.odata';

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
      lazyLoadODataItems: [],
      nwindService:'https://services.odata.org/Northwind/Northwind.svc',
    };
  },
  methods: {
    lazyLoadODataFunction(node, callback) {
      switch (node.level) {
        // load orders for an employee
        case 0:
          var url = "Employees(" + node.dataItem.EmployeeID + ")/Orders";
          var orders = new wjData.ODataCollectionView(this.nwindService, url, {
            fields: "OrderID,ShipName,ShipCountry".split(","),
            loaded: () => {
              var items = orders.items.map(function(e) {
                e.Order_Details = []; // lazy-order details
                return e;
              });
              callback(items);
            }
          });
          break;

        // load extended details for an order
        case 1:
          var url =
            "Order_Details_Extendeds/?$filter=OrderID eq " +
            node.dataItem.OrderID;
          var details = new wjData.ODataCollectionView(
            this.nwindService,
            url,
            {
              fields: "ProductName,ExtendedPrice".split(","),
              loaded: () => {
                var items = details.items.map(e => {
                  e.Summary = wjCore.format(
                    "{ProductName}: {ExtendedPrice:c}",
                    e
                  );
                  return e;
                });
                callback(items);
              }
            }
          );
          break;

        // default
        default:
          callback(null);
      }
    }
  },
  created: function() {
    var employees = new wjData.ODataCollectionView(
      this.nwindService,
      "Employees",
      {
        fields: "EmployeeID,FirstName,LastName".split(","),
        loaded: () => {
          var items = employees.items.map(e => {
            e.FullName = e.FirstName + " " + e.LastName;
            e.Orders = []; // lazy-load orders
            return e;
          });
          this.lazyLoadODataItems = items;
        }
      }
    );
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
/* level 0 nodes and deeper (employees...) */
.container-fluid .wj-treeview .wj-nodelist > .wj-node {
  font-weight: bold;
}

/* level 1 nodes and deeper (orders...) */
.container-fluid .wj-treeview .wj-nodelist > .wj-nodelist > .wj-node {
  font-weight: normal;
  font-size: 95%;
  color: darkblue;
}

/* level 2 nodes and deeper (order details...) */
.container-fluid .wj-treeview .wj-nodelist > .wj-nodelist > .wj-nodelist > .wj-node {
  font-size: 90%;
  color: darkslategrey;
}

/* default trees on this sample */
.container-fluid .wj-treeview {
  display:block;
  height: 350px;
  font-size: 120%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 6px;
  background: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
body {
margin-bottom: 24pt;
}
</style>
