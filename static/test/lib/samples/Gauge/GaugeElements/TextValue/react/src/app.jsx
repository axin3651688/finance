import './app.css';
import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
import * as wjInput from '@grapecity/wijmo.react.input';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._textSource = ['None', 'Value', 'MinMax', 'All'];
        this._formatSource = ['n0', 'n2', 'c0', 'c2'];
        this.state = {
            customText: false,
            showText: 'All',
            format: 'n0',
            getText: null,
            value: 80
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label date-for="showText">Show Text:</label>
                            <wjInput.ComboBox id="showText" itemsSource={this._textSource} text={this.state.showText} selectedIndexChanged={this._onShowTextChanged.bind(this)}>
                            </wjInput.ComboBox>
                        </div>

                        <div className="form-group">
                            <label date-for="format">Format:</label>
                            <wjInput.ComboBox id="format" itemsSource={this._formatSource} text={this.state.format} selectedIndexChanged={this._onFormatChanged.bind(this)}>
                            </wjInput.ComboBox>
                        </div>
                        <div className="form-check">
                            <label date-for="customText" className="form-check-label">Custom Text:</label>
                            <input id="customText" type="checkbox" className="form-check-input" checked={this.state.customText} onChange={this._onCustomTextChanged.bind(this)}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <wjGauge.RadialGauge isReadOnly={false} hasShadow={false} showText={this.state.showText} startAngle={-30} getText={this.state.getText} sweepAngle={240} value={this.state.value} showRanges={false} format={this.state.format} valueChanged={this._onValueChanged.bind(this)}>
                            <wjGauge.Range min={0} max={25} color="red"></wjGauge.Range>
                            <wjGauge.Range min={25} max={50} color="orange"></wjGauge.Range>
                            <wjGauge.Range min={50} max={100} color="green"></wjGauge.Range>
                        </wjGauge.RadialGauge>
                    </div>
                </div>
            </div>);
    }
    _onShowTextChanged(sender) {
        this.setState({ showText: sender.text });
    }
    _onFormatChanged(sender) {
        this.setState({ format: sender.text });
    }
    _onCustomTextChanged(s) {
        this.setState({
            customText: !this.state.customText,
            getText: s.target.checked ? this._getTextCallback : null
        });
    }
    _getTextCallback(gauge, part, value, text) {
        switch (part) {
            case 'value':
                if (value <= 10)
                    return 'Empty!';
                if (value <= 25)
                    return 'Low...';
                if (value <= 95)
                    return 'Good';
                return 'Full';
            case 'min':
                return 'empty';
            case 'max':
                return 'full';
        }
        return text;
    }
    _onValueChanged(sender) {
        this.setState({ value: sender.value });
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
