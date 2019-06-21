import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getData } from './data';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData()
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theAutoComplete">AutoComplete:</label>
                <wjInput.AutoComplete id="theAutoComplete" displayMemberPath="country" itemsSource={this.state.data}>
                </wjInput.AutoComplete>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
