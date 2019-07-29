import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._comboSource = ['None', 'Value', 'MinMax', 'All'];
        this.state = {
            min: 0,
            max: 100,
            value: 75,
            step: 1,
            showText: 'None',
            isReadOnly: true,
            isAnimated: true
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label htmlFor="min">min:</label>
                            <wjInput.InputNumber id="min" step={10} value={this.state.min} valueChanged={this.inputValueChanged.bind(this, 'min')}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="max">max:</label>
                            <wjInput.InputNumber id="max" step={10} value={this.state.max} valueChanged={this.inputValueChanged.bind(this, 'max')}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="value">value:</label>
                            <wjInput.InputNumber id="value" step={10} value={this.state.value} valueChanged={this.inputValueChanged.bind(this, 'value')}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label htmlFor="showText">showText:</label>
                            <wjInput.ComboBox id="showText" text={this.state.showText} itemsSource={this._comboSource} selectedIndexChanged={this._comboValueChanged.bind(this)}>
                            </wjInput.ComboBox>
                        </div>

                        <div className="form-check">
                            <label htmlFor="isReadOnly">isReadOnly:</label>
                            <input id="isReadOnly" type="checkbox" className="form-check-input" checked={this.state.isReadOnly} onChange={this._setReadOnly.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="step">step:</label>
                            <wjInput.InputNumber id="step" min={1} step={1} value={this.state.step} valueChanged={this.inputValueChanged.bind(this, 'step')}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-check">
                            <label htmlFor="isAnimated">isAnimated:</label>
                            <input id="isAnimated" type="checkbox" className="form-check-input" checked={this.state.isAnimated} onChange={this._setAnimated.bind(this)}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} valueChanged={this._gaugeValueChanged.bind(this)}>
                        </wjGauge.RadialGauge>
                        <wjGauge.LinearGauge min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} valueChanged={this._gaugeValueChanged.bind(this)}>
                        </wjGauge.LinearGauge>
                        <wjGauge.BulletGraph min={this.state.min} max={this.state.max} value={this.state.value} showText={this.state.showText} step={this.state.step} isReadOnly={this.state.isReadOnly} isAnimated={this.state.isAnimated} target={60} bad={50} good={70} valueChanged={this._gaugeValueChanged.bind(this)}>
                        </wjGauge.BulletGraph>
                    </div>
                </div>
            </div>);
    }
    _comboValueChanged(sender) {
        this.setState({ showText: sender.selectedValue });
    }
    _gaugeValueChanged(sender) {
        this.setState({ value: sender.value });
    }
    inputValueChanged(stateProp, sender) {
        this.setState({ [stateProp]: sender.value });
    }
    _setReadOnly() {
        this.setState({ isReadOnly: !this.state.isReadOnly });
    }
    _setAnimated() {
        this.setState({ isAnimated: !this.state.isAnimated });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
