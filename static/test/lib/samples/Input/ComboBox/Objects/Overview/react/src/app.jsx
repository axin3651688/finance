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
            text: null,
            index: null,
            value: null
        };
    }
    ;
    _initCombo(sender) {
        this.setState({
            text: sender.text,
            index: sender.selectedIndex,
            value: sender.selectedValue
        });
    }
    _formatCurrency(number) {
        return wijmo.Globalize.format(number, 'c');
    }
    _onSelectedIndexChanged(sender) {
        this.setState({
            text: sender.text,
            index: sender.selectedIndex,
            value: sender.selectedValue,
        });
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theCombo">Select an item:</label>
                <wjInput.ComboBox id="theCombo" displayMemberPath="country" selectedValuePath="sales" itemsSource={this._data} initialized={this._initCombo.bind(this)} selectedIndexChanged={this._onSelectedIndexChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                The current text is: <b>{this.state.text}</b>.
            </p>
            <p>
                The selectedIndex is: <b>{this.state.index}</b>.
            </p>
            <p>
                The selectedValue is: <b>{this._formatCurrency(this.state.value)}</b>.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
