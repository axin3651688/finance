import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from '@grapecity/wijmo.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        let data = this.getData();
        this.state = {
            data: data
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} allowMerging="ColumnHeaders" alternatingRowStep={0} autoGenerateColumns={false} initialized={this.onInitialized.bind(this)}>
                <wjcGrid.FlexGridColumn binding="country" header="Country" allowMerging={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales" format="n2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="active" header="Active" allowMerging={true}></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    onInitialized(grid) {
        // create extra header row
        var extraRow = new wjGrid.Row();
        extraRow.allowMerging = true;
        //
        // add extra header row to the grid
        var panel = grid.columnHeaders;
        panel.rows.splice(0, 0, extraRow);
        //
        // populate the extra header row
        for (let colIndex = 1; colIndex <= 2; colIndex++) {
            panel.setCellData(0, colIndex, 'Amounts');
        }
        //
        // merge "Country" and "Active" headers vertically
        ['country', 'active'].forEach(function (binding) {
            let col = grid.getColumn(binding);
            col.allowMerging = true;
            panel.setCellData(0, col.index, col.header);
        });
        //
        // center-align merged header cells
        grid.formatItem.addHandler(function (s, e) {
            if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
                var html = e.cell.innerHTML;
                e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
            }
        });
    }
    getData() {
        var countries = 'US,Germany,UK,Japan'.split(',');
        var data = [];
        for (var i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
