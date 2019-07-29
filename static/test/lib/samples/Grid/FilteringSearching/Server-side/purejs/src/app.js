import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // FlexGridFilter server-side filtering
    var svcUrl = 'https://services.odata.org/Northwind/Northwind.svc';
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        isReadOnly: true,
        itemsSource: new wjOdata.ODataCollectionView(svcUrl, 'Customers', {
            filterOnServer: true,
            sortOnServer: true
        }),
    });
    var serverFilter = new wjGridFilter.FlexGridFilter(theGrid);
    //
    // optionally set default filter type to 'Condition' to 
    // avoid requests that exceed URL length limits
    serverFilter.defaultFilterType = wjGridFilter.FilterType.Condition;
}
