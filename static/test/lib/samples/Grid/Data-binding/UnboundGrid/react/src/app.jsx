import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjcGrid from "@grapecity/wijmo.grid";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="container-fluid">
			<wjGrid.FlexGrid initialized={this.flexInitialized.bind(this)}>
            </wjGrid.FlexGrid>
        </div>;
    }
    flexInitialized(flex) {
        this.flex = flex;
    }
    update() {
        if (this.flex) {
            this.flex.allowResizing = wjcGrid.AllowResizing.Both;
            this.flex.allowDragging = wjcGrid.AllowDragging.Both;
            let r, c, i;
            // add 50 rows, 10 columns
            for (r = 0; r < 50; r++) {
                this.flex.rows.push(new wjcGrid.Row());
            }
            for (c = 0; c < 10; c++) {
                this.flex.columns.push(new wjcGrid.Column());
            }
            // populate the scrollable area
            for (r = 0; r < this.flex.rows.length; r++) {
                for (c = 0; c < this.flex.columns.length; c++) {
                    this.flex.setCellData(r, c, "r" + r + ",c" + c);
                }
            }
            // add 3 rows to the column header and 3 columns to the row header panels
            for (i = 0; i < 3; i++) {
                this.flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
                this.flex.rowHeaders.columns.insert(0, new wjcGrid.Column());
            }
            // populate the fixed area
            let p = this.flex.columnHeaders;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, "cHdr r" + r + ",c" + c);
                }
            }
            p = this.flex.rowHeaders;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, "rHdr r" + r + ",c" + c);
                }
            }
            p = this.flex.topLeftCells;
            for (r = 0; r < p.rows.length; r++) {
                for (c = 0; c < p.columns.length; c++) {
                    p.setCellData(r, c, "tl r" + r + ",c" + c);
                }
            }
        }
    }
    componentDidMount() {
        this.update();
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
