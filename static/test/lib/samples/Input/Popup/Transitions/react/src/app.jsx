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
        this.initLoginForm = (popup) => {
            this.setState({ frmLoginPopup: popup });
        };
        this.shown = (popup) => {
            wijmo.toggleClass(popup.hostElement, 'custom-animation-visible', true);
        };
        this.hiding = (popup) => {
            wijmo.toggleClass(popup.hostElement, 'custom-animation-visible', false);
        };
        this.state = {
            frmLoginPopup: {}
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <button className="btn btn-primary btn-space" onClick={e => this.state.frmLoginPopup.show(true)}>
                Log In
            </button>

            <wjInput.Popup className="custom-animation" fadeIn={false} shown={this.shown} hiding={this.hiding} initialized={this.initLoginForm}>
                <form>
                    <h4 className="modal-header">
                        Log in
                        <button type="button" className="close wj-hide">&times;</button>
                    </h4>
                    <div className="modal-body">
                        <label>
                            Email:
                            <input className="form-control" required type="email"/>
                        </label>
                        <br />
                        <label>
                            Password:
                            <input className="form-control" type="password" required pattern=".{4,}" title="Please enter 4 characters or more."/>
                        </label>
                        <br />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="submit">
                            Log in
                        </button>
                    </div>
                </form>
            </wjInput.Popup>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
