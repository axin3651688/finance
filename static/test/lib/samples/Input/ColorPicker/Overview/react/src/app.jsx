import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
import { getPalettes } from './data';
class App extends React.Component {
    constructor(props) {
        super(props);
        this._onShowAlphaChannelChange = (e) => {
            this.setState({ showAlphaChannel: e.target.checked });
        };
        this._onShowColorStringChange = (e) => {
            this.setState({ showColorString: e.target.checked });
        };
        this._onPaletteChanged = (sender) => {
            this.setState({ palette: sender.selectedItem.colors });
        };
        this._onValueChanged = (sender) => {
            this.setState({ color: sender.value });
        };
        this._palettes = getPalettes();
        this.state = {
            showColorString: true,
            showAlphaChannel: true,
            color: '',
            palette: this._palettes[0].colors
        };
    }
    ;
    render() {
        return <div className="container-fluid">
            <div id="output" style={{ "background": this.state.color }}>
                Select a background for me!
            </div>

            <div className="form-check">
                <label htmlFor="showAlphaChannel" className="form-check-label">showAlphaChannel:</label>
                <input id="showAlphaChannel" className="form-check-input" type="checkbox" onChange={this._onShowAlphaChannelChange} defaultChecked={this.state.showAlphaChannel}/>
            </div>
            <div className="form-check">
                <label htmlFor="showColorString" className="form-check-label">showColorString:</label>
                <input id="showColorString" className="form-check-input" type="checkbox" onChange={this._onShowColorStringChange} defaultChecked={this.state.showColorString}/>
            </div>
            <div className="form-check">
                <label htmlFor="thePalette">palette: </label>
                <wjInput.ComboBox displayMemberPath="name" itemsSource={this._palettes} selectedIndexChanged={this._onPaletteChanged}>
                </wjInput.ComboBox>
            </div>

            <wjInput.ColorPicker palette={this.state.palette} showAlphaChannel={this.state.showAlphaChannel} showColorString={this.state.showColorString} valueChanged={this._onValueChanged}>
            </wjInput.ColorPicker>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
