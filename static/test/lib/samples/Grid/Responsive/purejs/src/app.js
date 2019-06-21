import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create the grid
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        autoGenerateColumns: false,
        headersVisibility: 'Column',
        columns: [
            { header: "Company", isReadOnly: true, visible: false, allowDragging: false, width: "*" },
            { header: "Company Name", binding: "CompanyName", width: "20*" },
            { header: "Contact Name", binding: "ContactName", width: "15*" },
            { header: "Contact Title", binding: "ContactTitle", width: "20*" },
            { header: "Address", binding: "Address", width: "20*" },
            { header: "City", binding: "City", width: "10*" },
            { header: "Country", binding: "Country", width: "15*" }
        ],
        formatItem: function (s, e) {
            if (e.panel == s.cells && e.col == 0) {
                var html = wjCore.format('<div class="item-header">{CompanyName}</div>' +
                    '<div class="item-detail">{ContactName}, {ContactTitle}</div>' +
                    '<div class="item-detail">{Address}, {City}, {Country}</div>', s.rows[e.row].dataItem);
                e.cell.innerHTML = html;
            }
        }
    });
    //
    // store default row height
    var defaultRowHeight = theGrid.rows.defaultSize;
    //
    // make it responsive
    theGrid.addEventListener(window, 'resize', updateGridLayout);
    function updateGridLayout() {
        //
        // show/hide columns
        var narrow = theGrid.hostElement.clientWidth < 600;
        theGrid.columns.forEach(function (col) {
            col.visible = col.index == 0 ? narrow : !narrow;
        });
        //
        // make rows taller on phone layout
        theGrid.rows.defaultSize = defaultRowHeight * (narrow ? 3 : 1);
        //
        // hide column headers on narrow layouts
        theGrid.headersVisibility = narrow ? wjGrid.HeadersVisibility.None : wjGrid.HeadersVisibility.Column;
    }
    //
    // get some data
    wjCore.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json', {
        success: function (xhr) {
            var response = JSON.parse(xhr.responseText);
            theGrid.itemsSource = response.value;
            updateGridLayout();
        }
    });
    //
}
