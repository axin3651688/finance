import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formats: ['n0', 'n2', 'c0', 'c2', 'p0', 'p2']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theInputNumber">Guests</label>
                <wjInput.InputNumber id="theInputNumber" format="n0" value={1} min={1} max={5} step={1}>
                </wjInput.InputNumber>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
