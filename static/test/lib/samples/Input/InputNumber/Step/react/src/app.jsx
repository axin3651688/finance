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
            let step = fmt[0] == 'p' ? 0.1 : (index + 1);
            return <div key={index} className="form-group">
                        {step
                ? (<div>
                                    <label htmlFor="{'theInputNumberF'+index}">Step {step}:</label>
                                    <wjInput.InputNumber id={'theInputNumberF' + index} format={fmt} step={step}>
                                    </wjInput.InputNumber>
                                </div>)
                : null}

                    </div>;
        })}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
