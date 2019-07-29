import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from '@grapecity/wijmo.react.input';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectedItemsChanged = (sender) => {
            this.setState({ selectedItems: sender.selectedItems });
        };
        this.state = {
            data: getData(),
            selectedItems: []
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-6">
                    <wjInput.MultiAutoComplete placeholder="Select some countries" displayMemberPath="country" itemsSource={this.state.data} selectedItemsChanged={this.onSelectedItemsChanged}>
                    </wjInput.MultiAutoComplete>
                </div>
                <div className="col-xs-6">
                    <p>
                        <b>Selected Items:</b>
                    </p>
                    <ul>
                        {this.state.selectedItems.map(function (item, index) {
            return <li key={index}>
                                    {item.country}
                                </li>;
        })}
                    </ul>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
