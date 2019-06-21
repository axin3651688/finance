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
import '@grapecity/wijmo.chart.render';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ngChart: new wjcOlap.PivotEngine({
                itemsSource: getData(),
                valueFields: ['Amount'],
                rowFields: ['Buyer', 'Type'],
            }),
            showTitle: true
        };
    }
    render() {
        return <div className="container-fluid">
            <Olap.PivotChart showTitle={this.state.showTitle} itemsSource={this.state.ngChart} initialized={this.initializePivotChart.bind(this)} showLegend="Auto">
            </Olap.PivotChart>
            <br />
            <label>
            Show Chart Title <input id="chartTitle" type="checkbox" defaultChecked onChange={this.handleInputChange.bind(this)}/>
            </label>
            <div className="btn-container" onClick={this.onExportClick.bind(this)}>
                Export to
                <button className="btn btn-default">PNG</button>
                <button className="btn btn-default">JPEG</button>
                <button className="btn btn-default">SVG</button>
            </div>

        </div>;
    }
    handleInputChange(input) {
        this.setState({ showTitle: input.target.checked });
    }
    initializePivotChart(pivotChart) {
        this.pivotChart = pivotChart;
        this.pivotChart.engine.fields.getField('Amount').format = 'c0';
    }
    onExportClick(e) {
        if (e.target instanceof HTMLButtonElement) {
            this.pivotChart.saveImageToFile('FlexChart.' + e.target.textContent.trim());
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
