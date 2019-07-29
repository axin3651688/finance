import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.validateMask = (ctrl) => {
            wijmo.toggleClass(ctrl.hostElement, 'state-invalid', !ctrl.maskFull);
        };
        this.lostFocus = (ctrl) => {
            if (!ctrl.maskFull && !ctrl.isRequired && this.state.clearIncomplete) {
                ctrl.value = '';
            }
        };
        this.updateClearIncompleteStatus = (target) => {
            this.setState({ clearIncomplete: target.checked });
        };
        this.state = {
            clearIncomplete: true
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-check">
                <label htmlFor="clearIncomplete" className="form-check-label">Clear Incomplete:</label>
                <input id="clearIncomplete" className="form-check-input" defaultChecked={true} type="checkbox" onChange={(e) => { this.updateClearIncompleteStatus(e.target); }}/>
            </div>

            <wjInput.InputMask placeholder="SSN" mask="000-00-0000" isRequired={false} valueChanged={this.validateMask} lostFocus={this.lostFocus} value="">
            </wjInput.InputMask>

            <wjInput.InputMask placeholder="Zip Code" mask="00000" isRequired={false} valueChanged={this.validateMask} lostFocus={this.lostFocus} value="">
            </wjInput.InputMask>

            <wjInput.InputMask placeholder="Zip Code + 4" mask="00000-0000" isRequired={false} valueChanged={this.validateMask} lostFocus={this.lostFocus} value="">
            </wjInput.InputMask>

            <wjInput.InputMask placeholder="Phone Number" mask="(999) 000-0000" isRequired={false} valueChanged={this.validateMask} lostFocus={this.lostFocus} value="">
            </wjInput.InputMask>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
