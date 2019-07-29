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
        this.initLoginForm = (form) => {
            this.setState({ frmLoginPopup: form });
        };
        this.initCreateForm = (form) => {
            this.setState({ frmCreateAccountPopup: form });
        };
        this.initEditForm = (form) => {
            this.setState({ frmEditAccountPopup: form });
        };
        this.onsubmit = (e, popup) => {
            event.preventDefault();
            alert('form submitted');
            popup.hide();
        };
        this.updatePW1 = (e) => {
            this.setState({ pw1: e.target.value });
        };
        this.updatePW2 = (e) => {
            this.setState({ pw2: e.target.value }, () => {
                this.setState({ cnfrmPswdFrmCreateValid: this.state.pw2 != this.state.pw1 ? false : true });
            });
        };
        this.updatePW3 = (e) => {
            this.setState({ pw3: e.target.value });
        };
        this.updatePW4 = (e) => {
            this.setState({ pw4: e.target.value }, () => {
                this.setState({ cnfrmPswdFrmEditValid: this.state.pw4 != this.state.pw3 ? false : true });
            });
        };
        this.updateRememberStatus = (target) => {
            this.setState({ isRemember: target.checked });
        };
        this.switchPopup = () => {
            this.state.frmCreateAccountPopup.show(true);
        };
        this.state = {
            pw1: '',
            pw2: '',
            pw3: '',
            pw4: '',
            isRemember: false,
            frmLoginPopup: {},
            frmCreateAccountPopup: {},
            frmEditAccountPopup: {},
            cnfrmPswdFrmEditValid: true,
            cnfrmPswdFrmCreateValid: true
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <button className="btn btn-primary btn-space" onClick={e => this.state.frmLoginPopup.show(true)}>
                Log In
            </button>

            <button className="btn btn-primary btn-space" onClick={e => this.state.frmCreateAccountPopup.show(true)}>
                Create Account
            </button>

            <button className="btn btn-primary" onClick={e => this.state.frmEditAccountPopup.show(true)}>
                Edit Account
            </button>

            <wjInput.Popup id="frmLoginPopup" initialized={this.initLoginForm}>
                <form onSubmit={e => this.onsubmit(e, this.state.frmLoginPopup)}>
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
                        <label>
                            Remember Me
                            <input className="remember" type="checkbox" defaultChecked={false} onChange={(e) => this.updateRememberStatus(e.target)}/>
                        </label>
                        <br />
                        <a href="javascript:void(0)" onClick={this.switchPopup}>
                            Don't have an account yet?
                        </a>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary">
                            Log in
                        </button>
                    </div>
                </form>
            </wjInput.Popup>

            <wjInput.Popup id="frmCreateAccountPopup" initialized={this.initCreateForm}>
                <form onSubmit={e => this.onsubmit(e, this.state.frmCreateAccountPopup)}>
                    <h4 className="modal-header">
                        Create Account
                        <button type="button" className="close wj-hide">&times;</button>
                    </h4>
                    <div className="modal-body">
                        <label>
                            Name:
                            <input className="form-control" required pattern=".{2,}" title="Please enter 2 characters or more."/>
                        </label>
                        <br />
                        <label>
                            Email:
                            <input className="form-control" type="email" required/>
                        </label>
                        <br />
                        <label>
                            Password:
                            <input name="pswdFrmCreate" className="form-control" type="password" required pattern=".{4,}" onChange={this.updatePW1} title="Please enter 4 characters or more."/>
                        </label>
                        <br />
                        <label>
                            Confirm Password:
                            <input className="form-control" name="cnfrmPswdFrmCreate" onChange={this.updatePW2} type="password" required/>
                            <small hidden={this.state.cnfrmPswdFrmCreateValid}>
                                Passwords don't match.
                            </small>
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="onsubmit">
                            Create Account
                        </button>
                    </div>
                </form>
            </wjInput.Popup>

            <wjInput.Popup id="frmEditAccountPopup" initialized={this.initEditForm}>
                <form onSubmit={e => this.onsubmit(e, this.state.frmEditAccountPopup)}>
                    <h4 className="modal-header">
                        Edit Account
                        <button type="button" className="close wj-hide">&times;</button>
                    </h4>
                    <div className="modal-body">
                        <label>
                            Email:
                        <input className="form-control" required type="email"/>
                        </label>
                        <br />
                        <label>
                            Current Password:
                            <input className="form-control" type="password" required pattern=".{4,}" title="Please enter 4 characters or more."/>
                        </label>
                        <br />
                        <label>
                            New Name:
                            <input className="form-control" required pattern=".{2,}" title="Please enter 2 characters or more."/>
                        </label>
                        <br />
                        <label>
                            New Password:
                            <input name="pswdFrmEdit" onChange={this.updatePW3} className="form-control" type="password" required pattern=".{4,}" title="Please enter 4 characters or more."/>
                        </label>
                        <br />
                        <label>
                            Confirm New Password:
                            <input className="form-control" name="cnfrmPswdFrmEdit" onChange={this.updatePW4} type="password" required/>
                            <small hidden={this.state.cnfrmPswdFrmEditValid}>
                                Passwords don't match.
                            </small>
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="onSubmit">
                            Update Account
                        </button>
                    </div>
                </form>
            </wjInput.Popup>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
