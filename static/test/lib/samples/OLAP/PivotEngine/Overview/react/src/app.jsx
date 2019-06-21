import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as Grid from '@grapecity/wijmo.react.grid';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.initializePivotGrid = (pivotGrid) => {
            pivotGrid.engine.fields.getField('Amount').format = 'c0';
        };
        this.state = {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(10000),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'] // by buyer and by type)
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <p>Raw data:</p>
                        <Grid.FlexGrid itemsSource={this.state.ng.collectionView}></Grid.FlexGrid>
                    </div>
                    <div className="col-xs-7">
                        <p>
                            Amount spent by each buyer on each expense type.
                    </p>
                        <Olap.PivotGrid itemsSource={this.state.ng} initialized={this.initializePivotGrid}></Olap.PivotGrid>
                    </div>
                </div>
                <p>
                    The view is live. If you edit the raw data, the summary
                    view is automatically updated.
                </p>
                <p>
                    The pivot grid shows how much each person spent on each
                    type of expense. If you double-click any cell, you will
                    see a detail dialog showing the items that make up the
                    total.
                </p>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
