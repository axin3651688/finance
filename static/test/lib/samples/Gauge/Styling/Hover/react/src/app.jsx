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
        <wjGauge.LinearGauge isReadOnly={false} hasShadow={false} thumbSize={12} value={50}>
            <wjGauge.Range wjProperty="face" thickness={0.25}></wjGauge.Range>
            <wjGauge.Range wjProperty="pointer" thickness={0.25}></wjGauge.Range>
        </wjGauge.LinearGauge>

        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText="Value" thumbSize={6} value={50}>
            <wjGauge.Range wjProperty="face" thickness={0.05}></wjGauge.Range>
            <wjGauge.Range wjProperty="pointer" thickness={0.05}></wjGauge.Range>
        </wjGauge.RadialGauge>
    </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
