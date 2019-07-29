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
        this.updateAnimatedStatus = (target) => {
            this.setState({ isAnimated: target.checked });
        };
        this.updateDroppedDownStatus = (target) => {
            this.setState({ isDroppedDown: target.checked });
        };
        this.updateDropDownCssClass = (target) => {
            this.setState({ dropDownCssClass: target.checked });
        };
        this.state = {
            isAnimated: false,
            isDroppedDown: false,
            dropDownCssClass: false,
            data: ['Ringo', 'George', 'John', 'Paul']
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-check">
                        <label htmlFor="isAnimated" className="form-check-label">isAnimated:</label>
                        <input id="isAnimated" type="checkbox" defaultChecked={false} onChange={(e) => this.updateAnimatedStatus(e.target)}/>
                    </div>
                    <div className="form-check">
                        <label htmlFor="isDroppedDown" className="form-check-label">isDroppedDown:</label>
                        <input id="isDroppedDown" type="checkbox" defaultChecked={false} onChange={(e) => this.updateDroppedDownStatus(e.target)}/>
                    </div>
                    <div className="form-check">
                        <label htmlFor="dropDownCssClass" className="form-check-label">dropDownCssClass:</label>
                        <input id="dropDownCssClass" type="checkbox" defaultChecked={false} onChange={(e) => this.updateDropDownCssClass(e.target)}/>
                    </div>
                </div>
                <div className="col-xs-6">
                    <wjInput.ComboBox itemsSource={this.state.data} isAnimated={this.state.isAnimated} isDroppedDown={this.state.isDroppedDown} dropDownCssClass={this.state.dropDownCssClass ? 'custom-dd' : ''}>
                    </wjInput.ComboBox>
                    <br />
                    <wjInput.InputDate isAnimated={this.state.isAnimated} dropDownCssClass={this.state.dropDownCssClass ? 'custom-dd' : ''}>
                    </wjInput.InputDate>
                </div>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
