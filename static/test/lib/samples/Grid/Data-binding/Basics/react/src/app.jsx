import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcCore from "@grapecity/wijmo";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            selectedItem: ""
        };
    }
    render() {
        return <div className="container-fluid">
            <p dangerouslySetInnerHTML={{ __html: this.state.selectedItem }}/>
			<wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
                <wjGrid.FlexGridColumn header="Country" binding="country" width="2*"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Sales" binding="sales" width="*" format="n2"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expenses" binding="expenses" width="*" format="n2"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flexgrid) {
        this.flex = flexgrid;
        // sort the data by country
        let sd = new wjcCore.SortDescription("country", true);
        flexgrid.collectionView.sortDescriptions.push(sd);
        flexgrid.collectionView.currentChanged.addHandler(this.updateCurrentInfo.bind(this));
        this.updateCurrentInfo();
    }
    updateCurrentInfo() {
        this.setState({
            selectedItem: wjcCore.format("Country: <b>{country}</b>, Sales: <b>{sales:c0}</b> Expenses: <b>{expenses:c0}</b>", this.flex.collectionView.currentItem)
        });
    }
    getData() {
        // create some random data
        let countries = "US,Germany,UK,Japan,Italy,Greece".split(","), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
