import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as gauge from '@grapecity/wijmo.gauge';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wjInput from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._itemsSource = [0, 3, 4, 20, 50];
        this.state = {
            showRanges: true,
            rangesCount: 3,
            value: 50
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row container">
                    <div className="col-xs-6">
                        <div className="form-check">
                            <label date-for="showRanges" className="form-check-label">Show Ranges:</label>
                            <input id="showRanges" type="checkbox" className="form-check-input" checked={this.state.showRanges} onChange={this._showRangesChanged.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label date-for="ranges">Ranges:</label>
                            <wjInput.ComboBox id="ranges" itemsSource={this._itemsSource} selectedItem={this.state.rangesCount} selectedIndexChanged={this._selectedIndexChanged.bind(this)}>
                            </wjInput.ComboBox>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText="All" startAngle={-30} sweepAngle={240} value={this.state.value} showRanges={this.state.showRanges} thumbSize={20} min={0} max={100} initialized={this._initialized.bind(this)} valueChanged={this._valueChanged.bind(this)}>
                            <wjGauge.Range wjProperty="pointer" thickness={0.25}>
                            </wjGauge.Range>
                        </wjGauge.RadialGauge>
                    </div>
                </div>
            </div>);
    }
    _showRangesChanged() {
        this.setState({ showRanges: !this.state.showRanges });
    }
    _selectedIndexChanged(sender) {
        this.setState({ rangesCount: sender.selectedItem });
        this._createRanges();
    }
    _initialized(sender) {
        this._gauge = sender;
        this._createRanges();
    }
    _valueChanged(sender) {
        this.setState({ value: sender.value });
    }
    _createRanges() {
        let g = this._gauge, count = this.state.rangesCount, colorMin = new wijmo.Color('red'), colorMax = new wijmo.Color('green'), span = (g.max - g.min) / count;
        g.ranges.clear();
        for (let i = 0; i < count; i++) {
            let rng = new gauge.Range(), color = wijmo.Color.interpolate(colorMin, colorMax, count > 1 ? i / (count - 1) : 0);
            rng.min = g.min + i * span;
            rng.max = rng.min + span;
            rng.color = color.toString();
            g.ranges.push(rng);
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
