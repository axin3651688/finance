import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from '@grapecity/wijmo.grid';
class RestrictedMergeManager extends wjGrid.MergeManager {
    constructor(flexGrid) {
        super(flexGrid);
    }
    getMergedRange(p, r, c, clip = true) {
        // create basic cell range
        var rng = null;
        // start with single cell
        rng = new wjGrid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        // get reference values to use for merging
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        // expand up
        while (rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval) {
            rng.row--;
        }
        // expand down
        while (rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval) {
            rng.row2++;
        }
        // don't bother with single-cell ranges
        if (rng.isSingleCell) {
            rng = null;
        }
        // done
        return rng;
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        this.setState({
            data: new wjCore.CollectionView(this.getData(), {
                sortDescriptions: ["customer", "country"]
            })
        });
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} autoGenerateColumns={false} alternatingRowStep={0} initialized={this.onInitialized.bind(this)}>
                <wjcGrid.FlexGridColumn binding="country" header="Country" allowMerging={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="customer" header="Customer" allowMerging={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="downloads" header="Downloads"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    onInitialized(flexGrid) {
        flexGrid.mergeManager = new RestrictedMergeManager(flexGrid);
    }
    getData() {
        // create some random data
        var countries = "US,Germany,UK,Japan,Italy,Greece".split(","), customers = "Paul Smith,Susan Johnson".split(",");
        let data = [];
        for (var i = 0; i < 12; i++) {
            data.push({
                customer: customers[i % customers.length],
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 5000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
