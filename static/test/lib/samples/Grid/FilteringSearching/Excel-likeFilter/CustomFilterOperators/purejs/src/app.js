import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjCore from '@grapecity/wijmo';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    //
    // customize the FlexGridFilter conditions
    var filter = wjCore.culture.FlexGridFilter, Operator = wjGridFilter.Operator;
    filter.stringOperators = [
        { name: '(doesn\'t matter)', op: null },
        { name: 'Is', op: Operator.EQ },
        { name: 'Is not', op: Operator.NE },
        { name: 'Is bigger than', op: Operator.GT },
        { name: 'Is smaller than', op: Operator.LT },
    ];
    filter.numberOperators = [
        { name: '(doesn\'t matter)', op: null },
        { name: 'Is', op: Operator.EQ },
        { name: 'Is not', op: Operator.NE },
        { name: 'Is bigger than', op: Operator.GT },
        //{ name: 'Is Greater than or equal to', op: Operator.GE },
        { name: 'Is smaller than', op: Operator.LT },
    ];
    filter.dateOperators = [
        { name: '(doesn\'t matter)', op: null },
        { name: 'Is', op: Operator.EQ },
        { name: 'Is earlier than', op: Operator.LT },
        { name: 'Is later than', op: Operator.GT }
    ];
    filter.booleanOperators = [
        { name: '(not set)', op: null },
        { name: 'Is', op: Operator.EQ },
        { name: 'Is not', op: Operator.NE },
    ];
    //
    // create a grid with a filter
    var theGrid = new wjGrid.FlexGrid('#theGrid', {
        itemsSource: getData(),
    });
    var f = new wjGridFilter.FlexGridFilter(theGrid);
    f.defaultFilterType = wjGridFilter.FilterType.Condition;
}
