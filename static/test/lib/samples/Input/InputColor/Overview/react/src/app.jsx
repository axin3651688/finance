import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getPalettes } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this._palettes = getPalettes();
        this._palette = this._palettes[0].colors;
        this.state = {
            background: '',
            showAlphaChannel: true
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div id="output" style={{ background: this.state.background }}>
                Select a background for me!
            </div>

            <div className="form-group">
                <label htmlFor="theInputColor">Default:</label>
                <wjInput.InputColor id="theInputColor" placeholder="Select the color" valueChanged={this._onValueChanged.bind(this)} value={this.state.background}>
                </wjInput.InputColor>
            </div>

            <p>
                You can customize the InputColor using the <b>colorPicker</b> property, which exposes the color picker
                drop-down:
            </p>

            <div className="form-check">
                <label htmlFor="showAlphaChannel">showAlphaChannel:</label>
                <input id="showAlphaChannel" type="checkbox" defaultChecked={this.state.showAlphaChannel} onChange={e => this._changeAlphaChannel(e.target.checked)}/>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="thePalette">palette:</label>
                <wjInput.ComboBox id="thePalette" itemsSource={this._palettes} displayMemberPath="name" selectedIndexChanged={this._changePalette.bind(this)}>
                </wjInput.ComboBox>
            </div>

            <div className="form-group">
                <label htmlFor="theInputColorCst">Custom:</label>
                <wjInput.InputColor id="theInputColorCst" value={this.state.background} showAlphaChannel={this.state.showAlphaChannel} valueChanged={this._onValueChanged.bind(this)} initialized={this._initializeColorCst.bind(this)}>
                </wjInput.InputColor>
            </div>
        </div>;
    }
    _onValueChanged(sender) {
        this.setState({ background: sender.value });
    }
    _changePalette(sender) {
        this._palette = sender.selectedItem.colors;
        this._updatePalette();
    }
    _changeAlphaChannel(value) {
        this.setState({ showAlphaChannel: value });
    }
    _initializeColorCst(sender) {
        this._inputColorCustom = sender;
        this._updatePalette();
    }
    _updatePalette() {
        this._inputColorCustom.colorPicker.palette = this._palette;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
