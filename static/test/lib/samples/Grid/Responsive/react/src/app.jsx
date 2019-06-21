import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from '@grapecity/wijmo.grid';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flex: null,
            _defaultRowHeight: 0
        };
    }
    componentDidMount() {
        wjcCore.httpRequest("https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json", {
            success: xhr => {
                let response = JSON.parse(xhr.responseText);
                this.flex.itemsSource = response.value;
                this._updateGridLayout();
            }
        });
        this.setState({
            _defaultRowHeight: this.flex.rows.defaultSize
        });
        this.flex.addEventListener(window, "resize", this._updateGridLayout.bind(this));
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid headersVisibility="Column" initialized={this.initializeGrid.bind(this)}>
                <wjcGrid.FlexGridColumn header="Company" visible={false} width="*" isReadOnly={true} allowDragging={false}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="CompanyName" header="Company Name" width="20*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="ContactName" header="Contact Name" width="15*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="ContactTitle" header="Contact Title" width="20*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="Address" header="Address" width="20*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="City" header="City" width="10*"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="Country" header="Country" width="15*"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    initializeGrid(flex) {
        flex.formatItem.addHandler((s, e) => {
            // show company summary on narrow layout
            if (e.panel == s.cells && e.col == 0) {
                let html = wjcCore.format('<div class="item-header">{CompanyName}</div>' +
                    '<div class="item-detail">{ContactName}, {ContactTitle}</div>' +
                    '<div class="item-detail">{Address}, {City}, {Country}</div>', s.rows[e.row].dataItem);
                e.cell.innerHTML = html;
            }
        });
        this.flex = flex;
    }
    _updateGridLayout() {
        // show/hide columns
        let narrow = this.flex.hostElement.clientWidth < 600;
        this.flex.columns.forEach(col => {
            col.visible = col.index == 0 ? narrow : !narrow;
        });
        // make rows taller on phone layout
        this.flex.rows.defaultSize =
            this.state._defaultRowHeight * (narrow ? 3 : 1);
        // hide column headers on narrow layouts
        this.flex.headersVisibility = narrow
            ? wjGrid.HeadersVisibility.None
            : wjGrid.HeadersVisibility.Column;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
