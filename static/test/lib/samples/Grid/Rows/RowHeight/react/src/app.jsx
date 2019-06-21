import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: {
                data: this.getData()
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <h3>
                Default Cell Padding: 3px</h3>
            <wjcGrid.FlexGrid itemsSource={this.state.grid.data}></wjcGrid.FlexGrid>
            <h3>
                Custom Cell Padding: 8px</h3>
            <wjcGrid.FlexGrid id="theGridTallRows" itemsSource={this.state.grid.data}></wjcGrid.FlexGrid>
        </div>;
    }
    getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cameras,Stereos'.split(','), data = [];
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
