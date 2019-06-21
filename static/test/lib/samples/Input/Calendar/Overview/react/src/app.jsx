import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
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
            <wjInput.Calendar initialized={this._initCalendar.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
            </wjInput.Calendar>
            <div>
                The current date is <b>{this._formatDate(this.state.value)}</b>.
            </div>
        </div>;
    }
    _initCalendar(sender) {
        this.setState({ value: sender.value });
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
    _formatDate(time) {
        return wijmo.Globalize.format(time, 'D');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
