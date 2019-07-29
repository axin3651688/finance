import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ngChart: new wjcOlap.PivotEngine({
                itemsSource: getData(),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
            })
        };
    }
    render() {
        return <div className="container-fluid">
            <Olap.PivotChart showTitle={true} itemsSource={this.state.ngChart} initialized={this.initializePivotChart.bind(this)} showLegend="Auto">
            </Olap.PivotChart>

            <br />
            <label>
                Show Chart Title
                <input id="inputShowChartTitle" type="checkbox" onClick={this.onChartTitleClick.bind(this)}>
                </input>
            </label>
        </div>;
    }
    initializePivotChart(pivotChart) {
        this.pivotChart = pivotChart;
        this.pivotChart.engine.fields.getField('Amount').format = 'c0';
        document.querySelector("#inputShowChartTitle").checked = true;
    }
    onChartTitleClick(e) {
        this.pivotChart.showTitle = e.target.checked;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
