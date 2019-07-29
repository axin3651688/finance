import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getHolidays } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._holidays = getHolidays();
        this.state = {
            value: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.Calendar initialized={this._initCalendar.bind(this)} formatItem={this._formatItem.bind(this)} itemValidator={this._validator.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
            </wjInput.Calendar>
            <div>
                The current date is <b>{this._formatDate(this.state.value)}</b>.
            </div>
        </div>;
    }
    _initCalendar(sender) {
        this.setState({ value: sender.value });
    }
    _formatItem(sender, e) {
        // apply styles to weekends and holidays
        let weekday = e.data.getDay(), holiday = this._getHoliday(e.data);
        wijmo.toggleClass(e.item, 'date-weekend', weekday == 0 || weekday == 6);
        wijmo.toggleClass(e.item, 'date-holiday', holiday != null);
        e.item.title = holiday || '';
    }
    _validator(date) {
        return (date.getDay() % 6 != 0) && !this._getHoliday(date);
    }
    // gets the holiday for a given date
    _getHoliday(date) {
        let day = date.getDate(), month = date.getMonth() + 1, holiday = this._holidays[month + '/' + day];
        //
        if (!holiday) {
            let weekDay = date.getDay(), weekNum = Math.floor((day - 1) / 7) + 1;
            holiday = this._holidays[month + '/' + weekNum + '/' + weekDay];
        }
        //
        return holiday;
    }
    _formatDate(time) {
        return wijmo.Globalize.format(time, 'D');
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
