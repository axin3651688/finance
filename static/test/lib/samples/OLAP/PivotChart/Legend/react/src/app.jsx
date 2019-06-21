import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as Input from '@grapecity/wijmo.react.input';
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
            }),
            showLegendOptions: 'Auto,Always,Never'.split(',')
        };
    }
    render() {
        return <div className="container-fluid">
            <Olap.PivotChart showTitle={true} itemsSource={this.state.ngChart} initialized={this.initializePivotChart.bind(this)} showLegend="Auto">
            </Olap.PivotChart>

            <br />
            <label>
                Show Legend
                <Input.ComboBox textChanged={this.onShowLegendOptionChanged.bind(this)} itemsSource={this.state.showLegendOptions}>
                </Input.ComboBox>
            </label>
        </div>;
    }
    initializePivotChart(pivotChart) {
        this.pivotChart = pivotChart;
        this.pivotChart.engine.fields.getField('Amount').format = 'c0';
    }
    onShowLegendOptionChanged(combo) {
        this.pivotChart.showLegend = wjcOlap.LegendVisibility[combo.text];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
