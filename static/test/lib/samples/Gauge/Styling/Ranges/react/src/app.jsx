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
    }
    render() {
        return (<div className="container-fluid">
                <wjGauge.LinearGauge isReadOnly={false} hasShadow={false} value={50} showRanges={true}>
                    <wjGauge.Range wjProperty="pointer" thickness={0.5}></wjGauge.Range>
                    <wjGauge.Range min={0} max={33} color="red"></wjGauge.Range>
                    <wjGauge.Range min={33} max={66} color="yellow"></wjGauge.Range>
                    <wjGauge.Range min={66} max={100} color="green"></wjGauge.Range>
                </wjGauge.LinearGauge>

                <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} value={50} showRanges={true} showText="Value">
                    <wjGauge.Range wjProperty="pointer" thickness={0.5}></wjGauge.Range>
                    <wjGauge.Range min={0} max={33} color="red"></wjGauge.Range>
                    <wjGauge.Range min={33} max={66} color="yellow"></wjGauge.Range>
                    <wjGauge.Range min={66} max={100} color="green"></wjGauge.Range>
                </wjGauge.RadialGauge>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
