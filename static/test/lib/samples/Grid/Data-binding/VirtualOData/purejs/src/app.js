import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import { format } from '@grapecity/wijmo';
import { ODataCollectionView, ODataVirtualCollectionView } from '@grapecity/wijmo.odata';
import { FlexGrid, CellType } from '@grapecity/wijmo.grid';
document.readyState === 'complete' ? init() : window.onload = init;
function init() {
    // get order details into an ODataCollectionView
    var url = 'https://services.odata.org/Northwind/Northwind.svc';
    var table = 'Order_Details_Extendeds';
    var orderDetails = new ODataCollectionView(url, table);
    // show the data on a grid
    var itemCountElement = document.getElementById('itemCount');
    var theGrid = new FlexGrid('#theGrid', {
        itemsSource: orderDetails,
        isReadOnly: true,
        formatItem: function (s, e) {
            if (e.panel.cellType == CellType.RowHeader) {
                e.cell.textContent = e.row + 1;
            }
        },
        loadedRows: function (sender, e) {
            var el = document.getElementById('itemCount');
            el.innerHTML = format('{length:n0} items', sender.rows);
        }
    });
    // get order details into a ODataVirtualCollectionView
    var virtualDetails = new ODataVirtualCollectionView(url, table, {
        loaded: function (sender, e) {
            var el = document.getElementById('totalItemCount');
            el.innerHTML = format('{totalItemCount:n0} items', sender);
        }
    });
    // show the data on a grid
    var theVirtualGrid = new FlexGrid('#theVirtualGrid', {
        itemsSource: virtualDetails,
        isReadOnly: true,
        formatItem: function (s, e) {
            if (e.panel.cellType == CellType.RowHeader) {
                e.cell.textContent = e.row + 1;
            }
        },
        scrollPositionChanged: function () {
            var rng = theVirtualGrid.viewRange;
            virtualDetails.setWindow(rng.row, rng.row2);
        }
    });
}
