import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
                For example, here is an InputNumber with default settings:
            </p>
            <div className="form-group">
                <label htmlFor="theNumber">InputNumber</label>
                <wjInput.InputNumber id="theNumber" initialized={this._initNumber.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
                </wjInput.InputNumber>
            </div>
            <div>
                The current value is <b>{this.state.value}</b>.
            </div>

            <hr />

            <p>
                By default, InputNumber values are required, so you can't delete the entire content of the control. If you
            want to enter a number that is optional, set the <b>isRequired</b> property to false:
            </p>
            <div className="form-group">
                <label htmlFor="theNumberNotRequired">Not Required</label>
                <wjInput.InputNumber id="theNumberNotRequired" isRequired={false} value={null} min={0} max={100} placeholder="Your age (optional)">
                </wjInput.InputNumber>
            </div>
        </div>;
    }
    _initNumber(sender) {
        this.setState({ value: sender.value });
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
