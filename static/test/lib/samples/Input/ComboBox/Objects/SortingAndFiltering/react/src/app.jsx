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
    constructor() {
        super(...arguments);
        this._data = new wijmo.CollectionView(getData(), {
            currentChanged: () => this.forceUpdate(),
            // 20 million people or more
            filter: (item) => item.popk > 20000,
            // sort and filter the collectionView
            sortDescriptions: [
                new wijmo.SortDescription('country', true)
            ]
        });
    }
    formatCurrency(number) {
        return wijmo.Globalize.format(number, 'c0');
    }
    formatNumber(number) {
        return wijmo.Globalize.format(number, 'n');
    }
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theCombo">Select an item:</label>
                <wjInput.ComboBox id="theCombo" displayMemberPath="country" itemsSource={this._data}>
                </wjInput.ComboBox>
            </div>
            {this._data.currentItem
            ? (<div>
                            <div>Country: <b>{this._data.currentItem.country}</b></div>
                            <div>GDP (M$/yr): <b>{this.formatCurrency(this._data.currentItem.gdpm)}</b></div>
                            <div>Population (thousands): <b>{this.formatNumber(this._data.currentItem.popk)}</b></div>
                            <div>GRP/Capita: <b>{this.formatCurrency(this._data.currentItem.gdpcap)}</b></div>
                            <div>Rank: <b>{this._data.currentItem.id}</b></div>
                        </div>)
            : null}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
