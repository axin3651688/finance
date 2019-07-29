import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from '@grapecity/wijmo';
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
            <button onClick={this.scrollIntoView.bind(this)} className="btn btn-default">
                Scroll Row 100 Into View
            </button>
            <button onClick={this.scrollToTop.bind(this)} className="btn btn-default">
                Set Top Cell to Row 100
            </button>
            <wjcGrid.FlexGrid itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        this.flex = flex;
    }
    scrollIntoView() {
        this.flex.scrollIntoView(100, -1);
    }
    scrollToTop() {
        // get cell rect, adjust scrollPosition.y to bring it to the top
        let rc = this.flex.cells.getCellBoundingRect(100, 0, true);
        this.flex.scrollPosition = new wjcCore.Point(this.flex.scrollPosition.x, -rc.top);
    }
    _getData() {
        let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','), data = [];
        for (let i = 0; i < 200; i++) {
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
