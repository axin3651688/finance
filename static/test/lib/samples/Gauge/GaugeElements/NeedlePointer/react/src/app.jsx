import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wijmo from '@grapecity/wijmo';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
class App extends React.Component {
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} isReadOnly={false}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} startAngle={-45} sweepAngle={270} isReadOnly={false}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={500} value={100} startAngle={-45} sweepAngle={-270} isReadOnly={false}>
                        </wjGauge.RadialGauge>
                    </div>
                </div>

                <p>
                    If you prefer a more traditional needle-style pointer, you can add an extra SVG shape to the control and apply
                    a transform to move the needle. Here is an example that adds a drop-shaped needle pointer
                </p>

                <div className="row">
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} showTicks={true} tickSpacing={10} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedleRounded.bind(this)} valueChanged={this._updateNeedleRounded.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} startAngle={-45} sweepAngle={270} showTicks={true} tickSpacing={10} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedleRounded.bind(this)} valueChanged={this._updateNeedleRounded.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={500} value={100} startAngle={-45} sweepAngle={-270} showTicks={true} tickSpacing={25} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedleRounded.bind(this)} valueChanged={this._updateNeedleRounded.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                </div>

                <p>
                    Because the pointer is just an SVG path, you can customize it very easily by changing the path parameters
                    and/or the CSS associated with the needle element
                </p>

                <div className="row">
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} showTicks={true} tickSpacing={10} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedlePointed.bind(this)} valueChanged={this._updateNeedlePointed.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={100} value={25} startAngle={45} sweepAngle={270} showTicks={true} tickSpacing={10} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedlePointed.bind(this)} valueChanged={this._updateNeedlePointed.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                    <div className="col-xs-4">
                        <wjGauge.RadialGauge min={0} max={500} value={100} startAngle={-45} sweepAngle={-270} showTicks={true} tickSpacing={25} thickness={0.1} showText="MinMax" isReadOnly={false} initialized={this._initializeNeedlePointed.bind(this)} valueChanged={this._updateNeedlePointed.bind(this)}>
                        </wjGauge.RadialGauge>
                    </div>
                </div>
            </div>);
    }
    _initializeNeedleRounded(s) {
        s.refreshed.addHandler((s) => this._updateNeedleRounded(s));
    }
    _initializeNeedlePointed(s) {
        s.refreshed.addHandler((s) => this._updateNeedlePointed(s));
    }
    _updateNeedleRounded(s) {
        if (!s.clientSize) {
            return;
        }
        //
        // add needle element if necessary
        let needle = s.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = s.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = this._getArgs(s);
        needle.setAttribute('d', wijmo.format('M {lft} {y} A {wid} {wid} 0 0 0 {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    _updateNeedlePointed(s) {
        if (!s.clientSize) {
            return;
        }
        //
        // add needle element if necessary
        let needle = s.hostElement.querySelector('.needle');
        if (!needle) {
            let svg = s.hostElement.querySelector('svg');
            needle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            wijmo.addClass(needle, 'needle');
            svg.appendChild(needle);
        }
        //
        // update needle parameters
        let args = this._getArgs(s);
        needle.setAttribute('d', wijmo.format('M {lft} {y} L {x} {bot} L {rgt} {y} L {x} {top} Z', args));
        needle.setAttribute('transform', wijmo.format('rotate({angle} {x} {y})', args));
    }
    _getArgs(g) {
        let rc = g.clientSize, cx = rc.width / 2, cy = rc.height / 2, r = Math.min(rc.width, rc.height) / 2, wid = r / 10, pct = (g.max > g.min) ? (g.value - g.min) / (g.max - g.min) : 0, angle = g.startAngle + g.sweepAngle * wijmo.clamp(pct, 0, 1) - 90;
        //
        return {
            angle: angle,
            x: cx.toFixed(4),
            y: cy.toFixed(4),
            wid: wid.toFixed(4),
            lft: (cx - wid).toFixed(4),
            rgt: (cx + wid).toFixed(4),
            top: (cy - r).toFixed(4),
            bot: (cy + wid).toFixed(4)
        };
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
