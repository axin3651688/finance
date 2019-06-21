import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <p>
                For example, here is an InputDate with default settings:
            </p>
            <div className="form-group">
                <label htmlFor="theDate">InputDate</label>
                <wjInput.InputDate id="theDate" initialized={this._onInitialized.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
                </wjInput.InputDate>
            </div>
            <div>
                The current date is <b>{this._formatDateTime(this.state.value)}</b>.
            </div>

            <hr />

            <p>
                By default, InputDate values are required, so you can't delete the entire content of the control. If you
            want to enter dates that are optional, set the <b>isRequired</b> property to false:
            </p>
            <div className="form-group">
                <label htmlFor="theDateNotRequired">Not Required</label>
                <wjInput.InputDate id="theDateNotRequired" isRequired={false} value={null} placeholder="Your birth date (optional)">
                </wjInput.InputDate>
            </div>
        </div>;
    }
    _onInitialized(sender) {
        this.setState({ value: sender.value });
    }
    _formatDateTime(value) {
        return wijmo.Globalize.format(value, 'D');
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
