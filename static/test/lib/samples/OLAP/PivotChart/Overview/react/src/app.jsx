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
import '@grapecity/wijmo.chart.render';
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
            chartTypes: 'Column,Bar,Line,Area,Pie'.split(','),
            showLegendOptions: 'Auto,Always,Never'.split(',')
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
                <br />
            </label>
            <br />
            <label>
                Show Legend
                <Input.ComboBox textChanged={this.onShowLegendOptionChanged.bind(this)} itemsSource={this.state.showLegendOptions}>
                </Input.ComboBox>
            </label>
            <br />
            <label>
                Show Chart Title
                <input id="inputShowChartTitle" type="checkbox" onClick={this.onChartTitleClick.bind(this)}>
                </input>
            </label>
            <br />
            <div onClick={this.onExportClick.bind(this)}>
                Export to
                <button className="btn btn-default">PNG</button>
                <button className="btn btn-default">JPEG</button>
                <button className="btn btn-default">SVG</button>
            </div>

        </div>;
    }
    initializePivotChart(pivotChart) {
        this.pivotChart = pivotChart;
        this.pivotChart.engine.fields.getField('Amount').format = 'c0';
        document.querySelector("#inputShowChartTitle").checked = true;
    }
    onChartTypeChanged(combo) {
        this.pivotChart.chartType = wjcOlap.PivotChartType[combo.text];
    }
    onShowLegendOptionChanged(combo) {
        this.pivotChart.showLegend = wjcOlap.LegendVisibility[combo.text];
    }
    onChartTitleClick(e) {
        this.pivotChart.showTitle = e.target.checked;
    }
    onExportClick(e) {
        if (e.target instanceof HTMLButtonElement) {
            this.pivotChart.saveImageToFile('FlexChart.' + e.target.textContent.trim());
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
