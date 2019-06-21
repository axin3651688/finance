import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getHoliday } from './data';
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
            <wjInput.InputDate itemValidator={this._validator} initialized={this._onInitialized.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
            </wjInput.InputDate>
            <div>
                The current date is <b>{this._formatDateTime(this.state.value)}</b>.
            </div>
        </div>;
    }
    _onInitialized(sender) {
        this.setState({ value: sender.value });
        sender.calendar.formatItem.addHandler((sender, e) => {
            let weekday = e.data.getDay(), holiday = getHoliday(e.data);
            wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
            wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
            e.item.title = holiday || '';
        });
    }
    _validator(date) {
        return (date.getDay() % 6 != 0) && !getHoliday(date);
    }
    _formatDateTime(value) {
        return wijmo.Globalize.format(value, 'D');
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
