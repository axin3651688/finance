import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: {
                data: null
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.grid.data}>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        this.setState({
            grid: {
                data: this.getData()
            }
        });
        flex.columnHeaders.rows.push(new wjGrid.Row()); // add a header row
        flex.columnFooters.rows.push(new wjGrid.Row()); // add a footer row
        flex.bottomLeftCells.setCellData(0, 0, 'x'); // show some data on the first cell
    }
    getData() {
        // generate some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
