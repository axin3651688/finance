import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
import { getData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // create a CollectionView
    let view = new wijmo.CollectionView(getData(), {
        currentItem: null,
        sortDescriptions: [new wijmo.SortDescription('sales', false)]
    });
    //
    // show the data in a grid
    let flex = new grid.FlexGrid('#theGrid', {
        itemsSource: view,
        alternatingRowStep: 0,
        headersVisibility: 'Column'
    });
    //
    // change the grouping
    document.addEventListener('change', e => {
        // remove the old groups
        view.groupDescriptions.clear();
        //
        // add the new groups
        let filter = e.target;
        if (filter.value) {
            filter.value.split(',').forEach((prop) => {
                // group sales by value ranges
                let pgd;
                if (prop == 'sales') {
                    pgd = new wijmo.PropertyGroupDescription(prop, (item) => {
                        if (item.sales > 8000)
                            return 'High';
                        if (item.sales > 4000)
                            return 'Medium';
                        return 'Low';
                    });
                }
                else { // group others by value
                    pgd = new wijmo.PropertyGroupDescription(prop);
                }
                view.groupDescriptions.push(pgd);
            });
        }
    });
    //
    // dump grouped data to console (no grid)
    document.querySelector('#btnDump').addEventListener('click', () => {
        if (!view.groups) {
            console.log('*** no groups');
        }
        else {
            console.log('*** ' + view.groups.length + ' groups:');
            view.groups.forEach(group => dumpGroup(group, ''));
        }
    });
    //
    function dumpGroup(group, level) {
        // show information for this group
        let propName = group.groupDescription['propertyName'], groupName = group.name, groupInfo = propName + ' > ' + groupName; // group summary
        //
        groupInfo += ' (' + group.items.length + ' items)'; // item count
        groupInfo += ' total sales: ' + wijmo.Globalize.format(group.getAggregate(wijmo.Aggregate.Sum, 'sales'), 'c2');
        console.log(level + groupInfo);
        //
        // show subgroups
        if (group.groups) {
            group.groups.forEach(child => dumpGroup(child, level + '  '));
        }
    }
}
