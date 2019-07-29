import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { AccessibilityExtender } from './accessibility-extender';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="input-group">
                <div className="input-group-addon">
                <span className="glyphicon glyphicon-search"></span>
                </div>
                <input type="text" className="form-control" id="filter" placeholder="filter">
                </input>
            </div>
            <wjGrid.FlexGrid alternatingRowStep={0} selectionMode="ListBox" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
            </wjGrid.FlexGrid>
        </div>;
    }
    initializeGrid(ctl) {
        this._flex = ctl;
        this._flex.sortedColumn.addHandler((s, e) => {
            var col = s.columns[e.col];
            this._acX.alert('column ' + col.header +
                ' sorted in ' + (col.currentSort == '+' ? 'ascending' : 'descending') + ' order');
        });
        this.setState({
            data: this.getData(100)
        });
    }
    getData(count) {
        // create some random data
        let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Tents,Boots,Knives,Bows,Arrows,Sleeping Bags,Lamps'.split(','), data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
    componentDidMount() {
        this._acX = new AccessibilityExtender(this._flex);
        document.querySelector('#filter').addEventListener('input', (e) => {
            clearTimeout(this._toSearch);
            this._toSearch = setTimeout(() => {
                let target = e.target;
                let search = target.value, rx = new RegExp(search, 'i');
                this._flex.collectionView.filter = (item) => {
                    return !search || JSON.stringify(item).match(rx) != null;
                };
                // notify users that a filter was applied
                setTimeout(() => {
                    let msg = search
                        ? 'grid filtered on ' + search
                        : 'filter removed';
                    msg += ': ' + this._flex.rows.length + ' items displayed';
                    this._acX.alert(msg);
                }, 200);
            }, 900);
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
