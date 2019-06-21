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
        this.formatItem = (sender, e) => {
            let html = wijmo.format(this.state.comboTableItemTemplate, e.data, (data, name, fmt, val) => {
                return wijmo.isString(data[name]) ? wijmo.escapeHtml(data[name]) : val;
            });
            e.item.innerHTML = html;
        };
        this.state = {
            data: getData(),
            comboTableItemTemplate: '<div class="item">' +
                '<h1>{name}</h1>' +
                '<b>{city}</b> ({state})<br/>' +
                '{address}<br/>' +
                'Phone: <b>{phone}</b><br/>' +
                'Fax: <b>{fax}</b><br/>' +
                'Website: <a href="{site}" target="_blank">{site}</a><br/>' +
                '</div>'
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.ComboBox displayMemberPath="name" headerPath="name" itemsSource={this.state.data} formatItem={this.formatItem}>
            </wjInput.ComboBox>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
