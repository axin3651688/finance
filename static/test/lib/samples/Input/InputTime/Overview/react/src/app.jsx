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
        this.onValueChanged = (s) => {
            this.setState({ value: s.value });
        };
        this.formatDateTime = (value) => {
            return wijmo.Globalize.format(value, 'F');
        };
        let value = new Date();
        value.setHours(17, 30, 0);
        this.state = {
            value: value
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theInputDate">InputDate:</label>
                <wjInput.InputDate id="theInputDate" value={this.state.value} valueChanged={this.onValueChanged}>
                </wjInput.InputDate>
            </div>
            <div className="form-group">
                <label htmlFor="theInputTime">InputTime:</label>
                <wjInput.InputTime id="theInputTime" value={this.state.value} format="h:mm tt" min="9:00" max="17:00" step={30} isEditable={true} valueChanged={this.onValueChanged}>
                </wjInput.InputTime>
            </div>
            <p>
                The current date/time is: <b>{this.formatDateTime(this.state.value)}</b>.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
