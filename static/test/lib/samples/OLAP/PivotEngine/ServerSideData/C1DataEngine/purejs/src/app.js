import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // initialize pivot engine
    var svcUrl = 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20173.114/api/dataengine/';
    var ngCube = new wjOlap.PivotEngine({
        //
        // connect to ComponentOne Data Service
        itemsSource: `${svcUrl}complex10`,
        //
        // build default view
        valueFields: ['Sales', 'Downloads'],
        rowFields: ['Country', 'Product']
    });
    //
    // show pivot panel
    var pivotPanel = new wjOlap.PivotPanel('#pivotPanel', {
        itemsSource: ngCube
    });
    //
    // show summary
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ngCube
    });
}
