import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getCountries, getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.strings = getCountries();
        this.objects = getData();
        this.state = {
            strVal: null,
            objVal: null
        };
    }
    ;
    _initComboString(sender) {
        this.setState({ strVal: sender.selectedValue });
    }
    _initComboObject(sender) {
        this.setState({ objVal: sender.selectedValue });
    }
    _formatCurrency(number) {
        return wijmo.Globalize.format(number, 'c0');
    }
    _formatObj(item) {
        if (!item) {
            return '';
        }
        return `${item.country} (sales: ${this._formatCurrency(item.sales)}, expenses ${this._formatCurrency(item.expenses)})`;
    }
    _onStrValChanged(sender) {
        this.setState({ strVal: sender.selectedValue });
    }
    _onObjValChanged(sender) {
        this.setState({ objVal: sender.selectedValue });
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theComboString">Strings:</label>
                <wjInput.ComboBox id="theComboString" itemsSource={this.strings} initialized={this._initComboString.bind(this)} selectedIndexChanged={this._onStrValChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                The current value is:
                <b>{this.state.strVal}</b>.
            </p>

            <hr />

            <div className="form-group">
                <label htmlFor="theComboObject">Objects:</label>
                <wjInput.ComboBox id="theComboObject" displayMemberPath="country" itemsSource={this.objects} initialized={this._initComboObject.bind(this)} selectedIndexChanged={this._onObjValChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                The current value is:
                <b>
                    {this._formatObj(this.state.objVal)}
                </b>
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
