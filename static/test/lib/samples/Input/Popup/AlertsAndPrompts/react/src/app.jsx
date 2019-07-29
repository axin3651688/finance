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
        this.initPopup = (popup) => {
            this.setState({ thePopup: popup });
        };
        this.showAlert = (popup) => {
            popup.show(true, (sender) => {
                alert('you entered: ' + sender.dialogResult);
            });
        };
        this.showPrompt = (popup) => {
            popup.show(true, (sender) => {
                let result = sender.dialogResult.indexOf('ok') > -1
                    ? popup.hostElement.querySelector('input').value
                    : null;
                alert('you entered: ' + result);
            });
        };
        this.textChanged = (combo) => {
            switch (combo.hostElement.id) {
                case "clsHeader":
                    this.setState({ clsHeaderText: combo.text });
                    break;
                case "header":
                    this.setState({ headerText: combo.text });
                    break;
                case "clsBody":
                    this.setState({ clsBodyText: combo.text });
                    break;
                case "body":
                    this.setState({ bodyText: combo.text });
                    break;
                case "clsInput":
                    this.setState({ clsInputText: combo.text });
                    break;
                case "clsFooter":
                    this.setState({ clsFooterText: combo.text });
                    break;
                case "clsOK":
                    this.setState({ clsOKText: combo.text });
                    break;
                case "ok":
                    this.setState({ okText: combo.text });
                    break;
                case "clsCancel":
                    this.setState({ clsCancelText: combo.text });
                    break;
                case "cancel":
                    this.setState({ cancelText: combo.text });
                    break;
                case "type":
                    this.setState({ typeText: combo.text });
                    break;
            }
        };
        this.updateSmallStatus = (target) => {
            this.setState({ small: target.checked });
        };
        this.state = {
            itemSource: ['Alert', 'Prompt'],
            clsDialogText: 'modal-dialog',
            small: false,
            clsHeaderText: 'modal-header',
            headerText: 'Header',
            clsBodyText: 'modal-body',
            bodyText: 'Dialog message.',
            clsInputText: 'form-control',
            clsFooterText: 'modal-footer',
            clsOKText: 'btn btn-primary',
            okText: 'OK',
            clsCancelText: 'btn btn-default',
            cancelText: 'Cancel',
            typeText: 'Alert'
        };
    }
    ;
    render() {
        return <div className="container">
            <wjInput.Popup style={{ width: this.state.small ? '20%' : '40%' }} className={[this.state.clsDialogText || 'wj-dialog', 'wj-popup'].join(' ')} role="dialog" initialized={this.initPopup}>
                <div className={this.state.clsHeaderText || 'wj-dialog-header'}>
                    <h4>{this.state.headerText}</h4>
                </div>
                <div className={this.state.clsBodyText || 'wj-dialog-body'}>
                    <p>{this.state.bodyText}</p>
                    {(this.state.typeText == 'Prompt')
            ? (<input className={this.state.clsInputText || 'form-control'}></input>)
            : null}
                </div>
                <div className={this.state.clsFooterText || 'wj-dialog-footer'}>
                    <button className={[this.state.clsOKText || 'wj-btn', ' wj-hide-ok'].join(' ')}>{this.state.okText || "OK"}</button>
                    <button className={[this.state.clsCancelText || 'wj-btn', 'wj-hide'].join(' ')}>{this.state.cancelText || "Cancel"}</button>
                </div>
            </wjInput.Popup>

            <div className="form-group">
                <label htmlFor="btnShow">Show</label>
                <button id="btnShow" className="btn btn-primary" onClick={e => this.state.typeText == 'Alert' ? this.showAlert(this.state.thePopup) : this.showPrompt(this.state.thePopup)}>
                    Show {this.state.typeText}
                </button>
            </div>

            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <wjInput.ComboBox id="type" itemsSource={this.state.itemSource} selectedIndexChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="header">Header</label>
                        <wjInput.ComboBox id="header" text={this.state.headerText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <wjInput.ComboBox id="body" text={this.state.bodyText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="small">Small</label>
                        <input id="small" type="checkbox" defaultChecked={false} onChange={e => this.updateSmallStatus(e.target)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ok">OK Text</label>
                        <wjInput.ComboBox id="ok" text={this.state.okText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cancel">Cancel Text</label>
                        <wjInput.ComboBox id="cancel" text={this.state.cancelText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                </div>

                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="clsDialog">Dialog Class</label>
                        <wjInput.ComboBox id="clsDialog" text={this.state.clsDialogText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsHeader">Header Class</label>
                        <wjInput.ComboBox id="clsHeader" text={this.state.clsHeaderText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsBody">Body Class</label>
                        <wjInput.ComboBox id="clsBody" text={this.state.clsBodyText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsInput">Input Class</label>
                        <wjInput.ComboBox id="clsInput" text={this.state.clsInputText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsFooter">Footer Class</label>
                        <wjInput.ComboBox id="clsFooter" text={this.state.clsFooterText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsOK">OK Class</label>
                        <wjInput.ComboBox id="clsOK" text={this.state.clsOKText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clsCancel">Cancel Class</label>
                        <wjInput.ComboBox id="clsCancel" text={this.state.clsCancelText} textChanged={this.textChanged}>
                        </wjInput.ComboBox>
                    </div>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
