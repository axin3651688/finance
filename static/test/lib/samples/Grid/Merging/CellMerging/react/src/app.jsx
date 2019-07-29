import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        let data = this.getData();
        this.state = {
            data: new wjCore.CollectionView(data, {
                sortDescriptions: ["country", "active"]
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} allowMerging="Cells" isReadOnly={true} alternatingRowStep={0} autoGenerateColumns={true}>
                <wjcGrid.FlexGridColumn binding="country" header="Country" allowMerging={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="sales" header="Sales" format="n2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="active" header="Active" allowMerging={true}></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    getData() {
        var countries = "US,Germany,UK,Japan".split(",");
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
