import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this.state = {
            data: this.getData(),
            countries: this.countries
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
                <wjGrid.FlexGridColumn header="ID" binding="id" width={50}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Country" binding="country" dataMap={this.state.countries}></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Sales" binding="sales"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Expenses" binding="expenses"></wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn header="Overdue" binding="overdue"></wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.gotFocus.addHandler(() => {
            flex.startEditing(false); // quick mode
        });
        flex.selectionChanged.addHandler(() => {
            setTimeout(() => {
                flex.startEditing(false); // quick mode
            }, 50); // let the grid update first
        });
    }
    getData() {
        let data = [];
        for (let i = 0; i < this.countries.length; i++) {
            data.push({
                id: i,
                country: this.countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: i % 4 == 0
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
