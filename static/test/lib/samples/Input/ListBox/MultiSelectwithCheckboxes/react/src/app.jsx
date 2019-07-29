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
        this.onCheckedItemChanged = (sender) => {
            this.setState({ checkedItems: sender.checkedItems });
        };
        this.state = {
            checkedItems: [],
            data: getData()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <wjInput.ListBox displayMemberPath="country" checkedMemberPath="selected" checkedItemsChanged={this.onCheckedItemChanged} itemsSource={this.state.data}>
                    </wjInput.ListBox>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    <ul>
                        {this.state.checkedItems.map(function (item) {
            return <li key={item.id}>
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
