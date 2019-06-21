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
        this.theColor = new wijmo.Color('grey');
        this._rgb = {
            r: null,
            g: null,
            b: null
        };
        this.state = {
            theColor: this.theColor,
            red: this.theColor.r,
            green: this.theColor.g,
            blue: this.theColor.b
        };
    }
    updateColor(type) {
        this.theColor[type] = this._rgb[type].value;
        this.setState({
            theColor: this.theColor,
            red: this.theColor.r,
            green: this.theColor.g,
            blue: this.theColor.b
        });
    }
    initGauge(s, type) {
        this._rgb[type] = s;
        let g = s, color = s.hostElement.id;
        g.isReadOnly = false;
        g.thumbSize = 10;
        g.hasShadow = false;
        g.min = 0;
        g.max = 255;
        g.step = 5;
        g.showTicks = true;
        g.tickSpacing = 25;
        g.face.thickness = 0.2;
        g.pointer.thickness = 0.3;
        g.pointer.color = color;
        g.hostElement.style.color = color;
    }
    render() {
        return (<div className="container-fluid">
                <div id="thePanel" style={{ background: this.state.theColor.toString() }}></div>

                <wjGauge.LinearGauge id="red" value={this.state.red} initialized={(s) => this.initGauge(s, "r")} valueChanged={() => this.updateColor("r")}>
                </wjGauge.LinearGauge>

                <wjGauge.LinearGauge id="green" value={this.state.green} initialized={(s) => this.initGauge(s, "g")} valueChanged={() => this.updateColor("g")}>
                </wjGauge.LinearGauge>

                <wjGauge.LinearGauge id="blue" value={this.state.blue} initialized={(s) => this.initGauge(s, "b")} valueChanged={() => this.updateColor("b")}>
                </wjGauge.LinearGauge>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
