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
            {this.state.formats.map(function (fmt, index) {
            return <div key={index} className="form-group">
                        <label htmlFor="{'theInputNumberF'+index}">{fmt}:</label>
                        <wjInput.InputNumber id={'theInputNumberF' + index} format={fmt}>
                        </wjInput.InputNumber>
                    </div>;
        })}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
