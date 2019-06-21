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
            dateFormats: ['d', 'D', 'M', 'd/M/yy', 'MMMM dd, yyyy']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            {this.state.dateFormats.map(function (fmt, index) {
            return <div className="form-group" key={index}>
                        <label htmlFor={'theInputDateF' + index}>{fmt}:</label>
                        <wjInput.InputDate id={'theInputDateF' + index} format={fmt}></wjInput.InputDate>
                    </div>;
        })}
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
