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
        this._data = getData();
        this.state = {
            delay: 500,
            minLength: 2,
            maxItems: 6
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="delay">delay:</label>
                <wjInput.InputNumber id="delay" value={this.state.delay} min={0} max={1500} step={100} valueChanged={(s) => this._changeDelay(s.value)}>
                </wjInput.InputNumber>
            </div>
            <div className="form-group">
                <label htmlFor="minLength">minLength:</label>
                <wjInput.InputNumber id="minLength" value={this.state.minLength} min={1} max={100} step={1} valueChanged={(s) => this._changeMinLength(s.value)}>
                </wjInput.InputNumber>
            </div>
            <div className="form-group">
                <label htmlFor="maxItems">maxItems:</label>
                <wjInput.InputNumber id="maxItems" value={this.state.maxItems} min={1} max={12} step={1} valueChanged={(s) => this._changeMaxItems(s.value)}>
                </wjInput.InputNumber>
            </div>
            <div className="form-group">
                <label htmlFor="theAutoComplete">AutoComplete:</label>
                <wjInput.AutoComplete id="theAutoComplete" displayMemberPath="country" delay={this.state.delay} maxItems={this.state.maxItems} minLength={this.state.minLength} searchMemberPath="country,continent" itemsSource={this._data}>
                </wjInput.AutoComplete>
            </div>
        </div>;
    }
    _changeDelay(value) {
        this.setState({ delay: value });
    }
    _changeMinLength(value) {
        this.setState({ minLength: value });
    }
    _changeMaxItems(value) {
        this.setState({ maxItems: value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
