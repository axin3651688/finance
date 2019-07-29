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
        this.ranges = [
            { max: 25, color: 'red' },
            { max: 50, color: 'purple' },
            { max: 75, color: 'orange' }
        ];
        this.state = {
            stackRanges: true,
            value: 0,
            ranges: this.ranges
        };
    }
    renderRanges() {
        let wjGaugeRanges = [];
        this.state.ranges.forEach(r => {
            wjGaugeRanges.push(this.renderRange(r));
        });
        return wjGaugeRanges;
    }
    renderRange(r) {
        return <wjGauge.Range max={r.max} color={r.color} key={r.max}></wjGauge.Range>;
    }
    setStackRanges() {
        this.setState({
            stackRanges: !this.state.stackRanges
        });
    }
    setDynamic() {
        var _this = this;
        this.timer = setInterval(() => {
            let i = Math.floor(Math.random() * _this.state.ranges.length), value = _this.state.ranges[i].max + (4 * Math.random() - 2);
            //
            value = Math.min(100, Math.max(0, value));
            this.ranges[i].max = value;
            _this.setState({
                value: value,
                ranges: this.ranges
            });
        }, 100);
    }
    componentDidMount() {
        this.setDynamic();
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return (<div className="container-fluid">
                <div className="form-check">
                    <label date-for="stackRanges" className="form-check-label">stackRanges:</label>
                    <input id="stackRanges" type="checkbox" className="form-check-input" checked={this.state.stackRanges} onChange={this.setStackRanges.bind(this)}/>
                </div>

                <div className="gauges">
                    <wjGauge.RadialGauge value={this.state.value} stackRanges={this.state.stackRanges}>
                        {this.renderRanges()}
                    </wjGauge.RadialGauge>

                    <wjGauge.LinearGauge value={this.state.value} stackRanges={this.state.stackRanges}>
                        {this.renderRanges()}
                    </wjGauge.LinearGauge>

                    <wjGauge.LinearGauge className="vertical" value={this.state.value} stackRanges={this.state.stackRanges} direction="Up">
                        {this.renderRanges()}
                    </wjGauge.LinearGauge>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
