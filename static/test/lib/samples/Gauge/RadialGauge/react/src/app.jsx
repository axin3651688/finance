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
            startAngle: 0,
            sweepAngle: 180,
            autoScale: true
        };
    }
    onInputValueChanged(type) {
        if (type == "value") {
            this.setState({
                value: this._value.value
            });
        }
        else if (type == "startAngle") {
            this.setState({
                startAngle: this._startAngle.value
            });
        }
        else if (type == "sweepAngle") {
            this.setState({
                sweepAngle: this._sweepAngle.value
            });
        }
    }
    onGaugeValueChanged() {
        this.setState({
            value: this._gaugeValue.value,
        });
    }
    setAutoScale() {
        this.setState({
            autoScale: !this.state.autoScale
        });
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label data-for="value">value:</label>
                            <wjInput.InputNumber id="value" min={this.state.min} max={this.state.max} step={this.state.step} initialized={control => this._value = control} value={this.state.value} valueChanged={() => this.onInputValueChanged("value")}></wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label data-for="startAngle">startAngle:</label>
                            <wjInput.InputNumber id="startAngle" initialized={control => this._startAngle = control} step={10} min={-360} max={360} value={this.state.startAngle} valueChanged={() => this.onInputValueChanged("startAngle")}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label data-for="sweepAngle">sweepAngle:</label>
                            <wjInput.InputNumber id="sweepAngle" initialized={control => this._sweepAngle = control} step={10} min={-360} max={360} value={this.state.sweepAngle} valueChanged={() => this.onInputValueChanged("sweepAngle")}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-check">
                            <label data-for="autoScale" className="form-check-label">autoScale:</label>
                            <input id="autoScale" type="checkbox" className="form-check-input" checked={this.state.autoScale} onChange={this.setAutoScale.bind(this)}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="gauge-holder">
                            <wjGauge.RadialGauge isReadOnly={false} min={0} max={100} step={5} value={this.state.value} showRanges={false} startAngle={this.state.startAngle} sweepAngle={this.state.sweepAngle} initialized={control => this._gaugeValue = control} autoScale={this.state.autoScale} valueChanged={this.onGaugeValueChanged.bind(this)}>
                                <wjGauge.Range min={0} max={33} color="red"></wjGauge.Range>
                                <wjGauge.Range min={33} max={66} color="yellow"></wjGauge.Range>
                                <wjGauge.Range min={66} max={100} color="green"></wjGauge.Range>
                            </wjGauge.RadialGauge>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
