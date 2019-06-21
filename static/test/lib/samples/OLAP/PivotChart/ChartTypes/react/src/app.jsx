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
            chartTypes: 'Column,Bar,Line,Area,Pie'.split(',')
        };
    }
    render() {
        return <div className="container-fluid">
            <Olap.PivotChart showTitle={true} itemsSource={this.state.ngChart} initialized={this.initializePivotChart.bind(this)} showLegend="Auto">
            </Olap.PivotChart>

            <label>
                Chart Type 
                <Input.ComboBox textChanged={this.onChartTypeChanged.bind(this)} itemsSource={this.state.chartTypes}>
                </Input.ComboBox>
            </label>
        </div>;
    }
    initializePivotChart(pivotChart) {
        this.pivotChart = pivotChart;
        this.pivotChart.engine.fields.getField('Amount').format = 'c0';
    }
    onChartTypeChanged(combo) {
        this.pivotChart.chartType = wjcOlap.PivotChartType[combo.text];
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
