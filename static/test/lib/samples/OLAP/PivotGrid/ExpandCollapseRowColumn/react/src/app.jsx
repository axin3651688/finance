import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
                showRowTotals: 'Subtotals',
                showColumnTotals: 'Subtotals',
            }),
            collapsibleSubtotals: true
        };
    }
    initializePivotGrid(pivotGrid) {
        this.pivotGrid = pivotGrid;
    }
    onTotalsBeforeDataClick(e) {
        this.pivotGrid.engine.totalsBeforeData = e.target.checked;
    }
    onCollapsibleSubtotalsClick(e) {
        this.setState({
            collapsibleSubtotals: !this.state.collapsibleSubtotals
        });
        this.pivotGrid.collapsibleSubtotals = e.target.checked;
    }
    componentDidMount() {
        this.state.ng.fields.getField('Amount').format = 'c0';
        this.state.ng.fields.getField('Date').format = 'yyyy';
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <Olap.PivotGrid itemsSource={this.state.ng} initialized={this.initializePivotGrid.bind(this)}></Olap.PivotGrid>
                    </div>
                </div>
                <p>
                    You can configure the <b>PivotEngine</b> to show the subtotals
                    before or after the data using the <b>totalsBeforeData</b>
                    property:
                </p>
                <label>
                    totalsBeforeData:
                    <input id="totalsBeforeData" type="checkbox" onClick={this.onTotalsBeforeDataClick.bind(this)}/>
                </label>
                <p>
                    You can configure the <b>PivotGrid</b> to make row and column
                    groups collapsible using the <b>collapsibleSubtotals</b>
                    property:
                </p>
                <label>
                    collapsibleSubtotals:
                    <input id="collapsibleSubtotals" type="checkbox" checked={this.state.collapsibleSubtotals} onClick={this.onCollapsibleSubtotalsClick.bind(this)}/>
                </label>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
