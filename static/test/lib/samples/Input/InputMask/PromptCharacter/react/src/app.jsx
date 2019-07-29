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
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theSSN">Social Security Number </label>
                <wjInput.InputMask id="theSSN" mask="000-00-0000" promptChar="*">
                </wjInput.InputMask>
            </div>

            <div className="form-group">
                <label htmlFor="theZip">Zip Code </label>
                <wjInput.InputMask id="theZip" mask="00000" promptChar="^">
                </wjInput.InputMask>
            </div>

            <div className=" form-group">
                <label htmlFor="theZip4">Zip+4 Code </label>
                <wjInput.InputMask id="theZip4" mask="00000-0000" promptChar="#">
                </wjInput.InputMask>
            </div>

            <div className="form-group">
                <label htmlFor="thePhone">Phone Number </label>
                <wjInput.InputMask id="thePhone" mask="(999) 000-0000" promptChar=" ">
                </wjInput.InputMask>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
