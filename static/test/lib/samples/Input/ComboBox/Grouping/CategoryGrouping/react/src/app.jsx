import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getOptions } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getOptions()
        };
    }
    ;
    //
    render() {
        return <div className="container-fluid">
            <wjInput.ComboBox itemsSource={this.state.data} displayMemberPath="header" selectedIndex={1} formatItem={this._formatItem.bind(this)}>
            </wjInput.ComboBox>
            <p>
                The same technique applies to the <b>AutoComplete</b> control:
            </p>
            <wjInput.AutoComplete itemsSource={this.state.data} displayMemberPath="header" selectedIndex={1} formatItem={this._formatItem.bind(this)}>
            </wjInput.AutoComplete>
        </div>;
    }
    //
    _formatItem(sender, args) {
        let dataItem = args.data;
        if (dataItem.category) {
            args.item.classList.add('category');
            args.item.classList.add('wj-state-disabled');
        }
    }
}
//
ReactDOM.render(<App />, document.getElementById('app'));
