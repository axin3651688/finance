import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { ODataCollectionView } from "@grapecity/wijmo.odata";
import * as wjFilter from "@grapecity/wijmo.react.grid.filter";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: new ODataCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Customers", {
                sortOnServer: true,
                filterOnServer: true
            }),
            itemCount: ""
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.customers}>
				<wjFilter.FlexGridFilter>
				</wjFilter.FlexGridFilter>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        flexgrid.loadedRows.addHandler(() => {
            this.setState({
                itemCount: flexgrid.rows.length + " items"
            });
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
