import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = getData();
        this.state = {
            showSelectAllCheckbox: false,
            checkedItems: []
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <div className="form-group">
                        <wjInput.MultiSelect placeholder="Countries" headerFormat="{count:n0} countries" displayMemberPath="country" showSelectAllCheckbox={this.state.showSelectAllCheckbox} itemsSource={this._data} checkedItemsChanged={this._onCheckedItemsChanged.bind(this)}>
                        </wjInput.MultiSelect>
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectAll">Show "Select All" box</label>
                        <input id="selectAll" type="checkbox" defaultChecked={this.state.showSelectAllCheckbox} onChange={e => this._changeShowSelectAll(e.target.checked)}/>
                    </div>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    <ul>
                        {this.state.checkedItems.map((item, index) => {
            return <li key={index}>
                                    {item.country}
                                </li>;
        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
    _onCheckedItemsChanged(sender) {
        this.setState({ checkedItems: sender.checkedItems });
    }
    _changeShowSelectAll(value) {
        this.setState({ showSelectAllCheckbox: value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
