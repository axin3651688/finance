import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._filterFunction = (item) => {
            return item.popk > 50000;
        };
        this._formatNumber = (length) => {
            return wijmo.Globalize.format(length, 'n0');
        };
        this._changeFilter = (value) => {
            this.setState((state) => {
                state.view.filter = value ? this._filterFunction : null;
                return state;
            });
        };
        this.state = {
            view: new wijmo.CollectionView(getData(), {
                filter: this._filterFunction
            })
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <wjInput.AutoComplete displayMemberPath="country" itemsSource={this.state.view.items}>
                </wjInput.AutoComplete>
            </div>
            <div className="form-check">
                <label className="form-check-label" htmlFor="filter">Apply Filter</label>
                <input id="filter" type="checkbox" defaultChecked={true} onChange={e => this._changeFilter(e.target.checked)}/>
            </div>
            <div>Source list contains <b>{this._formatNumber(this.state.view.items.length)}</b> countries.</div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
