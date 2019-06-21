import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 75,
            direction: 'Right',
            directionSource: ['Left', 'Right', 'Up', 'Down'],
        };
    }
    onValueChanged(type) {
        let s;
        if (type == "valueInputNumber") {
            s = this._valueInputNumber;
        }
        else if (type == "valueLinearGauge") {
            s = this._linearGauge;
        }
        this.setState({
            value: s.value
        });
    }
    setDirection() {
        let s = this._comboBox;
        let el = this._linearGauge.hostElement.style;
        this.setState({
            direction: s.text
        });
        switch (s.text) {
            case 'Left':
            case 'Right':
                el.height = '2em';
                el.width = '100%';
                break;
            case 'Up':
            case 'Down':
                el.height = '100%';
                el.width = '2em';
                break;
        }
    }
    render() {
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label htmlFor="value">value:</label>
                        <wjInput.InputNumber id="value" min={0} max={100} step={5} initialized={control => this._valueInputNumber = control} value={this.state.value} valueChanged={() => this.onValueChanged("valueInputNumber")}></wjInput.InputNumber>
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="direction">direction:</label>
                        <wjInput.ComboBox id="direction" itemsSource={this.state.directionSource} text={this.state.direction} initialized={control => this._comboBox = control} selectedIndexChanged={this.setDirection.bind(this)}>
                        </wjInput.ComboBox>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="gauge-holder">
                        <wjGauge.LinearGauge isReadOnly={false} min={0} max={100} step={5} value={this.state.value} showRanges={false} direction={this.state.direction} valueChanged={() => this.onValueChanged("valueLinearGauge")} initialized={control => this._linearGauge = control}>
                            <wjGauge.Range min={0} max={33} color="red"></wjGauge.Range>
                            <wjGauge.Range min={33} max={66} color="yellow"></wjGauge.Range>
                            <wjGauge.Range min={66} max={100} color="green"></wjGauge.Range>
                        </wjGauge.LinearGauge>
                    </div>
                </div>
            </div>
        </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
