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
            data: this._getData(100),
            rowCount: 0,
            cellCount: 0
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid initialized={this.initializeGrid.bind(this)} itemsSource={this.state.data}>

            </wjcGrid.FlexGrid>
            <p>
                The grid now has <span id='rowCount'>{this.state.rowCount}</span> rows and
                <span id='cellCount'>{this.state.cellCount}</span> cell elements.
            </p>
        </div>;
    }
    _getData(cnt, start) {
        let data = [];
        let countries = 'USA,Germany,UK,Japan,Italy,Greece'.split(',');
        if (!start)
            start = 0;
        for (let i = 0; i < cnt; i++) {
            data.push({
                id: i + start,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 === 0
            });
        }
        return data;
    }
    initializeGrid(flex) {
        this.setState({
            rowCount: flex.rows.length
        });
        this.setState({
            cellCount: flex.hostElement.querySelectorAll('.wj-cell').length
        });
        flex.updatedView.addHandler((s) => {
            this.setState({
                rowCount: s.rows.length
            });
            this.setState({
                cellCount: s.hostElement.querySelectorAll('.wj-cell').length
            });
        });
        flex.scrollPositionChanged.addHandler((s) => {
            // if we're close to the bottom, add 20 items
            if (s.viewRange.bottomRow >= s.rows.length - 1) {
                this._addData(this.state.data, 20);
                s.collectionView.refresh();
            }
        });
    }
    _addData(data, cnt) {
        let more = this._getData(cnt, data.length);
        for (let i = 0; i < more.length; i++) {
            data.push(more[i]);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
