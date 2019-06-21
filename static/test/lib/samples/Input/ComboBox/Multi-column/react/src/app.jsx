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
        this.formatComboTableItem = (sender, e) => {
            e.item.innerHTML = wijmo.format(this.state.comboTableItemTemplate, e.data);
        };
        this.state = {
            data: getData(),
            comboTableItemTemplate: '<table><tr>' +
                '<td>{country}</td>' +
                '<td class="number" title="GDP (million US$/year)">{gdpm:c0}</td>' +
                '<td class="number" title="Population (thousands)">{popk:n0}</td>' +
                '<td class="number" title="GDP/cap (US$/person/year)">{gdpcap:c0}</td>' +
                '</tr></table>'
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <p>
                By default, the ComboBox displays one item per line in its drop-down list:
            </p>
            <div className="form-group">
                <label htmlFor="theCombo">Default:</label>
                <wjInput.ComboBox displayMemberPath="country" itemsSource={this.state.data}></wjInput.ComboBox>
            </div>

            <p>
                If you have many short items, it may be interesting to use multiple columns in the drop-down. You can
            accomplish this with a little CSS and the <b>dropDownCssClass</b> property:
            </p>
            <div className="form-group">
                <label htmlFor="theComboCSS">Three Columns:</label>
                <wjInput.ComboBox dropDownCssClass="cb-flex" displayMemberPath="country" itemsSource={this.state.data}>
                </wjInput.ComboBox>
            </div>

            <p>
                If the items are complex objects, you may want to render a single item per line, but with additional detail,
            as in a table or grid. You can accomplish this with the <b>formatItem</b> event and <b>headerPath</b>
                property:
            </p>
            <div className="form-group">
                <label htmlFor="theComboTable">Table-Style:</label>
                <wjInput.ComboBox headerPath="country" displayMemberPath="country" itemsSource={this.state.data} formatItem={this.formatComboTableItem}>
                </wjInput.ComboBox>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
