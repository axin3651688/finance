import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#f5f5f5',
            thickness: 1,
            value: 50
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label date-for="color">Color:</label>
                            <wjInput.InputColor id="color" value={this.state.color} valueChanged={this._onColorChanged.bind(this)}></wjInput.InputColor>
                        </div>

                        <div className="form-group">
                            <label date-for="tickness">Thickness:</label>
                            <wjInput.InputNumber id="thickness" min={0} max={1} step={0.1} format="n2" value={this.state.thickness} valueChanged={this._onThicknessChanged.bind(this)}></wjInput.InputNumber>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText="All" startAngle={-30} sweepAngle={240} value={this.state.value} thumbSize={20} valueChanged={this._onValueChanged.bind(this)}>
                            <wjGauge.Range wjProperty="face" thickness={this.state.thickness} color={this.state.color}></wjGauge.Range>
                            <wjGauge.Range wjProperty="pointer" thickness={0.15}></wjGauge.Range>
                        </wjGauge.RadialGauge>
                    </div>
                </div>
            </div>);
    }
    _onColorChanged(sender) {
        this.setState({ color: sender.value });
    }
    _onThicknessChanged(sender) {
        this.setState({ thickness: sender.value });
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
