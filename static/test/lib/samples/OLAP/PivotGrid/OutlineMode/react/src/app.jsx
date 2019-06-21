import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PivotPanel, PivotGrid } from '@grapecity/wijmo.react.olap';
import { PivotEngine } from '@grapecity/wijmo.olap';
import { CellRange } from '@grapecity/wijmo.grid';
import { getData } from './data';
class App extends React.Component {
    // initialize state
    constructor(props) {
        super(props);
        // handle checkboxes
        this.handleInputChange = function (event) {
            const id = event.target.id;
            const checked = event.target.checked;
            this.setState({
                [id]: checked
            });
            switch (id) {
                case 'totalsBeforeData': // update engine from state
                    this.ng.totalsBeforeData = checked;
                    break;
                case 'outlineMode': // changing outlineMode resets subtotal position, style 
                    this.setState({ totalsBeforeData: checked, customStyle: checked });
                    this.ng.totalsBeforeData = checked;
                    break;
            }
        }.bind(this);
        // export grid to CSV
        this.exportToCsv = function () {
            var grid = this.grid, rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1), csv = grid.getClipString(rng, true, true, true);
            this.exportFile(csv, 'FlexGrid.csv');
        }.bind(this);
        this.ng = new PivotEngine({
            itemsSource: getData(1000),
            showRowTotals: 'Subtotals',
            showColumnTotals: 'None',
            totalsBeforeData: true,
            rowFields: ['Country', 'Product', 'Color'],
            valueFields: ['Sales', 'Expenses', 'Downloads']
        });
        this.state = {
            outlineMode: true,
            customStyle: true,
            totalsBeforeData: true,
            showRowFieldHeaders: true
        };
    }
    exportFile(csv, fileName) {
        var fileType = 'txt/csv;charset=utf-8';
        if (navigator.msSaveBlob) { // IE 
            navigator.msSaveBlob(new Blob([csv], {
                type: fileType
            }), fileName);
        }
        else {
            var e = document.createElement('a');
            e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(csv));
            e.setAttribute('download', fileName);
            e.style.display = 'none';
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        }
    }
    render() {
        return (<div className="container-fluid">
                <label>
                    outlineMode{' '}
                    <input id="outlineMode" type="checkbox" checked={this.state.outlineMode} onChange={this.handleInputChange}/>
                </label><br />
                <label>
                    custom style{' '}
                    <input id="customStyle" type="checkbox" checked={this.state.customStyle} onChange={this.handleInputChange}/>
                </label><br />
                <label>
                    totalsBeforeData{' '}
                    <input id="totalsBeforeData" type="checkbox" checked={this.state.totalsBeforeData} onChange={this.handleInputChange}/>
                </label><br />
                <label>
                    showRowFieldHeaders{' '}
                    <input id="showRowFieldHeaders" type="checkbox" checked={this.state.showRowFieldHeaders} onChange={this.handleInputChange}/>
                </label><br />
                <div className="row">
                    <div className="col-xs-5">
                        <PivotPanel itemsSource={this.ng}>
                        </PivotPanel>
                    </div>
                    <div className={'col-xs-7' + (this.state.customStyle ? ' outline' : '')}>
                        <PivotGrid initialized={sender => { this.grid = sender; }} // save reference to the grid
         itemsSource={this.ng} outlineMode={this.state.outlineMode} showRowFieldHeaders={this.state.showRowFieldHeaders}>
                        </PivotGrid>
                        <button className="btn btn-primary" onClick={this.exportToCsv}>
                            Export to CSV
                        </button>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
