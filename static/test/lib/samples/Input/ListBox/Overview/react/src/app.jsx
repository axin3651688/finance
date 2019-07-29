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
        this._data = getData();
        this.state = {
            index: null,
            item: null
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-4">
                    <wjInput.ListBox displayMemberPath="country" itemsSource={this._data} selectedIndexChanged={this._onSelectedIndexChanged.bind(this)} initialized={this._onInitialized.bind(this)}>
                    </wjInput.ListBox>
                </div>
                <div className="col-xs-8">
                    {this.state.item
            ? (<p>
                                    <b>Selection:</b><br />
                                    Index: <b>{this.state.index}</b><br />
                                    Country: <b>{this.state.item.country}</b><br />
                                    GDP (US$M): <b>{this._formatNumber(this.state.item.gdpm)}</b><br />
                                    Population: <b>{this._formatNumber(this.state.item.popk * 1000)}</b>
                                </p>)
            : null}
                </div>
            </div>
        </div>;
    }
    _onInitialized(sender) {
        this.setState({
            index: sender.selectedIndex,
            item: sender.selectedItem
        });
    }
    _formatNumber(value) {
        return wijmo.Globalize.format(value, 'n0');
    }
    _onSelectedIndexChanged(sender) {
        this.setState({
            index: sender.selectedIndex,
            item: sender.selectedItem
        });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
