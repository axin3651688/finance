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
        this.initClickBlurPopup = (popup) => {
            popup.owner = this.refs.btnClickBlur;
        };
        this.initClickClickPopup = (popup) => {
            popup.owner = this.refs.btnClickClick;
        };
        this.initClickNonePopup = (popup) => {
            popup.owner = this.refs.btnClickNone;
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <h4>Show on Click, Hide on Blur</h4>
            <button className="btn btn-primary" ref="btnClickBlur">
                Show the Popover
            </button>

            <wjInput.Popup showTrigger="Click" hideTrigger="Blur" initialized={this.initClickBlurPopup} className="popover">
                <h3 className="popover-title">
                    Title
                </h3>
                <div className="popover-content">
                    Hello Popup<br />
                    This is a multi-line message! This is a long line in my popover, which uses Bootstrap's
                    'popover-content' style.
                </div>
            </wjInput.Popup>

            <hr />

            <h4>Show on Click, Hide on Click</h4>
            <button className="btn btn-primary" ref="btnClickClick">
                Show the Popover
            </button>

            <wjInput.Popup showTrigger="Click" hideTrigger="Click" initialized={this.initClickClickPopup} className="popover">
                <h3 className="popover-title">
                    Title
                </h3>
                <div className="popover-content">
                    Hello Popup<br />
                    This is a multi-line message!
                    This is a long line in my popover, which uses Boostrap's 'popover-content' style.
                </div>
            </wjInput.Popup>

            <hr />

            <h4>Show on Click, Hide with Code</h4>
            <button className="btn btn-primary" ref="btnClickNone">
                Show the Popover
            </button>

            <wjInput.Popup showTrigger="Click" hideTrigger="None" initialized={this.initClickNonePopup} className="popover">
                <h3 className="popover-title">
                    Title
                </h3>
                <div className="popover-content">
                    <form name="popoverForm">
                        <p>
                            Hello Popup<br />
                            This is a multi-line message!</p>
                        <pre>2 + 3 = <span className="">5</span></pre>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">@</div>
                                <input className="form-control" type="email" placeholder="Enter email"/>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-danger wj-hide">Close</button>
                            <button className="btn btn-primary wj-hide-ok">Save changes</button>
                        </div>
                    </form>
                </div>
            </wjInput.Popup>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
