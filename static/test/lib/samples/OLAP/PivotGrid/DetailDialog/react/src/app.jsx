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
            ngFmt: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'None',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'sales', header: 'Diff', format: 'p0', showAs: 'DiffRowPct' }
                ],
                rowFields: ['Date'],
                columnFields: ['Product'],
                valueFields: ['Sales', 'Diff']
            })
        };
    }
    initializePivotGrid(pivotGrid) {
        this.pivotGrid = pivotGrid;
    }
    formatItem(s, e) {
        // we are interested in the cells panel
        if (e.panel == this.pivotGrid.cells) {
            // remove color by default
            let color = '';
            // format diff columns if custom formatting is on
            if (e.col % 2 == 1) {
                let value = this.pivotGrid.getCellData(e.row, e.col, false), glyph = 'circle', span = ' <span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                color = '#d8b400';
                if (value != null) {
                    if (value < 0) { // negative variation
                        color = '#9f0000';
                        glyph = 'down';
                    }
                    else if (value > 0.05) { // positive variation
                        color = '#4c8f00';
                        glyph = 'up';
                    }
                    e.cell.innerHTML += span.replace('{glyph}', glyph);
                }
            }
            // apply cell color
            e.cell.style.color = color;
        }
    }
    onShowDetailClick() {
        let sel = this.pivotGrid.selection;
        if (sel.isValid) {
            this.pivotGrid.showDetail(sel.row, sel.col);
        }
        else {
            alert('Please select a cell in the PivotGrid first.');
        }
    }
    render() {
        return (<div className="container-fluid">
                <p>
                    <button id="showDetail" className="btn btn-primary" onClick={this.onShowDetailClick.bind(this)}>
                        Show Detail Dialog
                    </button>
                </p>
                <p>
                    The grid exposes the detail dialog through its
                    <b>detailDialog</b> property, which can be used to customize
                    the dialog as shown in this example.
                </p>
                <p>
                    <label>
                        Custom Detail Dialog
                        <input id="customDetails" type="checkbox" checked={true}/>
                    </label>
                </p>
                <Olap.PivotGrid itemsSource={this.state.ngFmt} isReadOnly={true} initialized={this.initializePivotGrid.bind(this)} formatItem={this.formatItem.bind(this)}></Olap.PivotGrid>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
