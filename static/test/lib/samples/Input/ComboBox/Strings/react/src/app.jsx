import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getCountries } from './data';
//
class App extends React.Component {
    //
    constructor(props) {
        super(props);
        this.countries = getCountries();
        this.state = {
            text: null,
            value: null,
            isRequired: false,
            isEditable: true,
            customText: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <p>
                The <b>text</b> property gets or sets the user's input:
            </p>
            <div className="form-group">
                <label htmlFor="theComboNoSrc">Any string:</label>
                <wjInput.ComboBox id="theComboNoSrc" initialized={this._initComboNoSrc.bind(this)} textChanged={this._onTextChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                You have typed this: <b>{this.state.text}</b>.
            </p>

            <h4>Choosing from Lists</h4>
            <p>
                If you want to provide a list of strings for users to choose from, set the <b>itemsSource</b> property to an
                array containing those items and users will be able to select one of them:
            </p>
            <div className="form-group">
                <label htmlFor="theCombo">Select a Country:</label>
                <wjInput.ComboBox id="theCombo" itemsSource={this.countries} initialized={this._initCombo.bind(this)} selectedIndexChanged={this._onComboSelectedIndexChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                You have selected this country: <b>{this.state.value}</b>.
            </p>

            <h4>Simple Customizations</h4>
            <p>
                By default, the ComboBox will force users to select one of the items on the list. Users will not be able to
                leave the combo empty or to enter values that are not on the list.
            </p>
            <p>
                You can change these behaviors by setting the <b>isRequired</b> and <b>isEditable</b> properties:</p>
            <p>
                <label>
                    <input id="isRequired" type="checkbox" onChange={e => this._changeRequired(e.target.checked)} defaultChecked={this.state.isRequired}/>
                    isRequired
                </label>
            </p>
            <p>
                <label>
                    <input id="isEditable" type="checkbox" onChange={e => this._changeEditable(e.target.checked)} defaultChecked={this.state.isEditable}/>
                    isEditable
                </label>
            </p>
            <div className="form-group">
                <label htmlFor="theComboCustom">Select a Country:</label>
                <wjInput.ComboBox id="theComboCustom" initialized={this._initComboCustom.bind(this)} placeholder="No Country Selected" itemsSource={this.countries} isRequired={this.state.isRequired} isEditable={this.state.isEditable} selectedIndexChanged={this._onCustomComboSelectedIndexChanged.bind(this)}>
                </wjInput.ComboBox>
            </div>
            <p>
                You have selected this country: <b>{this.state.customText}</b>.
            </p>
        </div>;
    }
    _initComboNoSrc(sender) {
        this.setState({ text: sender.text });
    }
    _onTextChanged(sender) {
        this.setState({ text: sender.text });
    }
    _initCombo(sender) {
        this.setState({ value: sender.selectedValue });
    }
    _initComboCustom(sender) {
        this.setState({ customText: sender.text });
    }
    _onComboSelectedIndexChanged(sender) {
        this.setState({ value: sender.selectedValue });
    }
    _onCustomComboSelectedIndexChanged(sender) {
        this.setState({ customText: sender.text });
    }
    _changeRequired(value) {
        this.setState({ isRequired: value });
    }
    _changeEditable(value) {
        this.setState({ isEditable: value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
