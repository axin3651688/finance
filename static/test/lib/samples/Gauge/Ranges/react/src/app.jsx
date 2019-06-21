import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGauge from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 75,
            showRanges: true,
            radThickness: 0.2,
            linThickness: 0.4
        };
    }
    setThickness() {
        this.setState({
            showRanges: !this.state.showRanges,
            radThickness: !this.state.showRanges ? 0.2 : 1,
            linThickness: !this.state.showRanges ? 0.4 : 1
        });
    }
    onValueChanged(type) {
        this.setState({
            value: (type == 'RadialGauge')
                ? this._radialGaugeValue.value
                : this._linearGaugeValue.value
        });
    }
    render() {
        return (<div className="container-fluid">
                <div className="form-check">
                    <label date-for="showRanges" className="form-check-label">showRanges:</label>
                    <input id="showRanges" type="checkbox" className="form-check-input" checked={this.state.showRanges} onChange={this.setThickness.bind(this)}/>
                </div>

                <wjGauge.RadialGauge min={0} max={100} value={this.state.value} isReadOnly={false} step={10} initialized={control => this._radialGaugeValue = control} showRanges={this.state.showRanges} valueChanged={() => this.onValueChanged("RadialGauge")}>
                    <wjGauge.Range wjProperty="pointer" thickness={this.state.radThickness} color="black"></wjGauge.Range>
                    <wjGauge.Range name="low" min={0} max={25} color="rgba(255,0,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="med" min={25} max={50} color="rgba(255,255,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="high" min={50} max={75} color="rgba(255,125,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="top" min={75} max={100} color="rgba(0,255,0,0.4)"></wjGauge.Range>
                </wjGauge.RadialGauge>

                <wjGauge.LinearGauge min={0} max={100} value={this.state.value} isReadOnly={false} step={10} initialized={control => this._linearGaugeValue = control} showRanges={this.state.showRanges} valueChanged={() => this.onValueChanged("LinearGauge")}>
                    <wjGauge.Range wjProperty="pointer" thickness={this.state.linThickness} color="black"></wjGauge.Range>
                    <wjGauge.Range name="low" min={0} max={25} color="rgba(255,0,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="med" min={25} max={50} color="rgba(255,255,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="high" min={50} max={75} color="rgba(255,125,0,0.4)"></wjGauge.Range>
                    <wjGauge.Range name="top" min={75} max={100} color="rgba(0,255,0,0.4)"></wjGauge.Range>
                </wjGauge.LinearGauge>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
