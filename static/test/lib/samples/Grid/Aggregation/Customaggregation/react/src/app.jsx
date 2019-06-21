import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcCore from '@grapecity/wijmo';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new wjcCore.CollectionView(getData(), {
                groupDescriptions: [
                    new wjcCore.PropertyGroupDescription('Grand Total', () => {
                        return '';
                    }),
                    'country'
                ]
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid initialized={this.initializedGrid.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={60} isReadOnly={true}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="product" header="Product"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" aggregate="Sum"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" aggregate="Sum"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="profit" header="Profit" dataType={2} isReadOnly={true}></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializedGrid(flex) {
        // start collapsed
        flex.collapseGroupsToLevel(1);
        // custom cell calculation
        flex.formatItem.addHandler((s, e) => {
            // cells and column footer panels only
            if (e.panel == s.cells) {
                // get row, column, and data item (or group description)
                let r = s.rows[e.row], c = s.columns[e.col], item = s.rows[e.row].dataItem, group = r instanceof wjcGrid.GroupRow ? item : null, negative = false; // assume value is not negative
                // calculate profit
                if (c.binding == 'profit') {
                    let profit = group
                        ? group.getAggregate('Sum', 'sales') - group.getAggregate('Sum', 'expenses')
                        : item.sales - item.expenses;
                    e.cell.textContent = wjcCore.Globalize.format(profit, c.format);
                    negative = profit < 0;
                }
                // update 'negative' class on cell
                wjcCore.toggleClass(e.cell, 'negative', negative);
            }
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
