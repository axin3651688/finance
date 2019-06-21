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
        let date = new Date();
        date.setHours(17, 30, 0);
        this.state = {
            date: date
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theInputDateTime">InputDateTime:</label>
                <wjInput.InputDateTime id="theInputDateTime" value={this.state.date} valueChanged={this._onValueChanged.bind(this)}>
                </wjInput.InputDateTime>
            </div>
            <div>
                The current date/time is:<b>{this._formatDateTime(this.state.date)}</b>.
            </div>
        </div>;
    }
    _formatDateTime(value) {
        return wijmo.Globalize.format(value, 'F');
    }
    _onValueChanged(sender) {
        this.setState({ date: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
