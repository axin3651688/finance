import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as grid from '@grapecity/wijmo.grid';
//
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import { Navigator } from './navigator';
import { getData, getCountries, getProducts, getColors } from './data';
//
var MenuType;
(function (MenuType) {
    MenuType[MenuType["allowAdd"] = 1] = "allowAdd";
    MenuType[MenuType["dataMaps"] = 7] = "dataMaps";
    MenuType[MenuType["formatting"] = 8] = "formatting";
    MenuType[MenuType["headersVisibility"] = 2] = "headersVisibility";
    MenuType[MenuType["itemsCount"] = 3] = "itemsCount";
    MenuType[MenuType["selectionMode"] = 4] = "selectionMode";
    MenuType[MenuType["showMarquee"] = 5] = "showMarquee";
    MenuType[MenuType["showSelectedHeaders"] = 6] = "showSelectedHeaders";
})(MenuType || (MenuType = {}));
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.Values = {
            headersVisibility: ['None', 'Column', 'Row', 'All'],
            itemsCount: [
                { value: 5, text: '5' },
                { value: 50, text: '50' },
                { value: 500, text: '500' },
                { value: 5000, text: '5,000' },
                { value: 50000, text: '50,000' },
                { value: 100000, text: '100,000' },
                { value: 500000, text: '500,000' },
                { value: 1000000, text: '1,000,000' }
            ],
            onOff: [
                { value: true, text: 'On' },
                { value: false, text: 'Off' }
            ],
            selectionMode: ['None', 'Cell', 'CellRange', 'Row', 'RowRange', 'ListBox'],
            yesNo: [
                { value: true, text: 'Yes' },
                { value: false, text: 'No' }
            ]
        };
        //
        this._toFilter = null;
        this._itemsCount = 500;
        this.state = {
            allowAdd: false,
            dataMaps: true,
            filter: '',
            formatting: true,
            headersVisibility: 'All',
            selectionMode: 'CellRange',
            showMarquee: false,
            showSelectedHeaders: 'None',
            data: getData(this._itemsCount),
            selection: ''
        };
    }
    //
    get allowAdd() {
        return this.state.allowAdd;
    }
    set allowAdd(value) {
        if (this.state.allowAdd !== value) {
            this.setState({ allowAdd: value });
        }
    }
    //
    get dataMaps() {
        return this.state.dataMaps;
    }
    set dataMaps(value) {
        if (this.state.dataMaps !== value) {
            this.setState({ dataMaps: value });
            this._updateDataMaps();
        }
    }
    //
    get formatting() {
        return this.state.formatting;
    }
    set formatting(value) {
        if (this.state.formatting !== value) {
            this.setState({ formatting: value });
            this._updateFormatting();
        }
    }
    //
    get filter() {
        return this.state.filter;
    }
    set filter(value) {
        if (this.filter !== value) {
            this.setState({ filter: value });
            this._applyFilter();
        }
    }
    //
    get headersVisibility() {
        return this.state.headersVisibility;
    }
    set headersVisibility(value) {
        if (this.state.headersVisibility !== value) {
            this.setState({ headersVisibility: value });
        }
    }
    //
    get itemsCount() {
        return this._itemsCount;
    }
    set itemsCount(value) {
        if (this._itemsCount !== value) {
            this._itemsCount = value;
            this.setState({ data: getData(value) });
        }
    }
    //
    get selectionMode() {
        return this.state.selectionMode;
    }
    set selectionMode(value) {
        if (this.state.selectionMode !== value) {
            this.setState({ selectionMode: value });
        }
    }
    //
    get showMarquee() {
        return this.state.showMarquee;
    }
    set showMarquee(value) {
        if (this.state.showMarquee !== value) {
            this.setState({ showMarquee: value });
        }
    }
    //
    get showSelectedHeaders() {
        return this.state.showSelectedHeaders;
    }
    set showSelectedHeaders(value) {
        if (this.state.showSelectedHeaders !== value) {
            this.setState({ showSelectedHeaders: value });
        }
    }
    //
    componentDidMount() {
        this._updateDataMapSettings();
    }
    //
    render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 col-xs-4'>
                    <input type='text' className='form-control app-pad' placeholder='Filter' value={this.filter} onChange={this._filterChanged.bind(this)}/>
                </div>
                <div className='col-md-6 col-xs-8'>
                    <Navigator view={this.state.data} className='pull-right'>
                    </Navigator>
                </div>
            </div>

            <wjGrid.FlexGrid allowAddNew={this.allowAdd} allowMerging='All' allowResizing='Both' headersVisibility={this.headersVisibility} selectionMode={this.selectionMode} showMarquee={this.showMarquee} showSelectedHeaders={this.showSelectedHeaders} stickyHeaders={true} itemsSource={this.state.data} initialized={this._gridInitialized.bind(this)} itemsSourceChanged={this._gridItemsSourceChanged.bind(this)} selectionChanged={this._gridSelectionChanged.bind(this)}>
            </wjGrid.FlexGrid>

            <div className='well'>
                <div className='grid-sort-group form-group row'>
                    <p>Selection: <b>{this.state.selection}</b></p>

                    <wjInput.Menu header={'<b>Items:</b> ' + this._getText(this.Values.itemsCount, this._itemsCount)} selectedValuePath='value' displayMemberPath='text' selectedValue={this.itemsCount} itemsSource={this.Values.itemsCount} selectedIndexChanged={this._menuChanged.bind(this, MenuType.itemsCount)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Allow Add:</b> ' + this._getText(this.Values.yesNo, this.allowAdd)} selectedValuePath='value' displayMemberPath='text' selectedValue={this.allowAdd} itemsSource={this.Values.yesNo} selectedIndexChanged={this._menuChanged.bind(this, MenuType.allowAdd)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Selection:</b> ' + this.selectionMode} selectedValue={this.selectionMode} itemsSource={this.Values.selectionMode} selectedIndexChanged={this._menuChanged.bind(this, MenuType.selectionMode)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Headers Visibility:</b> ' + this.headersVisibility} selectedValue={this.headersVisibility} itemsSource={this.Values.headersVisibility} selectedIndexChanged={this._menuChanged.bind(this, MenuType.headersVisibility)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Show Selected Headers:</b> ' + this.showSelectedHeaders} selectedValue={this.showSelectedHeaders} itemsSource={this.Values.headersVisibility} selectedIndexChanged={this._menuChanged.bind(this, MenuType.showSelectedHeaders)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Show Marquee:</b> ' + this._getText(this.Values.yesNo, this.showMarquee)} selectedValuePath='value' displayMemberPath='text' selectedValue={this.showMarquee} itemsSource={this.Values.yesNo} selectedIndexChanged={this._menuChanged.bind(this, MenuType.showMarquee)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Data Maps:</b> ' + this._getText(this.Values.onOff, this.dataMaps)} selectedValuePath='value' displayMemberPath='text' selectedValue={this.dataMaps} itemsSource={this.Values.onOff} selectedIndexChanged={this._menuChanged.bind(this, MenuType.dataMaps)}>
                    </wjInput.Menu>

                    <wjInput.Menu header={'<b>Formatting:</b> ' + this._getText(this.Values.onOff, this.formatting)} selectedValuePath='value' displayMemberPath='text' selectedValue={this.formatting} itemsSource={this.Values.onOff} selectedIndexChanged={this._menuChanged.bind(this, MenuType.formatting)}>
                    </wjInput.Menu>

                    <br />
                    <br />

                    <button className='btn btn-default' onClick={this._toggleColumnVisibility.bind(this)}>
                        Show/Hide Column
                    </button>
                    <button className='btn btn-default' onClick={this._changeColumnSize.bind(this)}>
                        Resize Column
                    </button>
                    <button className='btn btn-default' onClick={this._toggleRowVisibility.bind(this)}>
                        Show/Hide Row
                    </button>
                    <button className='btn btn-default' onClick={this._changeRowSize.bind(this)}>
                        Resize Row
                    </button>
                    <button className='btn btn-default' onClick={this._changeDefaultRowSize.bind(this)}>
                        Default Row Size
                    </button>
                    <button className='btn btn-default' onClick={this._changeScrollPosition.bind(this)}>
                        Scroll Position
                    </button>
                </div>
            </div>
        </div>;
    }
    //
    // apply filter (applied on a 500 ms timeOut)
    _applyFilter() {
        if (this._toFilter) {
            clearTimeout(this._toFilter);
        }
        //
        this._toFilter = setTimeout(() => {
            this._toFilter = null;
            if (this._grid) {
                let view = this._grid.collectionView;
                if (view) {
                    if (!this.filter) {
                        view.filter = null;
                    }
                    else {
                        if (!view.filter) {
                            view.filter = this._filterFunction.bind(this);
                        }
                        else {
                            view.refresh();
                        }
                    }
                }
            }
        }, 500);
    }
    //
    // ICollectionView filter function
    _filterFunction(item) {
        let f = this.filter;
        if (f && item) {
            //
            // split string into terms to enable multi-field searches such as 'us gadget red'
            let terms = f.toUpperCase().split(' ');
            //
            // look for any term in any string field
            for (let i = 0; i < terms.length; i++) {
                let termFound = false;
                for (let key in item) {
                    let value = item[key];
                    if (wijmo.isString(value) && value.toUpperCase().indexOf(terms[i]) > -1) {
                        termFound = true;
                        break;
                    }
                }
                //
                // fail if any of the terms is not found
                if (!termFound) {
                    return false;
                }
            }
        }
        //
        // include item in view
        return true;
    }
    //
    _toggleColumnVisibility() {
        let col = this._grid.columns[0];
        col.visible = !col.visible;
    }
    //
    _changeColumnSize() {
        let col = this._grid.columns[0];
        col.visible = true;
        col.width = col.width < 0 ? 60 : -1;
        col = this._grid.rowHeaders.columns[0];
        col.width = col.width < 0 ? 40 : -1;
    }
    //
    _toggleRowVisibility() {
        let row = this._grid.rows[0];
        row.visible = !row.visible;
    }
    //
    _changeRowSize() {
        let row = this._grid.rows[0];
        row.visible = true;
        row.height = row.height < 0 ? 80 : -1;
        row = this._grid.columnHeaders.rows[0];
        row.height = row.height < 0 ? 80 : -1;
    }
    //
    _changeDefaultRowSize() {
        this._grid.rows.defaultSize = this._grid.rows.defaultSize == 28 ? 65 : 28;
    }
    //
    _changeScrollPosition() {
        let flex = this._grid;
        if (flex.scrollPosition.y == 0) {
            let sz = flex.scrollSize;
            flex.scrollPosition = new wijmo.Point(-sz.width / 2, -sz.height / 2);
        }
        else {
            flex.scrollPosition = new wijmo.Point(0, 0);
        }
    }
    //
    _gridInitialized(sender) {
        this._grid = sender;
        this.setState({
            selection: this._cellRangeToString(sender.selection)
        });
    }
    //
    _gridSelectionChanged(sender) {
        this.setState({
            selection: this._cellRangeToString(sender.selection)
        });
    }
    //
    _gridItemsSourceChanged(sender) {
        // make columns 25% wider (for readability and to show how)
        sender.columns.forEach((col) => col.width = col.renderSize * 1.25);
        //
        // update data maps and formatting
        this._updateDataMapSettings();
        //
        // clear filter
        // this.filter = '';
    }
    //
    _filterChanged(e) {
        this.filter = e.target.value;
    }
    //
    _menuChanged(type, menu) {
        if (menu.selectedIndex < 0) {
            return;
        }
        //
        switch (type) {
            case MenuType.itemsCount:
                this.itemsCount = menu.selectedValue;
                break;
            case MenuType.allowAdd:
                this.allowAdd = menu.selectedValue;
                break;
            case MenuType.dataMaps:
                this.dataMaps = menu.selectedValue;
                break;
            case MenuType.formatting:
                this.formatting = menu.selectedValue;
                break;
            case MenuType.headersVisibility:
                this.headersVisibility = menu.selectedValue;
                break;
            case MenuType.selectionMode:
                this.selectionMode = menu.selectedValue;
                break;
            case MenuType.showMarquee:
                this.showMarquee = menu.selectedValue;
                break;
            case MenuType.showSelectedHeaders:
                this.showSelectedHeaders = menu.selectedValue;
                break;
        }
    }
    //
    _getText(map, value) {
        return map.filter(val => val.value === value)[0].text;
    }
    //
    _cellRangeToString(value) {
        let rng = '';
        //
        if (value instanceof grid.CellRange) {
            rng = `(${value.row};${value.col})`;
            if (!value.isSingleCell) {
                rng += `-(${value.row2};${value.col2})`;
            }
        }
        return rng;
    }
    //
    // apply/remove data maps
    _updateDataMaps() {
        if (!this._grid) {
            return;
        }
        //
        let country = this._grid.columns.getColumn('countryId'), product = this._grid.columns.getColumn('productId'), color = this._grid.columns.getColumn('colorId');
        //
        if (country && product && color) {
            if (this.dataMaps == true) {
                country.showDropDown = true; // show drop-down for countries
                product.showDropDown = false; // don't show it for products
                color.showDropDown = false; // or colors (just to show how)
                country.dataMap = this._buildDataMap(getCountries());
                product.dataMap = this._buildDataMap(getProducts());
                color.dataMap = this._buildDataMap(getColors());
            }
            else {
                country.dataMap = null;
                product.dataMap = null;
                color.dataMap = null;
            }
        }
    }
    //
    // build a data map from a string array using the indices as keys
    _buildDataMap(items) {
        let map = items.map((v, i) => ({ key: i, value: v }));
        return new grid.DataMap(map, 'key', 'value');
    }
    //
    // apply/remove column formatting
    _updateFormatting() {
        if (!this._grid) {
            return;
        }
        //
        let fmt = this.formatting;
        this._setColumnFormat('amount', fmt ? 'c' : null);
        this._setColumnFormat('amount2', fmt ? 'c' : null);
        this._setColumnFormat('discount', fmt ? 'p0' : null);
        this._setColumnFormat('start', fmt ? 'MMM d yy' : null);
        this._setColumnFormat('end', fmt ? 'HH:mm' : null);
    }
    //
    _setColumnFormat(name, format) {
        let col = this._grid.columns.getColumn(name);
        if (col) {
            col.format = format;
        }
    }
    //
    _updateDataMapSettings() {
        this._updateDataMaps();
        this._updateFormatting();
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
