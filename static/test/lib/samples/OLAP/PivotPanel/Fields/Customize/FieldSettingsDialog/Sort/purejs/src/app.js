import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjOlap from '@grapecity/wijmo.olap';
import * as wjInput from '@grapecity/wijmo.input';
import * as wjCore from '@grapecity/wijmo';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // create pivot engine
    var ng = new wjOlap.PivotEngine({
        itemsSource: getData(100),
        rowFields: ['Country', 'Product'],
        valueFields: ['Sales', 'Expenses']
    });
    //
    // create pivot grid
    var pivotGrid = new wjOlap.PivotGrid('#pivotGrid', {
        itemsSource: ng,
    });
    //
    // change the sort order for the dimension (row/column) fields
    new wjInput.ComboBox('#sortCountry', {
        itemsSource: 'Ascending,Descending'.split(','),
        selectedIndexChanged: function (s, e) {
            ng.fields.getField('Country').descending = s.selectedIndex == 1;
        }
    });
    new wjInput.ComboBox('#sortProduct', {
        itemsSource: 'Ascending,Descending'.split(','),
        selectedIndexChanged: function (s, e) {
            ng.fields.getField('Product').descending = s.selectedIndex == 1;
        }
    });
    //
    // change the sort order for the measure (value) fields
    var sortSales = new wjInput.ComboBox('#sortSales', {
        itemsSource: 'None,Ascending,Descending'.split(','),
        selectedIndexChanged: function (s, e) {
            updateMeasureSort();
        }
    });
    var sortExpenses = new wjInput.ComboBox('#sortExpenses', {
        itemsSource: 'None,Ascending,Descending'.split(','),
        selectedIndexChanged: function (s, e) {
            updateMeasureSort();
        }
    });
    //
    // toggle subtotals
    document.getElementById('subtotals').addEventListener('click', function (e) {
        ng.showRowTotals = e.target.checked ? wjOlap.ShowTotals.Subtotals : wjOlap.ShowTotals.GrandTotals;
    });
    //
    // utility
    function updateMeasureSort() {
        var sd = ng.pivotView.sortDescriptions;
        sd.clear();
        addMeasureSort('Sales', sortSales.text);
        addMeasureSort('Expenses', sortExpenses.text);
    }
    //
    function addMeasureSort(fieldName, sortDirection) {
        if (sortDirection != 'None') {
            var sd = ng.pivotView.sortDescriptions, cols = pivotGrid.columns;
            for (var c = 0; c < cols.length; c++) {
                var binding = cols[c].binding;
                if (binding.indexOf(fieldName) == 0) {
                    sd.push(new wjCore.SortDescription(binding, sortDirection == 'Ascending'));
                }
            }
        }
    }
}
