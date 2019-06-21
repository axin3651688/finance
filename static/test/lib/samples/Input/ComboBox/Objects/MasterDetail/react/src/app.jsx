import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = getData();
        this.state = {
            item: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theCombo">Select an item:</label>
                <wjInput.ComboBox id="theCombo" displayMemberPath="country" itemsSource={this._data} initialized={this._initCombo.bind(this)} selectedIndexChanged={this._onSelectedIndexChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            {this.state.item
            ? (<div>
                            <div>Country: <b>{this.state.item.country}</b></div>
                            <div>GDP (M$/yr): <b>{this._formatCurrency(this.state.item.gdpm)}</b></div>
                            <div>Population (thousands): <b>{this._formatNumber(this.state.item.popk)}</b></div>
                            <div>GRP/Capita: <b>{this._formatCurrency(this.state.item.gdpcap)}</b></div>
                            <div>Rank: <b>{this.state.item.id}</b></div>
                        </div>)
            : null}
        </div>;
    }
    _initCombo(sender) {
        this.setState({ item: sender.selectedItem });
    }
    _formatCurrency(number) {
        return wijmo.Globalize.format(number, 'c0');
    }
    _formatNumber(number) {
        return wijmo.Globalize.format(number, 'n');
    }
    _onSelectedIndexChanged(sender) {
        this.setState({ item: sender.selectedItem });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
