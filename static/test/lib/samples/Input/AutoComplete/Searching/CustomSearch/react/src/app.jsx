import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.itemsSourceFunction = (query, max, callback) => {
            // empty query? no results
            if (!query) {
                callback(null);
                return;
            }
            // find items that start with the user input
            let allItems = getData(), queryItems = [], rx = new RegExp('^' + query, 'i');
            for (let i = 0; i < allItems.length && queryItems.length < max; i++) {
                if (rx.test(allItems[i].country)) {
                    queryItems.push(allItems[i]);
                }
            }
            callback(queryItems);
        };
        this.state = {
            data: getData()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theAutoComplete">Default:</label>
                <wjInput.AutoComplete id="theAutoComplete" displayMemberPath="country" itemsSource={this.state.data}>
                </wjInput.AutoComplete>
            </div>
            <div className="form-group">
                <label htmlFor="theAutoCompleteCustom">Custom:</label>
                <wjInput.AutoComplete id="theAutoCompleteCustom" displayMemberPath="country" itemsSourceFunction={this.itemsSourceFunction}>
                </wjInput.AutoComplete>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
