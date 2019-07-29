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
            data: this._getData()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid className="no-scrollbars" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        this.flex = flex;
        this.flex.hostElement.addEventListener('wheel', (e) => {
            let root = this.flex.hostElement.querySelector('[wj-part="root"]');
            if (root) {
                root.scrollTop += 32 * (e.deltaY < 0 ? -1 : +1);
                e.preventDefault();
            }
        });
    }
    _getData() {
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        let data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
