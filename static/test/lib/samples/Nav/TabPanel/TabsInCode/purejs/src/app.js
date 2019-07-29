import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjNav from '@grapecity/wijmo.nav';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjOData from '@grapecity/wijmo.odata';
// 
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    var theTabPanel = new wjNav.TabPanel('#theTabPanel'), url = 'https://services.odata.org/Northwind/Northwind.svc/', headers = 'Employees,Categories,Products,Customers'.split(',');
    //
    theTabPanel.tabs.deferUpdate(function () {
        headers.forEach(function (header) {
            // create the tab header element
            var elHeader = document.createElement('a');
            elHeader.textContent = header;
            // create the tab pane element
            var elPane = document.createElement('div'), elGrid = document.createElement('div'), theGrid = new wjGrid.FlexGrid(elGrid, {
                isReadOnly: true,
                itemsSource: new wjOData.ODataCollectionView(url, header)
            });
            elPane.appendChild(elGrid);
            // add the new Tab to the TabPanel
            theTabPanel.tabs.push(new wjNav.Tab(elHeader, elPane));
        });
    });
    // select the first tab
    theTabPanel.selectedIndex = 0;
}
