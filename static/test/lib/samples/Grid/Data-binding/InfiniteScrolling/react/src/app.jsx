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
            data: this.getData(100),
            rowCount: "",
            cellCount: ""
        };
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)} itemsSource={this.state.data}>
            </wjGrid.FlexGrid>
			<p>
            	The grid now has {this.state.rowCount} rows and
            	{this.state.cellCount} cell elements.
        	</p>
        </div>;
    }
    flexInitialized(flexgrid) {
        this.setState({
            rowCount: flexgrid.rows.length.toString(),
            cellCount: flexgrid.hostElement
                .querySelectorAll(".wj-cell")
                .length.toString()
        });
        flexgrid.updatedView.addHandler((s, e) => {
            this.setState({
                rowCount: s.rows.length.toString(),
                cellCount: s.hostElement
                    .querySelectorAll(".wj-cell")
                    .length.toString()
            });
        });
        flexgrid.scrollPositionChanged.addHandler((s, e) => {
            // if we're close to the bottom, add 20 items
            if (s.viewRange.bottomRow >= s.rows.length - 1) {
                this.addData(this.state.data, 20);
                s.collectionView.refresh();
            }
        });
    }
    updateCurrentInfo() {
        this.setState({
            selectedItem: wjcCore.format("Country: <b>{country}</b>, Sales: <b>{sales:c0}</b> Expenses: <b>{expenses:c0}</b>", this.flex.collectionView.currentItem)
        });
    }
    addData(data, cnt) {
        let more = this.getData(cnt, data.length);
        for (let i = 0; i < more.length; i++) {
            data.push(more[i]);
        }
    }
    getData(cnt, start) {
        let data = [];
        let countries = "USA,Germany,UK,Japan,Italy,Greece".split(",");
        if (start == null) {
            start = 0;
        }
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
}
ReactDOM.render(<App />, document.getElementById('app'));
