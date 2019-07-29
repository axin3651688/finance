import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcGrid from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: {
                data: null,
                newRowAtTop: false,
                instance: null
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <label>
                newRowAtTop
                <input onChange={this.onValueChanged.bind(this)} type="checkbox"/>
            </label>
            <wjcGrid.FlexGrid initialized={this.initData.bind(this)} allowAddNew={true} allowDelete={true} itemsSource={this.state.grid.data} newRowAtTo={this.state.grid.newRowAtTop}>
            </wjcGrid.FlexGrid>
        </div>;
    }
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
    initData(grid) {
        this.setState({
            grid: {
                instance: grid,
                data: this.getData()
            }
        }, () => {
            this.grid = this.state.grid;
        });
    }
    onValueChanged(evt) {
        this.grid.instance.newRowAtTop = evt.target.checked;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
