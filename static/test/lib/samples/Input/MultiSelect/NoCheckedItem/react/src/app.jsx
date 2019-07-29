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
        this.onCheckedItemsChanged = (sender) => {
            this.setState({ checkedItems: sender.checkedItems });
        };
        this.getCheckedItems = (ctrl) => {
            let items = ctrl.map((checkableItem) => checkableItem.item);
            return JSON.stringify(items);
        };
        this.state = {
            data: getData().map((item) => ({ item: item, checked: false })),
            checkedItems: []
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <wjInput.MultiSelect placeholder="Devices" checkedMemberPath="checked" displayMemberPath="item.name" itemsSource={this.state.data} checkedItemsChanged={this.onCheckedItemsChanged}>
                    </wjInput.MultiSelect>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    {this.state.checkedItems.length > 0
            ? (<p>
                                {this.getCheckedItems(this.state.checkedItems)}
                            </p>)
            : null}
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
