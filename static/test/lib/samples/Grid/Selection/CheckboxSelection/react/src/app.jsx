import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(100)
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid deferResizing={true} alternatingRowStep={0} headersVisibility="Column" selectionMode="Cell" itemsSource={this.state.data} initialized={this.initializeGrid.bind(this)}>

            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.formatItem.addHandler((s, e) => {
            if (e.panel == s.columnHeaders) {
                if (s.columns[e.col].binding == 'sel') {
                    e.cell.innerHTML = '<input class="select-all" tabindex="-1" type="checkbox">';
                    this._updateSelectAllBox(s);
                }
            }
            else if (e.panel == s.cells) {
                wjcCore.setAttribute(e.cell.parentElement, 'aria-selected', s.rows[e.row].dataItem.sel);
            }
        });
        // initialize column widths
        flex.autoSizeColumns(null, null, null, 18);
        // select/de-select all items when user clicks the check box on the header
        flex.hostElement.addEventListener('click', (e) => {
            if (wjcCore.hasClass(e.target, 'select-all') &&
                e.target instanceof HTMLInputElement) {
                flex.deferUpdate(() => {
                    flex.collectionView.items.forEach((item) => {
                        item.sel = (e.target).checked;
                    });
                });
            }
        });
    }
    _updateSelectAllBox(grid) {
        let cb = grid.hostElement.querySelector('.select-all');
        if (cb instanceof HTMLInputElement) {
            let items = grid.collectionView.items, last = null, indeterminate = false;
            for (let i = 0; i < items.length; i++) {
                if (last != null && items[i].sel != last) {
                    indeterminate = true;
                    break;
                }
                last = items[i].sel;
            }
            cb.checked = last;
            if (indeterminate) {
                cb.indeterminate = true;
            }
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
