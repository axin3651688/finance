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
        this.updateOverviewStatus = (target) => {
            this.setState({ overwrite: target.checked });
        };
        this.componentDidMount = () => {
            document.body.addEventListener('keypress', (e) => {
                if (this.state.overwrite) { // overwrite enabled
                    let input = e.target;
                    if (input.tagName == 'INPUT') { // target is input element
                        if (wijmo.closest(input, '.wj-inputmask')) { // contained in an InputMask control
                            let value = input.value, start = input.selectionStart;
                            //
                            input.value = value.substr(0, start) + value.substr(start + 1);
                            input.selectionEnd = start;
                        }
                    }
                }
            });
        };
        this.state = {
            overwrite: false
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="theSSN">Social Security Number</label>
                <wjInput.InputMask id="theSSN" mask="000-00-0000">
                </wjInput.InputMask>
            </div>

            <div className="form-group">
                <label htmlFor="theZip">Zip Code</label>
                <wjInput.InputMask id="theZip" mask="00000">
                </wjInput.InputMask>
            </div>

            <div className=" form-group">
                <label htmlFor="theZip4">Zip+4 Code</label>
                <wjInput.InputMask id="theZip4" mask="00000-0000">
                </wjInput.InputMask>
            </div>

            <div className="form-group">
                <label htmlFor="thePhone">Phone Number</label>
                <wjInput.InputMask id="thePhone" mask="(999) 000-0000">
                </wjInput.InputMask>
            </div>

            <p>
                By default, typing into the <b>InputMask</b> inserts text at the cursort position. In some cases, you may
                want to overwrite the text instead. Click the checkbox below to see the difference:
            </p>


            <label>
                Enable Overwrite
                <input type="checkbox" onChange={(e) => { this.updateOverviewStatus(e.target); }} defaultChecked={false}/>
            </label>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
