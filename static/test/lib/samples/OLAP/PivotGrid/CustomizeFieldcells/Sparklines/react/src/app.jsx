import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as Olap from '@grapecity/wijmo.react.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data';
const maxSparkLength = 25;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(1000),
                showColumnTotals: 'Subtotals',
                showRowTotals: 'Subtotals',
                fields: [
                    { binding: 'product', header: 'Product', width: 100 },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q', width: 100 },
                    { binding: 'sales', header: 'Sales', format: 'n0', width: 100 },
                    { binding: 'sales', header: 'Sparklines', width: 100 },
                    { binding: 'sales', header: 'Sparkbars', width: 100 }
                ],
                rowFields: ['Date'],
                columnFields: ['Product'],
                valueFields: ['Sales', 'Sparklines', 'Sparkbars']
            })
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-5">
                        <Olap.PivotPanel itemsSource={this.state.ng}></Olap.PivotPanel>
                    </div>
                    <div className="col-xs-7">
                        <Olap.PivotGrid itemsSource={this.state.ng} isReadOnly={true} initialized={this.initializePivotGrid.bind(this)} formatItem={this.formatItem.bind(this)}></Olap.PivotGrid>
                    </div>
                </div>
            </div>);
    }
    initializePivotGrid(sender) {
        this._grid = sender;
    }
    formatItem(s, e) {
        // we want the cells panel
        let g = this._grid;
        if (e.panel == this._grid.cells) {
            // we want the 'Sparklines' and 'Sparkbars' value fields
            let ng = g.engine, field = ng.valueFields[e.col % ng.valueFields.length], item = g.rows[e.row].dataItem, binding = g.columns[e.col].binding, spark = field.header == 'Sparklines' || field.header == 'Sparkbars';
            //
            // add/remove spark class
            wjcCore.toggleClass(e.cell, 'spark', spark);
            // add sparklines
            if (spark) {
                // if we have the data, show it
                if (item.sparkData) {
                    let data = item.sparkData, delta = data[data.length - 1] - data[0];
                    //
                    e.cell.innerHTML = field.header == 'Sparklines'
                        ? this._getSparklines(item.sparkData)
                        : this._getSparkbars(item.sparkData);
                    wjcCore.toggleClass(e.cell, 'spark-up', delta > 0);
                    wjcCore.toggleClass(e.cell, 'spark-down', delta < 0);
                }
                // we dont have the data yet, so go get it
                if (!item.sparkData) {
                    e.cell.innerHTML = '';
                    setTimeout(() => {
                        let detail = g.engine.getDetail(item, binding), len = detail.length;
                        if (len > maxSparkLength) {
                            detail = detail.slice(len - maxSparkLength);
                        }
                        item.sparkData = detail.map(dataItem => dataItem.sales);
                        g.invalidate(); // invalidate to show the sparlines
                    });
                }
            }
        }
    }
    // generate sparklines as SVG
    _getSparklines(data) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">', min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), x1 = 0, y1 = this._scaleY(data[0], min, max);
        //
        for (let i = 1; i < data.length; i++) {
            let x2 = Math.round((i) / (data.length - 1) * 100), y2 = this._scaleY(data[i], min, max);
            //
            svg += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" />`;
            x1 = x2;
            y1 = y2;
        }
        //
        svg += '</svg>';
        return svg;
    }
    _getSparkbars(data) {
        if (!data.length) {
            return '';
        }
        //
        let svg = '<svg width="100%" height="100%">', min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), base = Math.min(max, Math.max(min, 0)), basey = this._scaleY(base, min, max), w = Math.round(100 / data.length) - 2;
        //
        for (let i = 0; i < data.length; i++) {
            let x = i * Math.round(100 / data.length) + 1, y = this._scaleY(data[i], min, max);
            svg += `<rect x="${x}%" width="${w}%" y="${Math.min(y, basey)}%" height="${Math.abs(y - basey)}%" />`;
        }
        //
        svg += `<rect x="0%" width="100%" height="1" y="${basey}%" opacity="0.5" />`;
        svg += '</svg>';
        return svg;
    }
    _scaleY(value, min, max) {
        if (min === max) {
            return 0;
        }
        //
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
