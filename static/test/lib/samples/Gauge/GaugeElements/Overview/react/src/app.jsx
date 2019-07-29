import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wijmo from '@grapecity/wijmo';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    setTooltips(s) {
        // add some tooltips
        let tt = new wijmo.Tooltip(), host = s.hostElement;
        //
        tt.setTooltip(host.querySelector('.wj-face'), 'Face');
        tt.setTooltip(host.querySelector('.wj-pointer'), 'Pointer');
        tt.setTooltip(host.querySelector('.wj-thumb'), 'Thumb');
        tt.setTooltip(host.querySelector('.wj-ranges'), 'Ranges');
        tt.setTooltip(host.querySelector('.wj-ticks'), 'Tickmarks');
        tt.setTooltip(host.querySelector('.wj-value'), 'Text: Value');
        tt.setTooltip(host.querySelector('.wj-min'), 'Text: Min');
        tt.setTooltip(host.querySelector('.wj-max'), 'Text: Max');
    }
    render() {
        return (<div className="container-fluid">
        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText="All" startAngle={-30} sweepAngle={240} value={50} showRanges={true} showTicks={true} tickSpacing={10} thumbSize={20} initialized="setTooltips">
            <wjGauge.Range wjProperty="pointer" thickness={0.15}></wjGauge.Range>
            <wjGauge.Range min={0} max={30} color="red" thickness={0.5}></wjGauge.Range>
            <wjGauge.Range min={30} max={50} color="orange" thickness={0.5}></wjGauge.Range>
            <wjGauge.Range min={50} max={70} color="gold" thickness={0.5}></wjGauge.Range>
            <wjGauge.Range min={70} max={100} color="green" thickness={0.5}></wjGauge.Range>
        </wjGauge.RadialGauge>
    </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
