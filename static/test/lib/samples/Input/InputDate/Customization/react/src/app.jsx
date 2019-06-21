import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as input from '@grapecity/wijmo.input';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getHoliday } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        // change InpuDate icon to a calendar instead of a down arrow (applies to all InputDate controls)
        input.InputDate.controlTemplate = '<div style="position:relative" class="wj-template">' +
            '<div class="wj-input">' +
            '<div class="wj-input-group wj-input-btn-visible">' +
            '<input wj-part="input" type="text" class="wj-form-control" />' +
            '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
            '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
            '<span class="wj-glyph-calendar"></span>' +
            '</button>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
            'style="display:none;position:absolute;z-index:100">' +
            '</div>' +
            '</div>';
        //
        // change the format used to show current month/year (affects all InputDate and Calendar controls)
        wijmo.culture.Globalize.calendar.patterns['y'] = 'MMMM yyyy';
        this.state = {
            value: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.InputDate initialized={this._onInitialized.bind(this)} valueChanged={this._onValueChanged.bind(this)}>
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
    _formatDateTime(value) {
        return wijmo.Globalize.format(value, 'D');
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
