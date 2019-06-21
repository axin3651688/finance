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
        <div className="form-group">
            <label>Radial Gauge:</label>
            <wjGauge.RadialGauge min={0} max={100} value={75} isReadOnly={false} step={10}></wjGauge.RadialGauge>
        </div>
        <div className="form-group">
            <label>Linear Gauge:</label>
            <wjGauge.LinearGauge min={0} max={100} value={75} isReadOnly={false} step={10} showText="MinMax"></wjGauge.LinearGauge>
        </div>
        <div className="form-group">
            <label>Bullet Graph:</label>
            <wjGauge.BulletGraph min={0} max={100} value={75} target={60} bad={50} good={70} showText="MinMax"></wjGauge.BulletGraph>
        </div>
    </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
