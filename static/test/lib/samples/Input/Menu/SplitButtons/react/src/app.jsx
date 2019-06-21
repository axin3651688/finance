import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._data = [
            { header: 'Internet Explorer', value: 'IE' },
            { header: 'Chrome', value: 'CHR' },
            { header: 'Firefox', value: 'FFX' },
            { header: 'Safari', value: 'IOS' },
            { header: 'Opera', value: 'OPR' }
        ];
        this.state = {
            item: this._data[2]
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <wjInput.Menu isButton={true} displayMemberPath="header" selectedValuePath="value" header={'Run: <b>' + this.state.item.header + '</b>'} itemClicked={this._itemClicked.bind(this)} selectedIndexChanged={this._selectedIndexChanged.bind(this)} itemsSource={this._data} selectedValue={this.state.item.value}>
            </wjInput.Menu>
        </div>;
    }
    _selectedIndexChanged(sender) {
        if (sender.selectedItem) {
            this.setState({ item: sender.selectedItem });
        }
    }
    _itemClicked(sender) {
        alert('Running ' + sender.selectedValue);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
