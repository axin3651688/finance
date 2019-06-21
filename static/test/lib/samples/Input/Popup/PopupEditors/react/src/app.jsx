import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGrid from '@grapecity/wijmo.react.grid';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData, getCountries } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = getData();
        this._countries = getCountries();
        this.state = {
            id: 0,
            country: '',
            sales: 0,
            expenses: 0
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjGrid.FlexGrid isReadOnly={true} selectionMode="Row" formatItem={this._formatItem} itemsSource={this._data} initialized={this._initGrid.bind(this)}>
                <wjGrid.FlexGridColumn binding="id" header="ID" width={50}>
                </wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="country" header="Country" isRequired={true} dataMap={this._countries}>
                </wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="sales" header="Sales" format="n2">
                </wjGrid.FlexGridColumn>
                <wjGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2">
                </wjGrid.FlexGridColumn>
            </wjGrid.FlexGrid>
            <wjInput.Popup initialized={this._initPopup.bind(this)} className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close wj-hide">&times;</button>
                    <h4 className="modal-title">Edit Item {this.state.id}</h4>
                </div>
                <div className="modal-body">
                    <div className="wj-labeled-input">
                        <wjInput.ComboBox itemsSource={this._countries} selectedValue={this.state.country} selectedIndexChanged={this._changeCountry.bind(this)}>
                        </wjInput.ComboBox>
                        <label htmlFor="country">Country</label>
                    </div>
                    <div className="wj-labeled-input">
                        <wjInput.InputNumber format="n2" min={0} step={100} value={this.state.sales} valueChanged={this._changeSales.bind(this)}>
                        </wjInput.InputNumber>
                        <label htmlFor="sales">Sales</label>
                    </div>
                    <div className="wj-labeled-input">
                        <wjInput.InputNumber format="n2" min={0} step={100} value={this.state.expenses} valueChanged={this._changeExpenses.bind(this)}>
                        </wjInput.InputNumber>
                        <label htmlFor="expenses">Expenses</label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary wj-hide-ok">OK</button>
                        <button type="button" className="btn btn-default wj-hide">Cancel</button>
                    </div>
                </div>
            </wjInput.Popup>
        </div>;
    }
    _initPopup(sender) {
        this._popup = sender;
    }
    _initGrid(flexGrid) {
        flexGrid.hostElement.addEventListener('click', e => {
            let ht = flexGrid.hitTest(e);
            if (ht.panel == flexGrid.rowHeaders) {
                // prepare form
                let item = flexGrid.rows[ht.row].dataItem;
                // clone the current data item
                this.setState({
                    country: item.country,
                    expenses: item.expenses,
                    id: item.id,
                    sales: item.sales
                });
                // show the form
                this._popup.show(true, (sender) => {
                    if (sender.dialogResult == 'wj-hide-ok') {
                        // commit changes if the user pressed the OK button
                        flexGrid.collectionView.editItem(item);
                        item.country = this.state.country;
                        item.sales = this.state.sales;
                        item.expenses = this.state.expenses;
                        flexGrid.collectionView.commitEdit();
                    }
                    // return focus to the grid
                    flexGrid.focus();
                });
            }
        });
    }
    _formatItem(sender, e) {
        if (e.panel == sender.rowHeaders && e.col == 0) {
            e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
        }
    }
    _changeCountry(sender) {
        this.setState({ country: sender.selectedValue });
    }
    _changeSales(sender) {
        this.setState({ sales: sender.value });
    }
    _changeExpenses(sender) {
        this.setState({ expenses: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
