import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // NorthWind service URL
    var nwindService = 'https://services.odata.org/Northwind/Northwind.svc';
    //
    // create the tree
    var tree = new wjNav.TreeView('#theTree', {
        displayMemberPath: ['FullName', 'ShipName', 'Summary'],
        childItemsPath: ['Orders', 'Order_Details'],
        lazyLoadFunction: lazyLoadODataFunction,
    });
    //
    // get employee list
    var view = new wjOdata.ODataCollectionView(nwindService, 'Employees', {
        fields: 'EmployeeID,FirstName,LastName'.split(','),
        loaded: function (s, e) {
            //
            // when the data is loaded, add FullName and Orders array to employees
            var items = s.items.map(function (employee) {
                employee.FullName = employee.FirstName + ' ' + employee.LastName;
                employee.Orders = []; // lazy-load orders
            });
            //
            // populate the tree with the employees array
            tree.itemsSource = s.items;
        }
    });
    //
    // lazy-load orders and details
    function lazyLoadODataFunction(node, callback) {
        switch (node.level) {
            //
            // load orders for an employee
            case 0:
                var url = 'Employees(' + node.dataItem.EmployeeID + ')/Orders';
                var orders = new wjOdata.ODataCollectionView(nwindService, url, {
                    fields: 'OrderID,ShipName,ShipCountry'.split(','),
                    loaded: function () {
                        var items = orders.items.map(function (e) {
                            e.Order_Details = []; // lazy-order details
                            return e;
                        });
                        callback(items);
                    }
                });
                break;
            //
            // load extended details for an order
            case 1:
                var url = "Order_Details_Extendeds?$filter=OrderID eq " + node.dataItem.OrderID;
                var details = new wjOdata.ODataCollectionView(nwindService, url, {
                    fields: 'ProductName,ExtendedPrice'.split(','),
                    loaded: function () {
                        var items = details.items.map(function (e) {
                            e.Summary = wjCore.format('{ProductName}: {ExtendedPrice:c}', e);
                            return e;
                        });
                        callback(items);
                    }
                });
                break;
            //
            // default
            default:
                callback(null);
        }
    }
}
