import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.getItemBySearch = (query, max, callback) => {
            if (!query) {
                callback(null);
                return;
            }
            wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Products', {
                data: {
                    $format: 'json',
                    $select: 'ProductID,ProductName',
                    $filter: 'indexof(ProductName, \'' + query + '\') gt -1'
                },
                success: (xhr) => {
                    let response = JSON.parse(xhr.response);
                    callback(response.d ? response.d.results : response.value);
                }
            });
        };
        this.onSelectedIndexChanged = (sender) => {
            this.setState({ selectedItem: sender.selectedItem || {}, selectedItemIsNull: !(!!sender.selectedItem) });
        };
        this.state = {
            selectedItem: {},
            selectedItemIsNull: true
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theAutoComplete">AutoComplete:</label>
                <wjInput.AutoComplete id="theAutoComplete" placeholder="Product Name" displayMemberPath="ProductName" itemsSourceFunction={this.getItemBySearch} selectedIndexChanged={this.onSelectedIndexChanged}>
                </wjInput.AutoComplete>
            </div>
            <p>Selected product:
                <b>
                    {this.state.selectedItemIsNull ? 'None' : this.state.selectedItem.ProductName + '(ID:' + this.state.selectedItem.ProductID + ')'}
                </b>
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
