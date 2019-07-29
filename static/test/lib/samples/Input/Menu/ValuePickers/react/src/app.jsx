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
        this._itemSource = [
            { header: 'Exempt', value: 0 },
            { header: '1%', value: 0.01 },
            { header: '5%', value: 0.05 },
            { header: '8.5%', value: 0.085 },
            { header: '10%', value: 0.10 },
            { header: '20%', value: 0.20 }
        ];
        this.state = { selectedIndex: 3 };
    }
    ;
    render() {
        let selectedItem = this._itemSource[this.state.selectedIndex];
        return <div className="container-fluid">
            <wjInput.Menu displayMemberPath="header" selectedValuePath="value" header={`Tax: <b>${selectedItem.header}</b>`} itemsSource={this._itemSource} selectedIndex={this.state.selectedIndex} selectedIndexChanged={this._selectedIndexChanged.bind(this)}>
            </wjInput.Menu>
        </div>;
    }
    _selectedIndexChanged(sender) {
        if (sender.selectedIndex >= 0) {
            this.setState({ selectedIndex: sender.selectedIndex });
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
