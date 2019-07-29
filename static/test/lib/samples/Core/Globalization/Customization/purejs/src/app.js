import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import * as gridFilter from '@grapecity/wijmo.grid.filter';
//
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // customize grid filter conditions
    let filter = wijmo.culture.FlexGridFilter, Operator = gridFilter.Operator;
    //
    filter.stringOperators = [
        { name: '(not set)', op: null },
        { name: 'Same', op: Operator.EQ },
        { name: 'Different', op: Operator.NE },
        { name: 'Bigger', op: Operator.GT },
        { name: 'Smaller', op: Operator.LT }
    ];
    //
    filter.numberOperators = [
        { name: '(not set)', Operator: null },
        { name: 'Same', op: Operator.EQ },
        { name: 'Different', op: Operator.NE },
        { name: 'Bigger', op: Operator.GT },
        { name: 'Smaller', op: Operator.LT }
    ];
    //
    filter.dateOperators = [
        { name: '(not set)', op: null },
        { name: 'Same', op: Operator.EQ },
        { name: 'Earlier', op: Operator.LT },
        { name: 'Later', op: Operator.GT }
    ];
    //
    filter.booleanOperators = [
        { name: '(not set)', op: null },
        { name: 'Is', op: Operator.EQ },
        { name: 'Isn\'t', op: Operator.NE }
    ];
    //
    // create the grid and the filter
    let flex = new grid.FlexGrid('#theGrid', {
        itemsSource: getData()
    });
    let flexGridFilter = new gridFilter.FlexGridFilter(flex);
}
