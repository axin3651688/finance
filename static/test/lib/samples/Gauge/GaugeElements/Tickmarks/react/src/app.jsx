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
            tickWidth: 2,
            tickSpacing: 10,
            showTicks: true,
            tickColor: 'white',
            value: 50
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-check">
                            <label data-for="showTicks" className="form-check-label">Tickmarks:</label>
                            <input id="showTicks" type="checkbox" checked={this.state.showTicks} className="form-check-input" onChange={this._onShowTicksChanged.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label data-for="tickSpacing">Spacing:</label>
                            <wjInput.InputNumber id="tickSpacing" min={0} max={100} step={5} format="n0" value={this.state.tickSpacing} valueChanged={this._onTickSpacingChanged.bind(this)}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label data-for="tickWidth">Width:</label>
                            <wjInput.InputNumber id="tickWidth" min={0} max={5} step={0.25} format="n1" value={this.state.tickWidth} valueChanged={this._onTickWidthChanged.bind(this)}>
                            </wjInput.InputNumber>
                        </div>

                        <div className="form-group">
                            <label data-for="tickColor">Color:</label>
                            <wjInput.InputColor id="tickColor" value={this.state.tickColor} valueChanged={this._onTickColorChanged.bind(this)}>
                            </wjInput.InputColor>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText="All" tickColor={this.state.tickColor} showTicks={this.state.showTicks} tickSpacing={this.state.tickSpacing} startAngle={-30} sweepAngle={240} value={this.state.value} valueChanged={this._onValueChanged.bind(this)}>
                            <wjGauge.Range wjProperty="pointer" thickness={0.5}></wjGauge.Range>
                        </wjGauge.RadialGauge>
                    </div>
                </div>
            </div>);
    }
    _onTickSpacingChanged(sender) {
        this.setState({ tickSpacing: sender.value });
    }
    _onTickWidthChanged(sender) {
        this.setState({ tickWidth: sender.value });
        document.querySelector('.wj-ticks').style.strokeWidth = sender.value.toString();
    }
    _onTickColorChanged(sender) {
        this.setState({ tickColor: sender.value });
        document.querySelector('.wj-ticks').style.stroke = sender.value;
    }
    _onShowTicksChanged() {
        this.setState({ showTicks: !this.state.showTicks });
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
