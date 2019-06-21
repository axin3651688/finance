import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from '@grapecity/wijmo';
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            gridFilter: null,
            flexGrid: null
        };
    }
    componentDidMount() {
        this.setState({
            gridFilter: new wjGridFilter.FlexGridFilter(this.flexGrid)
        });
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.data} initialized={this.initGrid.bind(this)}>
            </wjcGrid.FlexGrid>
            <button className="btn btn-default" onClick={this.onSaveStateClick.bind(this)}>Save State</button>
            <button className="btn btn-default" onClick={this.onRestoreClick.bind(this)}>Restore State</button>
        </div>;
    }
    initGrid(grid) {
        this.flexGrid = grid;
    }
    onSaveStateClick() {
        var state = {
            columns: this.flexGrid.columnLayout,
            filterDefinition: this.state.gridFilter.filterDefinition,
            sortDescriptions: this.flexGrid.collectionView.sortDescriptions.map(function (sortDesc) {
                return { property: sortDesc.property, ascending: sortDesc.ascending };
            })
        };
        localStorage['gridState'] = JSON.stringify(state);
    }
    onRestoreClick() {
        var json = localStorage['gridState'];
        if (json) {
            var state = JSON.parse(json);
            // restore column layout (order/width)
            this.flexGrid.columnLayout = state.columns;
            // restore filter definitions
            this.state.gridFilter.filterDefinition = state.filterDefinition;
            // restore sort state
            var view = this.flexGrid.collectionView;
            view.deferUpdate(function () {
                view.sortDescriptions.clear();
                for (var i = 0; i < state.sortDescriptions.length; i++) {
                    var sortDesc = state.sortDescriptions[i];
                    view.sortDescriptions.push(new wjcCore.SortDescription(sortDesc.property, sortDesc.ascending));
                }
            });
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
